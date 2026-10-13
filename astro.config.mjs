// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://vitrine.abe.lc",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: { prefixDefaultLocale: false },
  },
  // Legacy paths kept alive: /projets/<slug>/ and /homelab/ point to the new poles.
  redirects: {
    "/projets": "/systemes/",
    "/en/projects": "/en/systems/",
    "/homelab": "/systemes/homelab/",
    "/en/homelab": "/en/systems/homelab/",
  },
  build: {
    // The CSP only allows same-origin styles and scripts: nothing may be inlined.
    inlineStylesheets: "never",
  },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
