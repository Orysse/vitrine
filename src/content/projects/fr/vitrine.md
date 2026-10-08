---
title: Ce site
summary: Site statique Astro + Tailwind, construit par Nix en image OCI nginx, déployé dans le homelab par Flux.
order: 4
art: flake
paper: blue
repo: https://github.com/Orysse/vitrine
stack: [Astro, TypeScript, Tailwind CSS, Nix, nginx, Flux]
facts:
  - [Front, "Astro (sortie statique), collections de contenu typées, Tailwind CSS"]
  - [Effets, "canvas 2D (fonds, trames), filtre SVG, Web Audio ; le site marche sans JS"]
  - [Build, "Nix (buildNpmPackage), image OCI avec dockerTools"]
  - [Serveur, "nginx non root, système de fichiers en lecture seule, CSP stricte"]
  - [Déploiement, "tag vX.Y.Z → image ghcr.io → Renovate → Flux"]
---

## Contenu

Le contenu est séparé de la mise en page : expériences, formation, compétences et centres d'intérêt sont des fichiers YAML validés par un schéma (collections de contenu Astro), et chaque projet est un fichier Markdown par langue.

## Image

`nix build .#image` produit une image OCI avec nginx et le site, sans gestionnaire de paquets ni shell. nginx tourne en utilisateur non privilégié, écrit seulement dans `/tmp` et envoie une Content-Security-Policy qui n'autorise que les ressources du site lui-même. Le pied de page indique le pod qui a servi la page (server-side includes) et la version.

## Déploiement

Un tag `vX.Y.Z` fait publier `ghcr.io/orysse/vitrine:X.Y.Z` par la CI. Renovate ouvre la mise à jour dans `homelab-cluster`, et Flux l'applique une fois fusionnée.
