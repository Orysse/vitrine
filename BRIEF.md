# Brief Architectural & Fonctionnel — Vitrine (v1.0)

Ce document traduit `PRODUCT.md` et `DESIGN.md` en spécifications concrètes d'arborescence, de pages, de composants et d'interactions pour la refonte du portfolio d'Abel Chartier.

---

## 1. Positionnement & Synthèse du Concept

- **Sujet** : Portfolio d'ingénierie Systèmes, Réseaux, Infrastructure & Sécurité (SysOps / DevSecOps) d'Abel Chartier (EPITA 5A SRS, Contributeur La Forge, recherche de stage pour février 2027).
- **Mouvement directeur** : **Brutalisme Ingénieur × Minimalisme Chirurgical** (*Oxide Computer × Hara Design Institute × Stripe Press*).
- **Principe directeur** : Traiter le portfolio non pas comme une page promotionnelle, mais comme un **manuel de spécification et d'architecture vivant**, servi directement par l'infrastructure qu'il documente.
- **Unité** : Un seul châssis visuel, monochrome strict (`#FFFFFF` / `#0A0A0A`), `0px` de rayon de bordure, grille exposée de `1px`, aéré par l'espace négatif de Hara.

---

## 2. Arborescence Multi-Pages (Les 4 Pôles + Fiches)

Fini le défilement unique interminable. Le site est découpé en **4 pôles indexés** (`[01]` à `[04]`), chacun ayant un rôle précis et une parité totale FR / EN :

| Index | Route FR | Route EN | Mode Impeccable | Rôle & Contenu |
|---|---|---|---|---|
| **`[01]`** | `/` | `/en/` | *Experience / Persuade* | **Index & Manifeste** : Identité, disponibilité (stage fév. 2027), accès immédiat au CV PDF / Contact / GitHub, **Artefact Isométrique CAD manipulable** de la pile Homelab en direct, et table d'aiguillage vers les 3 systèmes et le parcours. |
| **`[02]`** | `/systemes/` | `/en/systems/` | *Read / Operate* | **Matrice des Systèmes** : Vue comparative et filtrable des 3 systèmes (`homelab`, `config`, `vitrine`) + emplacement prévu pour de futurs *write-ups / ADR*. Compare les choix d'architecture, les invariants de sécurité et les stacks. |
| **`[02.x]`** | `/systemes/[slug]/` | `/en/systems/[slug]/` | *Read / Operate* | **Fiches de Spécification Système** (`homelab`, `config`, `vitrine`) : Table de faits (`facts`), décisions distinctives (`highlights`), inspecteur de topologie interactif et documentation technique complète. |
| **`[03]`** | `/parcours/` | `/en/resume/` | *Read* | **Parcours, Compétences & CV** : Expériences (La Forge, CEA, Kleis), Formation (EPITA SRS, ITS Surabaya), Associations (La Paillasse, Antre), Matrice de compétences techniques indexée par domaine, Intérêts, téléchargement CV PDF et **feuille d'impression A4 (`@media print`)**. |
| **`[04]`** | `/colophon/` | `/en/colophon/` | *Read* | **Colophon & Spécifications d'Exécution** : Détails reproductibles du build Nix (`flake.nix`, version, hash git, date du commit), politique CSP exacte de `nginx.conf`, index des raccourcis clavier, et accès discret vers l'easter egg `/303/`. |
| *(Extra)* | `/303/` | `/en/303/` | *Operate* | **VTR-303** : Émulateur TB-303 en AudioWorklet conservé à l'identique comme easter egg caché. |
| *(Fallback)* | `/404.html` | `/404.html` | *Operate* | **404 Système** : Diagnostic de route introuvable dans le châssis monochrome avec retour indexé `[01]`–`[04]`. |

### Redirections de compatibilité (`nginx.conf` / routes)
- `/homelab/` et `/projets/homelab/` → `/systemes/homelab/` (et équivalents `/en/projects/...` → `/en/systems/...`, ou maintien de `/projets/[slug]/` en alias/redirection propre pour ne casser aucun lien existant).

---

## 3. Anatomie détaillée pôle par pôle

### Pôle `[01]` — Index (`/`, `/en/`)
Doit tenir l'essentiel dès le premier viewport sur desktop, sans noyer le visiteur :
1. **Cellule d'Identité & Statut (Gauche, 5 colonnes)** :
   - Cotes : `REF: AC-2027 // PARIS, FR`
   - Nom & Titre : `Abel Chartier` — Étudiant ingénieur 5e année à l'EPITA (Majeure Systèmes, Réseaux et Sécurité), Contributeur à La Forge.
   - Bandeau d'objectif : **Recherche de stage de fin d'études à partir de février 2027 (Infrastructure, Systèmes, Sécurité)**.
   - **Barre d'actions primaires** (boutons rectangulaires `1px` à inversion franche) :
     - `[TÉLÉCHARGER CV (FR.PDF)]` / `[EN.PDF]`
     - `[ABEL.CHARTIER@GMAIL.COM]`
     - `[GITHUB.COM/ORYSSE]`
