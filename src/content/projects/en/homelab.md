---
title: Homelab
summary: "A Kubernetes cluster described by a topology file: one more node is one more entry. The nodes have no disk and the network denies everything by default."
order: 1
repo: https://github.com/Orysse/homelab-nix
repoSecondary: https://github.com/Orysse/homelab-cluster
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Renovate]
facts:
  - [Host, "NixOS (flake-parts + import-tree), deployed via deploy-rs with auto-rollback"]
  - [Cluster, "3 diskless QEMU microVMs (tmpfs root) generated via microvm.nix"]
  - [Persistence, "Host btrfs pool, NFS volumes, and hourly btrbk snapshots"]
  - [GitOps, "Three-stage Flux reconciliation (infra-controllers, infra-configs, apps)"]
  - [Network, "Cilium eBPF, node-to-node WireGuard, default-deny policies, and Hubble"]
  - [Identity & Secrets, "Pocket-ID (OIDC passkeys), sops, OpenBao, and External Secrets"]
  - [Repositories, "github.com/Orysse/homelab-nix · github.com/Orysse/homelab-cluster"]
---

A single topology file describes the network, the host and the nodes. Adding a node means adding an attribute set: microvm.nix generates the machine. Nothing depends on specific hardware, the config deploys to any NixOS host.

The k3s nodes have no disk: their root is a tmpfs that starts fresh at every boot. Only the node identity, the k3s data and the persistent volumes live on the host. The cluster is disposable, the state is elsewhere.

Cilium denies everything by default and every flow is written in Git. Secrets are in OpenBao, nobody has a password or a local account, and access goes through passkeys. Flux needs a network to start, so NixOS installs Cilium along with k3s. The host also publishes its topology in a ConfigMap, so no address is written twice.

I know it is not production, but I build it as if it were.
