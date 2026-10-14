---
title: Homelab
summary: "Un cluster Kubernetes décrit par un fichier de topologie : un nœud de plus est une entrée de plus. Les nœuds n'ont pas de disque et le réseau refuse tout par défaut."
order: 1
repo: https://github.com/Orysse/homelab-nix
repoSecondary: https://github.com/Orysse/homelab-cluster
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Renovate]
facts:
  - [Hôte, "NixOS (flake-parts + import-tree), déployé par deploy-rs avec auto-rollback"]
  - [Cluster, "3 microVMs QEMU sans disque (racine tmpfs) générées via microvm.nix"]
  - [Persistance, "Pool btrfs sur l'hôte, volumes NFS et snapshots horaires btrbk"]
  - [GitOps, "Flux en trois paliers (infra-controllers, infra-configs, apps)"]
  - [Réseau, "Cilium eBPF, chiffrement WireGuard inter-nœuds, refus par défaut et Hubble"]
  - [Identité & Secrets, "Pocket-ID (passkeys OIDC), sops, OpenBao et External Secrets"]
  - [Dépôts, "github.com/Orysse/homelab-nix · github.com/Orysse/homelab-cluster"]
---

Un seul fichier de topologie décrit le réseau, l'hôte et les nœuds. Ajouter un nœud, c'est ajouter un attribute set : microvm.nix génère la machine. Rien ne dépend d'un matériel précis, la config se déploie sur n'importe quel hôte NixOS.

Les nœuds k3s n'ont pas de disque : leur racine est un tmpfs qui repart vierge à chaque démarrage. Seuls l'identité du nœud, les données de k3s et les volumes persistants vivent sur l'hôte. Le cluster est jetable, l'état est ailleurs.

Cilium refuse tout par défaut et chaque flux est écrit dans Git. Les secrets sont dans OpenBao, personne n'a de mot de passe ni de compte local, et l'accès passe par des passkeys. Flux a besoin d'un réseau pour démarrer, donc c'est NixOS qui installe Cilium avec k3s. L'hôte publie aussi sa topologie dans une ConfigMap, pour qu'aucune adresse ne soit écrite deux fois.

Je sais que ce n'est pas de la production, mais je le construis comme si ça en était.
