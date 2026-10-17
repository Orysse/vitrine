// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://vitrine.abe.lc",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    // The CSP only allows same-origin styles and scripts: nothing may be inlined.
    inlineStylesheets: "never",
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
