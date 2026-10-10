// Umami (self-hosted in the homelab, apps/umami in homelab-cluster). No cookies, no personal data.
// The tracker is public at pulse.abe.lc; the dashboard is internal.
// websiteId comes from the Umami dashboard (Settings > Websites > vitrine). While it is empty,
// no script is added to the pages.
export const umami = {
  host: "https://pulse.abe.lc",
  websiteId: "",
  // Only count visits on the real domain, not local previews.
  domains: "vitrine.abe.lc",
};
