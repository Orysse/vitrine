export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

const ui = {
  fr: {
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.education": "Formation",
    "nav.skills": "Compétences",
    "nav.interests": "À côté",
    "nav.cv": "CV",
    "nav.lang": "EN",
    "knob.trip": "trip",
    "knob.pause": "pause",
    "knob.play": "lancer",
    "section.experience": "Expérience",
    "section.projects": "Projets",
    "section.education": "Formation",
    "section.associations": "Associations",
    "section.skills": "Compétences",
    "section.interests": "À côté",
    "section.spoken": "Langues",
    "project.more": "Détails",
    "project.repo": "Dépôt",
    "project.back": "Retour au CV",
    "project.stack": "Stack",
    "since": "depuis",
    "to": "à",
    "cv.fr": "CV PDF · français",
    "cv.en": "CV PDF · anglais",
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
    "hl.nav": "Homelab",
    "hl.title": "Homelab",
    "hl.lead": "Un Intel NUC sous NixOS fait tourner un cluster k3s de trois microVMs, qui sert ce site. Tout est décrit dans deux dépôts publics.",
    "hl.map": "Carte",
    "hl.hint": "Choisissez un bloc pour voir ce qu'il fait et pourquoi il est là, ou lancez un parcours.",
    "hl.paths": "Parcours",
    "hl.replay": "Rejouer",
    "hl.clear": "Tout afficher",
    "hl.layers": "Couches",
    "hl.show": "Voir sur la carte",
    "hl.principles": "Principes",
    "hl.text": "Version texte",
    "hl.repos": "Dépôts",
    "hl.zone.external": "À l'extérieur",
    "hl.zone.host": "Sur l'hôte",
    "hl.zone.cluster": "Cluster",
    "hl.zone.platform": "Plateforme",
    "hl.zone.app": "Applications",
    "hl.card": "La carte interactive du homelab qui sert ce site : réseau, identité, secrets, monitoring.",
    "hl.open": "Carte interactive",
    "hl.explain": "Explication détaillée",
    "skip": "Aller au contenu",
    "notfound": "Cette page n'existe pas.",
  },
  en: {
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.interests": "Outside",
    "nav.cv": "CV",
    "nav.lang": "FR",
    "knob.trip": "trip",
    "knob.pause": "pause",
    "knob.play": "play",
    "section.experience": "Experience",
    "section.projects": "Projects",
    "section.education": "Education",
    "section.associations": "Associations",
    "section.skills": "Skills",
    "section.interests": "Outside work",
    "section.spoken": "Languages",
    "project.more": "Details",
    "project.repo": "Repository",
    "project.back": "Back to the CV",
    "project.stack": "Stack",
    "since": "since",
    "to": "to",
    "cv.fr": "CV PDF · French",
    "cv.en": "CV PDF · English",
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
    "hl.nav": "Homelab",
    "hl.title": "Homelab",
    "hl.lead": "An Intel NUC running NixOS hosts a k3s cluster of three microVMs, which serves this site. Everything is described in two public repositories.",
    "hl.map": "Map",
    "hl.hint": "Pick a block to see what it does and why it is there, or play a path.",
    "hl.paths": "Paths",
    "hl.replay": "Replay",
    "hl.clear": "Show all",
    "hl.layers": "Layers",
    "hl.show": "Show on the map",
    "hl.principles": "Principles",
    "hl.text": "Text version",
    "hl.repos": "Repositories",
    "hl.zone.external": "Outside",
    "hl.zone.host": "On the host",
    "hl.zone.cluster": "Cluster",
    "hl.zone.platform": "Platform",
    "hl.zone.app": "Apps",
    "hl.card": "The interactive map of the homelab that serves this site: network, identity, secrets, monitoring.",
    "hl.open": "Interactive map",
    "hl.explain": "Detailed explanation",
    "skip": "Skip to content",
    "notfound": "This page does not exist.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["fr"];

export const t = (lang: Lang, key: UiKey): string => ui[lang][key];
export const l = (value: L10n, lang: Lang): string => value[lang];

/** Root of a language: "/" for French (default), "/en/" for English. */
export const home = (lang: Lang): string => (lang === "fr" ? "/" : "/en/");

/** Project detail URLs differ per language: /projets/<slug>/ and /en/projects/<slug>/. */
export const projectUrl = (lang: Lang, slug: string): string =>
  lang === "fr" ? `/projets/${slug}/` : `/en/projects/${slug}/`;

/** The homelab map: /homelab/ and /en/homelab/. */
export const homelabUrl = (lang: Lang): string => (lang === "fr" ? "/homelab/" : "/en/homelab/");

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
