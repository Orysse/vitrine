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
      "Je suis étudiant en dernière année à l'EPITA, en majeure Systèmes, Réseaux et Sécurité. Je travaille aussi à temps partiel à La Forge, l'équipe qui s'occupe de l'IT de la pédagogie.",
    "index.p2":
      "À La Forge, nous développons les services de l'école (l'intranet de la piscine, le Moodle, l'annuaire des étudiants), nous les hébergeons dans un datacenter en colocation à Ivry et nous gérons le parc de machines des salles, le PIE.",
    "index.p3":
      "SRS est une majeure infra, systèmes, réseaux et sécurité, avec un angle gestion du SI : le socle d'une entreprise, avec serveur mail, Windows, GPO, Active Directory, SOC, SIEM et CERT. À La Forge, ce sont des besoins métier précis, sur une infrastructure cloud native dans notre propre OpenStack. Je suis le seul de ma promo à la fois dans le parcours DevOps (celui de La Forge) et dans la majeure SRS.",
    "index.p4":
      "Je cherche un stage de fin d'études de six mois à partir de février 2027, en systèmes, infrastructure ou sécurité. Vous pouvez me contacter par mail.",

    "index.role":
      "Dernière année à l'EPITA (SRS), à temps partiel à La Forge.",
    "index.lead":
      "Étudiant en dernière année à l'EPITA, à temps partiel à La Forge. Je cherche un stage de fin d'études à partir de février 2027.",
    "index.seeking":
      "Je cherche un stage de fin d'études de 6 mois à partir de février 2027.",
    "index.now": "En ce moment",
    "index.download": "Télécharger le CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projets",
    "index.registerIntro":
      "Mon homelab et la configuration de mon portable, tous les deux sous NixOS.",
    "index.read": "LIRE",
    "index.served": "",
    "index.tech": "Technologies",

    "systems.title": "Projets",
    "systems.intro":
      "Mon homelab et la configuration de mon portable, tous les deux sous NixOS.",
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
      "Dernière année à l'EPITA (SRS). À temps partiel à La Forge depuis février 2026. Je cherche un stage de fin d'études à partir de février 2027.",
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
      "SRS est la majeure infra, systèmes, réseaux et sécurité, avec un angle gestion du SI dans l'infrastructure. Elle dure deux ans. En ADLIN, on administre un parc de serveurs Linux avec Ansible. En ARS, on monte une infrastructure complète dans OpenStack (contrôleur de domaine, serveur mail, PKI interne, mTLS), puis on l'attaque et on la défend.",
    "studies.p2":
      "WINSEC porte sur le fonctionnement du noyau et des services Windows, et sur leur durcissement. AGDA porte sur Active Directory : objets, protocoles, délégations, puis forensic d'un domaine compromis.",
    "studies.p3":
      "VIRO est un cours d'analyse de malwares : rétro-ingénierie, obfuscation, détections. SOC couvre la corrélation d'événements, les règles de détection et la réponse à incident.",
    "studies.p4":
      "La Forge est l'autre versant : des besoins métier précis sur une infrastructure cloud native. Je suis le seul de ma promo à la fois dans le parcours DevOps (celui de La Forge) et dans la majeure SRS.",

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
      "I am a final-year student at EPITA, in the Systems, Networks and Security major. I also work part-time at La Forge, the team in charge of IT for teaching.",
    "index.p2":
      "At La Forge, we develop the school's services (the piscine intranet, Moodle, the student directory), host them in a colocated datacenter in Ivry, and manage the lab machines, the PIE.",
    "index.p3":
      "SRS is an infrastructure, systems, networks and security major, with an IT-management angle: the foundation of a company, with mail servers, Windows, GPOs, Active Directory, SOC, SIEM and CERT. At La Forge, it is precise business needs, on a cloud native infrastructure in our own OpenStack. I am the only one in my class in both the DevOps track (the La Forge one) and the SRS major.",
    "index.p4":
      "I am looking for a six-month end-of-studies internship starting February 2027, in systems, infrastructure or security. You can reach me by email.",

    "index.role":
      "Final year at EPITA (SRS), part-time at La Forge.",
    "index.lead":
      "Final-year student at EPITA, part-time at La Forge. Looking for an end-of-studies internship starting February 2027.",
    "index.seeking":
      "Looking for a 6-month end-of-studies internship starting February 2027.",
    "index.now": "Currently",
    "index.download": "Download CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projects",
    "index.registerIntro":
      "My homelab and my laptop configuration, both on NixOS.",
    "index.read": "READ",
    "index.served": "",
    "index.tech": "Technologies",

    "systems.title": "Projects",
    "systems.intro":
      "My homelab and my laptop configuration, both on NixOS.",
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
      "Final year at EPITA (SRS). Part-time at La Forge since February 2026. Looking for an end-of-studies internship starting February 2027.",
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
      "SRS is the infrastructure, systems, networks and security major, with an IT-management angle on infrastructure. It lasts two years. In ADLIN, we administer a fleet of Linux servers with Ansible. In ARS, we build a complete infrastructure in OpenStack (domain controller, mail server, internal PKI, mTLS), then attack and defend it.",
    "studies.p2":
      "WINSEC covers how the Windows kernel and services work, and how to harden them. AGDA covers Active Directory: objects, protocols, delegations, then forensics on a compromised domain.",
    "studies.p3":
      "VIRO is a malware analysis course: reverse engineering, obfuscation, detections. SOC covers event correlation, detection rules and incident response.",
    "studies.p4":
      "La Forge is the other side: precise business needs on a cloud native infrastructure. I am the only one in my class in both the DevOps track (the La Forge one) and the SRS major.",

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
