# vitrine

[vitrine.abe.lc](https://vitrine.abe.lc): my showcase, printed as issue no. 1 of a
psychedelic underground magazine (think *Oz*, 1968). Every page is a spread on a moving
"funky" ground, with halftone photos collaged on top and the text in solid boxes.

It is a static site built with [Zola](https://www.getzola.org) and Nix, served by an
unprivileged nginx image from my homelab's k3s cluster. [abe.lc](https://abe.lc) stays a
short plain-text page (`apps/site` in homelab-cluster); this is a separate app.

## Layout

```
config.toml          site settings, FR (default) and EN strings
content/             one page per file, FR in *.md, EN in *.en.md
  _index.md            cover and contents
  infra.md             report: the homelab
  parcours.md          profile: interview (Q&A in front matter)
  materiel.md          catalogue: gear (items in front matter)
templates/           Tera v2 (Zola 0.23): base, one template per page, components.html
static/
  css/vitrine.css      all styles, one fixed palette
  js/vitrine.js        moving grounds, halftones, trip slider, the VTR-303
  fonts/               subset woff2 (OFL / Apache), from `nix run .#fetch-fonts`
  cv/                  CV PDFs, copied from the CV repository
nginx.conf           image server config: CSP, SSI footer, /healthz
deploy/              Kubernetes manifests to copy into homelab-cluster/apps/vitrine
```

Most edits are text: change the front matter or the Markdown in `content/`, in both
languages.

## Commands

```sh
nix run .#serve          # live preview with reload on http://127.0.0.1:1111
nix run .#preview        # production build behind the image's nginx, on :8080
nix build                # the site, in ./result
nix build .#image        # the OCI image (docker-archive), in ./result
nix flake check
nix run .#fetch-fonts    # only to change the font set
```

To update the CV, rebuild it in the CV repository and copy the two PDFs into
`static/cv/`.

## How it works

- **No JavaScript needed.** Without the script, grounds are static CSS patterns and the
  "photos" are flat coloured paper. With it, grounds move (canvas), photos are halftoned
  in one ink, titles melt (an SVG displacement filter), and the trip slider sets how much.
  `prefers-reduced-motion` starts paused; the reader's choice is kept in localStorage.
- **Halftones.** `{{<halftone art="nuc" … />}}` draws a procedural picture. Pass
  `src="/img/nuc.jpg"` to halftone a real photo instead (same treatment).
- **VTR-303.** A small acid line synthesised with Web Audio on the profile page. It never
  plays until the reader presses play.
- **Footer.** nginx server-side includes print the pod that served the page; the build
  writes the commit hash.
- **Headers.** nginx sets a strict CSP (`default-src 'none'`, scripts, styles and fonts
  from self only). HSTS and the other headers come from Traefik in the cluster.

## Deploy

1. Bump the version (semver, minor for content and features) and push a tag:
   `git tag v0.2.0 && git push --tags`. CI pushes `ghcr.io/orysse/vitrine:0.2.0`.
   The package must be public on ghcr.io (or the cluster needs a pull secret).
2. Once: copy `deploy/` to `homelab-cluster/apps/vitrine/` and add `- vitrine` to
   `apps/kustomization.yaml`. The wildcard certificate already covers `vitrine.abe.lc`.
3. After that, Renovate opens a PR in homelab-cluster for each new image tag.