2. **Cellule d'Artefact Technique (Droite, 7 colonnes)** :
   - **L'Artefact CAD Isométrique Manipulable** : Représentation filaire `1px` des 6 couches réelles qui servent la page (`01 Ce site nginx:65534` → `06 Matériel NUC10i7FNH`).
   - Contrôles directs en bas de cellule : angle/explosion (`[ÉCLATÉ]` / `[COMPACT]` + rotation drag/clavier) et lecteur d'invariant de la couche sélectionnée.
3. **Registre Sommaire des Systèmes (Bas d'Index, 12 colonnes)** :
   - Table numérotée `02.1 Homelab`, `02.2 Config NixOS`, `02.3 Vitrine` avec pour chacun : le résumé en 1 phrase, les 3 choix d'ingénierie qui le distinguent (en mode `SYNTHÈSE`) ou la matrice complète des faits (en mode `SPEC BRUTE`), et le lien vers la fiche `[LIRE LA SPÉCIFICATION]`.

### Pôle `[02]` — Systèmes (`/systemes/`, `/systemes/[slug]/`)
1. **Vue d'ensemble (`/systemes/`)** :
   - Présente chaque projet sous forme de **fiche d'ingénierie normalisée** :
     - En-tête : Index (`SYS-01`, `SYS-02`, `SYS-03`), Titre, Lien dépôt GitHub vérifié.
     - **Ce qui est différent (`Highlights`)** : Grillé en 2 colonnes de décisions techniques factuelles (ex: *VMs sans disque en tmpfs*, *Rollback automatique deploy-rs*, *Monitoring hors-cluster*, *Réseau Cilium tout refusé par défaut*, *Mots de passe dynamiques OpenBao*).
     - **Matrice des Faits (`Facts`)** : Table clé/valeur en monospace/sans-serif (visible intégralement en mode `SPEC BRUTE`, condensée en mode `SYNTHÈSE`).
   - Prévoit une section structurelle `NOTES & DÉCISIONS D'ARCHITECTURE (ADR)` prête à recevoir de futurs articles techniques Markdown.
2. **Fiche dédiée (`/systemes/[slug]/`)** :
   - Colonne gauche (4 cols, sticky sur desktop) : Sommaire des sections Markdown, table `facts` complète, stack technique en liste tabulaire, lien direct vers le dépôt GitHub, navigation inter-systèmes (`← PRÉC / SUIV →`).
   - Colonne droite (8 cols) : Les `highlights` mis en exergue dans une grille `1px`, le schéma d'architecture interactif du système (pour `homelab` et `config`), puis le corps technique complet issu de `src/content/projects/{fr,en}/*.md`.

### Pôle `[03]` — Parcours (`/parcours/`, `/en/resume/`)
Structuré comme une **datasheet biographique** à double vitesse :
1. **En-tête d'export** : Rappel du statut, langues parlées (`Français natif · Anglais professionnel TOEIC 970`), liens directs vers `ABEL_CHARTIER_CV_fr.pdf` et `ABEL_CHARTIER_CV_en.pdf`, et bouton `[IMPRIMER / A4]`.
2. **Section `03.1 EXPÉRIENCES`** (`src/content/experience.yaml`) :
   - Entrées : **La Forge — EPITA** (Contributeur étudiant, depuis fév. 2026), **CEA** (Stagiaire, été 2025), **Kleis Technology** (Stagiaire, fin 2023).
   - En mode `SYNTHÈSE` : organisation, rôle, dates, lieu, stack et point principal.
   - En mode `SPEC BRUTE` : intégralité des points techniques détaillés.
3. **Section `03.2 FORMATION`** (`src/content/education.yaml`) :
   - **EPITA** (Majeure SRS : réseau avancé OSPF/BGP, durcissement AD, sécu offensive/reverse, crypto/PKI, SOC/SIEM) et **ITS Surabaya** (semestre d'échange).
4. **Section `03.3 MATRICE DE COMPÉTENCES`** (`src/content/skills.yaml`) :
   - Grille tabulaire stricte à 6 lignes (`Langages`, `Infrastructure`, `Écosystème Nix`, `CI/CD`, `Observabilité`, `Réseau et sécurité`) sans barres de pourcentage absurdes.
5. **Section `03.4 ASSOCIATIONS & INTÉRÊTS`** (`associations.yaml`, `interests.yaml`) :
   - La Paillasse (Vice-trésorier, responsable technique), Antre (Trésorier), Zythologie, Homelab.

### Pôle `[04]` — Colophon (`/colophon/`, `/en/colophon/`)
La preuve d'ingénierie réflexive du site :
1. **Identité de Build** (`src/build.ts`) : Version semver (`package.json`), révision git (`VITRINE_REV`), date du commit (`VITRINE_DATE`), image OCI (`ghcr.io/orysse/vitrine`).
2. **Chaîne de Production & Sécurité** :
   - Reproductibilité Nix (`buildNpmPackage`, `importNpmLock`, `dockerTools.buildLayeredImage`).
   - Exécution non privilégiée (`User 65534:65534`, rootfs en lecture seule, écriture restreinte à `/tmp`).
   - Affichage in-situ de l'en-tête `Content-Security-Policy` servi par `nginx.conf`.
3. **Manuel des Commandes Clavier** : Table de référence de tous les raccourcis disponibles sur le site.
4. **Registre Typographique & Graphique** : Spécimen en direct de `Geist Variable`, `Geist Mono Variable`, et de la polarité monochrome (`#FFFFFF` / `#0A0A0A`).
5. **Annexe Audio** : Mention sobre et lien vers l'unité `/303/` (VTR-303 AudioWorklet).

---

## 4. Spécification des 4 Signatures Interactives (JS `'self'`)

Tous les scripts sont compilés par Astro/Vite dans des bundles externes (`script-src 'self'`), sans aucun attribut `onclick` ni `<script>` inline pour respecter la CSP stricte.

| # | Signature | Comportement sans JS (SSR/Statique) | Comportement avec JS (`'self'`) |
|---|---|---|---|
| **1** | **Navigation Clavier Système** | Liens HTML standards accessibles via `Tab` / `Entrée`. | Raccourcis globaux : `1`–`4` (pôles), `d` (densité), `i` (inversion `[INV]`), `l` (langue FR/EN), `j`/`k` (couche/entrée suivante ou précédente), `?` (modale d'aide clavier). Indicateurs `[1]`..`[4]` visibles dans le châssis. |
| **2** | **Toggle de Densité (`SYNTHÈSE` / `SPEC BRUTE`)** | Toutes les informations essentielles sont présentes dans le DOM (ou via `<details>` natifs). | Bascule instantanément `document.documentElement.dataset.density` entre `summary` et `spec` (persisté dans `localStorage`), déployant ou condensant toutes les matrices de faits et détails d'implémentation avec compteur d'éléments dépliés. |
| **3** | **Inspection Interactive d'Architecture** | Le diagramme SVG et la liste complète des 6 couches (`src/homelab.ts`) sont rendus côte à côte et lisibles. | Cliquer une couche du SVG, survoler une ligne ou utiliser `j`/`k` verrouille la couche, inverse son contraste dans le SVG, met en évidence ses dépendances et affiche sa fiche d'invariant (fichier Nix/Flux source, rôle, politique de sécurité). |
| **4** | **Artefact Géométrique / CAD Manipulable** | Rendu SVG isométrique vectoriel net à l'angle canonique (30°/60°). | Permet de manipuler la projection (rotation horizontale/inclinaison au glisser-déposer ou via molettes/boutons `[ISOMÉTRIQUE / PLAN / COUPE Z]`, ajustement de l'écartement vertical des plaques) en recalculant proprement les coordonnées SVG ou les transformations géométriques, dans le respect de `prefers-reduced-motion`. |

---

## 5. Critères d'Acceptation (Checklist avant implémentation)

1. **Isolation vérifiée** : L'ancien front vit dans `archive/v0.12/` et n'influence ni le style ni les composants de la nouvelle version.
2. **Conformité CSP & Nix** : Zéro style ou script inline ; `astro check && astro build` et `nix flake check` passent sans erreur.
3. **Zéro dérive esthétique** : Uniquement `#FFFFFF`, `#0A0A0A` et nuances de gris neutres ; `0px` de border-radius ; aucun tiret cadratin (`—`) ni demi-cadratin (`–`) dans les textes FR/EN.
4. **Double vitesse validée** : En mode `SYNTHÈSE`, chaque pôle se scanne en moins de 30 secondes avec au moins 35 % d'espace négatif ; en mode `SPEC BRUTE`, toute la profondeur technique d'Abel est exposée.
