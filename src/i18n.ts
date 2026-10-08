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
    "now": "aujourd'hui",
    "cv.fr": "CV PDF · français",
    "cv.en": "CV PDF · anglais",
    "vtr.nav": "303",
    "vtr.lead": "Émulation d'une Roland TB-303 dans le navigateur : la voix, ses enveloppes, l'accent et le slide, et un séquenceur 16 pas.",
    "vtr.card": "Une TB-303 émulée en Web Audio : voix en AudioWorklet, séquenceur 16 pas, motifs partageables par lien.",
    "vtr.open": "Ouvrir la 303",
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
    "vtr.source": "Code de la voix",
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
    "now": "present",
    "cv.fr": "CV PDF · French",
    "cv.en": "CV PDF · English",
    "vtr.nav": "303",
    "vtr.lead": "A Roland TB-303 emulation in the browser: the voice, its envelopes, accent and slide, and a 16-step sequencer.",
    "vtr.card": "A TB-303 emulated with Web Audio: voice in an AudioWorklet, 16-step sequencer, patterns shared by link.",
    "vtr.open": "Open the 303",
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
    "vtr.source": "Voice source code",
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
  return `${month(start, lang)} – ${end ? month(end, lang) : t(lang, "now")}`;
}
