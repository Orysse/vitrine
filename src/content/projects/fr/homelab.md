---
title: Homelab
summary: Un Intel NUC sous NixOS fait tourner un cluster k3s de trois microVMs, qui sert ce site. L'hôte est décrit dans un flake, le cluster en GitOps avec Flux.
order: 1
art: nuc
paper: pink
photo: { src: "/img/intel-nuc.jpg", credit: "Laserlicht / Wikimedia Commons", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Intel_NUC8.jpg" }
repo: https://github.com/Orysse/homelab-nix
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Grafana, Umami, Renovate]
facts:
  - [Hôte, "NixOS, déployé avec deploy-rs et rollback automatique"]
  - [Cluster, "3 microVMs k3s jetables, état gardé sur l'hôte"]
  - [Réseau, "Cilium en eBPF, WireGuard entre nœuds, tout refusé par défaut"]
  - [Secrets, "OpenBao et External Secrets, sops pour le démarrage"]
  - [Identité, "Pocket-ID, passkeys uniquement, droits par groupes"]
  - [Monitoring, "VictoriaMetrics et VictoriaLogs sur l'hôte, alertes par mail"]
  - [Dépôts, "homelab-nix (hôte, Nix) et homelab-cluster (GitOps)"]
---

## Base : homelab-nix

Le dépôt `homelab-nix` décrit tout jusqu'à un cluster k3s avec Flux installé. C'est un flake dendritique (flake-parts et import-tree) : chaque fichier de `modules/` déclare un module NixOS, et `machines/nuc1.nix` les assemble.

Un seul fichier, `modules/topology/topology.nix`, décrit le réseau, les hôtes et les nœuds (rôle, mémoire, vCPU). Il a son propre schéma, vérifié par `nix flake check`. Déplacer un nœud ou changer sa mémoire tient en une ligne.

Les VMs sont générées depuis cette topologie avec microvm.nix. Elles n'ont pas d'image disque et leur racine est un tmpfs. Seules l'identité du nœud et les données k3s sont gardées, sur l'hôte.

Le réseau du cluster, Cilium, est installé par la base au démarrage de k3s : Flux en a besoin pour tourner, il ne peut donc pas l'installer lui-même.

L'hôte se déploie avec deploy-rs. Si l'hôte ne répond plus après l'activation, il revient seul à la version précédente. Une CI GitHub lance `nix flake check` à chaque push.

## Ce qui tourne sur l'hôte

Tout ce qui garde un état reste hors des VMs :

- les volumes des pods, en NFS sur btrfs, avec un snapshot btrbk toutes les heures ;
- PostgreSQL, pour les applications ;
- VictoriaMetrics et VictoriaLogs, pour les métriques et les logs, dont l'audit de l'API Kubernetes et les journaux des nœuds ;
- vmalert et Alertmanager, qui envoient les alertes par mail ;
- le VPN WireGuard, seul accès d'administration.

Le monitoring tourne donc même quand le cluster est en panne. Alertmanager envoie aussi un signal permanent à Healthchecks.io : si l'hôte tombe, c'est Healthchecks.io qui prévient.

## Contenu : homelab-cluster

Flux applique le dépôt `homelab-cluster` dans un ordre fixé par `dependsOn` :

1. `infra-controllers` : MetalLB, cert-manager, le pilote CSI NFS, External Secrets et l'opérateur de configuration d'OpenBao ;
2. `infra-configs` : réseau, passerelles, certificats, stockage, monitoring, OpenBao, Pocket-ID et Headlamp ;
3. `apps` : ce site, la page de statut Gatus et Umami, la mesure d'audience du site.

L'hôte publie ses paramètres dans une ConfigMap que Flux substitue dans les manifestes. Le réseau n'est donc défini qu'une fois, côté Nix. Images et charts sont épinglés, et Renovate ouvre les pull requests de mise à jour.

## Identité

Pocket-ID est le fournisseur OIDC, avec des passkeys uniquement. Grafana, OpenBao, kubectl et la console Headlamp l'utilisent, et les droits Kubernetes viennent des groupes. Aucun de ces outils n'a de compte local.

## Secrets

Les secrets sont rangés en deux couches. sops chiffre dans git ce qu'il faut pour démarrer, comme la clé qui déverrouille OpenBao. Tout le reste est dans OpenBao.

External Secrets copie les secrets d'OpenBao dans des Secrets Kubernetes. Une seule politique, paramétrée par namespace, limite chacun à ses propres secrets. Les mots de passe PostgreSQL sont créés et changés par OpenBao, et personne ne les connaît.

## Sécurité

- Secrets Kubernetes chiffrés au repos.
- Trafic entre les nœuds chiffré par WireGuard, par Cilium.
- Network policies Cilium dans chaque namespace : tout est refusé par défaut et chaque flux permis est écrit dans git. Ce site ne joint rien, pas même le DNS. Hubble montre les flux, y compris ceux qui sont bloqués.
- Ports du control plane ouverts aux seuls nœuds du cluster.
- HTTPS partout, avec un certificat wildcard Let's Encrypt obtenu par DNS-01, HSTS et en-têtes de sécurité.
- Interfaces d'administration sur une passerelle interne, joignable seulement depuis le réseau local et le VPN.
