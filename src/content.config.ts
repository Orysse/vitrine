import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

// Every human-readable string exists in both languages.
const l10n = z.object({ fr: z.string(), en: z.string() });
// "2026-02" or "2024" (when only the year is known); `end: null` means ongoing.
const month = z.string().regex(/^\d{4}(-\d{2})?$/);

// Dates and location are optional: some lines (the baccalauréat) have none we can state.
const entry = z.object({
  org: z.string(),
  orgDetail: z.string().optional(),
  role: l10n,
  start: month.optional(),
  end: month.nullable().optional(),
  location: z.string().optional(),
  stack: z.array(z.string()).default([]),
  points: z.array(l10n).default([]),
});

const work = z
  .object({
    number: z.number().int(), // 1..5, rendered "01"
    kind: z.enum(["pro", "perso", "asso"]),
    org: z.string(),
    status: l10n, // "CDD à temps partiel", "Stage", "Projet perso", "Association"
    start: month.nullable(),
    end: month.nullable(),
    tag: l10n, // mono label shown in the closed row
    line: l10n, // one-sentence result, closed state
    impact: l10n, // impact title, open state
    figure: z.string().optional(), // the number set in --signal, must appear in impact
    body: z.array(l10n).min(1).max(3), // short paragraphs
    // `value` is a plain string when it is language-neutral (tool names), l10n otherwise.
    materials: z.array(z.object({ key: l10n, value: z.union([z.string(), l10n]) })),
    images: z
      .array(z.object({ src: z.string(), alt: l10n, placeholder: z.boolean() }))
      .default([]),
  links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    logo: z.object({ src: z.string(), alt: l10n }).optional(), // the organisation's own mark
  })
  .refine((w) => !w.figure || (w.impact.fr.includes(w.figure) && w.impact.en.includes(w.figure)), {
    message: "figure must appear in the impact title, in both languages",
    path: ["figure"],
  });

export const collections = {
  works: defineCollection({ loader: file("src/content/works.yaml"), schema: work }),
  education: defineCollection({ loader: file("src/content/education.yaml"), schema: entry }),
  interests: defineCollection({
    loader: file("src/content/interests.yaml"),
    schema: z.object({ order: z.number(), label: l10n, text: l10n, now: l10n.optional() }),
  }),
};
