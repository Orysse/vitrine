---
title: Homelab
summary: "Je n'ai pas construit ce homelab pour héberger des services de manière tranquille, mais pour avoir un terrain de jeu où pousser Nix et Kubernetes un peu plus loin que de raison : des microVMs sans disque qui tournent en RAM, un réseau où rien ne passe sans être écrit dans Git, et une supervision qui reste debout même quand le cluster tombe."
order: 1
repo: https://github.com/Orysse/homelab-nix
repoSecondary: https://github.com/Orysse/homelab-cluster
stack: [NixOS, microvm.nix, deploy-rs, k3s, Cilium, Hubble, Flux, Traefik, cert-manager, OpenBao, External Secrets, Pocket-ID, PostgreSQL, VictoriaMetrics, VictoriaLogs, Renovate]
facts:
  - [Matériel, "Intel NUC10i7FNH (12 threads, 16 Go RAM)"]
  - [Hôte, "NixOS (flake-parts + import-tree), déployé par deploy-rs avec auto-rollback"]
  - [Cluster, "3 microVMs QEMU sans disque (racine tmpfs) générées via microvm.nix"]
  - [Persistance, "Pool btrfs sur l'hôte, volumes NFS et snapshots horaires btrbk"]
  - [GitOps, "Flux en trois paliers (infra-controllers, infra-configs, apps) et Renovate"]
  - [Réseau, "Cilium eBPF, chiffrement WireGuard inter-nœuds, refus par défaut et Hubble"]
  - [Identité & Secrets, "Pocket-ID (passkeys OIDC), sops, OpenBao et External Secrets"]
  - [Supervision, "VictoriaMetrics, VictoriaLogs, vmalert et Alertmanager sur l'hôte"]
  - [Dépôts, "github.com/Orysse/homelab-nix · github.com/Orysse/homelab-cluster"]
---

## Pourquoi ce laboratoire

Au départ, un homelab sert souvent à remplacer quelques services cloud chez soi. Très vite, ce qui m'a intéressé n'était plus les applications elles-mêmes, mais la manière de décrire et de tenir toute une infrastructure sans jamais avoir à intervenir à la main sur une machine. En découvrant NixOS, j'ai eu envie de traiter mon serveur non pas comme un environnement de production figé, mais comme un terrain d'expérimentation où tester des choix d'architecture radicaux.

Sur un unique Intel NUC, faire tourner quelques conteneurs directement sur l'hôte aurait largement suffi. Mais pour me confronter aux vrais problèmes d'orchestration, d'isolation réseau, de gestion des secrets et de reprise sur panne, j'ai préféré découper la machine en un cluster Kubernetes complet de trois nœuds, tout en cherchant à éliminer l'inertie habituelle des machines virtuelles.

## Topologie déclarative et microVMs sans disque

Le premier dépôt, homelab-nix, décrit l'intégralité du socle matériel et système jusqu'à obtenir un cluster k3s fonctionnel avec Flux installé. Il est structuré comme un flake dendritique grâce à flake-parts et import-tree : chaque fichier placé dans l'arborescence déclare un module NixOS autonome, assemblé ensuite pour la machine physique.

Au cœur de ce dépôt, un unique fichier de topologie décrit le plan réseau, l'hôte et les trois nœuds du cluster avec leur rôle, leur mémoire vive et leurs processeurs virtuels. Ce fichier possède son propre schéma de validation vérifié à chaque commit par nix flake check. Redimensionner un nœud ou modifier le plan d'adressage tient en une seule ligne, et les trois machines virtuelles QEMU sont générées automatiquement à partir de cette définition via microvm.nix.

Ces machines virtuelles n'ont aucune image disque. Leur système de fichiers racine est monté en mémoire vive dans un tmpfs et repart d'un état vierge à chaque redémarrage, en partageant le store Nix de l'hôte en lecture seule. Seuls l'identité du nœud et les données internes de k3s traversent vers le disque physique. Le déploiement de l'hôte lui-même passe par deploy-rs : si une mise à jour casse le réseau ou empêche la machine de répondre après l'activation, elle annule d'elle-même le déploiement et revient à la génération précédente.

## Persistance sur l'hôte et supervision hors du cluster

L'erreur classique que je voulais éviter était d'héberger les outils de surveillance et les données critiques à l'intérieur même du cluster qu'ils doivent superviser. Lorsqu'une mise à jour réseau ou une panne de control-plane fait tomber Kubernetes, on perd habituellement l'accès aux métriques et aux journaux au moment précis où l'on en a besoin pour comprendre ce qui s'est passé.

