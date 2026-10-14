export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

const ui = {
  fr: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Systèmes, Réseaux, Sécurité & Infrastructure · EPITA",
    "chassis.inv": "Thème",
    "chassis.inv.title": "Basculer le thème",
    "chassis.cv": "CV (PDF)",
    skip: "Aller au contenu",

    "nav.index": "À propos",
    "nav.homelab": "Homelab",
    "nav.config": "Config NixOS",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projets",
    "nav.resume": "CV",
    "nav.studies": "Études",
    "nav.colophon": "Build",
    "nav.lang": "EN",

    "index.title": "À propos",
    "index.p1":
      "Je suis en dernière année à l'EPITA, en majeure Systèmes, Réseaux et Sécurité. Je travaille aussi à temps partiel pour l'école, à La Forge, l'équipe qui s'occupe des besoins IT de la pédagogie.",
    "index.p2":
      "Nous développons les services de l'école (l'intranet utilisé pour la piscine, le Moodle, l'annuaire des étudiants), nous les hébergeons dans un datacenter en colocation à Ivry et nous mettons à disposition le parc informatique de l'EPITA (PIE).",
    "index.p3":
      "J'utilise Nix pour décrire des machines entières : au travail pour le parc PIE, qui démarre en netboot sur des images NixOS, et chez moi pour mon portable et un homelab sous Kubernetes.",
    "index.p4":
      "Je cherche un stage de fin d'études de six mois à partir de février 2027, en systèmes, infrastructure ou sécurité. N'hésitez pas à me contacter.",

    "index.role":
      "Dernière année à l'EPITA (Systèmes, Réseaux, Sécurité), employé à temps partiel à La Forge.",
    "index.lead":
      "En dernière année à l'EPITA et employé à temps partiel à La Forge, où je développe et héberge les services de l'école et construis les images NixOS de son parc informatique.",
    "index.seeking":
      "Je cherche un stage de fin d'études de 6 mois à partir de février 2027.",
    "index.now": "En ce moment",
    "index.download": "Télécharger le CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projets",
    "index.registerIntro":
      "Mon homelab et la configuration de mon ordinateur portable, où je teste des idées autour de NixOS, Kubernetes et de la gestion de l'état.",
    "index.read": "LIRE",
    "index.served": "",
    "index.tech": "technologies",

    "focus.title": "Focus techniques",
    "focus.vms.title": "MicroVMs sans disque (tmpfs)",
    "focus.vms.body":
      "Trois microVMs QEMU générées depuis un seul fichier topology.nix, montées en RAM sans image disque.",
    "focus.net.title": "Réseau Cilium eBPF et identité sans mot de passe",
    "focus.net.body":
      "Politiques default-deny par namespace, secrets tournés par OpenBao et authentification passkeys via Pocket-ID.",
    "focus.imp.title": "Poste NixOS éphémère en tmpfs",
    "focus.imp.body":
      "Racine effacée à chaque extinction et outils autonomes empaquetés via nix-wrapper-modules.",

    "systems.title": "Projets",
    "systems.intro":
      "Mon homelab et la configuration de mon ordinateur portable, où je teste des idées autour de NixOS, Kubernetes et de la gestion de l'état.",
    "systems.repo": "Dépôt",
    "systems.stack": "Technologies",
    "systems.facts": "Fiche technique",
    "systems.highlights": "Points clés",
    "systems.details": "Architecture",
    "systems.back": "RETOUR",
    "systems.prev": "Précédent",
    "systems.next": "Suivant",
    "systems.notes": "Notes",
    "systems.notesSoon": "",

    "resume.title": "CV",
    "resume.profile": "Profil",
    "resume.intro":
      "En dernière année à l'EPITA (Systèmes, Réseaux, Sécurité & Infrastructure) et employé à temps partiel à La Forge depuis février 2026. J'y développe les services de l'école, je les héberge et je construis les images de son parc informatique. Je cherche un stage de fin d'études à partir de février 2027.",
    "resume.print": "Imprimer",
    "resume.experience": "Expérience professionnelle",
    "resume.education": "Formation",
    "resume.associations": "Engagement associatif",
    "resume.interests": "Centres d'intérêt",
    "resume.spoken": "Langues",
    "resume.downloads": "Télécharger le PDF",
    since: "depuis",
    to: "-",

    "studies.title": "Études",
    "studies.p1":
      "La majeure Systèmes, Réseaux et Sécurité (SRS) dure deux ans. ADLIN part d'un parc de serveurs Linux à administrer entièrement avec Ansible : rôles, playbooks, services et comptes sont écrits dans un dépôt avant d'exister sur une machine. ARS monte dans OpenStack une infrastructure fictive complète (contrôleur de domaine, serveur mail, PKI interne, mTLS), puis l'attaque et la défend, côté blue team comme côté red team.",
    "studies.p2":
      "La majeure traite aussi Windows. WINSEC explique le fonctionnement du noyau et des services, puis en tire le durcissement et l'administration sécurisée. AGDA porte sur Active Directory : les objets, les protocoles et les délégations d'un annuaire, puis l'investigation (forensic) d'un domaine compromis et sa remise en état.",
    "studies.p3":
      "Deux cours changent de point de vue. VIRO dissèque du code malveillant : anatomie d'une souche, rétro-ingénierie, obfuscation, écriture de détections. SOC apprend à remonter et corréler des événements, écrire des règles de détection, investiguer une alerte et répondre à un incident.",
    "studies.p4":
      "À La Forge et sur mon homelab, je fais surtout de l'infra. Ces cours me donnent l'autre point de vue, celui de l'attaquant et de l'analyste.",

    "colophon.title": "Informations",
    "colophon.intro": "Site statique construit avec Astro et Nix.",
    "colophon.build": "Build",
    "colophon.chain": "Production",
    "colophon.keys": "Raccourcis",
    "colophon.type": "Typographie",
    "colophon.audio": "Synthétiseur",
    "colophon.version": "Version",
    "colophon.revision": "Commit",
    "colophon.date": "Date",
    "colophon.image": "Image OCI",
    "colophon.csp": "CSP",
    "colophon.built": "compilé le",
    "colophon.stack": "Astro, Nix, nginx.",
    "colophon.source": "GitHub",
    "colophon.audioText":
      "Émulateur de Roland TB-303 en Web Audio (AudioWorklet).",
    "colophon.typeText": "IBM Plex Sans et IBM Plex Mono.",

    "help.key.poles": "Naviguer entre les pages",
    "help.key.layers": "Parcourir les sections",
    "help.key.inv": "Basculer le thème",
    "help.key.lang": "Changer de langue (FR / EN)",

    "vtr.nav": "303",
    "vtr.lead":
      "Un synthétiseur TB-303 minimaliste en Web Audio (AudioWorklet), avec séquenceur 16 pas.",
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

    notfound: "Cette page n'existe pas.",
    "notfound.hint": "Retour à l'accueil",
  },
  en: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Systems, Networks, Security & Infrastructure · EPITA",
    "chassis.inv": "Theme",
    "chassis.inv.title": "Switch theme",
    "chassis.cv": "CV (PDF)",
    skip: "Skip to content",

    "nav.index": "About",
    "nav.homelab": "Homelab",
    "nav.config": "NixOS Config",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projects",
    "nav.resume": "CV",
    "nav.studies": "Studies",
    "nav.colophon": "Build",
    "nav.lang": "FR",

    "index.title": "About",
    "index.p1":
      "I am in my final year at EPITA, in the Systems, Networks and Security major. I also work part-time for the school at La Forge, the team that handles the IT needs of teaching.",
    "index.p2":
      "We develop the school's services (the intranet used for the piscine, Moodle, the student directory), host them in a colocated datacenter in Ivry, and provide EPITA's machine fleet (PIE).",
    "index.p3":
      "I use Nix to describe entire machines: at work for the PIE fleet, which boots over the network on NixOS images, and at home for my laptop and a Kubernetes homelab.",
    "index.p4":
      "I am looking for a six-month end-of-studies internship starting February 2027, in systems, infrastructure or security. Feel free to reach out.",

    "index.role":
      "Final year at EPITA (Systems, Networks, Security), part-time employee at La Forge.",
    "index.lead":
      "Final-year student at EPITA and part-time employee at La Forge, where I develop and host the school's services and build the NixOS images of its machine fleet.",
    "index.seeking":
      "Looking for a 6-month end-of-studies internship starting February 2027.",
    "index.now": "Currently",
    "index.download": "Download CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projects",
    "index.registerIntro":
      "My homelab and my laptop configuration, where I test ideas around NixOS, Kubernetes and state management.",
    "index.read": "READ",
    "index.served": "",
    "index.tech": "technologies",

    "focus.title": "Technical highlights",
    "focus.vms.title": "Diskless microVMs (tmpfs)",
    "focus.vms.body":
      "Three QEMU microVMs generated from a single topology.nix file, running in RAM with no disk image.",
    "focus.net.title": "Cilium eBPF networking and passwordless identity",
    "focus.net.body":
      "Default-deny namespace policies, credentials rotated by OpenBao, and passkey authentication via Pocket-ID.",
    "focus.imp.title": "Ephemeral tmpfs NixOS workstation",
    "focus.imp.body":
      "Root wiped on every shutdown and self-contained user tools packaged via nix-wrapper-modules.",

    "systems.title": "Projects",
    "systems.intro":
      "My homelab and my laptop configuration, where I test ideas around NixOS, Kubernetes and state management.",
    "systems.repo": "Repository",
    "systems.stack": "Technologies",
    "systems.facts": "Specifications",
    "systems.highlights": "Highlights",
    "systems.details": "Architecture",
    "systems.back": "BACK",
    "systems.prev": "Previous",
    "systems.next": "Next",
    "systems.notes": "Notes",
    "systems.notesSoon": "",

    "resume.title": "CV",
    "resume.profile": "Summary",
    "resume.intro":
      "Final year at EPITA (Systems, Networks, Security & Infrastructure) and part-time employee at La Forge since February 2026. I develop the school's services, host them, and build the images of its machine fleet. Looking for an end-of-studies internship starting February 2027.",
    "resume.print": "Print",
    "resume.experience": "Professional Experience",
    "resume.education": "Education",
    "resume.associations": "Associations",
    "resume.interests": "Interests",
    "resume.spoken": "Languages",
    "resume.downloads": "Download PDF",
    since: "Since",
    to: "-",

    "studies.title": "Studies",
    "studies.p1":
      "The Systems, Networks and Security (SRS) major lasts two years. ADLIN starts from a fleet of Linux servers to administer entirely with Ansible: roles, playbooks, services and accounts are written in a repository before they exist on a machine. ARS builds a complete fictional infrastructure in OpenStack (domain controller, mail server, internal PKI, mTLS), then attacks and defends it, as blue team one day and red team the next.",
    "studies.p2":
      "The major covers Windows too. WINSEC explains how the kernel and the services work, then derives hardening and secure administration from it. AGDA is about Active Directory: the objects, protocols and delegations of a directory, then the investigation (forensics) of a compromised domain and its restoration.",
    "studies.p3":
      "Two courses change the point of view. VIRO dissects malware: anatomy of a strain, reverse engineering, obfuscation, writing detections. SOC teaches collecting and correlating events, writing detection rules, triaging an alert and responding to an incident.",
    "studies.p4":
      "At La Forge and on my homelab, I mostly do infrastructure. These courses give me the other point of view, the attacker's and the analyst's.",

    "colophon.title": "Information",
    "colophon.intro": "Static site built with Astro and Nix.",
    "colophon.build": "Build",
    "colophon.chain": "Production",
    "colophon.keys": "Shortcuts",
    "colophon.type": "Typography",
    "colophon.audio": "Synthesizer",
    "colophon.version": "Version",
    "colophon.revision": "Commit",
    "colophon.date": "Date",
    "colophon.image": "OCI image",
    "colophon.csp": "CSP",
    "colophon.built": "built on",
    "colophon.stack": "Astro, Nix, nginx.",
    "colophon.source": "GitHub",
    "colophon.audioText": "Roland TB-303 emulator in Web Audio (AudioWorklet).",
    "colophon.typeText": "IBM Plex Sans and IBM Plex Mono.",

    "help.key.poles": "Navigate between pages",
    "help.key.layers": "Move across sections",
    "help.key.inv": "Toggle theme",
    "help.key.lang": "Switch language (FR / EN)",

    "vtr.nav": "303",
    "vtr.lead":
      "A minimal TB-303 bass synthesizer in Web Audio (AudioWorklet), with a 16-step sequencer.",
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

    notfound: "This page does not exist.",
    "notfound.hint": "Back home",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["fr"];

