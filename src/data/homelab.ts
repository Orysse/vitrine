// Homelab map: blocks, links, request paths, layers and principles.
// Edit this file when the homelab changes; the page and its text version are generated from it.
// Public page: no LAN addresses, ports, internal hostnames or VPN details.
import type { L10n } from "../i18n";

export type Zone = "external" | "host" | "cluster" | "platform" | "app";

export type Block = {
  id: string;
  label: string;
  zone: Zone;
  /** Position on the map, in viewBox units (1280 × 760). */
  x: number;
  y: number;
  w?: number;
  tech?: string[];
  text: L10n;
};

export const blocks: Block[] = [
  // Outside the host.
  { id: "internet", label: "Internet", zone: "external", x: 20, y: 40,
    text: { fr: "Les visiteurs du site et des applications publiques. Tout le trafic public entre par la même porte HTTPS.",
            en: "Visitors of this site and of the public apps. All public traffic comes in through the same HTTPS entry." } },
  { id: "cloudflare", label: "Cloudflare DNS", zone: "external", x: 20, y: 160, tech: ["DNS", "DDNS"],
    text: { fr: "Héberge la zone DNS du domaine. L'hôte met à jour l'enregistrement quand l'IP publique change. cert-manager y écrit les preuves du challenge DNS-01.",
            en: "Hosts the domain's DNS zone. The host updates the record when the public IP changes. cert-manager writes its DNS-01 challenge records there." } },
  { id: "box", label: "Box", zone: "external", x: 20, y: 280,
    text: { fr: "La box de l'opérateur. Elle redirige le web vers l'entrée du cluster et le VPN vers l'hôte. Rien d'autre n'est ouvert.",
            en: "The ISP router. It forwards web traffic to the cluster entry and the VPN to the host. Nothing else is open." } },
  { id: "admin", label: "Admin", zone: "external", x: 20, y: 600,
    text: { fr: "Mon poste. Je passe par le VPN, et chaque outil d'administration me demande un login Pocket-ID.",
            en: "My laptop. I go through the VPN, and every admin tool asks for a Pocket-ID login." } },
  { id: "github", label: "GitHub", zone: "external", x: 1090, y: 40, tech: ["Renovate"],
    text: { fr: "Les deux dépôts publics. Flux lit homelab-cluster. Renovate y ouvre les mises à jour d'images, de charts et d'entrées du flake.",
            en: "The two public repositories. Flux reads homelab-cluster. Renovate opens the image, chart and flake input updates there." } },
  { id: "letsencrypt", label: "Let's Encrypt", zone: "external", x: 1090, y: 160,
    text: { fr: "Délivre le certificat wildcard du domaine. La preuve passe par le DNS, donc aucun port en plus n'est ouvert pour ça.",
            en: "Issues the domain's wildcard certificate. The proof goes through DNS, so no extra port is opened for it." } },
  { id: "healthchecks", label: "Healthchecks.io", zone: "external", x: 1090, y: 600,
    text: { fr: "Reçoit un signal permanent d'Alertmanager. Si le signal s'arrête, c'est la chaîne d'alerte qui est tombée, et Healthchecks.io m'écrit.",
            en: "Receives a constant signal from Alertmanager. If the signal stops, the alerting chain itself is down, and Healthchecks.io emails me." } },
  { id: "mail", label: "E-mail", zone: "external", x: 1090, y: 700, tech: ["SPF", "DKIM", "DMARC"],
    text: { fr: "Les alertes arrivent par mail. Le domaine d'envoi passe SPF, DKIM et DMARC, pour que les mails ne finissent pas en spam.",
            en: "Alerts arrive by email. The sending domain passes SPF, DKIM and DMARC, so the mail does not end up as spam." } },

  // The k3s cluster, inside microVMs on the host.
  { id: "vms", label: "3 microVMs k3s", zone: "cluster", x: 255, y: 95, tech: ["microvm.nix", "k3s"],
    text: { fr: "Un serveur et deux agents k3s, dans des microVMs. Pas d'image disque et une racine en tmpfs. Seules l'identité du nœud et les données k3s sont gardées, sur l'hôte.",
            en: "One k3s server and two agents, in microVMs. No disk image and a tmpfs root. Only the node identity and the k3s data are kept, on the host." } },
  { id: "cilium", label: "Cilium", zone: "cluster", x: 450, y: 95, tech: ["eBPF", "Hubble"],
    text: { fr: "Le réseau du cluster, à la place de flannel et de kube-proxy. Il chiffre le trafic entre les nœuds en WireGuard et applique les network policies. Hubble montre chaque flux.",
            en: "The cluster network, in place of flannel and kube-proxy. It encrypts node-to-node traffic with WireGuard and enforces the network policies. Hubble shows every flow." } },
  { id: "flux", label: "Flux", zone: "cluster", x: 645, y: 95, tech: ["GitOps"],
    text: { fr: "Applique le dépôt homelab-cluster dans un ordre fixe : contrôleurs, configuration, applications. Personne ne fait de kubectl apply.",
            en: "Applies the homelab-cluster repository in a fixed order: controllers, configuration, apps. Nobody runs kubectl apply." } },
  { id: "headlamp", label: "Headlamp", zone: "platform", x: 840, y: 95,
    text: { fr: "Console web de Kubernetes. Le login passe par Pocket-ID et mes droits viennent de mon groupe.",
            en: "Kubernetes web console. Login goes through Pocket-ID and my rights come from my group." } },
  { id: "metallb", label: "MetalLB", zone: "platform", x: 255, y: 200,
    text: { fr: "Donne aux Services LoadBalancer une adresse sur le réseau local. C'est cette adresse que la box voit comme entrée du cluster.",
            en: "Gives LoadBalancer Services an address on the local network. The router sees that address as the cluster entry." } },
  { id: "traefik", label: "Traefik", zone: "platform", x: 450, y: 200, tech: ["Gateway API"],
    text: { fr: "Sert la Gateway API. Il termine TLS, redirige HTTP vers HTTPS et ajoute les en-têtes de sécurité. Les interfaces d'admin passent par une passerelle interne, non publique.",
            en: "Serves the Gateway API. It terminates TLS, redirects HTTP to HTTPS and adds the security headers. Admin interfaces sit on an internal gateway that is not public." } },
  { id: "certmanager", label: "cert-manager", zone: "platform", x: 645, y: 200,
    text: { fr: "Obtient et renouvelle le certificat wildcard Let's Encrypt, par challenge DNS-01 chez Cloudflare.",
            en: "Gets and renews the Let's Encrypt wildcard certificate through a DNS-01 challenge at Cloudflare." } },
  { id: "pocketid", label: "Pocket-ID", zone: "platform", x: 840, y: 200, tech: ["OIDC", "passkeys"],
    text: { fr: "Fournisseur d'identité OIDC, avec passkeys uniquement. Grafana, OpenBao, kubectl et Headlamp l'utilisent. Les droits viennent des groupes.",
            en: "OIDC identity provider, passkeys only. Grafana, OpenBao, kubectl and Headlamp use it. Rights come from groups." } },
  { id: "alloy", label: "Grafana Alloy", zone: "platform", x: 255, y: 305,
    text: { fr: "Un collecteur par nœud. Il récupère les métriques et les logs des pods de son nœud et les envoie aux bases de l'hôte.",
            en: "One collector per node. It gathers the metrics and logs of the pods on its node and sends them to the host's databases." } },
  { id: "grafana", label: "Grafana", zone: "platform", x: 450, y: 305,
    text: { fr: "Les tableaux de bord, sur les métriques et les logs de l'hôte. Il sert à lire, pas à alerter. Login par Pocket-ID.",
            en: "Dashboards over the metrics and logs stored on the host. It is for reading; alerting happens elsewhere. Login through Pocket-ID." } },
  { id: "eso", label: "External Secrets", zone: "platform", x: 645, y: 305,
    text: { fr: "Copie les secrets d'OpenBao dans des Secrets Kubernetes. Un namespace ne lit que les secrets à son nom.",
            en: "Copies secrets from OpenBao into Kubernetes Secrets. A namespace can only read the secrets under its own name." } },
  { id: "openbao", label: "OpenBao", zone: "platform", x: 840, y: 305,
    text: { fr: "Le coffre à secrets, fork open source de Vault. Il garde les secrets des applications et génère puis change les mots de passe PostgreSQL.",
            en: "The secret store, an open source fork of Vault. It keeps the apps' secrets and generates, then rotates, the PostgreSQL passwords." } },
  { id: "site", label: "abe.lc", zone: "app", x: 255, y: 410,
    text: { fr: "Une page texte courte à la racine du domaine.",
            en: "A short plain-text page at the root of the domain." } },
  { id: "vitrine", label: "vitrine", zone: "app", x: 450, y: 410, tech: ["Astro", "nginx"],
    text: { fr: "Ce site. Une image nginx non root construite par Nix, publiée par la CI à chaque version.",
            en: "This site. A non-root nginx image built by Nix and published by CI for each version." } },
  { id: "gatus", label: "Gatus", zone: "app", x: 645, y: 410,
    text: { fr: "La page de statut publique. Elle teste les services à intervalle régulier et garde l'historique.",
            en: "The public status page. It checks the services at a regular interval and keeps the history." } },
  { id: "umami", label: "Umami", zone: "app", x: 840, y: 410,
    text: { fr: "La mesure d'audience de ce site, sans cookie. Seuls le script et la réception des visites sont publics, le tableau de bord reste interne. Les données sont dans PostgreSQL.",
            en: "This site's analytics, without cookies. Only the script and the endpoint receiving visits are public; the dashboard stays internal. The data is in PostgreSQL." } },

  // Services on the host, outside the cluster.
  { id: "storage", label: "Stockage NFS", zone: "host", x: 255, y: 530, tech: ["btrfs", "btrbk"],
    text: { fr: "Les volumes des pods sont des partages NFS servis par l'hôte, sur btrfs. btrbk fait un snapshot toutes les heures.",
            en: "Pod volumes are NFS shares served by the host, on btrfs. btrbk takes a snapshot every hour." } },
  { id: "postgres", label: "PostgreSQL", zone: "host", x: 450, y: 530,
    text: { fr: "La base des applications, sur l'hôte. OpenBao crée et change les mots de passe. Personne ne les connaît.",
            en: "The apps' database, on the host. OpenBao creates and rotates the passwords. Nobody knows them." } },
  { id: "vmstack", label: "VictoriaMetrics", zone: "host", x: 645, y: 530, tech: ["VictoriaLogs"],
    text: { fr: "VictoriaMetrics garde les métriques et VictoriaLogs les logs, dont l'audit de l'API Kubernetes et les journaux des nœuds. Ils tournent sur l'hôte pour survivre à une panne du cluster.",
            en: "VictoriaMetrics stores the metrics and VictoriaLogs the logs, including the Kubernetes API audit and the node journals. They run on the host so they survive a cluster outage." } },
  { id: "alerting", label: "Alertmanager", zone: "host", x: 840, y: 530, tech: ["vmalert"],
    text: { fr: "vmalert évalue les règles sur les métriques. Alertmanager regroupe les alertes, les envoie par mail et émet le signal vers Healthchecks.io.",
            en: "vmalert evaluates the rules on the metrics. Alertmanager groups the alerts, emails them and sends the signal to Healthchecks.io." } },
  { id: "nixos", label: "NixOS · flake", zone: "host", x: 255, y: 640,
    text: { fr: "Un seul flake décrit l'hôte, ses disques, son réseau, les VMs et les services de l'hôte. Un fichier de topologie liste les machines et les nœuds. La CI vérifie le flake à chaque push.",
            en: "One flake describes the host, its disks, its network, the VMs and the host services. A topology file lists the machines and the nodes. CI checks the flake on every push." } },
  { id: "deployrs", label: "deploy-rs", zone: "host", x: 450, y: 640,
    text: { fr: "Déploie la configuration de l'hôte. Si l'hôte ne répond plus après l'activation, il revient tout seul à la version précédente.",
            en: "Deploys the host configuration. If the host stops answering after activation, it rolls back to the previous version by itself." } },
  { id: "wireguard", label: "VPN WireGuard", zone: "host", x: 645, y: 640,
    text: { fr: "Le seul accès d'administration. Il tourne sur l'hôte et reste disponible quand le cluster est en panne.",
            en: "The only admin access. It runs on the host and stays up when the cluster is down." } },
  { id: "sops", label: "sops", zone: "host", x: 840, y: 640, tech: ["age"],
    text: { fr: "Chiffre dans git les rares secrets du démarrage, comme la clé qui déverrouille OpenBao. Tout le reste est dans OpenBao.",
            en: "Encrypts the few bootstrap secrets in git, such as the key that unseals OpenBao. Everything else lives in OpenBao." } },
];

