+++
title = "Ce site tourne chez moi"
description = "Un NUC sous NixOS, trois microVMs, un cluster k3s piloté par Flux."
template = "infra.html"
weight = 1

[extra]
num = "04"
kicker = "Reportage"
heading = ["Ce site", "tourne", "chez moi"]
stand = "Un NUC sous NixOS, trois machines virtuelles qui oublient tout à chaque démarrage, et un cluster Kubernetes qui ne se déploie que par git."
caption = "nuc1, un Intel NUC sous NixOS. Il sert la page que vous lisez."
pullquote = "Les VMs n'ont pas d'image disque. Elles sont reconstruites à chaque démarrage."
topology = """
nuc1    .200  NixOS · microvm.nix
 ├ kube-1 .211  server · 2 vCPU · 4 Go
 ├ kube-2 .212  agent  · 2 vCPU · 3 Go
 └ kube-3 .213  agent  · 2 vCPU · 3 Go
entrée  .240  MetalLB → Traefik"""
topology_caption = "Fig. 1 · La topologie, telle que décrite dans topology.nix."
stack = ["NixOS", "microvm.nix", "k3s", "Flux", "Traefik", "Gateway API", "MetalLB", "cert-manager", "sops + age", "WireGuard", "Cloudflare DNS", "Datadog", "Renovate"]
+++

## Déclaratif, du métal jusqu'en haut

Le serveur est un Intel NUC sous NixOS. Il fait tourner trois machines virtuelles légères qui forment un cluster Kubernetes (k3s). L'hôte, son disque, les VMs et le démarrage du cluster sont décrits dans un seul flake Nix.

Un fichier décrit toute la topologie : les nœuds, leurs adresses, leur mémoire. Déplacer un nœud ou changer son IP, c'est une ligne. Les VMs n'ont pas d'image disque : elles sont reconstruites à partir du code à chaque démarrage, avec une racine jetable. Seul l'état de Kubernetes survit, sur un volume dédié.

## GitOps pour tout le reste

Dans le cluster, Flux garde tout synchronisé avec un dépôt git public : le réseau (MetalLB), le routage (Traefik, via la Gateway API), les certificats (cert-manager), la supervision (Datadog) et les applications. Un git push est le seul moyen de déployer. Renovate ouvre des pull requests pour garder chaque chart, chaque image et chaque entrée du flake épinglés et à jour.

## Sécurisé par défaut

- Les secrets ne sont commités que chiffrés (sops + age). Seules mes clés et celle de la machine peuvent les déchiffrer.
- TLS partout : un certificat Let's Encrypt wildcard obtenu par DNS-01, avec HSTS et des en-têtes de sécurité stricts.
- Le trafic entre les nœuds est chiffré avec WireGuard.
- Les secrets Kubernetes sont chiffrés au repos.
- Les ports du control plane n'acceptent que les nœuds du cluster.
- L'administration passe par un VPN WireGuard limité au sous-réseau du lab, avec des clés SSH uniquement.

## Observable

Les métriques, les logs et les événements de l'hôte et du cluster partent vers Datadog.
