import type { L10n } from "./i18n";

export const profile = {
  name: "Abel Chartier",
  status: {
    fr: "Étudiant ingénieur en 5e année à l'EPITA",
    en: "Fifth-year engineering student at EPITA",
  } satisfies L10n,
  major: {
    fr: "Systèmes, Réseaux, Sécurité & Infrastructure",
    en: "Systems, Networks, Security & Infrastructure",
  } satisfies L10n,
  now: {
    fr: "Contributeur à La Forge, l'équipe qui exploite l'infrastructure interne de l'EPITA, depuis février 2026",
    en: "Contributor at La Forge, the team that runs EPITA's internal infrastructure, since February 2026",
  } satisfies L10n,
  looking: {
    fr: "Ouvert aux opportunités de stage de fin d'études à partir de février 2027",
    en: "Open to end-of-studies internship opportunities starting February 2027",
  } satisfies L10n,
  location: "Paris",
  spoken: {
    fr: "Français (langue maternelle) · Anglais (professionnel, TOEIC 970)",
    en: "French (Native) · English (Professional, TOEIC 970)",
  } satisfies L10n,
  links: {
    github: "https://github.com/Orysse",
    homelabNix: "https://github.com/Orysse/homelab-nix",
    homelabCluster: "https://github.com/Orysse/homelab-cluster",
    config: "https://github.com/Orysse/config",
    source: "https://github.com/Orysse/vitrine",
    linkedin: "https://www.linkedin.com/in/abel-chartier-95b527250/",
  },
  email: "abel.chartier@gmail.com",
  cv: {
    fr: "/cv/ABEL_CHARTIER_CV_fr.pdf",
    en: "/cv/ABEL_CHARTIER_CV_en.pdf",
  },
};
