export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

const ui = {
  fr: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Ingénierie Systèmes, Réseaux et Sécurité · EPITA",
    "chassis.inv": "Thème",
    "chassis.inv.title": "Basculer le thème clair / sombre (I)",
    "chassis.cv": "CV.pdf",
    "skip": "Aller au contenu",

    "nav.index": "Accueil",
    "nav.homelab": "Homelab",
    "nav.config": "Config NixOS",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projets",
    "nav.resume": "CV",
    "nav.colophon": "Build",
    "nav.lang": "EN",

    "index.role": "Étudiant ingénieur en 5e année à l'EPITA (majeure Systèmes, Réseaux et Sécurité) et contributeur à La Forge.",
    "index.lead": "Je conçois et j'exploite mes propres infrastructures de bout en bout : un cluster Kubernetes sur microVMs NixOS sans disque, un réseau Cilium eBPF verrouillé par défaut, et un poste de travail éphémère en tmpfs.",
    "index.seeking": "Recherche de stage de fin d'études (6 mois, dès février 2027) : infrastructure, systèmes, sécurité.",
    "index.now": "En ce moment",
    "index.download": "CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Architecture et projets personnels",
    "index.registerIntro": "Trois systèmes que je construis et maintiens au quotidien, détaillés à travers leurs choix d'ingénierie inhabituels plutôt qu'un catalogue d'outils.",
    "index.read": "Lire la fiche et les schémas",
    "index.served": "Ce site est compilé par Nix et servi directement depuis le cluster k3s de mon homelab.",

    "focus.title": "Focus techniques",
    "focus.vms.title": "MicroVMs sans disque (tmpfs) gérées par Nix",
    "focus.vms.body": "Un unique fichier topology.nix génère trois microVMs QEMU via microvm.nix. Leur racine est montée en tmpfs sans image disque : seuls l'identité du nœud et l'état k3s traversent vers le pool btrfs de l'hôte. Le monitoring tourne hors du cluster, directement sur l'hôte NixOS.",
    "focus.net.title": "Flux réseau Kubernetes en eBPF et sécurité zero-trust",
    "focus.net.body": "Cilium chiffre le trafic inter-nœuds en WireGuard et applique une politique default-deny dans chaque namespace. Les mots de passe PostgreSQL sont générés et tournés par OpenBao sans être connus d'aucun humain, et l'authentification passe exclusivement par Pocket-ID avec des passkeys.",
    "focus.imp.title": "Poste NixOS éphémère sur tmpfs et wrapper-modules",
    "focus.imp.body": "Au démarrage (Secure Boot lanzaboote + LUKS déverrouillé par TPM2), la racine / est un tmpfs qui s'efface à chaque extinction. Les outils (nvim, kitty, tmux, zsh) n'utilisent pas home-manager : chacun embarque sa configuration dans le store Nix via nix-wrapper-modules.",

    "systems.title": "Projets",
    "systems.intro": "Trois systèmes construits et exploités en continu : un homelab NixOS/k3s, une configuration de poste en tmpfs, et la chaîne de livraison de ce site.",
    "systems.repo": "Dépôt",
    "systems.stack": "Stack",
    "systems.facts": "Spécifications",
    "systems.highlights": "Choix d'architecture",
    "systems.details": "Schéma d'architecture",
    "systems.back": "Tous les projets",
    "systems.prev": "Précédent",
    "systems.next": "Suivant",
    "systems.notes": "Notes techniques",
    "systems.notesSoon": "Les prochains retours d'expérience et décisions d'architecture (ADR) seront publiés ici.",

    "resume.title": "Curriculum Vitae",
    "resume.intro": "Parcours professionnel, formation à l'EPITA, compétences techniques et engagements associatifs.",
    "resume.print": "Imprimer en A4",
    "resume.experience": "Expériences professionnelles",
    "resume.education": "Formation",
    "resume.skills": "Compétences techniques",
    "resume.associations": "Engagements associatifs",
    "resume.interests": "Centres d'intérêt",
    "resume.spoken": "Langues",
    "resume.downloads": "Télécharger le CV",
    "since": "depuis",
    "to": "à",

    "colophon.title": "Informations de build",
    "colophon.intro": "Ce site est empaqueté par Nix, servi par un conteneur nginx non privilégié (65534) et hébergé sur un Intel NUC à domicile.",
    "colophon.build": "Build actif",
    "colophon.chain": "Production",
    "colophon.keys": "Raccourcis clavier",
    "colophon.type": "Typographie",
    "colophon.audio": "Synthétiseur",
    "colophon.version": "Version",
    "colophon.revision": "Commit",
    "colophon.date": "Date",
    "colophon.image": "Image OCI",
    "colophon.csp": "CSP",
    "colophon.built": "compilé le",
    "colophon.stack": "Astro, Nix, nginx sur k3s (homelab).",
    "colophon.source": "Code source",
    "colophon.audioText": "Émulateur de Roland TB-303 en Web Audio (AudioWorklet).",
    "colophon.typeText": "Geist Variable pour le texte et Geist Mono Variable pour les données techniques.",

    "help.key.poles": "Naviguer entre l'accueil et les projets",
    "help.key.layers": "Parcourir les sections",
    "help.key.inv": "Basculer entre thème clair et sombre",
    "help.key.lang": "Changer de langue (FR / EN)",

    "vtr.nav": "303",
    "vtr.lead": "Un synthétiseur TB-303 minimaliste en Web Audio (AudioWorklet), avec séquenceur 16 pas.",
    "vtr.voice": "Voix",
    "vtr.length": "pas",
    "vtr.play": "▶ lecture",
    "vtr.stop": "■ stop",
    "vtr.saw": "dents de scie",
    "vtr.square": "carré",
    "vtr.steps": "Séquenceur",
    "vtr.step": "Pas",
    "vtr.up": "octave +",
    "vtr.down": "octave -",
    "vtr.rest": "silence",
    "vtr.keyboard": "Clavier",
    "vtr.random": "générer",
    "vtr.clear": "effacer",
    "vtr.share": "copier le lien",
    "vtr.copied": "lien copié",
    "vtr.unsupported": "Ce navigateur ne prend pas en charge AudioWorklet.",
    "vtr.nojs": "La 303 nécessite JavaScript (Web Audio).",

    "notfound": "Cette page n'existe pas.",
    "notfound.hint": "Retour à l'accueil",
  },
  en: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Systems, Networks and Security Engineering · EPITA",
    "chassis.inv": "Theme",
    "chassis.inv.title": "Switch light / dark theme (I)",
    "chassis.cv": "CV.pdf",
    "skip": "Skip to content",

    "nav.index": "Overview",
    "nav.homelab": "Homelab",
    "nav.config": "NixOS Config",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projects",
    "nav.resume": "CV",
    "nav.colophon": "Build",
    "nav.lang": "FR",

    "index.role": "Fifth-year engineering student at EPITA (Systems, Networks and Security major) and contributor at La Forge.",
    "index.lead": "I design and operate my own infrastructure end-to-end: a Kubernetes cluster running on diskless NixOS microVMs, a default-deny Cilium eBPF network, and an ephemeral tmpfs workstation.",
    "index.seeking": "Looking for a 6-month end-of-studies internship starting February 2027: infrastructure, systems, security.",
    "index.now": "Currently",
    "index.download": "CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Architecture and personal projects",
    "index.registerIntro": "Three systems I build and run daily, documented through their unusual engineering decisions rather than a generic list of tools.",
    "index.read": "Read specification and diagrams",
    "index.served": "This site is built with Nix and served directly from my homelab k3s cluster.",

    "focus.title": "Technical highlights",
    "focus.vms.title": "Declarative diskless microVMs (tmpfs) managed by Nix",
    "focus.vms.body": "A single topology.nix file generates three QEMU microVMs via microvm.nix. Their root filesystem runs in tmpfs with no disk image: only node identity and k3s state persist to the host btrfs pool. Monitoring runs directly on the NixOS host, surviving cluster failures.",
    "focus.net.title": "Kubernetes eBPF network flows and zero-trust security",
    "focus.net.body": "Cilium encrypts node-to-node traffic with WireGuard and enforces default-deny policies in every namespace. PostgreSQL credentials are created and rotated by OpenBao without human knowledge, and authentication relies exclusively on Pocket-ID with passkeys.",
    "focus.imp.title": "Ephemeral NixOS workstation on tmpfs and wrapper-modules",
    "focus.imp.body": "At boot (lanzaboote Secure Boot + TPM2-unlocked LUKS), the root / is mounted as tmpfs and wiped on every reboot. User programs (nvim, kitty, tmux, zsh) skip home-manager: each binary bundles its own configuration in the Nix store via nix-wrapper-modules.",

    "systems.title": "Projects",
    "systems.intro": "Three systems built and operated continuously: a NixOS/k3s homelab, a tmpfs workstation flake, and the reproducible delivery pipeline for this site.",
    "systems.repo": "Repository",
    "systems.stack": "Stack",
    "systems.facts": "Specifications",
    "systems.highlights": "Architectural decisions",
    "systems.details": "Architecture diagram",
    "systems.back": "All projects",
    "systems.prev": "Previous",
    "systems.next": "Next",
    "systems.notes": "Engineering notes",
    "systems.notesSoon": "Upcoming architecture decision records (ADRs) and post-mortems will be published here.",

    "resume.title": "Curriculum Vitae",
    "resume.intro": "Professional experience, engineering coursework at EPITA, technical skills, and student organizations.",
    "resume.print": "Print A4",
    "resume.experience": "Work experience",
    "resume.education": "Education",
    "resume.skills": "Technical skills",
    "resume.associations": "Organizations",
    "resume.interests": "Interests",
    "resume.spoken": "Languages",
    "resume.downloads": "Download CV",
    "since": "since",
    "to": "to",

    "colophon.title": "Build information",
    "colophon.intro": "This site is packaged with Nix, served by an unprivileged nginx container (65534), and hosted at home on an Intel NUC.",
    "colophon.build": "Active build",
    "colophon.chain": "Production",
    "colophon.keys": "Keyboard shortcuts",
    "colophon.type": "Typography",
    "colophon.audio": "Synthesizer",
    "colophon.version": "Version",
    "colophon.revision": "Commit",
    "colophon.date": "Date",
    "colophon.image": "OCI image",
    "colophon.csp": "CSP",
    "colophon.built": "built on",
    "colophon.stack": "Astro, Nix, nginx on k3s (homelab).",
    "colophon.source": "Source code",
    "colophon.audioText": "Roland TB-303 emulator in Web Audio (AudioWorklet).",
    "colophon.typeText": "Geist Variable for prose and Geist Mono Variable for technical values.",

    "help.key.poles": "Navigate between overview and projects",
    "help.key.layers": "Move across sections",
    "help.key.inv": "Toggle light and dark theme",
    "help.key.lang": "Switch language (FR / EN)",

    "vtr.nav": "303",
    "vtr.lead": "A minimal TB-303 bass synthesizer in Web Audio (AudioWorklet), with a 16-step sequencer.",
    "vtr.voice": "Voice",
    "vtr.length": "steps",
    "vtr.play": "▶ play",
    "vtr.stop": "■ stop",
    "vtr.saw": "sawtooth",
    "vtr.square": "square",
    "vtr.steps": "Sequencer",
    "vtr.step": "Step",
    "vtr.up": "octave +",
    "vtr.down": "octave -",
    "vtr.rest": "rest",
    "vtr.keyboard": "Keyboard",
    "vtr.random": "generate",
    "vtr.clear": "clear",
    "vtr.share": "copy link",
    "vtr.copied": "link copied",
    "vtr.unsupported": "This browser does not support AudioWorklet.",
    "vtr.nojs": "The 303 needs JavaScript (Web Audio).",

    "notfound": "This page does not exist.",
    "notfound.hint": "Back home",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["fr"];

