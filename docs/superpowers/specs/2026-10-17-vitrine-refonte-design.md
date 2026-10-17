# Refonte de vitrine.abe.lc — document de conception

Date : 2026-10-17 · Auteur : Abel Chartier (avec Claude)

## 1. Intention

vitrine.abe.lc est le lien mis sur le CV d'Abel. Le lecteur type est un **recruteur** qui vient de lire le CV et clique pour en savoir plus. En refermant l'onglet, il doit avoir compris trois choses :

1. **qui est Abel** ;
2. **son expertise technique** ;
3. **son parcours**, avec une vision plus claire que sur le CV.

Postes visés : DevOps très orienté infra, SRE, sysops. Abel est en dernière année à l'EPITA (majeure Systèmes, Réseaux, Sécurité & Infrastructure) et cherche un **stage de fin d'études de 6 mois à partir de février 2027**.

Le site actuel (inspiré de Hara Design Institute, typographie plate en 16 px) est jugé trop sage, sans personnalité. On repart de zéro sur la forme et la structure.

Deux lecteurs à servir sur la même page :

- **le RH** : se moque du homelab, veut voir l'expérience pro, les dates, la disponibilité, le CV ;
- **le lecteur technique** (lead SRE, ingénieur infra) : veut les choix techniques et leur raison.

## 2. Objectifs, non-objectifs, anti-objectifs

**Objectifs**

- Un RH comprend le profil sans rien ouvrir ni défiler longtemps.
- Un technique trouve la profondeur en un clic, sur place.
- Le site a une identité visuelle qu'on reconnaît, avec un vrai caractère typographique.
- Lecture facile : texte aéré, images bien placées.

**Non-objectifs**

- Pas de blog, pas de pages projet séparées, pas de pages annexes (colophon, 303, session, parcours : tout disparaît).
- Pas de mesure d'audience (l'ancien `analytics.ts` / `pulse.abe.lc` n'est pas repris — _choix de Claude_).

**Anti-objectifs (ce qui ferait échouer le site même s'il marche)**

- Un thème terminal ou dashboard sombre en monospace : c'est le défaut des portfolios DevOps.
- Le minimalisme sage de l'ancien site.
- Une ligne « served by node X / uptime » : rejetée par Abel (« un peu cringe »).
- Des captures Grafana : rejetées.
- Un défilement projet par projet, une grande section plein écran par projet : rejeté.
- Une grille de cartes identiques.

## 3. Direction visuelle : « la fiche de projet »

L'infra est présentée **comme un cabinet d'architecture présente ses ouvrages**. Références d'Abel : Hämmerli & Caccia, Vita Architecture, Verticité, la Secession, Studio Brot, Juraj Molnar, Stripe. Le lien retenu : chaque expérience ou projet est un « ouvrage » avec

- une **étiquette de contexte** en monospace, façon `[Chiasso · 2019/20]` → `[Forge EPITA · 5 sites · 1500 postes]` ;
- un **titre d'impact** court qui dit le résultat, si possible avec un chiffre (« 1500 postes, une seule image. ») ;
- la liste de ses **« matériaux »** : les choix techniques, présentés comme les matériaux d'un bâtiment (`build — Nix`, `boot — iPXE`, `cloud — OpenStack`).

**Principes posés par Abel**

- Lecture facile : textes aérés, images bien placées.
- Typographie osée qui **contrôle l'attention** et crée une impression de **surcharge** pour perturber un peu, **uniquement là où ça compte** (ouverture de page, titres d'impact, chiffres clés). Le texte courant et les matériaux restent calmes.

**Palette et typo (choix de Claude, validés sur maquette, ajustables)**

- Fond papier crème (≈ `#f1ede4`), encre noire chaude (≈ `#16140f`).
- **Un seul accent** rouge-orange (≈ `#e8431c`), réservé aux numéros d'ouvrage et aux chiffres d'impact. C'est le signal de la page ; rien d'autre n'est en couleur.
- Titres : une grotesque très grasse, serrée (Hanken Grotesk sur la maquette ; le builder peut proposer mieux, mais **pas Inter**, pas de dégradé).
- Étiquettes et matériaux : une monospace discrète (IBM Plex Mono sur la maquette).
- Filets noirs pleins entre les lignes, grille stricte, grandes marges.
- Mode sombre : non demandé. _Choix de Claude : clair uniquement_, comme l'ancien site ; le papier crème fait partie de l'identité.

Maquette de référence : `.superpowers/brainstorm/*/content/direction.html` (carte A) et `ux-lecture.html` (carte A).

## 4. Structure : une seule page

### 4.1 En-tête (moment d'impact)

