import type { L10n } from "./i18n";

// The architecture drawn on each project page (components/Arch.astro): layers from the top
// (what you see) to the bottom (the machine), each with its parts. `logo` is a simple-icons
// slug or a file of src/logos.ts; `where` is the path in the project's repository.
// Every statement comes from the project page or from the repositories; update both together.
export type Part = { id: string; name: string; logo?: string; role: L10n; where?: string };
export type Layer = { name: L10n; parts: Part[] };

export const architectures: Record<string, Layer[]> = {
  homelab: [
    {
      name: { fr: "Applications", en: "Applications" },
      parts: [
        {
          id: "vitrine",
          name: "vitrine",
          logo: "nginx",
          role: {
            fr: "Ce site. Image nginx non privilégiée construite par Nix, 2 réplicas. Il ne joint rien, pas même le DNS.",
            en: "This site. An unprivileged nginx image built by Nix, 2 replicas. It reaches nothing, not even DNS.",
          },
          where: "homelab-cluster/apps/vitrine",
        },
        {
          id: "umami",
          name: "Umami",
          logo: "umami",
          role: { fr: "Mesure d'audience du site, sans cookie.", en: "Audience measurement for this site, without cookies." },
          where: "homelab-cluster/apps/umami",
        },
        {
          id: "gatus",
          name: "Gatus",
          logo: "gatus",
          role: { fr: "Page de statut.", en: "Status page." },
          where: "homelab-cluster/apps/gatus",
        },
      ],
    },
    {
      name: { fr: "Plateforme", en: "Platform" },
      parts: [
        {
          id: "flux",
          name: "Flux",
          logo: "flux",
          role: {
            fr: "Applique le dépôt homelab-cluster dans un ordre fixé par dependsOn : contrôleurs, puis configuration, puis applications.",
            en: "Applies the homelab-cluster repository in an order set by dependsOn: controllers, then configuration, then applications.",
          },
          where: "homelab-cluster/clusters/homelab",
        },
        {
          id: "traefik",
          name: "Traefik",
          logo: "traefikproxy",
          role: { fr: "Entrée HTTPS du cluster, avec HSTS et en-têtes de sécurité.", en: "HTTPS entry to the cluster, with HSTS and security headers." },
          where: "homelab-cluster/infrastructure/configs/traefik.yaml",
        },
        {
          id: "cert-manager",
          name: "cert-manager",
          logo: "cert-manager",
          role: { fr: "Certificat wildcard Let's Encrypt, obtenu par DNS-01.", en: "Wildcard Let's Encrypt certificate, obtained through DNS-01." },
          where: "homelab-cluster/infrastructure/configs/certificate.yaml",
        },
        {
          id: "openbao",
          name: "OpenBao",
          logo: "openbao",
          role: {
            fr: "Coffre des secrets. External Secrets les copie dans Kubernetes, chaque namespace ne lit que les siens. Il crée et change les mots de passe PostgreSQL.",
            en: "Secret store. External Secrets copies secrets into Kubernetes, each namespace reads only its own. It creates and rotates the PostgreSQL passwords.",
          },
          where: "homelab-cluster/infrastructure/configs/openbao",
        },
        {
          id: "pocket-id",
          name: "Pocket-ID",
          logo: "pocket-id",
          role: {
            fr: "Fournisseur OIDC, passkeys uniquement. Grafana, OpenBao, kubectl et Headlamp l'utilisent, sans compte local.",
            en: "OIDC provider, passkeys only. Grafana, OpenBao, kubectl and Headlamp use it, with no local accounts.",
          },
          where: "homelab-cluster/infrastructure/configs/pocket-id",
        },
        {
          id: "renovate",
          name: "Renovate",
          logo: "renovate",
          role: { fr: "Images et charts sont épinglés ; Renovate ouvre les pull requests de mise à jour.", en: "Images and charts are pinned; Renovate opens the update pull requests." },
          where: "homelab-cluster/renovate.json",
        },
      ],
    },
    {
      name: { fr: "Cluster", en: "Cluster" },
      parts: [
        {
          id: "k3s",
          name: "k3s",
          logo: "k3s",
          role: { fr: "Kubernetes sur les trois microVMs : un serveur, deux agents.", en: "Kubernetes on the three microVMs: one server, two agents." },
          where: "homelab-nix/modules/k3s",
        },
        {
          id: "cilium",
          name: "Cilium",
          logo: "cilium",
          role: {
            fr: "Réseau en eBPF, WireGuard entre les nœuds. Tout est refusé par défaut, chaque flux permis est écrit dans git.",
            en: "eBPF networking, WireGuard between nodes. Everything is denied by default, each allowed flow is written in git.",
          },
          where: "homelab-nix/modules/k3s/cilium.nix",
        },
      ],
    },
    {
      name: { fr: "microVMs", en: "microVMs" },
      parts: [
        {
          id: "microvm",
          name: "microvm.nix",
          logo: "qemu",
          role: {
            fr: "Trois VMs qemu générées depuis un seul fichier de topologie. Pas d'image disque : la racine est un tmpfs.",
            en: "Three qemu VMs generated from a single topology file. No disk image: the root is a tmpfs.",
          },
          where: "homelab-nix/modules/topology/topology.nix",
        },
      ],
    },
    {
      name: { fr: "Hôte", en: "Host" },
      parts: [
        {
          id: "nixos",
          name: "NixOS",
          logo: "nixos",
          role: { fr: "L'hôte entier est un flake, vérifié par nix flake check à chaque push.", en: "The whole host is a flake, checked by nix flake check on every push." },
          where: "homelab-nix/flake.nix",
        },
        {
          id: "deploy-rs",
          name: "deploy-rs",
          logo: "deploy-rs",
          role: {
            fr: "Déploie l'hôte. S'il ne répond plus après l'activation, il revient seul à la version précédente.",
            en: "Deploys the host. If it stops answering after activation, it rolls back on its own.",
          },
          where: "homelab-nix/modules/deploy.nix",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          logo: "postgresql",
          role: { fr: "Bases des applications, hors des VMs avec tout ce qui garde un état.", en: "Application databases, outside the VMs with everything that keeps state." },
        },
        {
          id: "victoria",
          name: "VictoriaMetrics",
          logo: "victoriametrics",
          role: {
            fr: "Métriques et logs sur l'hôte : le monitoring tourne même quand le cluster est en panne. Alertes par mail.",
            en: "Metrics and logs on the host: monitoring keeps running when the cluster is down. Alerts by email.",
          },
        },
      ],
    },
    {
      name: { fr: "Machine", en: "Machine" },
      parts: [
        {
          id: "nuc",
          name: "Intel NUC10i7FNH",
          logo: "intel",
          role: { fr: "12 threads, 16 Go de RAM, un SSD NVMe. Tout tourne dessus.", en: "12 threads, 16 GB of RAM, an NVMe SSD. Everything runs on it." },
        },
      ],
    },
  ],

  config: [
    {
      name: { fr: "Programmes", en: "Programs" },
      parts: [
        {
          id: "river",
          name: "river",
          logo: "river",
          role: { fr: "Compositeur Wayland, avec waybar.", en: "Wayland compositor, with waybar." },
          where: "modules/features/river",
        },
        {
          id: "kitty",
          name: "kitty",
          logo: "kitty",
          role: { fr: "Terminal. Comme chaque programme, il se lance seul : nix run .#kitty.", en: "Terminal. Like every program, it runs on its own: nix run .#kitty." },
          where: "modules/features/kitty",
        },
        {
          id: "nvim",
          name: "Neovim",
          logo: "neovim",
          role: { fr: "Éditeur, sa configuration est dans son paquet : nix run .#nvim.", en: "Editor, its configuration lives in its package: nix run .#nvim." },
          where: "modules/features/nvim",
        },
        {
          id: "zsh",
          name: "zsh",
          logo: "zsh",
          role: { fr: "Shell, avec tmux et starship.", en: "Shell, with tmux and starship." },
          where: "modules/features/zsh",
        },
      ],
    },
    {
      name: { fr: "Flake", en: "Flake" },
      parts: [
        {
          id: "import-tree",
          name: "flake-parts, import-tree",
          logo: "nixos",
          role: {
            fr: "Pas de liste de modules à maintenir : chaque fichier de modules/ est un module flake-parts.",
            en: "No module list to maintain: every file in modules/ is a flake-parts module.",
          },
          where: "modules/",
        },
        {
          id: "wrappers",
          name: "nix-wrapper-modules",
          logo: "nixos",
          role: { fr: "Remplace home-manager : chaque paquet embarque sa configuration.", en: "Replaces home-manager: each package carries its own configuration." },
          where: "modules/features",
        },
      ],
    },
    {
      name: { fr: "Système", en: "System" },
      parts: [
        {
          id: "preservation",
          name: "preservation",
          role: {
            fr: "Racine en tmpfs : ce qui n'est pas déclaré disparaît au redémarrage. Seuls /nix et /persistent survivent.",
            en: "tmpfs root: whatever is not declared is gone after a reboot. Only /nix and /persistent survive.",
          },
          where: "modules/system/impermanence",
        },
        {
          id: "sops",
          name: "sops-nix, YubiKey",
          logo: "yubico",
          role: {
            fr: "Secrets dans un dépôt chiffré séparé, déchiffrés avec la YubiKey ou la clé SSH de l'hôte.",
            en: "Secrets in a separate encrypted repository, decrypted with the YubiKey or the host's SSH key.",
          },
          where: "modules/flavors/secrets",
        },
      ],
    },
    {
      name: { fr: "Disque et démarrage", en: "Disk and boot" },
      parts: [
        {
          id: "disko",
          name: "disko",
          logo: "disko",
          role: { fr: "Disque déclaré : GPT, LUKS, btrfs.", en: "Declared disk: GPT, LUKS, btrfs." },
          where: "modules/hosts/thinkpad/_disko.nix",
        },
        {
          id: "lanzaboote",
          name: "lanzaboote",
          role: { fr: "Secure Boot. LUKS est déverrouillé par le TPM2.", en: "Secure Boot. LUKS is unlocked by the TPM2." },
          where: "modules/system/core/boot.nix",
        },
      ],
    },
    {
      name: { fr: "Machine", en: "Machine" },
      parts: [
        {
          id: "thinkpad",
          name: "ThinkPad",
          logo: "thinkpad",
          role: { fr: "Le seul hôte du flake aujourd'hui.", en: "The only host in the flake today." },
          where: "modules/hosts/thinkpad",
        },
      ],
    },
  ],
};
