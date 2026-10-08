+++
title = "This site runs at my place"
description = "A NixOS NUC, three microVMs, a k3s cluster driven by Flux."
template = "infra.html"
weight = 1

[extra]
num = "04"
kicker = "Report"
heading = ["This site", "runs at", "my place"]
stand = "A NUC running NixOS, three virtual machines that forget everything on every boot, and a Kubernetes cluster that only deploys through git."
caption = "nuc1, an Intel NUC running NixOS. It serves the page you are reading."
pullquote = "The VMs have no disk images. They are rebuilt on every boot."
topology = """
nuc1    .200  NixOS · microvm.nix
 ├ kube-1 .211  server · 2 vCPU · 4 GB
 ├ kube-2 .212  agent  · 2 vCPU · 3 GB
 └ kube-3 .213  agent  · 2 vCPU · 3 GB
ingress .240  MetalLB → Traefik"""
topology_caption = "Fig. 1 · The topology, as declared in topology.nix."
stack = ["NixOS", "microvm.nix", "k3s", "Flux", "Traefik", "Gateway API", "MetalLB", "cert-manager", "sops + age", "WireGuard", "Cloudflare DNS", "Datadog", "Renovate"]
+++

## Declarative from the metal up

The server is an Intel NUC running NixOS. It hosts three lightweight virtual machines that form a Kubernetes (k3s) cluster. The host, its disk layout, the virtual machines and the cluster bootstrap are all one Nix flake.

One file describes the network topology: nodes, addresses, memory. Moving a node or changing its IP is a one-line change. The virtual machines have no disk images: each one is rebuilt from code on every boot with a throwaway root filesystem, and only Kubernetes state lives on a dedicated volume.

## GitOps for everything inside the cluster

Flux keeps the cluster in sync with a public Git repository: networking (MetalLB), routing (Traefik over the Kubernetes Gateway API), certificates (cert-manager), monitoring (Datadog) and applications. A git push is the only way to deploy. Renovate opens pull requests to keep every chart, image and flake input pinned and up to date.

## Secure by default

- Secrets are committed only in encrypted form (sops + age), and only my keys and the machine's own key can decrypt them.
- TLS everywhere: a wildcard Let's Encrypt certificate obtained over DNS-01, with HSTS and strict security headers.
- Traffic between nodes is encrypted with WireGuard.
- Kubernetes secrets are encrypted at rest.
- Control-plane ports only accept connections from the cluster nodes.
- Administration goes through a WireGuard VPN restricted to the lab's subnet, with key-only SSH.

## Observable

Metrics, logs and events from both the host and the cluster are sent to Datadog.
