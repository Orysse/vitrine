# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my CV, expanded into a site. Who I am, what I do,
what I like, with the technical detail behind each project.

Static site built with [Astro](https://astro.build) and Tailwind CSS, packaged by Nix into
an unprivileged nginx image and served from my homelab's k3s cluster.
[abe.lc](https://abe.lc) stays a short plain-text page (`apps/site` in homelab-cluster).

## Layout

```
src/
  profile.ts              name, status, availability, links (the hero)
  i18n.ts                 UI strings (FR/EN), date formatting, URLs per language
  content.config.ts       schemas of the content collections
  content/
    experience.yaml       jobs          ┐
    education.yaml        schools       │ one entry per item, every string in fr and en
    associations.yaml     associations  │
    skills.yaml           skill groups  │
    interests.yaml        outside work  ┘
    projects/{fr,en}/*.md one Markdown file per project and language (card + detail page)
  components/             CvPage, ProjectPage, Entry, ProjectCard, Ground, Halftone
  layouts/Layout.astro    head, header, SVG filter
  scripts/                grounds, halftones, trip slider (TypeScript)
  styles/global.css       Tailwind theme (palette, fonts) and the print primitives
  pages/                  / and /en/, /projets/<slug>/ and /en/projects/<slug>/, 404
public/cv/                CV PDFs, copied from the CV repository
nginx.conf                image server config: CSP, /healthz
deploy/                   Kubernetes manifests (copied to homelab-cluster/apps/vitrine)
```

Content edits are in `src/content/` and `src/profile.ts`; the schemas reject a missing
translation or a malformed date at build time.

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

## Effects

All of them are optional: without JavaScript, grounds are static CSS patterns and the
"photos" are flat coloured paper.

- **Grounds**: canvas light show and op-art bands behind each section.
- **Halftones**: `<Halftone art="nuc" … />` draws a procedural picture; pass
  `src="/img/photo.jpg"` (a file in `public/`) to halftone a real photo instead.
- **Trip slider**: sets the title distortion (SVG displacement filter) and the ground speed.
  `prefers-reduced-motion` starts paused; the reader's choice is kept in localStorage.

## Server

nginx sends a strict CSP (`default-src 'none'`; scripts, styles, fonts from self only), so
Astro is set to never inline styles or assets. HSTS and the other headers come from Traefik.

## Release

Versions are semver; bump the minor for content and features.

1. Set `version` in `package.json`, commit, then tag: `git tag v0.2.0 && git push --follow-tags`.
2. CI builds and pushes `ghcr.io/orysse/vitrine:0.2.0` (and `:0.2`).
3. Renovate opens the bump in homelab-cluster (`apps/vitrine`); Flux applies it once merged.
