---
title: CV en code
summary: Mes CV en Typst (template brilliant-cv), compilés par Nix. Mêmes entrées, même PDF, sans installation de LaTeX ni de polices.
order: 3
art: page
paper: green
stack: [Typst, brilliant-cv, Nix]
facts:
  - [Source, "Typst, template brilliant-cv 4.1.0 non modifié"]
  - [Build, "nix build .#en / .#fr : un paquet Nix par CV et par langue"]
  - [Dépendances, "paquets Typst vendorés en dérivations à sortie fixe, polices épinglées"]
  - [Variantes, "un CV général (FR/EN) et des CV adaptés par offre, générés par script"]
  - [Aperçu, "nix run .#watch-en : recompile à chaque sauvegarde"]
---

## Principe

Chaque CV est un projet brilliant-cv : `cv.typ` choisit un profil à la compilation (`--input profile=fr` ou `en`) et importe les fichiers `.typ` du profil (résumé, expérience, formation, compétences). Le contenu est du texte presque brut.

## Reproductible

Typst télécharge normalement ses paquets `@preview` au moment de la compilation. Ici, brilliant-cv et fontawesome sont récupérés une fois par Nix (dérivations à sortie fixe, hash vérifié), et les polices (Roboto, Source Sans 3, Font Awesome) viennent de nixpkgs. Le build fonctionne hors ligne et donne toujours le même PDF.

Les PDF de ce site sont ceux produits par ce build.
