# Brief Architectural & Fonctionnel — Vitrine

## 1. Positionnement & Ton

- **Sujet** : Portfolio personnel et CV d'Abel Chartier (Étudiant ingénieur en 5e année à l'EPITA, majeure Systèmes, Réseaux, Sécurité & Infrastructure ; contributeur à La Forge), ouvert aux opportunités de stage de fin d'études (6 mois) à partir de février 2027.
- **Ton éditorial** :
  - Des textes fluides, honnêtes et personnels (écrits à la première personne, sans jargon promotionnel, sans listes à puces envahissantes et sans boîtes `<code>` au milieu des phrases).
  - Raconter le « pourquoi » : la passion pour Nix, l'envie de transformer son serveur et son ThinkPad en véritable terrain de jeu d'infrastructure plutôt qu'en environnement de production figé, et les choix radicaux qui en découlent (`tmpfs` sans disque, supervision hors du cluster, abandon de `home-manager` au profit de `nix-wrapper-modules`).
- **Direction visuelle** :
  - Inspirée directement de **`hara.ndc.co.jp/en/about/`** et **`nendo.jp/en/about/`** : fond blanc pur (`#ffffff`), police **IBM Plex Sans**, typographie plate à `16px` sans relief inutile, titres simplement plus gras (`600`) décalés sur le cadre large (`1280px`), et colonne centrale de lecture de `600px` (`line-height: 1.95`).

---

## 2. Structure & Pages

1. **`À PROPOS` (`/`, `/en/`)** :
   - Texte continu à la première personne présentant le parcours d'Abel (EPITA, La Forge, stages CEA Saclay et RedPill Group), sa passion pour Nix et sa philosophie de laboratoire d'infrastructure.
   - Deux sections d'aperçu à la manière de la page d'accueil de Hara (`HOMELAB` et `CONFIG NIXOS`, filet `1px solid #c8c8c8` pleine largeur avec lien `LIRE →` à droite et résumé dans la colonne centrale de `600px`).
   - Grille monochrome des technologies maîtrisées (`TechWall.astro`, inspirée de la section *client* de `nendo.jp/en/about/`).
   - Aucun diagramme ni CV complet sur la page d'accueil.
2. **`HOMELAB` (`/systemes/homelab/`, `/en/systems/homelab/`)** :
   - Récit fluide sur la conception du homelab NixOS + k3s, accompagné d'un unique schéma linéaire épuré sans cadre (`VmFlow.astro`) et d'une fiche récapitulative sobre en bas de page (style *Credits* de Hara).
3. **`CONFIG NIXOS` (`/systemes/config/`, `/en/systems/config/`)** :
   - Récit fluide sur la configuration du ThinkPad (racine `tmpfs`, `nix-wrapper-modules` sans `home-manager`, démarrage verrouillé `lanzaboote` + `TPM2` + `YubiKey`), accompagné d'un unique schéma linéaire épuré (`Impermanence.astro`) et d'une fiche récapitulative en bas de page.
4. **`CV` (`/parcours/`, `/en/resume/`)** :
   - Page dédiée synchronisée à 100 % avec le CV Typst (`~/Documents/Perso/CV_ABEL/cv/`), avec lien direct de téléchargement du PDF (`ABEL_CHARTIER_CV_fr.pdf` / `ABEL_CHARTIER_CV_en.pdf`) et la grille monochrome des technologies.
5. **En-tête et Pied de page** :
   - En-tête blanc incrusté sans bordure avec sélecteur `FR | EN` style Hara.
   - Pied de page épuré avec liens sociaux (`GITHUB`, `EMAIL`) à gauche et `© Abel Chartier` à droite.
