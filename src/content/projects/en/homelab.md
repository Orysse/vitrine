---
title: Homelab
summary: "My home testbed for Nix and Kubernetes: diskless microVMs running in RAM, a network where nothing flows unless it is written in Git, and monitoring that stays up when the cluster goes down."
order: 1
repo: https://github.com/Orysse/homelab-nix
repoSecondary: https://github.com/Orysse/homelab-cluster
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Renovate]
facts:
  - [Hardware, "Intel NUC10i7FNH (12 threads, 16 GB RAM)"]
  - [Host, "NixOS (flake-parts + import-tree), deployed via deploy-rs with auto-rollback"]
  - [Cluster, "3 diskless QEMU microVMs (tmpfs root) generated via microvm.nix"]
  - [Persistence, "Host btrfs pool, NFS volumes, and hourly btrbk snapshots"]
  - [GitOps, "Three-stage Flux reconciliation (infra-controllers, infra-configs, apps) and Renovate"]
  - [Network, "Cilium eBPF, node-to-node WireGuard, default-deny policies, and Hubble"]
  - [Identity & Secrets, "Pocket-ID (OIDC passkeys), sops, OpenBao, and External Secrets"]
  - [Observability, "VictoriaMetrics, VictoriaLogs, vmalert, and Alertmanager on the host"]
  - [Repositories, "github.com/Orysse/homelab-nix · github.com/Orysse/homelab-cluster"]
---

## Why build a playground

My first homelab was the OpenStack I installed on L'Atelier's second-hand servers. This one is at home, on a single Intel NUC. A few containers directly on the host would have been enough, but I wanted to run into the real problems of orchestration, network isolation, secret management and failure recovery. So I split it into a three-node Kubernetes cluster, in virtual machines that keep no state.

It is not a production environment. I use it to try choices I would not necessarily make at work, with NixOS to describe everything in Git without doing anything by hand.

## Declarative topology and diskless microVMs

The first repository, homelab-nix, describes everything from bare metal up to a running k3s cluster with Flux bootstrapped. It is organized as a dendritic flake using flake-parts and import-tree: every file in the module tree declares a self-contained NixOS module, which the host definition then assembles.

At the center of the repository, a single topology file defines the network plan, the physical host, and all three cluster nodes along with their roles, memory, and vCPU allocations. That topology has its own schema validated on every push by nix flake check. Moving a node or changing its memory is a one-line edit, and microvm.nix generates all three QEMU virtual machines directly from that single source of truth.

None of these virtual machines has a disk image. Their root filesystem is mounted in RAM as a tmpfs and starts completely fresh on every reboot, sharing the host's Nix store read-only. Only the node identity and internal k3s state pass through to the physical disk. The host itself is deployed atomically over SSH with deploy-rs: if an activation ever breaks networking or stops the host from responding, deploy-rs automatically rolls the system back to the previous generation.

I am very happy with microvm.nix: it is a much better solution than I expected.

## Host-level persistence and out-of-cluster monitoring

A classic trap I wanted to avoid was running the observability stack and stateful databases inside the very Kubernetes cluster they depend on. When a CNI upgrade or control-plane issue takes Kubernetes down, in-cluster monitoring usually goes dark at the exact moment you need metrics and logs to debug the outage.

Everything stateful or critical to monitoring therefore runs directly on the physical NixOS host, outside the virtual machines. Pod persistent volumes are served over NFS from the host's btrfs pool and snapshotted every hour with btrbk, alongside a shared PostgreSQL instance for application data. Likewise, VictoriaMetrics, VictoriaLogs, vmalert, and Alertmanager run natively on the host, continuously ingesting node journals and the full Kubernetes API audit log. Even if all three cluster nodes crash at once, monitoring stays up and sends email alerts; and if the physical NUC itself loses power or connectivity, a continuous heartbeat to Healthchecks.io stops and triggers an external alarm.

## Hand-off to Flux and staged GitOps reconciliation

Because Flux needs working pod networking before it can run and reconcile repositories, it cannot install the cluster's CNI plugin by itself. The NixOS base therefore installs Cilium directly when k3s boots. To avoid duplicating IP addresses or domain names between Nix and Kubernetes YAML, the host exports its topology parameters into a Kubernetes ConfigMap that Flux substitutes across manifests in the second repository, homelab-cluster.

Flux reconciles homelab-cluster in three strict stages ordered through dependsOn dependencies. First, infra-controllers brings up foundational operators: MetalLB, cert-manager, the NFS CSI driver, External Secrets, and the OpenBao configuration operator. Once those controllers report healthy, infra-configs applies network policies, Traefik gateways, TLS certificates, storage classes, OpenBao, Pocket-ID, and Headlamp. Finally, the apps layer deploys public workloads including this site, the Gatus status page, and Umami analytics. Every Helm chart and container image is pinned, with Renovate opening automated pull requests for updates.

## Defense-in-depth security, passkey identity, and dynamic secrets

On the security side, I wanted to enforce zero implicit trust across secrets, identity, and networking without making day-to-day operations painful. Kubernetes Secrets are encrypted at rest by k3s, and secret management is split into two tiers. In Git, sops encrypts only the minimal bootstrap material needed at boot, such as the key that unseals OpenBao. Every other secret lives inside OpenBao. The External Secrets operator then syncs secrets into Kubernetes using a single templated policy parameterized by namespace, guaranteeing that a workload can never read secrets belonging to another namespace. For databases, OpenBao dynamically generates and rotates PostgreSQL credentials on its own so no human ever knows or handles a database password.

Identity follows the same principle. None of the internal tools has a local admin account or password anymore: Pocket-ID serves as the single OIDC provider and enforces passwordless WebAuthn passkeys exclusively. Grafana, OpenBao, the Headlamp console, and even command-line kubectl access authenticate through OIDC, with Kubernetes RBAC permissions mapped directly from OIDC group claims.

At the network layer, Cilium runs in eBPF mode and encrypts all node-to-node traffic transparently with WireGuard. Every namespace enforces a default-deny CiliumNetworkPolicy for both ingress and egress. Every permitted connection between pods must be written explicitly in Git, and Hubble provides live visibility into allowed and dropped packets alike. As a concrete example, the container serving this website runs as unprivileged user 65534 with a read-only root filesystem and is blocked from making any outbound connection at all, including internal DNS queries. Finally, control-plane ports are restricted strictly to cluster nodes, and administrative dashboards sit behind an internal Traefik gateway reachable only over the host's WireGuard VPN, completely separate from the public gateway serving HTTPS with Let's Encrypt DNS-01 wildcard certificates and strict security headers.
