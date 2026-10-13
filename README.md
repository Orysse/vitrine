# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my CV, expanded into a site. Who I am, what I do,
what I like, with the technical detail behind each project.

Static site built with [Astro](https://astro.build) and Tailwind CSS, packaged by Nix into
an unprivileged nginx image and served from my homelab's k3s cluster.
[abe.lc](https://abe.lc) stays a short plain-text page (`apps/site` in homelab-cluster).

## Layout

```
src/
  profile.ts              name, status, availability, links (the home page)
  arch.ts                 architecture of each project page: layers, parts, logo, role, repo path
  logos.ts                logo lookup: simple-icons at build time, else public/logos/*.png
  build.ts                version, revision and commit date, for the colophon
  i18n.ts                 UI strings (FR/EN), date formatting, URLs per language
  content.config.ts       schemas of the content collections
  content/
    experience.yaml       jobs          ┐
    education.yaml        schools       │ one entry per item, every string in fr and en
    associations.yaml     associations  │
    skills.yaml           skill groups  │
    interests.yaml        outside work  ┘
    projects/{fr,en}/*.md one Markdown file per project and language (card + page)
  components/             CvPage, ProjectPage, Arch, Entry, Logo, Vtr303Page, Vtr303
  layouts/Layout.astro    head, trail, colophon; sets the page's universe
  scripts/                architecture panel, VTR-303 panel (TypeScript)
  styles/global.css       Tailwind theme, the four universes, print sheet, 303 panel
  pages/                  / and /en/, /projets/<slug>/, /303/ (and /en/…), 404
public/cv/                CV PDFs, copied from the CV repository
public/img/               photos of the machines (credits in CREDITS.md)
public/logos/             logos missing from simple-icons (credits in CREDITS.md)
public/audio/             VTR-303 voice (AudioWorklet, plain JS: served as is)

nginx.conf                image server config: CSP, /healthz
```

Content edits are in `src/content/`, `src/profile.ts` and `src/arch.ts`; the schemas reject
a missing translation or a malformed date at build time. When a project changes, update its
parts in `src/arch.ts` from the repository paths they name.

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

One page per subject, each in its own universe: `home` (warm paper, follows the reader's
light or dark theme), `homelab` (blueprint, mono headings), `config` (Everforest Dark Medium,
the laptop's theme) and `synth` (the 303's silver). `data-universe` on `<html>` picks the
tokens in `global.css`.

- **Trail**: one stop per page at the top, like a line map. The current page is filled,
  visited pages keep a coloured stop. Cross-document view transitions (CSS only) keep it in
  place while the universe changes.
- **Architecture** (`Arch.astro`, `scripts/arch.ts`): layers of parts with their real
  logos. Hovering, focusing or tapping a part shows its card; `#part` links to it. Without
  JavaScript every card is listed and each part is an anchor.
- **Colophon**: the footer shows the version (linked to its tag), the git revision and the
  commit date. The flake passes them as `VITRINE_REV` and `VITRINE_DATE`; a local build asks
  git.
- **Print**: the home page prints as a CV, entries open, without trail or footer.
- **VTR-303** (`/303/`): a TB-303 emulation. The voice (polyBLEP oscillator, 4-pole
  resonant ladder, envelopes, accent, slide) runs in an AudioWorklet; the panel has a
  16-step sequencer, presets, a generator and drums, and stores the pattern in the URL.

## Server

nginx sends a strict CSP (`default-src 'none'`; scripts, styles, fonts from self only), so
Astro is set to never inline styles or assets. HSTS and the other headers come from Traefik.

## Release

Versions are semver: the minor for features and redesigns, the patch for fixes and small edits.

1. Set `version` in `package.json`, add an entry to `CHANGELOG.md`, commit, then tag:
   `git tag v0.9.0 && git push --follow-tags`. Pick patch or minor before tagging: tags never move.
2. CI builds and pushes `ghcr.io/orysse/vitrine:0.9.0` (and `:0.9`).
3. Renovate opens the bump in homelab-cluster (`apps/vitrine`); Flux applies it once merged.
