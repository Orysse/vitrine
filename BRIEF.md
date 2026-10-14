# Brief Architectural & Fonctionnel — Vitrine

## 1. Positionnement & Objectif

- **Sujet** : Site vitrine et portfolio technique d'Abel Chartier (Étudiant ingénieur 5e année à l'EPITA, majeure Systèmes, Réseaux et Sécurité ; contributeur à La Forge), en recherche de stage de fin d'études de 6 mois à partir de février 2027.
- **Double objectif** :
  1. **Mettre en avant les points techniques inhabituels et complexes des projets personnels** : gestion déclarative de microVMs sans disque (`tmpfs`) par Nix, flux réseau Kubernetes et sécurité zero-trust (`Cilium eBPF default-deny`, `WireGuard`, `OpenBao`, `Pocket-ID`), et poste de travail NixOS en `tmpfs` (impermanence) sans `home-manager` (`nix-wrapper-modules`).
  2. **Présenter le Curriculum Vitae complet** de manière claire, directe et immédiatement scannable sur la page principale.
- **Esthétique** : Minimalisme *text-based* inspiré de `paco.me` et `hara.ndc.co.jp/en/about/`, rythmé par des **diagrammes d'architecture modernes, denses et détaillés** en guise d'illustrations.

---

## 2. Structure & Navigation

Une navigation sobre en haut de page donnant un accès direct à la page principale scrollable et aux onglets des projets :

- **`Abel Chartier` (`/`, `/en/`)** : Page principale scrollable regroupant l'introduction, les focus sur les choix techniques inhabituels (illustrés par le diagramme global du Homelab), les accès aux projets et l'intégralité du CV (Expériences, Formation, Compétences, Associations, Intérêts).
- **Onglets Projets** :
  - **`Homelab` (`/systemes/homelab/`, `/en/systems/homelab/`)** : Deep-dive sur l'architecture du homelab NixOS + k3s, illustré par deux grands diagrammes détaillés : (1) Topologie Nix, microVMs `tmpfs` et persistance hôte `btrfs` / monitoring hors-cluster ; (2) Flux réseau Kubernetes, Cilium eBPF `default-deny`, passerelles Traefik et chaîne identité/secrets (`Pocket-ID` + `OpenBao`).
  - **`Config NixOS` (`/systemes/config/`, `/en/systems/config/`)** : Deep-dive sur la configuration ThinkPad en flake dendritique, illustré par le diagramme détaillé de la chaîne de boot verrouillée (`lanzaboote` → `TPM2` → `LUKS` → racine `tmpfs` vs `/persistent`) et de l'encapsulation `nix-wrapper-modules` sans `home-manager`.
  - **`Vitrine` (`/systemes/vitrine/`, `/en/systems/vitrine/`)** : Fiche concise sur le build Nix reproductible de ce site, son exécution non privilégiée (`65534:65534`, rootfs read-only), sa CSP stricte et son pipeline GitOps (`git tag` → `ghcr.io` → `Renovate` → `Flux`), avec son diagramme de livraison.
- **Compatibilité des routes** :
  - `/systemes/` (`/en/systems/`) et `/parcours/` (`/en/resume/`) restent accessibles et propres dans le même style épuré pour ne casser aucun lien existant.
  - La page `/colophon/` est retirée de la navigation principale (le pied de page affiche sobrement la version, le commit et le lien discret vers `/303/`).

---

## 3. Les Diagrammes d'Architecture Détaillés

1. **`HomelabTopology.astro` (Topologie Nix, microVMs `tmpfs` & Persistance Hôte)** :
   - Décrit le flux complet depuis `modules/topology/topology.nix` et `deploy-rs` (avec auto-rollback) vers l'hôte NixOS (`NUC10i7FNH`).
   - Montre les 3 microVMs QEMU (`racine / en tmpfs`, aucune image disque) et le passage explicite de l'état vers le pool `btrfs` de l'hôte (`/var/lib/rancher/k3s`, volumes NFS, snapshots horaires `btrbk`).
   - Montre la pile d'observabilité et de données (`VictoriaMetrics`, `VictoriaLogs`, `vmalert`, `PostgreSQL`) qui tourne directement sur l'hôte pour survivre à une panne du cluster.
2. **`HomelabNetworkSec.astro` (Flux Réseau Kubernetes, Cilium eBPF & Sécurité)** :
   - Sépare clairement l'entrée publique (`Internet → Traefik Public TLS DNS-01 → vitrine / gatus / umami`) de l'entrée d'administration (`WireGuard VPN → Traefik Interne → Grafana / Headlamp / OpenBao`).
   - Illustre le maillage `Cilium eBPF` (chiffrement `WireGuard` inter-nœuds, `CiliumNetworkPolicy` `default-deny` par namespace, egress/DNS coupé pour `vitrine`, observation `Hubble`).
   - Montre la chaîne des secrets (`sops` → `OpenBao` → `External Secrets` → rotation des mots de passe `PostgreSQL`) et l'authentification sans compte local (`Pocket-ID` passkeys OIDC).
3. **`NixImpermanence.astro` (Chaîne de Boot, Racine `tmpfs` & Wrapper-Modules)** :
   - Trace la séquence de démarrage (`UEFI Lanzaboote Secure Boot` → `TPM2` → `LUKS disko`) et la séparation entre la racine `/` en `tmpfs` (effacée à chaque redémarrage) et les montages déclarés dans `/persistent` (`preservation`) et `/nix`.
   - Illustre l'architecture `flake-parts` + `import-tree` + `nix-wrapper-modules` où chaque outil (`nvim`, `kitty`, `tmux`, `zsh`) embarque sa configuration dans `/nix/store` sans `home-manager`.
4. **`ReleaseFlow.astro` (Pipeline Reproductible Nix → Flux GitOps)** :
   - Détaille la chaîne de livraison de `vitrine` : `git tag vX.Y.Z` → `nix build` (`buildNpmPackage` + `buildLayeredImage`) → `ghcr.io/orysse/vitrine` → PR `Renovate` → réconciliation `Flux` → conteneur `nginx` (`uid 65534`, `readOnlyRootFilesystem: true`, `/tmp` uniquement).
