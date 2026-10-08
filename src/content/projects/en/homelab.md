---
title: Homelab
summary: An Intel NUC running NixOS that hosts a three-microVM k3s cluster. Host, VMs and bootstrap in one flake; cluster content through GitOps with Flux. Serves this site.
order: 1
art: nuc
paper: pink
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, disko, k3s, Flux, MetalLB, Traefik, cert-manager, sops, age, WireGuard, Datadog, Renovate]
facts:
  - [Host, "Intel NUC, NixOS, br0 bridge, btrfs disk declared with disko"]
  - [Nodes, "kube-1 server (2 vCPU, 4000 MB), kube-2 and kube-3 agents (2 vCPU, 3000 MB)"]
  - [VMs, "microvm.nix, tmpfs root, no disk image; k3s state on a dedicated volume"]
  - [Cluster, "k3s with --secrets-encryption, flannel in wireguard-native"]
  - [Ingress, "MetalLB (192.168.1.240–254) → Traefik, Gateway API"]
  - [TLS, "cert-manager, *.abe.lc wildcard over Cloudflare DNS-01"]
  - [Admin, "WireGuard VPN on the host, routes limited to 192.168.1.192/26, key-only SSH"]
  - [Repos, "homelab-nix (base, Nix) · homelab-cluster (GitOps)"]
---

## Base: homelab-nix

The `homelab-nix` repository describes everything up to a running k3s cluster with Flux installed. It is a dendritic flake (flake-parts + import-tree): each file in `modules/` declares a NixOS module, and `machines/nuc1.nix` composes them.

One file, `modules/topology/topology.nix`, describes the network: subnet, hosts, nodes (address, role, memory, vCPU), ingress and VPN. It has its own option schema and assertions checked by `nix flake check`. Moving a node or changing an IP is a one-line change.

The VMs are generated from that topology with microvm.nix. They have no disk image: the root is a tmpfs rebuilt on every boot, and only k3s data lives on a persistent volume.

## Content: homelab-cluster

Flux syncs the `homelab-cluster` repository, in an order set by `dependsOn`:

1. `infra-controllers`: MetalLB, cert-manager, Datadog Operator (whatever installs CRDs);
2. `infra-configs`: MetalLB IP pool, Traefik Gateway, security headers, Let's Encrypt issuers, wildcard certificate, Datadog agent;
3. `apps`: the applications, including this site.

The base publishes the network parameters in the `flux-system/cluster-vars` ConfigMap (domain, ingress IP, pool), which Flux substitutes into the manifests. The network is defined once, on the Nix side.

Images and charts are pinned; Renovate opens the update pull requests, flake inputs included.

## Security

- Secrets committed encrypted with sops + age. Recipients: my age key, my YubiKey and the host key; Flux has its own age key.
- Kubernetes secrets encrypted at rest (`--secrets-encryption`).
- Node-to-node traffic encrypted with WireGuard (flannel `wireguard-native` backend).
- Control-plane ports (6443, kubelet 10250, MetalLB memberlist 7946) open to cluster nodes only.
- HTTPS everywhere, HSTS and security headers applied by Traefik.
- Administration through a WireGuard VPN running on the host (independent of the cluster), limited to the lab's /26.

## Monitoring

Metrics, logs and events from the host and the cluster are sent to Datadog.
