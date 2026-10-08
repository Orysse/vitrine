---
title: Homelab
summary: Un Intel NUC sous NixOS qui fait tourner un cluster k3s de trois microVMs. Hôte, VMs et bootstrap dans un flake ; contenu du cluster en GitOps avec Flux. Sert ce site.
order: 1
art: nuc
paper: pink
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, disko, k3s, Flux, MetalLB, Traefik, cert-manager, sops, age, WireGuard, Datadog, Renovate]
facts:
  - [Hôte, "Intel NUC, NixOS, bridge br0, disque btrfs déclaré avec disko"]
  - [Nœuds, "kube-1 server (2 vCPU, 4000 Mo), kube-2 et kube-3 agents (2 vCPU, 3000 Mo)"]
  - [VMs, "microvm.nix, racine tmpfs, pas d'image disque ; état k3s sur un volume dédié"]
  - [Cluster, "k3s avec --secrets-encryption, flannel en wireguard-native"]
  - [Entrée, "MetalLB (192.168.1.240–254) → Traefik, Gateway API"]
  - [TLS, "cert-manager, wildcard *.abe.lc en DNS-01 Cloudflare"]
  - [Admin, "VPN WireGuard sur l'hôte, routes limitées à 192.168.1.192/26, SSH par clé"]
  - [Dépôts, "homelab-nix (base, Nix) · homelab-cluster (GitOps)"]
---

## Base : homelab-nix

Le dépôt `homelab-nix` décrit tout jusqu'à un cluster k3s avec Flux installé. C'est un flake au format dendritique (flake-parts + import-tree) : chaque fichier de `modules/` déclare un module NixOS, et `machines/nuc1.nix` les compose.

Un seul fichier, `modules/topology/topology.nix`, décrit le réseau : sous-réseau, hôtes, nœuds (adresse, rôle, mémoire, vCPU), point d'entrée et VPN. Il a son propre schéma d'options et des assertions vérifiées par `nix flake check`. Déplacer un nœud ou changer une IP, c'est une ligne.

Les VMs sont générées depuis cette topologie avec microvm.nix. Elles n'ont pas d'image disque : la racine est un tmpfs reconstruit à chaque démarrage, et seules les données k3s sont sur un volume persistant.

## Contenu : homelab-cluster

Flux synchronise le dépôt `homelab-cluster`, dans un ordre fixé par `dependsOn` :

1. `infra-controllers` : MetalLB, cert-manager, opérateur Datadog (ce qui installe des CRD) ;
2. `infra-configs` : pool d'IP MetalLB, Gateway Traefik, en-têtes de sécurité, émetteurs Let's Encrypt, certificat wildcard, agent Datadog ;
3. `apps` : les applications, dont ce site.

La base publie les paramètres réseau dans la ConfigMap `flux-system/cluster-vars` (domaine, IP d'entrée, pool), que Flux substitue dans les manifestes. Le réseau n'est donc défini qu'une fois, côté Nix.

Images et charts sont épinglés ; Renovate ouvre les pull requests de mise à jour, y compris pour les entrées du flake.

## Sécurité

- Secrets commités chiffrés avec sops + age. Destinataires : ma clé age, ma YubiKey et la clé de l'hôte ; Flux a sa propre clé age.
- Secrets Kubernetes chiffrés au repos (`--secrets-encryption`).
- Trafic entre nœuds chiffré par WireGuard (backend flannel `wireguard-native`).
- Ports du control plane (6443, kubelet 10250, memberlist MetalLB 7946) ouverts aux nœuds du cluster uniquement.
- HTTPS partout, HSTS et en-têtes de sécurité appliqués par Traefik.
- Administration par un VPN WireGuard qui tourne sur l'hôte (indépendant du cluster), limité au /26 du lab.

## Supervision

Métriques, logs et événements de l'hôte et du cluster envoyés à Datadog.