Tout ce qui conserve un état durable ou touche à l'observabilité tourne donc directement sur l'hôte NixOS, en dehors des machines virtuelles. Les volumes persistants des pods sont exposés en NFS depuis un pool btrfs de l'hôte, photographié toutes les heures par btrbk, aux côtés d'une instance PostgreSQL partagée pour les applications. De la même façon, VictoriaMetrics, VictoriaLogs, vmalert et Alertmanager s'exécutent sur l'hôte et collectent en continu les journaux des nœuds ainsi que l'audit complet de l'API Kubernetes. Si le cluster s'effondre, la supervision reste intacte et envoie ses alertes par mail ; si l'hôte physique lui-même tombe ou perd sa connexion, un signal continu envoyé à Healthchecks.io s'interrompt et déclenche l'alerte depuis l'extérieur.

## Passage de relais à Flux et réconciliation GitOps

Pour que Flux puisse démarrer et synchroniser le cluster, il a besoin d'un réseau de pods déjà opérationnel : il ne peut donc pas installer lui-même le plugin réseau. C'est pourquoi Cilium est injecté directement par le socle NixOS au démarrage de k3s. Afin de ne jamais dupliquer les adresses IP ou les domaines entre la configuration Nix et les manifestes Kubernetes, l'hôte publie ses paramètres de topologie dans une ConfigMap que Flux substitue automatiquement dans l'ensemble du second dépôt, homelab-cluster.

Flux applique ensuite ce dépôt selon un ordre strict défini par dépendances. Un premier palier, infra-controllers, installe les briques de base comme MetalLB, cert-manager, le pilote CSI NFS, External Secrets et l'opérateur de configuration d'OpenBao. Une fois ces contrôleurs prêts, le palier infra-configs déploie les passerelles Traefik, les certificats, le stockage, OpenBao, Pocket-ID et Headlamp. Enfin, le palier apps déploie les services publics comme ce site, la page de statut Gatus et la mesure d'audience Umami. Toutes les versions de charts Helm et d'images conteneurs sont épinglées, et Renovate ouvre automatiquement les pull requests de mise à jour.

## Sécurité en profondeur, identité passkeys et secrets dynamiques

Côté sécurité, j'ai voulu appliquer une approche sans confiance implicite sur toute la chaîne, du stockage des secrets jusqu'aux flux réseau. Les secrets Kubernetes sont d'abord chiffrés au repos par k3s. Pour leur gestion, l'architecture est découpée en deux niveaux : sops ne chiffre dans Git que le strict minimum nécessaire à l'amorçage, notamment la clé permettant de déverrouiller OpenBao au démarrage. Tout le reste vit exclusivement dans OpenBao. L'opérateur External Secrets synchronise ensuite ces valeurs vers des Secrets Kubernetes à l'aide d'une politique unique paramétrée par espace de noms, ce qui garantit mathématiquement qu'un espace de noms ne peut lire que ses propres secrets. Pour les bases de données, OpenBao génère et fait tourner périodiquement les mots de passe PostgreSQL sans qu'aucun humain n'ait jamais à les connaître.

La même logique s'applique à l'identité. Aucun outil d'administration ne possède de compte local ni de mot de passe : Pocket-ID agit comme fournisseur OIDC unique et n'accepte que l'authentification matérielle ou biométrique par passkeys. Grafana, OpenBao, la console Headlamp et l'accès en ligne de commande via kubectl s'appuient tous sur ce mécanisme, avec des droits Kubernetes attribués dynamiquement selon les groupes OIDC.

Sur le plan réseau, Cilium fonctionne en eBPF et chiffre l'intégralité du trafic entre les nœuds avec WireGuard. Chaque espace de noms est soumis à une politique CiliumNetworkPolicy qui bloque par défaut tous les flux entrants et sortants. Le moindre échange entre deux composants doit être déclaré explicitement dans Git, et Hubble permet d'observer les flux en temps réel, y compris les paquets rejetés. À titre d'exemple, le conteneur qui sert ce site tourne sous l'utilisateur non privilégié 65534 avec un système de fichiers racine en lecture seule et n'a le droit de joindre absolument rien, pas même le serveur DNS interne. Enfin, les ports du control-plane ne sont ouverts qu'aux nœuds du cluster, et les interfaces d'administration sont isolées derrière une passerelle Traefik interne accessible uniquement depuis le VPN WireGuard terminé sur l'hôte, tandis que la passerelle publique gère uniquement le trafic HTTPS muni d'un certificat wildcard Let's Encrypt obtenu par challenge DNS-01.
