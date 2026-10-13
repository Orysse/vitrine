# vitrine.abe.lc : le pitch (0.9.0)

## En une phrase

Une page par sujet, chacune dans son propre univers, reliées par un fil qui ne bouge pas :
on parle de moi sur l'accueil, et chaque projet montre son architecture, brique par brique,
avec les vrais logos et le rôle de chaque pièce.

## Principes

- **Droit au but.** Seulement ce qui est utile à un recruteur ou à un ingénieur qui lit.
  Pas de scroll infini : chaque page tient en peu d'écrans et traite un seul sujet.
- **Une archi par page.** Chaque projet est présenté par son architecture, en couches, du
  haut (ce qu'on voit) au bas (la machine). Chaque brique a son logo et une phrase qui dit à
  quoi elle sert ici, plus son chemin dans le dépôt.
- **Des changements d'univers.** Chaque page a sa palette, son fond et sa typographie.
  Le fil en haut de page (une ligne de métro : Abel, Homelab, Config, 303) reste en place
  pendant la transition. Il marque la page courante et garde la trace des pages déjà vues.
- **De vraies images.** Logos officiels des projets, photos réelles des machines (Wikimedia,
  créditées). Rien n'est chargé depuis un autre domaine.
- **Le texte vient du propriétaire.** Les phrases des briques reprennent les pages projet et
  les dépôts ; chaque chiffre est vrai.

## Pages

| Page | Univers | Contenu |
|---|---|---|
| `/` Abel | papier chaud, suit le thème clair ou sombre | qui, disponibilité, maintenant, CV, expériences (dépliables, outils avec logos), projets en cartes, formation, compétences |
| `/projets/homelab/` | plan d'architecte bleu nuit, titres en mono | photo du NUC, architecture en 6 couches (machine, hôte, microVMs, cluster, plateforme, applications), détail dépliable |
| `/projets/config/` | Everforest Dark Medium, le thème du laptop | photo du ThinkPad, architecture du flake (machine, disque et démarrage, système, flake, programmes) |
| `/303/` | argent du panneau | la TB-303, en easter egg sur le fil |

## Interaction

- Survoler, focus clavier ou toucher une brique affiche sa fiche dans le panneau ; le lien
  `#brique` est partageable.
- Sans JavaScript, toutes les fiches sont listées et chaque brique y mène par une ancre.
- Les transitions entre pages utilisent les View Transitions en CSS seul
  (`@view-transition`), désactivées avec `prefers-reduced-motion`.
- Expériences dépliables avec `<details>`, ouvertes à l'impression.

## Technique

- Astro, Tailwind, le flake Nix, l'image nginx et la CSP restent inchangés.
- Logos : `simple-icons` au build (SVG inline), sinon PNG tirés des dépôts des projets dans
  `public/logos/` (crédits dans `CREDITS.md`).
- Données d'architecture : `src/arch.ts`, une entrée par brique, avec son chemin dans le dépôt.
- JavaScript : un seul petit script pour le panneau des architectures, et la 303 sur sa page.

## Versionnage

0.8.0 est publiée. Cette refonte ajoute des pages et des fonctions : **0.9.0**, sur la branche
`universes`, puis `main`, tag `v0.9.0`.
