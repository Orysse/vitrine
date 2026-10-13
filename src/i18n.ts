export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

const ui = {
  fr: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Étudiant ingénieur · EPITA",
    "chassis.inv": "INV",
    "chassis.inv.title": "Inverser noir et blanc (I)",
    "chassis.cv": "CV (PDF)",
    "skip": "Aller au contenu",

    "nav.index": "Accueil",
    "nav.systems": "Projets",
    "nav.resume": "Parcours",
    "nav.colophon": "Colophon",
    "nav.lang": "English",

    "index.ref": "Réf.",
    "index.role": "Étudiant ingénieur à l'EPITA, 5e année. Systèmes, réseaux, sécurité.",
    "index.lead": "Je construis des infrastructures et je les fais tourner. Un homelab, ma machine, ce site. Rien de vendu, rien de caché : ce que je sais faire, et ce que j'apprends en le faisant.",
    "index.seeking": "Je cherche un stage de fin d'études à partir de février 2027 : infrastructure, systèmes, sécurité.",
    "index.now": "Aujourd'hui",
    "index.download": "Télécharger le CV",
    "index.contact": "M'écrire",
    "index.source": "GitHub",
    "index.register": "Ce que j'ai fait",
    "index.registerIntro": "Trois projets que je fais tourner moi-même. Décrits tels quels, avec leurs choix.",
    "index.read": "Voir le projet",
    "index.served": "Ce site tourne sur le premier projet de cette liste.",

    "systems.title": "Projets",
    "systems.intro": "Trois choses que je construis et j'exploite. Pas un inventaire d'outils : les décisions qui comptent.",
    "systems.repo": "Code",
    "systems.stack": "Outils",
    "systems.facts": "En bref",
    "systems.highlights": "Ce qui compte",
    "systems.details": "Voir le projet",
    "systems.back": "Tous les projets",
    "systems.prev": "Précédent",
    "systems.next": "Suivant",
    "systems.notes": "Notes",
    "systems.notesSoon": "Je remplirai ça quand j'aurai quelque chose à dire.",

    "stack.title": "La pile qui sert ce site",
    "stack.hint": "Choisir une couche pour lire ce qu'elle fait.",
    "stack.layer": "Couches",
    "stack.source": "Où c'est écrit",
    "stack.invariant": "Ce qui reste vrai",
    "stack.explode": "Écartement",
    "stack.view": "Vue",
    "stack.view.iso": "Isométrique",
    "stack.view.plan": "Plan",

    "resume.title": "Parcours",
    "resume.intro": "Ce que j'ai fait, où j'ai étudié, ce que je sais utiliser.",
    "resume.print": "Imprimer",
    "resume.experience": "Expériences",
    "resume.education": "Études",
    "resume.skills": "Compétences",
    "resume.associations": "Associations",
    "resume.interests": "À côté",
    "resume.spoken": "Langues",
    "resume.downloads": "CV",
    "since": "depuis",
    "to": "à",

    "colophon.title": "Colophon",
    "colophon.intro": "Ce site est construit par Nix, servi par nginx, hébergé chez moi sur un Intel NUC. Rien d'hébergé ailleurs, sauf la mesure d'audience.",
    "colophon.build": "Ce build",
    "colophon.chain": "Production",
    "colophon.keys": "Raccourcis clavier",
    "colophon.type": "Typographie",
    "colophon.audio": "Son",
    "colophon.version": "Version",
    "colophon.revision": "Révision",
    "colophon.date": "Date du commit",
    "colophon.image": "Image",
    "colophon.csp": "CSP",
    "colophon.built": "construit le",
    "colophon.stack": "Astro, Nix, nginx. Chez moi, sur un Intel NUC.",
    "colophon.source": "Source",
    "colophon.audioText": "Un synthé TB-303, pour s'amuser, en Web Audio.",
    "colophon.typeText": "Geist et Geist Mono. Béton brut : du gris, du noir, rien d'autre.",

    "help.key.poles": "Aller aux quatre pages",
    "help.key.layers": "Changer de couche dans le schéma",
    "help.key.inv": "Inverser noir et blanc",
    "help.key.lang": "Français / anglais",

    "vtr.nav": "303",
    "vtr.lead": "Un gadget du site, pour s'amuser : une TB-303 approximative en Web Audio, avec un petit séquenceur.",
    "vtr.voice": "Voix",
    "vtr.length": "pas",
    "vtr.play": "▶ lecture",
    "vtr.stop": "■ stop",
    "vtr.saw": "dents de scie",
    "vtr.square": "carré",
    "vtr.steps": "Séquenceur",
    "vtr.step": "Pas",
    "vtr.up": "octave +",
    "vtr.down": "octave −",
    "vtr.rest": "silence",
    "vtr.keyboard": "Clavier",
    "vtr.random": "générer",
    "vtr.clear": "effacer",
    "vtr.share": "copier le lien",
    "vtr.copied": "lien copié",
    "vtr.unsupported": "Ce navigateur ne prend pas en charge AudioWorklet.",
    "vtr.nojs": "La 303 a besoin de JavaScript (Web Audio).",

    "notfound": "Cette page n'existe pas.",
    "notfound.hint": "Retour à l'accueil",
  },
  en: {
    "chassis.identity": "Abel Chartier",
    "chassis.status": "Engineering student · EPITA",
    "chassis.inv": "INV",
    "chassis.inv.title": "Invert black and white (I)",
    "chassis.cv": "CV (PDF)",
    "skip": "Skip to content",

    "nav.index": "Home",
    "nav.systems": "Projects",
    "nav.resume": "Resume",
    "nav.colophon": "Colophon",
    "nav.lang": "Français",

    "index.ref": "Ref.",
    "index.role": "Engineering student at EPITA, fifth year. Systems, networks, security.",
    "index.lead": "I build infrastructure and I run it. A homelab, my own machine, this site. Nothing sold, nothing hidden: what I can do, and what I learn while doing it.",
    "index.seeking": "I am looking for an end-of-studies internship from February 2027: infrastructure, systems, security.",
    "index.now": "Now",
    "index.download": "Download the CV",
    "index.contact": "Email me",
    "index.source": "GitHub",
    "index.register": "What I have built",
    "index.registerIntro": "Three projects I run myself. Written as they are, with the choices behind them.",
    "index.read": "See the project",
    "index.served": "This site runs on the first project in this list.",

    "systems.title": "Projects",
    "systems.intro": "Three things I build and operate. Not a tool inventory: the decisions that matter.",
    "systems.repo": "Code",
    "systems.stack": "Tools",
    "systems.facts": "In short",
    "systems.highlights": "What matters",
    "systems.details": "See the project",
    "systems.back": "All projects",
    "systems.prev": "Previous",
    "systems.next": "Next",
    "systems.notes": "Notes",
    "systems.notesSoon": "I will fill this in when I have something to say.",

    "stack.title": "The stack serving this site",
    "stack.hint": "Pick a layer to read what it does.",
    "stack.layer": "Layers",
    "stack.source": "Where it is written",
    "stack.invariant": "What stays true",
    "stack.explode": "Spacing",
    "stack.view": "View",
    "stack.view.iso": "Isometric",
    "stack.view.plan": "Plan",

    "resume.title": "Resume",
    "resume.intro": "What I have done, where I studied, what I know how to use.",
    "resume.print": "Print",
    "resume.experience": "Experience",
    "resume.education": "Education",
    "resume.skills": "Skills",
    "resume.associations": "Associations",
    "resume.interests": "Outside work",
    "resume.spoken": "Languages",
    "resume.downloads": "CV",
    "since": "since",
    "to": "to",

    "colophon.title": "Colophon",
    "colophon.intro": "This site is built with Nix, served by nginx, hosted at home on an Intel NUC. Nothing hosted elsewhere, except the visit counter.",
    "colophon.build": "This build",
    "colophon.chain": "Production",
    "colophon.keys": "Keyboard shortcuts",
    "colophon.type": "Typography",
    "colophon.audio": "Sound",
    "colophon.version": "Version",
    "colophon.revision": "Revision",
    "colophon.date": "Commit date",
    "colophon.image": "Image",
    "colophon.csp": "CSP",
    "colophon.built": "built on",
    "colophon.stack": "Astro, Nix, nginx. At home, on an Intel NUC.",
    "colophon.source": "Source",
    "colophon.audioText": "A TB-303 synth, just for fun, in Web Audio.",
    "colophon.typeText": "Geist and Geist Mono. Raw concrete: gray, black, nothing else.",

    "help.key.poles": "Go to the four pages",
    "help.key.layers": "Change layer in the diagram",
    "help.key.inv": "Invert black and white",
    "help.key.lang": "French / English",

    "vtr.nav": "303",
    "vtr.lead": "A gadget on this site, just for fun: a rough TB-303 in Web Audio, with a small sequencer.",
    "vtr.voice": "Voice",
    "vtr.length": "steps",
    "vtr.play": "▶ play",
    "vtr.stop": "■ stop",
    "vtr.saw": "sawtooth",
    "vtr.square": "square",
    "vtr.steps": "Sequencer",
    "vtr.step": "Step",
    "vtr.up": "octave up",
    "vtr.down": "octave down",
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

/** Root of a language: "/" for French (default), "/en/" for English. */
export const home = (lang: Lang): string => (lang === "fr" ? "/" : "/en/");

/** The four pages. */
export interface Pole {
  n: string;
  key: "index" | "systems" | "resume" | "colophon";
  label: string;
  href: string;
}

export const systemsUrl = (lang: Lang, slug?: string): string => {
  const base = lang === "fr" ? "/systemes/" : "/en/systems/";
  return slug ? `${base}${slug}/` : base;
};
export const resumeUrl = (lang: Lang): string => (lang === "fr" ? "/parcours/" : "/en/resume/");
export const colophonUrl = (lang: Lang): string => (lang === "fr" ? "/colophon/" : "/en/colophon/");

export function poles(lang: Lang): Pole[] {
  return [
    { n: "01", key: "index", label: t(lang, "nav.index"), href: home(lang) },
    { n: "02", key: "systems", label: t(lang, "nav.systems"), href: systemsUrl(lang) },
    { n: "03", key: "resume", label: t(lang, "nav.resume"), href: resumeUrl(lang) },
    { n: "04", key: "colophon", label: t(lang, "nav.colophon"), href: colophonUrl(lang) },
  ];
}

/** The VTR-303 page: /303/ and /en/303/. */
export const synthUrl = (lang: Lang): string => (lang === "fr" ? "/303/" : "/en/303/");

const months = {
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2026-02" → "févr. 2026" / "Feb 2026"; "2024" stays "2024". */
export function month(value: string, lang: Lang): string {
  const [y, m] = value.split("-");
  return m ? `${months[lang][Number(m) - 1]} ${y}` : y;
}

export function period(start: string, end: string | null, lang: Lang): string {
  if (!end) return `${t(lang, "since")} ${month(start, lang)}`;
  return `${month(start, lang)} ${t(lang, "to")} ${month(end, lang)}`;
}