- Nom, ce qu'Abel fait (systèmes, réseaux, sécurité, infra), ce qu'il cherche (stage 6 mois dès février 2027).
- Lien vers le CV PDF de la langue courante, à un clic.
- Sélecteur FR / EN.

### 4.2 La liste des ouvrages (cœur de la page)

Une liste dépliable, **expérience pro d'abord** :

| #   | Ouvrage                                          | Statut                                   | Dates                   |
| --- | ------------------------------------------------ | ---------------------------------------- | ----------------------- |
| 01  | La Forge, EPITA                                  | CDD à temps partiel                      | février 2026 →          |
| 02  | CEA Saclay                                       | Stage                                    | sept. 2025 → janv. 2026 |
| 03  | RedPill Group (migration OVH → Kubernetes cloud) | Stage                                    | juil. → août 2024       |
| 04  | Homelab                                          | Projet perso                             | —                       |
| 05  | L'Atelier, EPITA                                 | Association (vice-trésorier · tech lead) | 2024 →                  |

- L'Atelier : Abel est d'accord pour en faire une fiche (« à voir ») ; elle passe après le homelab, le builder peut la rendre plus courte que les autres.
- **Pas de fiche Config NixOS** (_choix de Claude_, Abel doutait de son intérêt) : Nix est déjà au cœur des fiches Forge et Homelab. Le repo `Orysse/config` reste lié depuis la fiche Homelab.

- **Fermée**, chaque ligne suffit au RH : numéro, nom, statut, dates, une phrase de résultat.
- **Ouverte** (un clic), elle déplie la fiche sur place : titre d'impact, texte court, matériaux, image ou schéma si disponible, liens (repos).
- Une seule fiche ouverte à la fois (_choix de Claude_).
- Doit fonctionner **sans JavaScript** (`<details>`/`<summary>` ou équivalent), le JS n'ajoute que le confort (fermeture des autres fiches, animation).
- Chaque fiche a une ancre (`#forge`, `#cea`…) pour pouvoir être liée directement ; une ancre dans l'URL ouvre la fiche.

**Contenu des fiches (faits établis)**

- **La Forge** : l'IT de la pédagogie EPITA. Cloud OpenStack, clusters et infra de l'école (datacenter en colocation à Ivry, microservices Java sur Kubernetes via Argo CD). Parc de **1500 PC sur 5 sites**, images construites avec **Nix** et distribuées en **iPXE**. Développement de fonctionnalités pour Moodle et l'intranet (piscines, projets), annuaire étudiants. Support aux équipes et aux élèves.
- **CEA** : CI montée de zéro pour une équipe de chercheurs (TRUST, plateforme de simulation thermohydraulique), seule l'instance GitLab existait déjà (celle d'un autre labo). Runners GitLab, cache S3 MinIO, supervision Prometheus/Grafana en IaC, tests de non-régression des projets satellites.
- **RedPill** : participation à la migration d'une infra vers un cluster Kubernetes sur OVHcloud (Terraform, Helm), prototypes locaux avec Kind.
- **L'Atelier** : OpenStack installé sur les serveurs de récupération de l'association, d'abord à distance depuis l'Indonésie (2024) ; VMs sous Proxmox ; services sur Kubernetes.
- **Homelab** : le projet dont Abel est le plus fier. Hyperviseur NixOS, nœuds k3s en microVMs **sans état (racine tmpfs)**, topologie décrite dans un seul fichier, Cilium en **refus par défaut** avec WireGuard, IAM (Pocket-ID / passkeys, OpenBao, External Secrets), middlewares de sécurité dont **CrowdSec**, GitOps Flux. Repos `Orysse/homelab-nix` et `Orysse/homelab-cluster`.

Les textes détaillés existent déjà dans l'ancien repo (`src/content/experience.yaml`, `src/content/projects/{fr,en}/*.md`) et servent de matière première. Le builder les réécrit au format fiche (titre d'impact + matériaux), sans inventer de chiffres.

### 4.3 Formation

Une ou deux lignes, sans emphase (Abel : « rien de fou scolairement ») : bac scientifique, prépa intégrée EPITA, majeure SRS. Le semestre d'échange à l'ITS (Surabaya, Indonésie, 2024) figure dans les données existantes ; _Claude propose de le garder en une ligne_.

### 4.4 Bandeau des technos (moment d'impact)

