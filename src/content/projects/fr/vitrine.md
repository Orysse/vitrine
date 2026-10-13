---
title: vitrine
summary: Ce site. Un CV en pages statiques, construit par Nix et servi depuis le homelab.
order: 3
repo: https://github.com/Orysse/vitrine
stack: [Astro, Tailwind CSS, Nix, nginx, GitHub Actions, Renovate, Flux]
facts:
  - [Build, "Astro statique, nix build pour le site et l'image OCI"]
  - [Image, "nginx non privilégié (65534), racine en lecture seule, écrit seulement dans /tmp"]
  - [CSP, "scripts, styles et polices du site seulement, rien d'inline"]
  - [Livraison, "tag vX.Y.Z, image sur ghcr.io, Renovate puis Flux dans homelab-cluster"]
highlights:
  - title: Un build reproductible
    text: "nix build produit le site et l'image OCI. La version vient de package.json, la révision et la date du commit."
  - title: Une CSP stricte
    text: "Scripts, styles et polices viennent du site seulement, rien n'est inline. Aucune requête vers un autre domaine, sauf la mesure d'audience hébergée dans le homelab."
  - title: Une image non privilégiée
    text: "nginx tourne en utilisateur 65534, avec une racine en lecture seule, et n'écrit que dans /tmp."
  - title: Du tag à la prod
    text: "Un tag vX.Y.Z publie l'image sur ghcr.io. Renovate ouvre la mise à jour dans homelab-cluster, Flux l'applique une fois fusionnée."
---

## Contenu

Le contenu vit dans des fichiers YAML et Markdown, une entrée par élément, chaque texte en français et en anglais. Les schémas refusent une traduction manquante ou une date mal formée au build.

## Pied de page

Le pied de page affiche la version, la révision et la date du commit de ce qui tourne. Le flake les passe au build, qui n'a pas accès à git.
