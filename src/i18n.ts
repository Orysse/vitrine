export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export type L10n = Record<Lang, string>;

// UI strings only. Content strings live in src/content/*.yaml and src/profile.ts.
// A key missing from one language fails `astro check`.
const ui = {
  fr: {
    "site.title": "Abel Chartier — Systèmes, réseaux, sécurité",
    "site.description":
      "Abel Chartier, étudiant en dernière année à l'EPITA (systèmes, réseaux, sécurité). Recherche un stage de fin d'études de 6 mois à partir de février 2027.",
    "lang.switch": "English",
    "lang.switch.label": "Read this page in English",
    "nav.skip": "Aller au contenu",
    "bar.site": "vitrine.abe.lc",
    "bar.cv": "CV (PDF)",
    "works.title": "Ouvrages",
    "work.today": "aujourd'hui",
    "education.title": "Formation",
    "marquee.label": "Technologies utilisées",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.email": "E-mail",
    "work.links": "Dépôts",
    "hero.line1": "Systèmes,",
    "hero.line2": "réseaux,",
    "hero.line3": "sécurité.",
    "hero.role":
      "Étudiant en dernière année à l'EPITA. À La Forge, j'exploite l'infrastructure de la pédagogie de l'école.",
    "notfound.title": "Page introuvable",
    "notfound.back": "Retour à l'accueil",
  },
  en: {
    "site.title": "Abel Chartier — Systems, networks, security",
    "site.description":
      "Abel Chartier, final-year student at EPITA (systems, networks, security). Looking for a 6-month end-of-studies internship starting February 2027.",
    "lang.switch": "Français",
    "lang.switch.label": "Lire cette page en français",
    "nav.skip": "Skip to content",
    "bar.site": "vitrine.abe.lc",
    "bar.cv": "Resume (PDF)",
    "works.title": "Works",
    "work.today": "today",
    "education.title": "Education",
    "marquee.label": "Technologies used",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.email": "Email",
    "work.links": "Repositories",
    "hero.line1": "Systems,",
    "hero.line2": "networks,",
    "hero.line3": "security.",
    "hero.role":
      "Final-year student at EPITA. At La Forge, I run the infrastructure behind the school's teaching.",
    "notfound.title": "Page not found",
    "notfound.back": "Back to the home page",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["fr"];

// Compile-time check that both languages have exactly the same keys.
const _sameKeys: Record<UiKey, string> = ui.en;
void _sameKeys;

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

/** "/" for fr, "/en/" for en, plus an optional "#hash". */
export function path(lang: Lang, hash?: string): string {
  const base = lang === "fr" ? "/" : "/en/";
  return hash ? `${base}#${hash}` : base;
}
