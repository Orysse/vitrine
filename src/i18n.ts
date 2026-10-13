export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

const ui = {
  fr: {
    "nav.lang": "English",
    "section.experience": "Expérience",
    "section.projects": "Projets",
    "section.homelab": "Homelab",
    "section.education": "Formation",
    "section.associations": "Associations",
    "section.skills": "Compétences",
    "section.interests": "À côté",
    "section.spoken": "Langues",
    "project.repo": "Dépôt",
    "project.stack": "Stack",
    "project.read": "Voir le projet.",
    "since": "depuis",
    "to": "à",
    "cv.fr": "CV (PDF, français)",
    "cv.en": "CV (PDF, anglais)",
    "colophon.built": "construit le",
    "colophon.stack": "Astro, Nix, nginx. Servi par k3s sur un Intel NUC, à la maison.",
    "colophon.source": "Source",
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
    "skip": "Aller au contenu",
    "notfound": "Cette page n'existe pas.",
  },
  en: {
    "nav.lang": "Français",
    "section.experience": "Experience",
    "section.projects": "Projects",
    "section.homelab": "Homelab",
    "section.education": "Education",
    "section.associations": "Associations",
    "section.skills": "Skills",
    "section.interests": "Outside work",
    "section.spoken": "Languages",
    "project.repo": "Repository",
    "project.stack": "Stack",
    "project.read": "See the project.",
    "since": "since",
    "to": "to",
    "cv.fr": "CV (PDF, French)",
    "cv.en": "CV (PDF, English)",
    "colophon.built": "built on",
    "colophon.stack": "Astro, Nix, nginx. Served by k3s on an Intel NUC, at home.",
    "colophon.source": "Source",
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
  if (!end) return `${t(lang, "since")} ${month(start, lang)}`;
  return `${month(start, lang)} ${t(lang, "to")} ${month(end, lang)}`;
}
