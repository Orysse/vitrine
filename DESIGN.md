# Design System: Quiet Technical Editorial (Paco × Hara)

## 1. Visual Thesis & Reference World

`vitrine.abe.lc` croise deux références directes choisies pour mettre en valeur le fond technique et les schémas d'architecture :

1. **Paco Coursey (`paco.me`) — Calme Typographique & Colonne de Lecture** :
   Une colonne unique et sobre (`44rem`), des titres à taille humaine (`18px`–`28px`), une hiérarchie portée par les niveaux de gris (`--ink`, `--ink-2`, `--ink-3`) plutôt que par des cadres ou des effets, et une lecture fluide d'un seul tenant.
2. **Hara Design Institute (`hara.ndc.co.jp/en/about/`) — Espace Blanc Chirurgical & Précision** :
   Fond neutre pur (`#FAFAFA` en clair, `#0C0C0C` en sombre, sans teinte beige/crème), respiration généreuse autour du texte, et rigueur éditoriale où rien n'est décoratif.

### Principe Directeur : Contraste entre Texte Calme et Diagrammes Détaillés
- **Le texte ne crie jamais** : pas de titres géants de `150px`, pas d'étiquettes `ALL-CAPS` espacées au-dessus de chaque titre, pas de cartes SaaS.
- **Toute la richesse visuelle est concentrée dans les diagrammes d'architecture SVG** : placés aux endroits clés pour illustrer les mécanismes inhabituels (microVMs `tmpfs` gérées par Nix, flux réseau Kubernetes Cilium eBPF `default-deny` & sécurité OpenBao/Pocket-ID, impermanence `tmpfs` & `nix-wrapper-modules`), ils débordent de la colonne de texte (`64rem`) avec un niveau de détail digne d'une documentation d'ingénierie moderne.

---

## 2. Palette Chromatique (Neutres Purs, Clair & Sombre)

Aucune couleur d'accent artificielle. Toute la hiérarchie repose sur le contraste typographique, les trames vectorielles (hachures diagonales, pointillés, grilles fines) et les nuances de gris neutres.

| Variable CSS | Mode Clair (Hara Paper) | Mode Sombre (Paco Night) | Rôle |
|---|---|---|---|
| `--bg` | `#fafafa` | `#0c0c0c` | Fond de page principal |
| `--bg-2` | `#f2f2f0` | `#141414` | Surface des sous-systèmes dans les diagrammes, blocs `code` |
| `--bg-3` | `#e7e7e4` | `#1e1e1e` | Zones actives, survols discrets, en-têtes de composants SVG |
| `--ink` | `#111111` | `#ededed` | Texte principal, titres, traits primaires des schémas |
| `--ink-2` | `#4a4a4a` | `#a0a0a0` | Texte secondaire, descriptions, notes de diagrammes |
| `--ink-3` | `#767676` | `#686868` | Métadonnées, dates, chemins secondaires, grilles de fond |
| `--line` | `#e4e4e4` | `#222222` | Filets horizontaux `1px`, cadres secondaires |
| `--line-strong` | `#111111` | `#ededed` | Contours d'architecture majeurs, liens soulignés actifs |

---

## 3. Typographie & Échelle

Polices auto-hébergées (`font-src 'self'`) via `@fontsource-variable/geist` et `@fontsource-variable/geist-mono`.

- **`--font-sans` (`Geist Variable`)** : tout le texte courant, les titres, les listes du CV et les synthèses.
- **`--font-mono` (`Geist Mono Variable`, `tabular-nums`)** : réservé aux données techniques (dates, chemins de fichiers Nix, politiques réseau, ports, commandes `nix run`, étiquettes techniques dans les SVGs). Jamais utilisé comme eyebrow décoratif en majuscules.

| Rôle | Police | Taille | Graisse | Interlignage | Usage |
|---|---|---|---|---|---|
| **Nom / Titre de page (`h1`)** | `--font-sans` | `clamp(1.5rem, 2.2vw, 1.85rem)` (`24px`–`30px`) | `600` | `1.2` | Une fois par page, sobre et net |
| **Titre de section (`h2`)** | `--font-sans` | `1.125rem` (`18px`) | `600` | `1.35` | Sections du CV et chapitres des projets |
| **Titre d'entrée (`h3`)** | `--font-sans` | `1rem` (`16px`) | `600` | `1.4` | Postes, projets, points techniques |
| **Corps de texte (`body`)** | `--font-sans` | `0.96875rem` (`15.5px`) | `400` | `1.68` | Lecture longue (`60ch`–`72ch`) |
| **Métadonnées & Code (`mono`)** | `--font-mono` | `0.8125rem` (`13px`) | `400` | `1.5` | Dates alignées à droite, stack, chemins |
| **Annotations SVG** | `--font-mono` | `10.5px` – `12px` | `400` / `500` | `1.3` | Flux, chemins Nix, invariants dans les diagrammes |

---

## 4. Mise en Page & Grille

1. **Colonne de texte (`--col-text: 44rem` / `704px`)** :
   Centrée avec des marges latérales généreuses (`clamp(1.25rem, 5vw, 3rem)`), tout le contenu textuel est aligné à gauche à l'intérieur de cette colonne pour une lecture sans fatigue.
2. **Débordement des diagrammes (`--col-wide: 64rem` / `1024px`)** :
   Les figures d'architecture (`<figure class="diagram-figure">`) s'étendent plus largement que la colonne de texte afin d'exposer clairement les sous-systèmes, les flux réseau et les annotations sans tasser l'information.
3. **Navigation par onglets (Header sobre)** :
   Alignée sur `--col-wide`, une barre fine en haut de page relie directement la page principale (`Abel Chartier`) et les onglets de chaque système (`Homelab`, `Config NixOS`, `Vitrine`), suivis des contrôles discrets (`EN`/`FR`, bascule clair/sombre, `CV.pdf`).

---

## 5. Grammaire des Diagrammes Techniques (SVG Statiques & Détaillés)

Les diagrammes ne sont pas des icônes décoratives : ce sont des **schémas d'architecture complets** construits avec :
- **Hiérarchie de traits** : contours de système en `1.25px solid var(--ink)`, sous-modules en `1px solid var(--line)`, zones éphémères (`tmpfs`) en pointillés (`stroke-dasharray: 4 3`), et flux réseau/données avec flèches directionnelles nettes.
- **Trames vectorielles (`<pattern>`)** : hachures diagonales à `45°` ou grille de points subtile pour différencier visuellement la mémoire volatile (`tmpfs`), le stockage persistant (`btrfs`) et les frontières d'isolation (`Cilium eBPF default-deny`).
- **Légendes et cotes intégrées** : chaque boîte indique le vrai composant, son chemin dans le dépôt (`modules/topology/topology.nix`, `apps/vitrine/vitrine.yaml`) et la propriété technique vérifiable.
