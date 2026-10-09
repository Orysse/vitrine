---
title: Homelab
summary: Un Intel NUC sous NixOS fait tourner un cluster k3s de trois microVMs, qui sert ce site. L'hôte est décrit dans un flake, le cluster en GitOps avec Flux.
order: 1
art: nuc
paper: pink
photo: { src: "/img/intel-nuc.jpg", credit: "Laserlicht / Wikimedia Commons", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Intel_NUC8.jpg" }
page: homelab
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, k3s, Flux, Traefik, OpenBao, Pocket-ID, VictoriaMetrics]
facts:
  - [Hôte, "NixOS, déployé avec deploy-rs et rollback automatique"]
  - [Cluster, "3 microVMs k3s jetables, état gardé sur l'hôte"]
  - [Secrets, "OpenBao et External Secrets, sops pour le démarrage"]
  - [Monitoring, "VictoriaMetrics et VictoriaLogs sur l'hôte, alertes par mail"]
---
