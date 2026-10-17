# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my CV, expanded into a single page. Who I am, what I
have built, the technical choices behind it. French at `/`, English at `/en/`.

Static site built with [Astro](https://astro.build), packaged by Nix into an unprivileged nginx
image and served from my homelab's k3s cluster. No client JS framework (one 600-byte module),
no analytics.

## Layout

```
src/
  content.config.ts       schemas: works, education, interests (every string in fr and en)
  content/works.yaml      the five fiches: forge, cea, redpill, homelab, atelier
  content/education.yaml  content/interests.yaml (the beer line, with its "now")
  profile.ts              name, links, CV paths, what I am looking for
  i18n.ts                 UI strings, t(lang, key), path(lang)
  dates.ts  tools.ts      date formatting; the 30 marquee logos
  layouts/Base.astro      head, fonts, CSS, the one script
  components/             Hero, Works, Work, Education, Marquee, Beer, Footer
  views/Home.astro        the page for one language
  pages/                  index (fr), en/index, 404
  styles/                 tokens.css (palette, type), page.css
  scripts/hash-open.ts    opens the fiche named by the URL hash; opens all of them to print
public/                   CV PDFs, logos, placeholder photos, favicon
nginx.conf                image server config: CSP, /healthz, redirects from the old URLs
tests/dist/               node:test on the built HTML
tests/e2e/                Playwright, Firefox + Chromium, against the production nginx
```

Content edits are in `src/content/` and `src/profile.ts`; the schemas reject a missing
translation, a malformed date, or an impact figure that is not in its title, at build time.

## Commands

```sh
nix develop               # node, Playwright browsers
npm install
npm run dev               # http://localhost:4321, live reload
npm run build             # astro check + static build in dist/
npm test                  # node:test on dist/ (run the build first)
npm run e2e               # Playwright against `nix run .#preview`

nix build                 # the site, reproducibly
nix build .#image         # the OCI image (docker-archive)
nix run .#preview         # production build behind the image's nginx, on :8080
nix flake check
```

Nix only sees git-tracked files: `git add` new files before `nix run` or `nix build`.

To update the CV, rebuild it in the CV repository and copy the two PDFs into `public/cv/`.
The two photos on the Forge fiche are placeholders (`public/img/placeholder-*.svg`): replace
them and set `placeholder: false` in `works.yaml`.

## Design

"The project sheet": works are presented like an architecture office presents its buildings.
Cream paper (`#f1ede4`), warm ink (`#16140f`), one signal colour (`#e8431c`) used only for work
numbers and impact figures. Hanken Grotesk 800 for titles, IBM Plex Mono for labels and
materials, self-hosted. Oversized type only where it matters (hero, impact titles); body text
and materials stay calm. Light mode only. The CSP allows nothing inline, so there is no
`<style>`, no inline script and no `style=` anywhere.

## Delivery

A tag `vX.Y.Z` builds the image and pushes `ghcr.io/orysse/vitrine:X.Y.Z` (and `:X.Y`); Renovate
opens the bump in homelab-cluster and Flux deploys it. The image keeps port `8080` and
`/healthz`.
