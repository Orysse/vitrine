---
title: Homelab
summary: An Intel NUC running NixOS hosts a k3s cluster of three microVMs, which serves this site. The host is described in a flake, the cluster through GitOps with Flux.
order: 1
art: nuc
paper: pink
photo: { src: "/img/intel-nuc.jpg", credit: "Laserlicht / Wikimedia Commons", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Intel_NUC8.jpg" }
page: homelab
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, k3s, Flux, Traefik, OpenBao, Pocket-ID, VictoriaMetrics]
facts:
  - [Host, "NixOS, deployed with deploy-rs and automatic rollback"]
  - [Cluster, "3 disposable k3s microVMs, state kept on the host"]
  - [Secrets, "OpenBao and External Secrets, sops for bootstrap"]
  - [Monitoring, "VictoriaMetrics and VictoriaLogs on the host, alerts by email"]
---
