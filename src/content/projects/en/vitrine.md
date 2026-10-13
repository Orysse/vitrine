---
title: vitrine
summary: This site. A CV as static pages, built by Nix and served from the homelab.
order: 3
repo: https://github.com/Orysse/vitrine
stack: [Astro, Tailwind CSS, Nix, nginx, GitHub Actions, Renovate, Flux]
facts:
  - [Build, "static Astro, nix build for the site and the OCI image"]
  - [Image, "unprivileged nginx (65534), read-only root, writes only to /tmp"]
  - [CSP, "scripts, styles and fonts from the site only, nothing inline"]
  - [Delivery, "vX.Y.Z tag, image on ghcr.io, Renovate then Flux in homelab-cluster"]
highlights:
  - title: A reproducible build
    text: "nix build produces the site and the OCI image. The version comes from package.json, the revision and date from the commit."
  - title: A strict CSP
    text: "Scripts, styles and fonts come from the site only, nothing is inline. No request goes to another domain, except the audience measurement hosted in the homelab."
  - title: An unprivileged image
    text: "nginx runs as user 65534, with a read-only root, and writes only to /tmp."
  - title: From tag to production
    text: "A vX.Y.Z tag publishes the image on ghcr.io. Renovate opens the update in homelab-cluster, and Flux applies it once merged."
---

## Content

Content lives in YAML and Markdown files, one entry per item, every string in French and English. The schemas reject a missing translation or a malformed date at build time.

## Footer

The footer shows the version, revision and commit date of what is running. The flake passes them to the build, which has no access to git.