export const t = (lang: Lang, key: UiKey): string => ui[lang][key];
export const l = (value: L10n, lang: Lang): string => value[lang];

export const home = (lang: Lang): string => (lang === "fr" ? "/" : "/en/");

export interface NavItem {
  key: "index" | "studies" | "homelab" | "config" | "resume";
  label: string;
  href: string;
}

export const systemsUrl = (lang: Lang, slug?: string): string => {
  const base = lang === "fr" ? "/systemes/" : "/en/systems/";
  return slug ? `${base}${slug}/` : base;
};
export const resumeUrl = (lang: Lang): string =>
  lang === "fr" ? "/parcours/" : "/en/resume/";
export const studiesUrl = (lang: Lang): string =>
  lang === "fr" ? "/etudes/" : "/en/studies/";
export const colophonUrl = (lang: Lang): string =>
  lang === "fr" ? "/colophon/" : "/en/colophon/";

export function navItems(lang: Lang): NavItem[] {
  return [
    { key: "index", label: t(lang, "nav.index"), href: home(lang) },
    { key: "studies", label: t(lang, "nav.studies"), href: studiesUrl(lang) },
    {
      key: "homelab",
      label: t(lang, "nav.homelab"),
      href: systemsUrl(lang, "homelab"),
    },
    {
      key: "config",
      label: t(lang, "nav.config"),
      href: systemsUrl(lang, "config"),
    },
    { key: "resume", label: t(lang, "nav.resume"), href: resumeUrl(lang) },
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
    {
      n: "02",
      key: "systems",
      label: t(lang, "nav.systems"),
      href: systemsUrl(lang),
    },
    {
      n: "03",
      key: "resume",
      label: t(lang, "nav.resume"),
      href: resumeUrl(lang),
    },
  ];
}

export const synthUrl = (lang: Lang): string =>
  lang === "fr" ? "/303/" : "/en/303/";

const months = {
  fr: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export function month(value: string, lang: Lang): string {
  const [y, m] = value.split("-");
  return m ? `${months[lang][Number(m) - 1]} ${y}` : y;
}

export function period(start: string, end: string | null, lang: Lang): string {
  const present = lang === "fr" ? "Présent" : "Present";
  if (!end) return `${month(start, lang)} - ${present}`;
  return `${month(start, lang)} - ${month(end, lang)}`;
}
