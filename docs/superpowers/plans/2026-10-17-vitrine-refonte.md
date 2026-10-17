# Refonte vitrine.abe.lc Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace vitrine.abe.lc with a single-page portfolio in the "fiche de projet" direction: hero, expandable list of works, education, tech marquee, beer, contact, FR/EN.

**Architecture:** Astro static site in the existing `Orysse/vitrine` repo (branch `refonte`), rebuilt from scratch on top of the kept delivery chain (flake → nginx OCI image → ghcr.io → Renovate → Flux). Content lives in YAML collections with every string in `fr` and `en`; the page is server-rendered HTML that works without JS, with one small script for hash-opening fiches.

**Tech Stack:** Astro 7, plain CSS (Tailwind removed), `@fontsource` (Hanken Grotesk, IBM Plex Mono), `simple-icons`, Nix flake, nginx, `node:test` + `linkedom` for build-output tests, `@playwright/test` (Firefox + Chromium) for browser tests.

**Spec:** `docs/superpowers/specs/2026-10-17-vitrine-refonte-design.md`

## Global Constraints

- French at `/`, English at `/en/`; every human-readable string in both languages; build fails on a missing translation.
- CSP: `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. Nothing inline: no `<style>`, no inline `<script>`, no `style=` attribute.
- No analytics. `pulse.abe.lc` appears nowhere.
- Palette tokens: `--paper: #f1ede4`, `--ink: #16140f`, `--signal: #e8431c`. `--signal` is used only for work numbers and impact figures. Light mode only.
- Fonts self-hosted; titles in a heavy grotesque (Hanken Grotesk 800), labels and materials in IBM Plex Mono. Never Inter. No gradients.
- No client JS framework. Total page JS: one module, under 2 KB.
- Must pass every browser test in both Firefox and Chromium.
- Image keeps port `8080` and `/healthz`; image name `ghcr.io/orysse/vitrine`.
- `package.json` version `2.0.0`. No tag, no merge to `main`, no change in `homelab-cluster` without Abel's go.
- Never invent facts: fiche copy comes from the spec §4.2 and the old repo's `src/content/*.yaml` and `src/content/projects/*/*.md`.
- Tooling via `nix develop`; never install anything imperatively.

## Review Focus

1. Production CSP blocks something the dev server allowed (Astro inline style, font, script) — browser test fails on any console CSP violation under the nginx preview.
2. Phone width (375 px): the marquee or a giant impact figure causes horizontal page scroll — browser test asserts `scrollWidth <= clientWidth`.
3. JS disabled: fiches must still open and close — browser test with `javaScriptEnabled: false`.
4. Deep link `/#cea`, `/en/#homelab`, or an old URL redirecting to an anchor must open that fiche; an unknown hash (`/#nope`) must not throw — browser test, console error check.
5. Keyboard only: summaries reachable by Tab and toggled by Enter/Space, focus visible; marquee duplicate links not tabbable — browser test.

---

## File Structure (after the refonte)

```
src/
  content.config.ts      schemas: works, education, interests
  content/works.yaml     the five fiches (forge, cea, redpill, homelab, atelier)
  content/education.yaml kept, trimmed to the lines §4.3 needs
  content/interests.yaml beer (+ optional music), with `now`
  profile.ts             kept: name, links, cv paths, looking (edited)
  i18n.ts                rewritten: UI strings only, `t(lang, key)`, `path(lang)`
  tools.ts               the 30 marquee entries (moved out of TechWall)
  layouts/Base.astro     <html lang>, head, fonts, CSS, script
  components/Hero.astro
  components/Works.astro       list wrapper + Work.astro per fiche
  components/Work.astro
  components/Education.astro
  components/Marquee.astro
  components/Beer.astro
  components/Footer.astro
  views/Home.astro       composes the page for one lang
  pages/index.astro, pages/en/index.astro, pages/404.astro
  styles/tokens.css, styles/page.css
  scripts/hash-open.ts
public/cv/*.pdf, public/logos/*, public/img/placeholder-*.svg, public/favicon.svg
tests/dist/*.test.mjs    node:test on dist/
tests/e2e/*.spec.ts      Playwright against `nix run .#preview`
playwright.config.ts
```

Deleted: everything else under `src/` (Stack3D, VTR-303, session, colophon, systems, resume, studies views/pages/scripts/styles, `analytics.ts`, `build.ts`, `homelab.ts`, `projects/`, `experience.yaml`, `associations.yaml`), `public/audio/`, `public/theme.js`, `DESIGN.md`, `BRIEF.md`, `PRODUCT.md`, `.impeccable/`.

---

### Task 1: Repo, clean slate, test harness

**Files:**
- Modify: `.gitignore`, `package.json`, `astro.config.mjs`, `flake.nix` (devShell only), `nginx.conf` (CSP line), `README.md`
- Delete: see File Structure
- Create: `src/layouts/Base.astro`, `src/i18n.ts`, `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/404.astro`, `tests/dist/helpers.mjs`, `tests/dist/shell.test.mjs`, `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `type Lang = "fr" | "en"`, `type L10n = Record<Lang, string>`, `t(lang: Lang, key: UiKey): string`, `path(lang: Lang, hash?: string): string` (`"/"` / `"/en/"`, plus `#hash`) in `src/i18n.ts`.
- Produces: `Base.astro` props `{ lang: Lang; title: string; description: string }`, slot = page body.
- Produces: `tests/dist/helpers.mjs` exports `page(route: string): Document` (parses `dist/<route>/index.html` with linkedom), `json(route: string): any` (parses `dist/<route>`) and `allHtml(): string[]`.
- Produces: npm scripts `build` (`astro check && astro build`), `test` (`node --test tests/dist/`), `e2e` (`playwright test`).

