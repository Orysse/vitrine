# Refonte de vitrine.abe.lc : le pitch

## En une phrase

Un portfolio d'ingénieur systèmes qui se lit comme une bonne doc : du texte net, des faits
vérifiables, et un site qui prouve lui même ce qu'il raconte (servi par le homelab qu'il décrit,
versionné, reproductible).

## Le parti pris

Pour un profil sysops/devops, le site est déjà une pièce du dossier. Un recruteur technique
regarde moins la mise en scène que le soin : temps de chargement, accessibilité, en têtes HTTP,
lisibilité sans JavaScript, propreté du dépôt. Le meilleur effet est donc l'absence d'effets, et
le seul « moment » de la page est une preuve : le schéma du homelab qui sert la page, et la
version exacte de ce qui tourne.

On abandonne la pile 3D Three.js de la version précédente du pitch. Elle coûtait une
bibliothèque de plusieurs centaines de ko, un îlot WebGL, un repli image et un ressort
d'animation pour dire six lignes de texte. Le même contenu tient dans un schéma SVG statique.

## Références

| Ce qu'on prend | Où le voir |
|---|---|
| Une colonne, du texte, du gris pour le secondaire | [danluu.com](https://danluu.com), [mitchellh.com](https://mitchellh.com), [paco.me](https://paco.me) |
| Le factuel : valeurs précises en mono, fiches plutôt qu'adjectifs | [oxide.computer](https://oxide.computer) (sans le néon) |
| Le site qui documente sa propre infra | [fly.io/blog](https://fly.io/blog), les pages « colophon » des sites perso |

## Ce qu'on ne fait pas

- Pas de 3D, de canvas, de fond animé, de curseur custom, de défilement détourné.
- Pas de tics « éditorial généré » : libellés mono en majuscules partout, filets sur chaque
  bloc, grilles de tuiles de chiffres, badges de compétences avec pourcentages.
- Pas de terminal factice ni de faux prompt `$ whoami` : c'est le cliché du genre.
- Pas d'autopromotion ni de phrase d'accroche inventée. Tout le texte vient du propriétaire,
  tout chiffre est vrai et sourcé.
- Pas d'exposition de surface d'attaque : ni IP, ni port, ni sous domaine interne, ni détail
  VPN sur les pages publiques.

## Forme

- **Mise en page.** Une colonne d'environ 38rem, alignée à gauche, beaucoup d'air. Une seule
  page d'accueil qui tient en deux écrans, plus une page par projet.
- **Typographie.** Deux familles seulement : une sans pour le texte (Geist ou IBM Plex Sans,
  16px) et sa mono pour les valeurs, dates, versions et noms d'outils. Trois tailles au plus.
  La hiérarchie passe par la graisse et la couleur. Polices auto hébergées via Fontsource,
  en sous ensemble latin, `font-display: swap`.
- **Couleur.** Neutres en thème clair et sombre (via `prefers-color-scheme`), une seule
  couleur d'accent pour les liens et le focus. Aucune couleur qui ne tienne que dans un thème.
- **Listes.** Expériences et projets en lignes : intitulé, organisation en gris, période en mono
  à droite. Une ligne de projet mène à sa page.
- **Faits.** Les détails techniques en fiches clé/valeur (`<dl>`) en mono, seulement sur les
  pages projet.
- **Soin.** `text-wrap: balance` sur les titres, chiffres tabulaires, focus visible, liens
  soulignés, contraste AA partout.
- **Impression.** Une feuille `@media print` qui fait de la page d'accueil un CV d'une page
  propre (sans navigation, URL des liens affichées). Les PDF du CV restent la référence.

## Contenu

Le propriétaire tranche ; squelette proposé :

1. **En tête.** Nom, une ligne (statut, majeure, ville), la recherche de stage à partir de
   février 2027. Liens : GitHub, CV FR, CV EN, contact.
2. **Maintenant.** La Forge, en une ou deux phrases.
3. **Expérience.** Lignes, avec les points du CV dépliables (`<details>`, sans JS).
4. **Projets.** Homelab, config Nix, ce site. Une page de détail chacun (le Markdown de
   `src/content/projects/` convient), avec fiche technique et lien vers le dépôt.
5. **Formation, compétences, à côté.** Courts, en bas.
6. **Pied de page, le colophon.** Voir plus bas.

La TB-303 (`/303/`) reste en easter egg, liée discrètement depuis le pied de page.

## La preuve : le homelab et le colophon

### Le schéma du homelab

Sur la page du projet Homelab (et en vignette sur l'accueil), un schéma en couches, de bas en
haut, en SVG inline généré au build :

| Couche | Fait |
|---|---|
| Matériel | Intel NUC10i7FNH, 12 threads, 16 Go |
| Hôte | NixOS, déployé par deploy-rs avec rollback |
| microVMs | 3 × qemu (microvm.nix), racine en tmpfs |
| Cluster | k3s, Cilium |
| Plateforme | Flux, OpenBao, Pocket-ID |
| Ce site | nginx non privilégié, 2 répliques |

- Les valeurs vivent dans un seul fichier (`src/homelab.ts`), avec en commentaire la source
  exacte dans `homelab-nix` (`docs/facts.md`) et `homelab-cluster` (`apps/vitrine`). Pas de
  récupération réseau au build : le build Nix est en bac à sable et doit rester reproductible.
- Le SVG est accessible (`<title>`, `<desc>`) et doublé d'une liste HTML des couches. Survol et
  focus d'une ligne de la liste mettent la couche en évidence, en CSS seul (`:has()`), sans JS.
- Il hérite des couleurs du thème (`currentColor`, variables CSS) : rien à exporter deux fois.

### Le colophon

En pied de page, en mono, quelques lignes générées au build et toujours vraies :

```
vitrine 0.8.0 · a1b2c3d · construit le 2026-10-20
Astro, Nix, nginx · servi par k3s sur un NUC à la maison
source : github.com/Orysse/vitrine
```

- Version lue dans `package.json`, révision git passée par le flake (`self.shortRev`, déjà
  calculé pour le label de l'image), date de build déterministe (date du commit, pas
  l'horloge, pour garder le build reproductible).
- Le numéro de version mène au tag GitHub correspondant.

## Technique

- **Base.** On garde Astro, Tailwind, le flake Nix, l'image nginx et la CI actuels.
- **On retire.** Grounds, halftones, trip slider, filtre SVG de déplacement, les cinq polices
  actuelles (Familjen Grotesk, Instrument Serif, Shrikhand, Special Elite, Plex Mono) et
  `public/img/` si les photos ne servent plus. Les scripts du VTR-303 restent, chargés
  uniquement sur `/303/`.
- **JavaScript.** Zéro sur les pages de contenu, en dehors d'Umami. Tout interactif passe par
  HTML et CSS (`<details>`, `:has()`, `:target`).
- **CSP.** Inchangée (`script-src 'self' https://pulse.abe.lc`, `style-src 'self'`, rien
  d'inline). Les attributs `style` sont interdits dans le HTML généré, le SVG compris.
- **i18n.** FR par défaut, EN sous `/en/`, comme aujourd'hui. Les schémas de contenu refusent
  une traduction manquante.
- **Budgets.** Page d'accueil sous 100 ko transférés polices comprises, 0 ko de JS propre,
  LCP sur le texte. Lighthouse 100 en accessibilité, 95 ou plus ailleurs.
- **Redirections.** Toute URL publiée qui disparaît reçoit un 301 dans `nginx.conf`, comme
  `/homelab/` aujourd'hui.

## Versionnage et livraison

La refonte change l'apparence et retire des fonctions, sans casser d'URL : c'est une mineure,
**0.8.0**. On garde 1.0.0 pour le jour où le contenu et la forme sont jugés stables.

1. Branche `redesign` depuis `main`. Commits petits et lisibles, dans cet ordre : nettoyage
   (retrait des effets et polices), nouvelle base typographique et thèmes, accueil, pages
   projet, schéma du homelab, colophon, impression.
2. Chaque push passe la CI existante (`nix flake check`, `nix build .#image`), donc le site
   se construit à chaque étape. Vérification locale avec `nix run .#preview` (vraie CSP).
3. Fusion dans `main`, puis `version: "0.8.0"` dans `package.json`, commit
   `Vitrine 0.8.0: sober redesign, homelab diagram, colophon`, tag `v0.8.0`, push avec
   `--follow-tags`.
4. La CI publie `ghcr.io/orysse/vitrine:0.8.0` et `:0.8`. Renovate ouvre le bump dans
   `homelab-cluster` (`apps/vitrine`), Flux l'applique une fois fusionné.
5. Les corrections après mise en ligne sortent en 0.8.1, 0.8.2… Le choix patch ou mineure se
   fait avant de tagger : un tag ne se déplace jamais.
6. Un `CHANGELOG.md` court, une entrée par tag, reprend les messages de release.

## Critères d'acceptation

- [ ] Toutes les pages se lisent et se naviguent entièrement sans JavaScript.
- [ ] Aucune requête vers un autre domaine que le site et `pulse.abe.lc`.
- [ ] La CSP actuelle passe sans exception (console vide), sur `nix run .#preview`.
- [ ] Thèmes clair et sombre lisibles, contraste AA, focus visible au clavier partout.
- [ ] Aucun défilement horizontal à 360px de large.
- [ ] L'impression de l'accueil tient sur une page A4 lisible.
- [ ] Le colophon affiche la version et la révision réellement déployées.
- [ ] Chaque chiffre du schéma du homelab a sa source notée dans `src/homelab.ts`.
- [ ] Aucune IP, port, sous domaine interne ni détail VPN sur une page publique.
- [ ] Tous les textes viennent du propriétaire, sans tiret cadratin ni demi cadratin.
- [ ] Les anciennes URL répondent (200 ou 301), `/303/` comprise.
- [ ] Image `0.8.0` publiée depuis le tag `v0.8.0`, et rien d'autre ne pousse d'image.
