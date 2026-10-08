---
title: CV as code
summary: My CVs in Typst (brilliant-cv template), built by Nix. Same inputs, same PDF, no LaTeX or font install.
order: 3
art: page
paper: green
stack: [Typst, brilliant-cv, Nix]
facts:
  - [Source, "Typst, unmodified brilliant-cv 4.1.0 template"]
  - [Build, "nix build .#en / .#fr: one Nix package per CV and language"]
  - [Dependencies, "Typst packages vendored as fixed-output derivations, pinned fonts"]
  - [Variants, "a general CV (FR/EN) and per-posting tailored CVs, scaffolded by a script"]
  - [Preview, "nix run .#watch-en: recompiles on every save"]
---

## How it works

Each CV is a brilliant-cv project: `cv.typ` picks a profile at compile time (`--input profile=fr` or `en`) and imports that profile's `.typ` files (summary, experience, education, skills). The content is close to plain text.

## Reproducible

Typst normally downloads its `@preview` packages at compile time. Here, brilliant-cv and fontawesome are fetched once by Nix (fixed-output derivations, checked hash), and the fonts (Roboto, Source Sans 3, Font Awesome) come from nixpkgs. The build works offline and always produces the same PDF.

The PDFs on this site are the output of that build.
