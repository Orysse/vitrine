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
