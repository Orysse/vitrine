---
title: This site
summary: Static Astro + Tailwind site, built by Nix into an nginx OCI image, deployed to the homelab by Flux.
order: 4
art: flake
paper: blue
repo: https://github.com/Orysse/vitrine
stack: [Astro, TypeScript, Tailwind CSS, Nix, nginx, Flux]
facts:
  - [Front, "Astro (static output), typed content collections, Tailwind CSS"]
  - [Effects, "2D canvas (grounds, halftones), SVG filter, Web Audio; the site works without JS"]
  - [Build, "Nix (buildNpmPackage), OCI image with dockerTools"]
  - [Server, "non-root nginx, read-only filesystem, strict CSP"]
  - [Deploy, "vX.Y.Z tag → ghcr.io image → Renovate → Flux"]
---

## Content

Content is kept apart from layout: experience, education, skills and interests are YAML files validated by a schema (Astro content collections), and each project is one Markdown file per language.

## Image

`nix build .#image` produces an OCI image with nginx and the site, without a package manager or a shell. nginx runs as an unprivileged user, writes only to `/tmp` and sends a Content-Security-Policy that only allows the site's own resources. The footer shows the pod that served the page (server-side includes) and the version.

## Deploy

A `vX.Y.Z` tag makes CI publish `ghcr.io/orysse/vitrine:X.Y.Z`. Renovate opens the bump in `homelab-cluster`, and Flux applies it once merged.