- [ ] **Step 1: Put `new-site` on the repo.** In `~/Documents/Perso/new-site` (already holds `docs/` and `.superpowers/`): `git init`, `git remote add origin git@github.com:Orysse/vitrine.git`, `git fetch origin`, `git checkout -b refonte origin/main`. Expected: `git status` shows only `docs/` and `.superpowers/` untracked. Do not touch `~/Documents/Perso/Site`.
- [ ] **Step 2: Commit the spec and plan.** Add `.superpowers/` to `.gitignore`; `git add .gitignore docs/ && git commit -m "docs: refonte design and plan"`.
- [ ] **Step 3: Delete the old site** per File Structure. Remove deps `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-serif`, `tailwindcss`, `@tailwindcss/vite`; add `@fontsource/hanken-grotesk`, keep `@fontsource/ibm-plex-mono`, `simple-icons`; dev-add `linkedom`, `@playwright/test@1.63.0` (exact: must equal `nix eval --raw nixpkgs#playwright-driver.version`). Set `"version": "2.0.0"`. Drop Tailwind and the `redirects` block from `astro.config.mjs` (keep `site`, `trailingSlash: "always"`, i18n, `inlineStylesheets: "never"`, `assetsInlineLimit: 0`).
- [ ] **Step 4: devShell for browsers.** In `flake.nix` devShell: packages `nodejs`, `playwright-driver.browsers`; env `PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}"`, `PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true"`. Remove `VITRINE_REV`/`VITRINE_DATE` from `mkSite` env (no colophon).
- [ ] **Step 5: CSP.** Replace the CSP line in `nginx.conf` with the Global Constraints value. Drop the old `location` redirects (Task 6 rewrites them).
- [ ] **Step 6: Write the failing dist test** `tests/dist/shell.test.mjs`:

```js
test("fr and en pages exist with the right lang", () => {
  assert.equal(page("/").documentElement.lang, "fr");
  assert.equal(page("/en/").documentElement.lang, "en");
});
test("nothing inline and no analytics", () => {
  for (const html of allHtml()) {
    assert.doesNotMatch(html, /<style[\s>]/);
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/);
    assert.doesNotMatch(html, /\sstyle="/);
    assert.doesNotMatch(html, /pulse\.abe\.lc/);
  }
});
test("each page links to the other language", () => {
  assert.ok(page("/").querySelector('a[hreflang="en"][href="/en/"]'));
  assert.ok(page("/en/").querySelector('a[hreflang="fr"][href="/"]'));
});
```

- [ ] **Step 7: Run** `npm run build && npm test`. Expected: FAIL (pages missing).
- [ ] **Step 8: Implement** `i18n.ts`, `Base.astro`, the two index pages (empty `<main>` for now, language link in a `<header>`), `404.astro`. `title`: `"Abel Chartier — Systèmes, réseaux, sécurité"` / `"Abel Chartier — Systems, networks, security"`.
- [ ] **Step 9: Run** `npm run build && npm test`. Expected: PASS.
- [ ] **Step 10: Browser harness.** `playwright.config.ts`: projects `firefox` and `chromium`; `webServer: { command: "nix run .#preview", url: "http://localhost:8080/healthz", reuseExistingServer: true, timeout: 600_000 }`; `baseURL: "http://localhost:8080"`. Shared fixture in `tests/e2e/fixtures.ts`: fails the test if the page logs any console error or `securitypolicyviolation`. `tests/e2e/smoke.spec.ts`: `/` and `/en/` return 200 with no console error (Review Focus 1).
- [ ] **Step 11: Run** `nix develop -c npm run e2e`. Expected: PASS in both projects.
- [ ] **Step 12: Commit** `git commit -am "refactor: clean slate for the refonte"` (plus new files).

