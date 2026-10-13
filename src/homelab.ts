import type { L10n } from "./i18n";

// The layers of the homelab, top (this site) to bottom (the machine), drawn by
// components/Stack3D.astro. Every value is copied from the homelab repositories; the comment
// on each layer says where. Update both together.
export type Motif = "tiles" | "grid" | "nodes" | "vms" | "ports";

export interface Layer {
  name: L10n;
  fact: L10n;
  motif: Motif;
  /** Where this layer is declared, in the homelab repositories. */
  source: string;
  /** What stays true about it: the invariant a reviewer should remember. */
  invariant: L10n;
}

export const layers: Layer[] = [
  {
    name: { fr: "Ce site", en: "This site" },
    fact: { fr: "nginx, 2 réplicas", en: "nginx, 2 replicas" },
    motif: "tiles",
    source: "homelab-cluster: apps/vitrine/vitrine.yaml",
    invariant: {
      fr: "nginx en utilisateur 65534, racine en lecture seule, écrit seulement dans /tmp, 2 réplicas.",
      en: "nginx as user 65534, read-only root, writes only to /tmp, 2 replicas.",
    },
  },
  {
    name: { fr: "Plateforme", en: "Platform" },
    fact: { fr: "Flux, OpenBao, Pocket-ID", en: "Flux, OpenBao, Pocket-ID" },
    motif: "grid",
    source: "homelab-cluster: clusters/homelab, infrastructure/configs/{openbao,pocket-id}",
    invariant: {
      fr: "Flux applique tout dans un ordre fixé par dependsOn. Aucun compte local : les accès passent par Pocket-ID, avec des passkeys.",
      en: "Flux applies everything in an order fixed by dependsOn. No local accounts: access goes through Pocket-ID, with passkeys.",
    },
  },
  {
    name: { fr: "Cluster", en: "Cluster" },
    fact: { fr: "k3s, Cilium", en: "k3s, Cilium" },
    motif: "nodes",
    source: "homelab-nix: modules/k3s/{node,cilium}.nix",
    invariant: {
      fr: "Cilium en eBPF, WireGuard entre les nœuds, tout refusé par défaut. Chaque flux permis est écrit dans git.",
      en: "Cilium in eBPF, WireGuard between nodes, everything denied by default. Every allowed flow is written in git.",
    },
  },
  {
    name: { fr: "microVMs", en: "microVMs" },
    fact: { fr: "3 × qemu, racine en tmpfs", en: "3 × qemu, tmpfs root" },
    motif: "vms",
    source: "homelab-nix: modules/topology/topology.nix, modules/vm/microvm-guest.nix",
    invariant: {
      fr: "Pas d'image disque : la racine est un tmpfs. Seuls l'identité du nœud et les données k3s survivent, sur l'hôte.",
      en: "No disk image: the root is a tmpfs. Only the node identity and the k3s data survive, on the host.",
    },
  },
  {
    name: { fr: "Hôte", en: "Host" },
    fact: { fr: "NixOS, deploy-rs avec rollback", en: "NixOS, deploy-rs with rollback" },
    motif: "grid",
    source: "homelab-nix: modules/machines/nuc1.nix, modules/deploy.nix",
    invariant: {
      fr: "deploy-rs revient seul à la version précédente si l'hôte ne répond plus après l'activation.",
      en: "deploy-rs rolls back on its own to the previous version if the host stops answering after activation.",
    },
  },
  {
    name: { fr: "Matériel", en: "Hardware" },
    fact: { fr: "Intel NUC10i7FNH, 12 threads, 16 Go", en: "Intel NUC10i7FNH, 12 threads, 16 GB" },
    motif: "ports",
    source: "homelab-nix: docs/facts.md",
    invariant: {
      fr: "Tout l'état persistant vit sur btrfs, avec un snapshot btrbk toutes les heures. Le monitoring tourne sur l'hôte, hors des VMs.",
      en: "All persistent state lives on btrfs, with an hourly btrbk snapshot. Monitoring runs on the host, outside the VMs.",
    },
  },
];
