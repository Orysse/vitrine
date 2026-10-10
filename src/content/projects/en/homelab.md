---
title: Homelab
summary: An Intel NUC running NixOS hosts a k3s cluster of three microVMs, which serves this site. The host is described in a flake, the cluster through GitOps with Flux.
order: 1
art: nuc
paper: pink
photo: { src: "/img/intel-nuc.jpg", credit: "Laserlicht / Wikimedia Commons", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Intel_NUC8.jpg" }
map: true
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Grafana, Umami, Renovate]
facts:
  - [Host, "NixOS, deployed with deploy-rs and automatic rollback"]
  - [Cluster, "3 disposable k3s microVMs, state kept on the host"]
  - [Network, "Cilium in eBPF, WireGuard between nodes, everything denied by default"]
  - [Secrets, "OpenBao and External Secrets, sops for bootstrap"]
  - [Identity, "Pocket-ID, passkeys only, rights from groups"]
  - [Monitoring, "VictoriaMetrics and VictoriaLogs on the host, alerts by email"]
  - [Repos, "homelab-nix (host, Nix) and homelab-cluster (GitOps)"]
---

## Base: homelab-nix

The `homelab-nix` repository describes everything up to a k3s cluster with Flux installed. It is a dendritic flake (flake-parts and import-tree): each file in `modules/` declares a NixOS module, and `machines/nuc1.nix` puts them together.

One file, `modules/topology/topology.nix`, describes the network, the hosts and the nodes (role, memory, vCPU). It has its own schema, checked by `nix flake check`. Moving a node or changing its memory is a one-line change.

The VMs are generated from that topology with microvm.nix. They have no disk image and their root is a tmpfs. Only the node identity and the k3s data are kept, on the host.

The cluster network, Cilium, is installed by the base when k3s starts: Flux needs it to run, so it cannot install it itself.

The host is deployed with deploy-rs. If it stops answering after activation, it rolls back to the previous version by itself. A GitHub CI runs `nix flake check` on every push.

## What runs on the host

Everything that keeps state stays outside the VMs:

- pod volumes, over NFS on btrfs, with a btrbk snapshot every hour;
- PostgreSQL, for the apps;
- VictoriaMetrics and VictoriaLogs, for metrics and logs, including the Kubernetes API audit and the node journals;
- vmalert and Alertmanager, which email the alerts;
- the WireGuard VPN, the only admin access.

Monitoring therefore keeps running when the cluster is down. Alertmanager also sends a constant signal to Healthchecks.io: if the host goes down, Healthchecks.io raises the alarm.

## Content: homelab-cluster

Flux applies the `homelab-cluster` repository in an order set by `dependsOn`:

1. `infra-controllers`: MetalLB, cert-manager, the NFS CSI driver, External Secrets and the OpenBao configuration operator;
2. `infra-configs`: network, gateways, certificates, storage, monitoring, OpenBao, Pocket-ID and Headlamp;
3. `apps`: this site, the Gatus status page and Umami, the site's analytics.

The host publishes its parameters in a ConfigMap that Flux substitutes into the manifests, so the network is defined once, on the Nix side. Images and charts are pinned, and Renovate opens the update pull requests.

## Identity

Pocket-ID is the OIDC provider, passkeys only. Grafana, OpenBao, kubectl and the Headlamp console use it, and Kubernetes rights come from groups. None of these tools has a local account.

## Secrets

Secrets live in two layers. sops encrypts in git what is needed to boot, such as the key that unseals OpenBao. Everything else is in OpenBao.

External Secrets copies secrets from OpenBao into Kubernetes Secrets. A templated policy limits each namespace to its own secrets. PostgreSQL passwords are created and rotated by OpenBao, and nobody knows them.

## Security

- Kubernetes secrets encrypted at rest.
- Node-to-node traffic encrypted with WireGuard, by Cilium.
- Cilium network policies in every namespace: everything is denied by default and each allowed flow is written in git. This site reaches nothing, not even DNS. Hubble shows the flows, blocked ones included.
- Control-plane ports open to cluster nodes only.
- HTTPS everywhere, with a Let's Encrypt wildcard certificate obtained over DNS-01, HSTS and security headers.
- Admin interfaces on an internal gateway, reachable only from the local network and the VPN.