### Task 2: Content model

**Files:**
- Create: `src/content/works.yaml`, `tests/dist/content.test.mjs` (via a test page, see Step 3)
- Modify: `src/content.config.ts`, `src/content/interests.yaml`, `src/content/education.yaml`, `src/profile.ts`

**Interfaces:**
- Produces collection `works`, entries ordered by `number`:

```ts
const l10n = z.object({ fr: z.string(), en: z.string() });
const month = z.string().regex(/^\d{4}(-\d{2})?$/);
work = z.object({
  number: z.number().int(),               // 1..5, rendered "01"
  kind: z.enum(["pro", "perso", "asso"]),
  org: z.string(),
  status: l10n,                           // "CDD à temps partiel", "Stage", "Projet perso", "Association"
  start: month.nullable(), end: month.nullable(),
  tag: l10n,                              // mono label, e.g. "Forge EPITA · 5 sites · 1500 postes"
  line: l10n,                             // one-sentence result, closed state
  impact: l10n,                           // impact title, open state
  figure: z.string().optional(),          // the number set in --signal, must appear in impact
  body: z.array(l10n),                    // 1–3 short paragraphs
  materials: z.array(z.object({ key: l10n, value: z.string() })),
  images: z.array(z.object({ src: z.string(), alt: l10n, placeholder: z.boolean() })).default([]),
  links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
});
```

  Entry ids (anchors): `forge` (1, pro, start `2026-02`), `cea` (2, pro, `2025-09`→`2026-01`), `redpill` (3, pro, `2024-07`→`2024-08`), `homelab` (4, perso), `atelier` (5, asso, start `2024`).
- Produces `interests` schema `{ order, label: l10n, text: l10n, now: l10n.optional() }`; beer entry `now` = `{ fr: "En ce moment : une sour à l'orange sanguine.", en: "Right now: a blood orange sour." }`, text mentions home brewing and LATEB (EPITA).
- Produces `education` keeps `entry` schema; entries: EPITA (prépa intégrée + majeure SRS), ITS exchange 2024, bac scientifique.
- Produces `profile.looking` unchanged; `profile.cv` unchanged.

- [ ] **Step 1: Write failing test** `tests/dist/content.test.mjs` against a temporary route `src/pages/_debug/works.json.ts` that emits `getCollection("works")` ids in order (delete the route in Task 4):

```js
test("five works in order", () => {
  assert.deepEqual(json("/_debug/works.json").map(w => w.id),
    ["forge", "cea", "redpill", "homelab", "atelier"]);
});
test("every figure appears in its impact", () => {
  for (const w of json("/_debug/works.json")) if (w.figure)
    for (const l of ["fr", "en"]) assert.ok(w.impact[l].includes(w.figure));
});
```

- [ ] **Step 2: Run** `npm run build && npm test`. Expected: FAIL.
- [ ] **Step 3: Write the content.** Copy facts from spec §4.2 and the old YAML/Markdown. Forge `impact.fr`: `"1500 postes, une seule image."`, `figure: "1500"`. Homelab links: `homelab-nix`, `homelab-cluster`, `config` repos from `profile.links`. CrowdSec: grep `Orysse/homelab-cluster` (clone to scratch, read-only) before listing it; leave it out if absent and note it in the commit message. Images: `forge` gets two, both `placeholder: true`: `/img/placeholder-dc.svg` (datacenter, Ivry) and `/img/placeholder-salle.svg` (school machine rooms). Other works: no image; `homelab` gets the schematic in Task 4.
- [ ] **Step 4: Run** `npm run build && npm test`. Expected: PASS; also remove `fr` from one string and confirm `npm run build` fails, then restore.
- [ ] **Step 5: Commit** `feat: content model for the fiches`.

