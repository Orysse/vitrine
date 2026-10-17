import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

// Every human-readable string exists in both languages.
const l10n = z.object({ fr: z.string(), en: z.string() });
// "2026-02" or "2024" (when only the year is known); `end: null` means ongoing.
const month = z.string().regex(/^\d{4}(-\d{2})?$/);

const entry = z.object({
  org: z.string(),
  orgDetail: z.string().optional(),
  role: l10n,
  start: month,
  end: month.nullable(),
  location: z.string(),
  stack: z.array(z.string()).default([]),
  points: z.array(l10n).default([]),
});

export const collections = {
  education: defineCollection({ loader: file("src/content/education.yaml"), schema: entry }),
  interests: defineCollection({
    loader: file("src/content/interests.yaml"),
    schema: z.object({ order: z.number(), label: l10n, text: l10n }),
  }),
};
