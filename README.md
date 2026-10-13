# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my CV, expanded into a site. Who I am, what I do,
what I like, with the technical detail behind each project.

Static site built with [Astro](https://astro.build) and Tailwind CSS, packaged by Nix into
an unprivileged nginx image and served from my homelab's k3s cluster.
[abe.lc](https://abe.lc) stays a short plain-text page (`apps/site` in homelab-cluster).

## Layout

```
src/
  profile.ts              name, status, availability, links (the header)
  homelab.ts              layers of the homelab diagram, each with its source in the homelab repos
  build.ts                version, revision and commit date, for the colophon
  i18n.ts                 UI strings (FR/EN), date formatting, URLs per language
  content.config.ts       schemas of the content collections
  content/
    experience.yaml       jobs          ┐
    education.yaml        schools       │ one entry per item, every string in fr and en
    associations.yaml     associations  │
    skills.yaml           skill groups  │
    interests.yaml        outside work  ┘
    projects/{fr,en}/*.md one Markdown file per project and language (row + detail page)
  components/             Stack3D (isometric stack + architecture inspector), SystemSheet,
                          FactsMatrix, HighlightGrid, ResumeEntry, SkillsMatrix, KeyboardHelp,
                          Redirect, Vtr303, Vtr303Page
  views/                  one component per pole, rendered by the thin route files
  layouts/Layout.astro    chassis (top bar, pole nav, controls), colophon, keyboard help
  scripts/                ui (density, polarity, keyboard), stack (CAD/inspector),
                          vtr303 + canvas (loaded on /303/ only)
  styles/global.css       monochrome tokens, chassis, density, print; vtr303.css (303 panel)
  pages/                  / and /en/, /systemes/<slug>/ (+ /en/systems/…), /parcours/ and
                          /en/resume/, /colophon/ (+ /en/), /303/ (+ /en/), 404,
                          legacy /projets/<slug>/ and /en/projects/<slug>/ redirects
public/cv/                CV PDFs, copied from the CV repository
public/audio/             VTR-303 voice (AudioWorklet, plain JS: served as is)

nginx.conf                image server config: CSP, /healthz
```

Content edits are in `src/content/` and `src/profile.ts`; the schemas reject a missing
translation or a malformed date at build time. When the homelab changes, update
`src/homelab.ts` from the files named in its comments.

## Commands

```sh
nix develop               # node
npm install
npm run dev               # http://localhost:4321, live reload
npm run build             # astro check + static build in dist/

nix build                 # the site, reproducibly
nix build .#image         # the OCI image (docker-archive)
nix run .#preview         # production build behind the image's nginx, on :8080
nix flake check
```

To update the CV, rebuild it in the CV repository and copy the two PDFs into `public/cv/`.

## Design

Surgical Engineering Brutalism (Oxide Computer x Hara Design Institute x Stripe Press): strict
monochrome (`#FFFFFF` / `#0A0A0A`, no hue), exposed 1px grid, 0px radius, no shadows or
gradients. Geist and Geist Mono. The rules live in `DESIGN.md`, the audience and goals in
`PRODUCT.md`, and the page map in `BRIEF.md`.

One chassis on every page: a top bar (identity, the four indexed poles, a density switch,
polarity `[INV]`, locale, `[CV.PDF]`), the content rails, and a colophon footer. Pages ship
no inline style or script (the CSP forbids both); external modules add the interactions.

- **Poles**: `[01]` index and the isometric stack, `[02]` systems (+ a page per system),
  `[03]` résumé (prints as an A4 CV), `[04]` colophon.
- **Density** (`d`): `data-density="summary"` keeps a 30-second recruiter scan (deep rows
  behind `.d-deep`); `spec` opens the full fact matrices.
- **Architecture inspector** (`Stack3D.astro`): the six homelab layers as an isometric SVG,
  computed at build time. Explosion slider, bounded tilt on drag, and layer selection
  (click, or `j` / `k`) that reads out each layer's source file and invariant. The full
  table is in the DOM, so it reads without JavaScript.
- **Keyboard**: `1`-`4` poles, `d` density, `i` polarity, `l` locale, `j`/`k` layers, `?` help.
- **Colophon**: version (linked to its tag), git revision and commit date, the CSP, and a live
  type specimen. The flake passes `VITRINE_REV` and `VITRINE_DATE`; a local build asks git.
- **VTR-303** (`/303/`): a TB-303 emulation, kept as-is. The voice (polyBLEP oscillator,
  4-pole resonant ladder, envelopes, accent, slide) runs in an AudioWorklet; the panel has a
  16-step sequencer, presets, a generator and drums, and stores the pattern in the URL.

## Server

nginx sends a strict CSP (`default-src 'none'`; scripts, styles, fonts from self only), so
Astro is set to never inline styles or assets. HSTS and the other headers come from Traefik.

## Release

Versions are semver: the minor for features and redesigns, the patch for fixes and small edits.

1. Set `version` in `package.json`, add an entry to `CHANGELOG.md`, commit, then tag:
   `git tag v0.8.0 && git push --follow-tags`. Pick patch or minor before tagging: tags never move.
2. CI builds and pushes `ghcr.io/orysse/vitrine:0.8.0` (and `:0.8`).
3. Renovate opens the bump in homelab-cluster (`apps/vitrine`); Flux applies it once merged.
