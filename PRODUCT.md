# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical recruiters, infrastructure engineers, SREs, DevSecOps engineers, and engineering leads evaluating Abel Chartier (5th-year engineering student at EPITA, Systems, Networks, Security & Infrastructure major; contributor at La Forge) for a 6-month end-of-studies internship starting February 2027.

## Product Purpose

`vitrine.abe.lc` is Abel Chartier's personal website and CV. It pairs an honest, fluid narrative about his passion for Nix and why he built his homelab and workstation as an infrastructure playground with a dedicated CV page synced 1:1 with his Typst resume (`~/Documents/Perso/CV_ABEL/cv/`).

## Operating Context

- **About / Home (`/`, `/en/`)**: Offset title, 4-paragraph personal narrative in a `600px` central column, two Hara-style project teasers (`Homelab`, `Config NixOS`), and a nendo-style monochrome technology wall. No diagrams and no full CV dump on the home page.
- **Project essays (`/systemes/homelab/`, `/systemes/config/`, `/en/systems/homelab/`, `/en/systems/config/`)**: Flowing first-person essays with zero README/documentation clutter, 1 frameless `1px` line diagram per project, and a quiet specification block at the bottom.
- **CV page (`/parcours/`, `/en/resume/`)**: Complete curriculum vitae synced with `CV_ABEL`, PDF download link, and monochrome technology wall.
- **Bilingual parity**: French by default (`/`), English under `/en/`, switched via Hara's `FR | EN` header control.

## Capabilities and Constraints

- **Stack**: Static Astro site, Tailwind CSS v4, TypeScript, packaged reproducibly via Nix Flakes (`flake.nix`).
- **Strict Content Security Policy (CSP)**: `default-src 'none'; script-src 'self' https://pulse.abe.lc; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://pulse.abe.lc; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. No inline styles, no inline scripts, no external CDN requests.
- **Operational Security (OPSEC)**: Never expose private LAN IP addresses, internal ports, private subdomains, or VPN endpoints on public pages.
- **No Em/En Dashes**: Never use `—` or `–` in prose or UI labels.
