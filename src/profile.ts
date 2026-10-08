import type { L10n } from "./i18n";

// Who I am, in the same terms as the CV. Edit here; everything else is in src/content/.
export const profile = {
  name: "Abel Chartier",
  status: {
    fr: "Étudiant ingénieur, 5e année à l'EPITA",
    en: "Engineering student, fifth year at EPITA",
  } satisfies L10n,
  major: {
    fr: "Majeure Systèmes, Réseaux et Sécurité",
    en: "Systems, Networks and Security major",
  } satisfies L10n,
  now: {
    fr: "Contributeur à La Forge, l'équipe qui gère l'infrastructure interne de l'EPITA, depuis février 2026",
    en: "Contributor at La Forge, the team that runs EPITA's internal infrastructure, since February 2026",
  } satisfies L10n,
  looking: {
    fr: "Stage recherché à partir de février 2027 : infrastructure, systèmes, sécurité",
    en: "Looking for an internship from February 2027: infrastructure, systems, security",
  } satisfies L10n,
  location: "Paris",
  spoken: {
    fr: "Français (natif) · anglais (professionnel, TOEIC 970)",
    en: "French (native) · English (professional, TOEIC 970)",
  } satisfies L10n,
  links: {
    github: "https://github.com/Orysse",
    homelabNix: "https://github.com/Orysse/homelab-nix",
    homelabCluster: "https://github.com/Orysse/homelab-cluster",
    source: "https://github.com/Orysse/vitrine",
  },
  cv: {
    fr: "/cv/ABEL_CHARTIER_CV_fr.pdf",
    en: "/cv/ABEL_CHARTIER_CV_en.pdf",
  },
};
