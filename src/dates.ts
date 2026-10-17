import type { Lang } from "./i18n";

/** "2026-02" -> "févr. 2026" / "Feb 2026"; a bare year stays a year. */
export function formatMonth(lang: Lang, value: string): string {
  if (!value.includes("-")) return value;
  const [y, m] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
}

/** "févr. 2026 – aujourd'hui"; `null` end means ongoing. */
export function formatRange(lang: Lang, start: string, end: string | null, today: string): string {
  return `${formatMonth(lang, start)} – ${end ? formatMonth(lang, end) : today}`;
}