### Task 3: Tokens, type and the hero

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/page.css`, `src/components/Hero.astro`, `src/views/Home.astro`, `tests/dist/hero.test.mjs`, `tests/e2e/layout.spec.ts`
- Modify: `src/layouts/Base.astro`, both index pages (render `<Home lang>`)

**Interfaces:**
- Consumes: `t`, `path`, `profile`.
- Produces: `Home.astro` props `{ lang: Lang }`; sections in order: `Hero`, `Works`, `Education`, `Marquee`, `Beer`, `Footer` (later tasks fill them in).
- Produces CSS custom properties `--paper --ink --signal --font-display --font-mono --gutter --measure` used by all components.

- [ ] **Step 1: Failing dist test** `hero.test.mjs`: `/` has one `h1` containing `"Abel Chartier"`; a link `a[href="/cv/ABEL_CHARTIER_CV_fr.pdf"]` inside `header`; `/en/` links `/cv/ABEL_CHARTIER_CV_en.pdf`; hero text includes `"février 2027"` / `"February 2027"`.
- [ ] **Step 2: Failing browser test** `layout.spec.ts` at viewport 375×812 on `/` and `/en/`: `document.documentElement.scrollWidth <= clientWidth` (Review Focus 2); computed `font-family` of `h1` starts with `"Hanken Grotesk"`; `body` background is `rgb(241, 237, 228)`.
- [ ] **Step 3: Run** `npm run build && npm test && nix develop -c npm run e2e`. Expected: FAIL.
- [ ] **Step 4: Implement** tokens, `@font-face` via fontsource imports in `Base.astro` (weights 400, 500, 800 for Hanken; 400, 500 for Plex Mono), the hero. Hero is an impact moment: the oversized, tight display set ("Systèmes, / réseaux, / sécurité.") may overlap or bleed against the grid; the role/looking paragraph stays calm at `--measure`. Mockup reference: `.superpowers/brainstorm/*/content/direction.html` card A.
- [ ] **Step 5: Run** all three commands. Expected: PASS in Firefox and Chromium.
- [ ] **Step 6: Commit** `feat: tokens, type and hero`.

### Task 4: The list of works

**Files:**
- Create: `src/components/Works.astro`, `src/components/Work.astro`, `src/scripts/hash-open.ts`, `public/img/placeholder-salle.svg`, `public/img/placeholder-dc.svg`, `tests/dist/works.test.mjs`, `tests/e2e/works.spec.ts`
- Delete: `src/pages/_debug/`

**Interfaces:**
- Consumes: `works` collection, `Home.astro`.
- Produces: per work `<details class="work" id="{id}" name="works">` with `<summary>` holding number (`.work-n`, two digits), org, status, dates, line; open body holds `impact` (figure wrapped in `<em class="figure">`), body, `<dl class="materials">`, images or schematic, links.
- Produces: `hash-open.ts` — on load and `hashchange`, if `location.hash` matches a `details.work` id, set `open` and scroll it into view; any other hash is ignored. Loaded as one `<script type="module" src>` from `Base.astro`.

- [ ] **Step 1: Failing dist test** `works.test.mjs` on `/` and `/en/`: five `details.work` with ids `forge, cea, redpill, homelab, atelier` in order; all have `name="works"`; first `.work-n` text is `"01"`; forge summary includes `"La Forge"` and the fr status `"CDD à temps partiel"`; forge `.figure` text is `"1500"`; none has `open` in the HTML.
- [ ] **Step 2: Failing browser test** `works.spec.ts`:
  - clicking forge summary opens it; clicking cea opens cea and closes forge;
  - `goto("/#cea")` → `#cea` has `open`; `goto("/en/#homelab")` → `#homelab` open (Review Focus 4);
  - `goto("/#nope")` → no fiche open, no console error;
  - with `javaScriptEnabled: false`, clicking a summary toggles `open` (Review Focus 3);
  - keyboard: Tab reaches forge summary, it has a visible focus outline (computed `outline-style` not `none`), Enter opens it (Review Focus 5).
- [ ] **Step 3: Run** tests. Expected: FAIL.
- [ ] **Step 4: Implement** `Works`, `Work`, `hash-open.ts`, placeholders (SVG, crème hatch + mono label "photo à venir" / "photo to come", alt text per lang). Exclusivity comes from the native `name` attribute — no JS. Closed rows: thick ink rule, mono tag, grotesque org. Open fiche: impact title is an impact moment (figure in `--signal`, oversized); materials stay calm mono `key — value` rows. Homelab gets a small line-drawn inline SVG schematic (ink strokes, no inline `style`): host, 3 tmpfs microVMs, Cilium default-deny zone.
- [ ] **Step 5: Run** tests. Expected: PASS in Firefox and Chromium.
- [ ] **Step 6: Commit** `feat: expandable list of works`.

### Task 5: Education, marquee, beer, footer

**Files:**
- Create: `src/tools.ts`, `src/components/Education.astro`, `src/components/Marquee.astro`, `src/components/Beer.astro`, `src/components/Footer.astro`, `tests/dist/sections.test.mjs`, `tests/e2e/marquee.spec.ts`
- Delete: `src/components/TechWall.astro` (its `tools` array and `extraIcons` move to `src/tools.ts`)

**Interfaces:**
- Produces: `tools: { slug?: string; label: string; url: string; img?: string }[]` and `iconPath(slug): string | undefined` in `src/tools.ts` (same 30 entries and order as the old TechWall).
- Produces: Marquee markup `<section class="marquee" aria-label>` with two `.marquee-track` lists; track 1 links have `aria-label` and `title` = label; track 2 has `aria-hidden="true"` and its links `tabindex="-1"`. Logos only, no visible text.

- [ ] **Step 1: Failing dist test** `sections.test.mjs`: track 1 has 30 `a[aria-label][title]`; track 2 is `aria-hidden="true"` and every link has `tabindex="-1"`; `/` contains `"En ce moment : une sour à l'orange sanguine."`, `/en/` contains `"Right now: a blood orange sour."`; footer has links to `https://github.com/Orysse`, `profile.links.linkedin`, `mailto:abel.chartier@gmail.com`; education mentions `"EPITA"` and `"ITS"`.
- [ ] **Step 2: Failing browser test** `marquee.spec.ts`: with `reducedMotion: "reduce"`, track computed `animation-name` is `none`; default motion: hovering the marquee sets `animation-play-state` to `paused`; focusing a track-1 link also pauses (`:focus-within`); at 375 px no horizontal page scroll (Review Focus 2).
- [ ] **Step 3: Run** tests. Expected: FAIL.
- [ ] **Step 4: Implement.** Marquee is CSS-only (`@keyframes` translate −50 %, `overflow: clip` on the section). Logos are monochrome ink. Education: one or two quiet lines, no emphasis. Beer block: the only non-technical moment; may carry a typographic touch but no `--signal`. Footer: GitHub, LinkedIn, e-mail, `© Abel Chartier`.
- [ ] **Step 5: Run** tests. Expected: PASS in Firefox and Chromium.
- [ ] **Step 6: Commit** `feat: education, tech marquee, beer and footer`.

### Task 6: Old URLs

**Files:**
- Modify: `nginx.conf`
- Create: `tests/e2e/redirects.spec.ts`

**Interfaces:**
- Consumes: work ids from Task 2.

- [ ] **Step 1: Failing test** `redirects.spec.ts` using `request.get(url, { maxRedirects: 0 })`, expect `301` and `location`:

| from | to |
|---|---|
| `/systemes/homelab/`, `/homelab/`, `/projets/homelab/`, `/systemes/config/`, `/projets/config/` | `/#homelab` |
| `/systemes/`, `/systemes/vitrine/`, `/projets/`, `/parcours/`, `/etudes/`, `/colophon/`, `/303/`, `/session/`, `/cv/` | `/` |
| `/en/systems/homelab/`, `/en/homelab/`, `/en/projects/homelab/`, `/en/systems/config/`, `/en/projects/config/` | `/en/#homelab` |
| `/en/systems/`, `/en/projects/`, `/en/resume/`, `/en/studies/`, `/en/colophon/`, `/en/303/`, `/en/session/`, `/en/cv/` | `/en/` |

  Also: each path without trailing slash redirects the same way; `/healthz` returns `200` `ok`; `/nope/` returns `404`.
- [ ] **Step 2: Run** `nix develop -c npm run e2e -- redirects`. Expected: FAIL.
- [ ] **Step 3: Implement** regex `location` blocks in `nginx.conf` returning `301` (relative `Location`, `absolute_redirect off;` so the port never leaks).
- [ ] **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: redirect old URLs`.

### Task 7: Print, README, final check

**Files:**
- Modify: `src/styles/page.css` (`@media print`), `README.md`, `.github/workflows/build.yml` (only if something references removed files)

- [ ] **Step 1: Print.** `hash-open.ts` adds a `beforeprint` listener that opens every fiche and an `afterprint` listener that restores the previous state; `@media print` hides the marquee and drops the paper background. Browser test in `works.spec.ts`: dispatch `beforeprint` on `window`, expect all five fiches `open`; dispatch `afterprint`, expect only the previously open one.
- [ ] **Step 2: README.** Rewrite Layout and Commands sections for the new tree; keep the delivery explanation (tag → ghcr → Renovate → Flux); state "no analytics".
- [ ] **Step 3: Full verification.** Run `nix flake check`, `nix build .#image`, `npm run build && npm test`, `nix develop -c npm run e2e`. Expected: all green, both browsers. Paste the outputs in the hand-off.
- [ ] **Step 4: Commit** `docs: README for the refonte`. Ask Abel before `git push -u origin refonte`. Stop there: merge to `main` and tag `v2.0.0` only after Abel reviews the preview.
