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
    "skip": "Aller au contenu",

    "nav.index": "À propos",
    "nav.homelab": "Homelab",
    "nav.config": "Config NixOS",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projets",
    "nav.resume": "CV",
    "nav.colophon": "Build",
    "nav.lang": "EN",

    "index.title": "À propos",
    "index.p1": "Je suis étudiant en cinquième année à l'EPITA, dans la majeure Systèmes, Réseaux, Sécurité et Infrastructure. Depuis février 2026, je fais partie de La Forge, l'équipe qui exploite l'infrastructure interne de l'école : nous maintenons l'intranet utilisé pendant la piscine et les ateliers, développons des services internes déployés sur Kubernetes avec Argo CD, et construisons en code les images NixOS démarrées en netboot sur tout le parc des salles machines.",
    "index.p2": "C'est en cherchant à comprendre comment décrire une machine entière sans jamais dépendre d'interventions manuelles que je me suis passionné pour Nix. Au fil des quatre dernières années, cette approche a changé ma façon de voir l'administration système : plutôt que d'empiler des configurations qui dérivent silencieusement avec le temps, j'aime partir d'une feuille blanche où chaque état, chaque paquet et chaque flux réseau existe uniquement parce qu'il a été déclaré dans Git.",
    "index.p3": "En dehors des cours et de mes stages au CEA Saclay puis chez RedPill Group, j'entretiens mon propre laboratoire d'infrastructure à la maison ainsi que la configuration de mon ordinateur portable. Je ne les ai pas pensés comme des environnements de production sages, mais comme un terrain de jeu pour tester des idées jusqu'au bout : faire tourner un cluster Kubernetes dans des microVMs sans disque montées en mémoire vive, verrouiller tous les flux réseau par défaut en eBPF, effacer la racine de mon poste à chaque extinction, ou encore empaqueter chaque application avec sa propre configuration directement dans le store Nix via nix-wrapper-modules.",
    "index.p4": "Je suis ouvert aux opportunités de stage de fin d'études de six mois à partir de février 2027, autour des systèmes, de l'infrastructure et de la sécurité. Si mon profil ou mes projets vous intéressent, n'hésitez pas à me contacter.",

    "index.role": "Étudiant ingénieur en 5e année à l'EPITA (Systèmes, Réseaux, Sécurité & Infrastructure) et contributeur à La Forge.",
    "index.lead": "Je construis et j'automatise des systèmes depuis quatre ans, à l'EPITA au sein de La Forge comme sur mon propre laboratoire NixOS et Kubernetes.",
    "index.seeking": "Ouvert aux opportunités de stage de fin d'études (6 mois) à partir de février 2027.",
    "index.now": "En ce moment",
    "index.download": "Télécharger le CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projets",
    "index.registerIntro": "Deux systèmes personnels que j'utilise comme terrain d'expérimentation autour de NixOS, Kubernetes et la gestion de l'état.",
    "index.read": "LIRE",
    "index.served": "",
    "index.tech": "technologies",

    "focus.title": "Focus techniques",
    "focus.vms.title": "MicroVMs sans disque (tmpfs)",
    "focus.vms.body": "Trois microVMs QEMU générées depuis un seul fichier topology.nix, montées en RAM sans image disque.",
    "focus.net.title": "Réseau Cilium eBPF et identité sans mot de passe",
    "focus.net.body": "Politiques default-deny par namespace, secrets tournés par OpenBao et authentification passkeys via Pocket-ID.",
    "focus.imp.title": "Poste NixOS éphémère en tmpfs",
    "focus.imp.body": "Racine effacée à chaque extinction et outils autonomes empaquetés via nix-wrapper-modules.",

    "systems.title": "Projets",
    "systems.intro": "Deux systèmes personnels pensés comme un terrain d'expérimentation autour de NixOS et Kubernetes.",
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
    "resume.intro": "Étudiant en 5e année à l'EPITA en Systèmes, Réseaux, Sécurité & Infrastructure. Je fais actuellement partie de La Forge, l'équipe qui exploite l'infrastructure interne de l'école. J'aime construire et automatiser des systèmes, et je m'y consacre sérieusement depuis 4 ans maintenant. Ouvert aux opportunités de stage à partir de février 2027.",
    "resume.print": "Imprimer",
    "resume.experience": "Expérience professionnelle",
    "resume.education": "Formation",
    "resume.associations": "Engagement associatif",
    "resume.interests": "Centres d'intérêt",
    "resume.spoken": "Langues",
    "resume.downloads": "Télécharger le PDF",
    "since": "depuis",
    "to": "-",

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
    "colophon.audioText": "Émulateur de Roland TB-303 en Web Audio (AudioWorklet).",
    "colophon.typeText": "IBM Plex Sans et IBM Plex Mono.",

    "help.key.poles": "Naviguer entre les pages",
    "help.key.layers": "Parcourir les sections",
    "help.key.inv": "Basculer le thème",
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
    "chassis.status": "Systems, Networks, Security & Infrastructure · EPITA",
    "chassis.inv": "Theme",
    "chassis.inv.title": "Switch theme",
    "chassis.cv": "CV (PDF)",
    "skip": "Skip to content",

    "nav.index": "About",
    "nav.homelab": "Homelab",
    "nav.config": "NixOS Config",
    "nav.vitrine": "Vitrine",
    "nav.systems": "Projects",
    "nav.resume": "CV",
    "nav.colophon": "Build",
    "nav.lang": "FR",

    "index.title": "About",
    "index.p1": "I am a fifth-year engineering student at EPITA majoring in Systems, Networks, Security, and Infrastructure. Since February 2026, I have been part of La Forge, the team that runs the school's internal infrastructure: we maintain the intranet used for the first-year bootcamp and workshops, develop internal services deployed on Kubernetes with Argo CD, and build the NixOS images booted over the network across EPITA's student lab machines.",
    "index.p2": "Trying to understand how to describe a whole machine without relying on manual setup is what got me hooked on Nix. Over the past four years, that mindset has shaped how I approach systems engineering: instead of maintaining configurations that quietly drift over time, I like starting from a clean slate where every piece of state, every package, and every network flow exists only because it is written down in Git.",
    "index.p3": "Alongside my coursework and internships at CEA Saclay and RedPill Group, I run my own home infrastructure lab and workstation setup. Rather than treating them like conservative production boxes, I use them as an infrastructure playground to push ideas as far as they go: running a Kubernetes cluster inside diskless microVMs in RAM, locking down every network flow by default with eBPF, wiping my laptop's root filesystem on every shutdown, and bundling each application with its own configuration directly in the Nix store via nix-wrapper-modules.",
    "index.p4": "I am open to six-month end-of-studies internship opportunities starting February 2027 in systems, infrastructure, or security. If my background or projects match what your team is building, feel free to reach out.",

    "index.role": "Fifth-year engineering student at EPITA (Systems, Networks, Security & Infrastructure) and contributor at La Forge.",
    "index.lead": "I have been building and automating systems for four years, both at EPITA within La Forge and on my own NixOS and Kubernetes playground.",
    "index.seeking": "Open to 6-month end-of-studies internship opportunities starting February 2027.",
    "index.now": "Currently",
    "index.download": "Download CV (PDF)",
    "index.contact": "abel.chartier@gmail.com",
    "index.source": "github.com/Orysse",
    "index.register": "Projects",
    "index.registerIntro": "Two personal systems I use as an engineering playground around NixOS, Kubernetes, and state management.",
    "index.read": "READ",
    "index.served": "",
    "index.tech": "technologies",

    "focus.title": "Technical highlights",
    "focus.vms.title": "Diskless microVMs (tmpfs)",
    "focus.vms.body": "Three QEMU microVMs generated from a single topology.nix file, running in RAM with no disk image.",
    "focus.net.title": "Cilium eBPF networking and passwordless identity",
    "focus.net.body": "Default-deny namespace policies, credentials rotated by OpenBao, and passkey authentication via Pocket-ID.",
    "focus.imp.title": "Ephemeral tmpfs NixOS workstation",
    "focus.imp.body": "Root wiped on every shutdown and self-contained user tools packaged via nix-wrapper-modules.",

    "systems.title": "Projects",
    "systems.intro": "Two personal systems built as an experimentation playground around NixOS and Kubernetes.",
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
    "resume.intro": "Fifth-year EPITA student in Systems, Networks, Security & Infrastructure. I'm currently part of La Forge, the team that runs EPITA's internal infrastructure. I like building and automating systems, and I've been doing it seriously for 4 years now. Open to internship opportunities starting February 2027.",
    "resume.print": "Print",
    "resume.experience": "Professional Experience",
    "resume.education": "Education",
    "resume.associations": "Associations",
    "resume.interests": "Interests",
    "resume.spoken": "Languages",
    "resume.downloads": "Download PDF",
    "since": "Since",
    "to": "-",

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
  key: "index" | "homelab" | "config" | "resume";
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
    { n: "02", key: "systems", label: t(lang, "nav.systems"), href: systemsUrl(lang) },
    { n: "03", key: "resume", label: t(lang, "nav.resume"), href: resumeUrl(lang) },
  ];
}

export const synthUrl = (lang: Lang): string => (lang === "fr" ? "/303/" : "/en/303/");

const months = {
  fr: ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