/** Containers drawn behind the blocks. */
export const frames = [
  { id: "host", label: "nuc1 · NixOS", x: 215, y: 20, w: 850, h: 720 },
  { id: "cluster", label: "k3s", x: 235, y: 60, w: 810, h: 430 },
];

/** Light background links. */
export const links: [string, string][] = [
  ["internet", "cloudflare"], ["internet", "box"], ["box", "metallb"], ["metallb", "traefik"],
  ["traefik", "vitrine"], ["traefik", "gatus"], ["traefik", "site"],
  ["certmanager", "letsencrypt"], ["certmanager", "cloudflare"], ["flux", "github"],
  ["admin", "wireguard"], ["admin", "deployrs"], ["deployrs", "nixos"],
  ["eso", "openbao"], ["openbao", "postgres"], ["pocketid", "postgres"],
  ["alloy", "vmstack"], ["grafana", "vmstack"], ["alerting", "vmstack"],
  ["alerting", "mail"], ["alerting", "healthchecks"], ["vms", "storage"], ["vms", "cilium"],
  ["traefik", "umami"], ["umami", "postgres"],
];

export type Path = {
  id: string;
  title: L10n;
  steps: { from: string; to: string; text: L10n }[];
};

export const paths: Path[] = [
  {
    id: "https",
    title: { fr: "Une requête HTTPS", en: "An HTTPS request" },
    steps: [
      { from: "internet", to: "cloudflare", text: { fr: "Le navigateur demande l'adresse du site. Cloudflare répond avec l'IP publique de la box.", en: "The browser asks for the site's address. Cloudflare answers with the router's public IP." } },
      { from: "internet", to: "box", text: { fr: "La requête arrive sur la box, qui la renvoie vers l'entrée du cluster.", en: "The request reaches the router, which forwards it to the cluster entry." } },
      { from: "box", to: "metallb", text: { fr: "MetalLB porte cette adresse et la livre à un nœud.", en: "MetalLB holds that address and hands the traffic to a node." } },
      { from: "metallb", to: "traefik", text: { fr: "Traefik termine TLS avec le certificat wildcard et ajoute les en-têtes de sécurité.", en: "Traefik terminates TLS with the wildcard certificate and adds the security headers." } },
      { from: "traefik", to: "vitrine", text: { fr: "La route du site envoie la requête à l'un des deux pods nginx, qui sert la page. Sa network policy n'accepte que Traefik et ne laisse rien sortir.", en: "The site's route sends the request to one of the two nginx pods, which serves the page. Its network policy only accepts Traefik and lets nothing out." } },
    ],
  },
  {
    id: "sso",
    title: { fr: "Un login SSO", en: "An SSO login" },
    steps: [
      { from: "admin", to: "wireguard", text: { fr: "J'ouvre Grafana depuis le VPN. Les interfaces d'admin ne sont pas publiques.", en: "I open Grafana from the VPN. Admin interfaces are not public." } },
      { from: "wireguard", to: "traefik", text: { fr: "La passerelle interne de Traefik transmet la requête.", en: "Traefik's internal gateway passes the request on." } },
      { from: "traefik", to: "grafana", text: { fr: "Grafana n'a pas de compte local. Il me renvoie vers Pocket-ID.", en: "Grafana has no local account. It sends me to Pocket-ID." } },
      { from: "grafana", to: "pocketid", text: { fr: "Pocket-ID demande une passkey, puis rend un jeton OIDC avec mes groupes.", en: "Pocket-ID asks for a passkey, then returns an OIDC token with my groups." } },
      { from: "pocketid", to: "grafana", text: { fr: "Grafana donne les droits du groupe. kubectl, OpenBao et Headlamp suivent le même chemin.", en: "Grafana grants the group's rights. kubectl, OpenBao and Headlamp follow the same route." } },
    ],
  },
  {
    id: "secret",
    title: { fr: "Un secret qui arrive dans un pod", en: "A secret reaching a pod" },
    steps: [
      { from: "openbao", to: "postgres", text: { fr: "OpenBao crée le compte de base de Pocket-ID et change son mot de passe à intervalle régulier.", en: "OpenBao creates Pocket-ID's database account and rotates its password at a regular interval." } },
      { from: "eso", to: "openbao", text: { fr: "External Secrets s'authentifie avec le compte de service du namespace. La politique ne lui ouvre que ce namespace.", en: "External Secrets authenticates with the namespace's service account. The policy only opens that namespace to it." } },
      { from: "eso", to: "pocketid", text: { fr: "Il écrit un Secret Kubernetes et le rafraîchit. Le pod de Pocket-ID le lit, sans que le mot de passe passe par git ou par moi.", en: "It writes a Kubernetes Secret and keeps it fresh. The Pocket-ID pod reads it, and the password never goes through git or through me." } },
    ],
  },
  {
    id: "alert",
    title: { fr: "Une alerte", en: "An alert" },
    steps: [
      { from: "alloy", to: "vmstack", text: { fr: "Alloy envoie les métriques et les logs du nœud vers l'hôte.", en: "Alloy sends the node's metrics and logs to the host." } },
      { from: "vmstack", to: "alerting", text: { fr: "vmalert évalue les règles sur VictoriaMetrics. Une règle se déclenche.", en: "vmalert evaluates the rules on VictoriaMetrics. A rule fires." } },
      { from: "alerting", to: "mail", text: { fr: "Alertmanager regroupe les alertes et m'envoie un mail.", en: "Alertmanager groups the alerts and emails me." } },
      { from: "alerting", to: "healthchecks", text: { fr: "En parallèle, il envoie un signal permanent à Healthchecks.io. Si l'hôte tombe, le signal s'arrête et Healthchecks.io prévient à sa place.", en: "In parallel, it sends a constant signal to Healthchecks.io. If the host goes down, the signal stops and Healthchecks.io warns me instead." } },
    ],
  },
  {
    id: "deploy",
    title: { fr: "Un déploiement", en: "A deployment" },
    steps: [
      { from: "github", to: "flux", text: { fr: "Un commit arrive sur homelab-cluster, de moi ou de Renovate. Flux le récupère.", en: "A commit lands on homelab-cluster, from me or from Renovate. Flux pulls it." } },
      { from: "flux", to: "vitrine", text: { fr: "Flux applique le changement. Kubernetes remplace les pods un par un.", en: "Flux applies the change. Kubernetes replaces the pods one at a time." } },
      { from: "admin", to: "deployrs", text: { fr: "Côté hôte, je lance deploy-rs.", en: "On the host side, I run deploy-rs." } },
      { from: "deployrs", to: "nixos", text: { fr: "La nouvelle configuration NixOS s'active. Si l'hôte ne répond plus, elle est annulée.", en: "The new NixOS configuration activates. If the host stops answering, it is rolled back." } },
    ],
  },
];