export const t = (lang: Lang, key: UiKey): string => ui[lang][key];
export const l = (value: L10n, lang: Lang): string => value[lang];

export const home = (lang: Lang): string => (lang === "fr" ? "/" : "/en/");

export interface NavItem {
  key: "index" | "homelab" | "config" | "vitrine" | "resume";
  label: string;
  href: string;
}

export const systemsUrl = (lang: Lang, slug?: string): string => {
  const base = lang === "fr" ? "/systemes/" : "/en/systems/";
  return slug ? `${base}${slug}/` : base;
};
export const resumeUrl = (lang: Lang): string => (lang === "fr" ? "/parcours/" : "/en/resume/");
export const colophonUrl = (lang: Lang): string => (lang === "fr" ? "/colophon/" : "/en/colophon/");

export function navItems(lang: Lang): NavItem[] {
  return [
    { key: "index", label: t(lang, "nav.index"), href: home(lang) },
    { key: "homelab", label: t(lang, "nav.homelab"), href: systemsUrl(lang, "homelab") },
    { key: "config", label: t(lang, "nav.config"), href: systemsUrl(lang, "config") },
    { key: "vitrine", label: t(lang, "nav.vitrine"), href: systemsUrl(lang, "vitrine") },
    { key: "resume", label: t(lang, "nav.resume"), href: `${home(lang)}#cv` },
  ];
}

export interface Pole {
  n: string;
  key: "index" | "systems" | "resume" | "colophon";
  label: string;
  href: string;
}

export function poles(lang: Lang): Pole[] {
  return [
    { n: "01", key: "index", label: t(lang, "nav.index"), href: home(lang) },
    { n: "02", key: "systems", label: t(lang, "nav.systems"), href: systemsUrl(lang) },
    { n: "03", key: "resume", label: t(lang, "nav.resume"), href: resumeUrl(lang) },
  ];
}

export const synthUrl = (lang: Lang): string => (lang === "fr" ? "/303/" : "/en/303/");

const months = {
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export function month(value: string, lang: Lang): string {
  const [y, m] = value.split("-");
  return m ? `${months[lang][Number(m) - 1]} ${y}` : y;
}

export function period(start: string, end: string | null, lang: Lang): string {
  if (!end) return `${t(lang, "since")} ${month(start, lang)}`;
  return `${month(start, lang)} ${t(lang, "to")} ${month(end, lang)}`;
}
