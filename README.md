# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my CV, expanded into a single page. Who I am, what I
have built, the technical choices behind it. French at `/`, English at `/en/`.

Static site built with [Astro](https://astro.build), packaged by Nix into an unprivileged nginx
image and served from my homelab's k3s cluster. No client JS framework, no analytics.

## Commands

```sh
nix develop               # node, Playwright browsers
npm install
npm run dev               # http://localhost:4321, live reload
npm run build             # astro check + static build in dist/
npm test                  # node:test on dist/ (run the build first)
npm run e2e               # Playwright, Firefox + Chromium, against `nix run .#preview`

nix build                 # the site, reproducibly
nix build .#image         # the OCI image (docker-archive)
nix run .#preview         # production build behind the image's nginx, on :8080
nix flake check
```

Nix only sees git-tracked files: `git add` new files before `nix run` or `nix build`.

## Delivery

A tag `vX.Y.Z` builds the image and pushes `ghcr.io/orysse/vitrine:X.Y.Z`; Renovate opens the
bump in homelab-cluster and Flux deploys it.

(Layout and design notes are rewritten at the end of the refonte.)
