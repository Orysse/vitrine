import type { L10n } from "./i18n";

// The layers of the homelab, top (this site) to bottom (the machine), drawn by
// components/Stack.astro. Every value is copied from the homelab repositories; the comment
// on each layer says where. Update both together.
export type Motif = "tiles" | "grid" | "nodes" | "vms" | "ports";

export const layers: { name: L10n; fact: L10n; motif: Motif }[] = [
  {
    // homelab-cluster: apps/vitrine/vitrine.yaml (replicas: 2, runAsUser: 65534)
    name: { fr: "Ce site", en: "This site" },
    fact: { fr: "nginx, 2 réplicas", en: "nginx, 2 replicas" },
    motif: "tiles",
  },
  {
    // homelab-cluster: clusters/homelab/ (Flux), infrastructure/configs/{openbao,pocket-id}/
    name: { fr: "Plateforme", en: "Platform" },
    fact: { fr: "Flux, OpenBao, Pocket-ID", en: "Flux, OpenBao, Pocket-ID" },
    motif: "grid",
  },
  {
    // homelab-nix: modules/k3s/node.nix, modules/k3s/cilium.nix
    name: { fr: "Cluster", en: "Cluster" },
    fact: { fr: "k3s, Cilium", en: "k3s, Cilium" },
    motif: "nodes",
  },
  {
    // homelab-nix: modules/topology/topology.nix (kube-1 to kube-3), modules/vm/microvm-guest.nix
    // (hypervisor = "qemu", no disk volume: the root is a tmpfs)
    name: { fr: "microVMs", en: "microVMs" },
    fact: { fr: "3 × qemu, racine en tmpfs", en: "3 × qemu, tmpfs root" },
    motif: "vms",
  },
  {
    // homelab-nix: modules/machines/nuc1.nix, modules/deploy.nix (magic rollback)
    name: { fr: "Hôte", en: "Host" },
    fact: { fr: "NixOS, deploy-rs avec rollback", en: "NixOS, deploy-rs with rollback" },
    motif: "grid",
  },
  {
    // homelab-nix: docs/facts.md (nuc1: NUC10i7FNH, 12 threads, 16 GB RAM)
    name: { fr: "Matériel", en: "Hardware" },
    fact: { fr: "Intel NUC10i7FNH, 12 threads, 16 Go", en: "Intel NUC10i7FNH, 12 threads, 16 GB" },
    motif: "ports",
  },
];
