import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
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
  experience: defineCollection({ loader: file("src/content/experience.yaml"), schema: entry }),
  education: defineCollection({ loader: file("src/content/education.yaml"), schema: entry }),
  associations: defineCollection({ loader: file("src/content/associations.yaml"), schema: entry }),
  skills: defineCollection({
    loader: file("src/content/skills.yaml"),
    schema: z.object({ order: z.number(), label: l10n, items: z.array(z.string()) }),
  }),
  interests: defineCollection({
    loader: file("src/content/interests.yaml"),
    schema: z.object({ order: z.number(), label: l10n, text: l10n }),
  }),
  // One Markdown file per project and language: src/content/projects/<lang>/<slug>.md
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/projects" }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      art: z.enum(["nuc", "laptop", "key", "flake", "page"]),
      paper: z.enum(["yellow", "green", "pink", "blue"]),
      repo: z.url().optional(),
      /** A real photo for the halftone, in public/img/, with its credit. */
      photo: z.object({ src: z.string(), credit: z.string(), license: z.string(), url: z.url() }).optional(),
      /** Detail page elsewhere on the site (e.g. "homelab"); no /projets/<slug>/ page is generated then. */
      page: z.enum(["homelab"]).optional(),
      stack: z.array(z.string()),
      facts: z.array(z.tuple([z.string(), z.string()])),
    }),
  }),
};