- Les logos des technos, **logos uniquement**, dans un bandeau qui défile en continu.
- S'arrête au survol et au focus ; chaque logo reste un lien vers le site de l'outil.
- Nom de chaque techno en infobulle et en texte accessible (lecteurs d'écran).
- Figé si `prefers-reduced-motion: reduce`.
- Base : la liste de 30 outils et les logos de `src/components/TechWall.astro` (simple-icons + `public/logos/`).

### 4.5 Hors travail : la bière

Abel tient à le garder : il est **brasseur amateur** et trouve que ça le rend plus humain (il est aussi au club LATEB de l'EPITA). Un bloc court avant le contact, avec une ligne « en ce moment » modifiable dans les données, par exemple : « En ce moment : une sour à l'orange sanguine. » Peut porter une petite touche de caractère (c'est le seul moment non technique), mais l'accent rouge-orange reste réservé aux numéros et chiffres. Musique (piano) : _choix de Claude_, une mention discrète au plus, ou rien.

### 4.6 Contact / pied de page

GitHub, LinkedIn, e-mail, © Abel Chartier.

### 4.7 Images

- Photo du datacenter : **placeholder** pour l'instant (la colocation d'Ivry appartient à un tiers ; Abel fournira la photo plus tard).
- Photo des salles machines de l'école : **placeholder** pour l'instant, Abel la prendra. Ne pas utiliser d'images de la com EPITA sans leur accord.
- Schéma du homelab dans sa fiche : possible, au trait, sobre.
- Pas de photo de profil demandée.

## 5. Langues

- Deux langues, **français par défaut** à `/`, **anglais** à `/en/`. Abel met le lien anglais dans son CV anglais.
- Tout texte existe dans les deux langues ; la build échoue si une traduction manque (comme l'ancien site).

## 6. Fabrication et livraison

**Décidé par Abel**

- Un framework.
- Le site est une image de conteneur déployée sur le cluster Kubernetes de son homelab, via **Flux**.
- Images sur **ghcr.io**, code sur **GitHub**.
- Le nouveau site **remplace** vitrine.abe.lc et **garde le repo** `Orysse/vitrine`. Le travail se fait dans `~/Documents/Perso/new-site`.

**Choix de Claude**

- **Astro** (comme l'ancien site) : sortie statique, i18n natif, zéro JS par défaut.
- `new-site` devient un clone de `Orysse/vitrine`, branche `refonte`. L'ancien dossier `../Site` n'est pas touché (il contient des modifications non commitées).
- On reprend la chaîne existante : `flake.nix` (site + image nginx non privilégiée via `dockerTools`, `nix run .#preview`), `nginx.conf` (CSP stricte, `/healthz`), `.github/workflows/build.yml` (un tag `vX.Y.Z` pousse `ghcr.io/orysse/vitrine:X.Y.Z` et `:X.Y`, Renovate ouvre la mise à jour dans `homelab-cluster`, Flux déploie).
- CSP : retirer `pulse.abe.lc`. Rien d'inline (styles et scripts en fichiers same-origin, polices auto-hébergées).
- On reprend le modèle de données FR/EN (YAML + schémas de collections) en l'adaptant aux fiches ; le code d'interface de l'ancien site (Stack3D, VTR-303, density/polarity, raccourcis clavier…) n'est pas repris.
- Les anciennes URL (`/systemes/…`, `/parcours/`, `/colophon/`, `/303/`, `/session/`, `/etudes/`, `/projets/…` et leurs équivalents `/en/…`) redirigent vers `/` ou `/en/`, ou vers l'ancre de la fiche correspondante quand elle existe.
- `.superpowers/` dans `.gitignore`.
- Mise en ligne : `refonte` n'est fusionnée dans `main` qu'après validation par Abel, puis taguée **`v2.0.0`**. Aucun changement dans `homelab-cluster` sans demander à Abel ; si le manifeste doit bouger (port, `/healthz`), le signaler. Garder le port 8080 et `/healthz` pour ne rien casser.

## 7. Contraintes

- **Firefox est le navigateur d'Abel** : tout doit être vérifié sur Firefox et Chromium (un rendu de maquette a déjà cassé sur Firefox pendant la conception).
- Lisible et utilisable sur mobile.
- Accessibilité : contrastes suffisants sur le crème, focus visible, liste dépliable au clavier, mouvement réductible.
- Léger : pas de framework JS côté client.
- Machine de dev NixOS : outils via `nix develop` / `nix shell`, jamais d'installation impérative.

## 8. Laissé au builder

- Le choix final des polices (dans l'esprit grotesque grasse + mono, pas Inter), les tailles, la grille.
- Comment la « surcharge » typographique se matérialise exactement aux moments d'impact (chiffres géants, superpositions texte/image, débordements), tant que la lecture reste facile.
- La rédaction des titres d'impact et des fiches à partir des données existantes, sans inventer de faits.
- La mise en forme de l'impression de la page.

## 9. Points ouverts

- La fiche L'Atelier est « à voir » : la construire, Abel jugera sur pièce.
- CrowdSec est cité par Abel mais n'apparaît pas dans la stack documentée du homelab ; vérifier dans `homelab-cluster` avant de l'écrire.