export const layers: { id: string; title: L10n; text: L10n; blocks: string[] }[] = [
  { id: "base", title: { fr: "NixOS et microVMs", en: "NixOS and microVMs" },
    text: { fr: "Un flake décrit l'hôte et les VMs. Tout ce qui garde un état tourne ici, hors du cluster.", en: "A flake describes the host and the VMs. Everything that keeps state runs here, outside the cluster." },
    blocks: ["nixos", "deployrs", "storage", "postgres", "vmstack", "alerting", "wireguard", "sops", "vms"] },
  { id: "k3s", title: { fr: "k3s et Flux", en: "k3s and Flux" },
    text: { fr: "Trois nœuds k3s reliés par Cilium. Flux applique le dépôt homelab-cluster.", en: "Three k3s nodes linked by Cilium. Flux applies the homelab-cluster repository." },
    blocks: ["vms", "cilium", "flux"] },
  { id: "platform", title: { fr: "Plateforme", en: "Platform" },
    text: { fr: "Entrée réseau, certificats, identité, secrets et collecte. Chaque composant est épinglé dans git.", en: "Network entry, certificates, identity, secrets and collection. Every component is pinned in git." },
    blocks: ["metallb", "traefik", "certmanager", "pocketid", "openbao", "eso", "alloy", "grafana", "headlamp"] },
  { id: "apps", title: { fr: "Applications", en: "Apps" },
    text: { fr: "Un dossier par application : namespace, Deployment, Service et route.", en: "One folder per app: namespace, Deployment, Service and route." },
    blocks: ["vitrine", "gatus", "umami", "site"] },
];

export const principles: { title: L10n; text: L10n }[] = [
  { title: { fr: "Tout en code", en: "Everything as code" },
    text: { fr: "Hôte, VMs, cluster et applications sont dans deux dépôts publics. Un changement est un commit.", en: "Host, VMs, cluster and apps live in two public repositories. A change is a commit." } },
  { title: { fr: "VMs jetables", en: "Disposable VMs" },
    text: { fr: "Les VMs n'ont pas d'image disque. Bases, volumes et monitoring sont sur l'hôte.", en: "The VMs have no disk image. Databases, volumes and monitoring are on the host." } },
  { title: { fr: "Aucun secret en clair dans git", en: "No plaintext secret in git" },
    text: { fr: "sops chiffre les secrets de démarrage. Les autres sont dans OpenBao, et les mots de passe des bases n'existent que là.", en: "sops encrypts the bootstrap secrets. The others are in OpenBao, and the database passwords exist only there." } },
  { title: { fr: "Tout est refusé par défaut", en: "Everything is denied by default" },
    text: { fr: "Chaque namespace a une network policy Cilium qui refuse tout. Les flux permis sont écrits un par un dans git. Ce site, par exemple, ne joint rien, pas même le DNS.", en: "Every namespace has a Cilium network policy that denies everything. Allowed flows are written one by one in git. This site, for example, reaches nothing, not even DNS." } },
  { title: { fr: "Le monitoring survit au cluster", en: "Monitoring outlives the cluster" },
    text: { fr: "Métriques, logs et alertes tournent sur l'hôte. Si l'hôte tombe aussi, Healthchecks.io le voit.", en: "Metrics, logs and alerts run on the host. If the host goes down too, Healthchecks.io notices." } },
];

export const BLOCK_W = 180;
export const BLOCK_H = 60;
export const VIEW = { w: 1280, h: 760 };
