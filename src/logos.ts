import * as icons from "simple-icons";

// Real logos, resolved at build time: simple-icons (CC0) when it has the project, otherwise
// a PNG in public/logos/ rasterized from the project's own artwork (sources in
// public/logos/CREDITS.md). Nothing is fetched by the browser from another origin.
export type Logo = { kind: "svg"; path: string; hex: string } | { kind: "img"; src: string } | { kind: "none"; initials: string };

const files: Record<string, string> = {
  "cert-manager": "/logos/cert-manager.png",
  "deploy-rs": "/logos/deploy-rs.png",
  disko: "/logos/disko.png",
  gatus: "/logos/gatus.png",
  kitty: "/logos/kitty.png",
  "pocket-id": "/logos/pocket-id.png",
  river: "/logos/river.png",
};

type Icon = { path: string; hex: string };
const bySlug = new Map<string, Icon>(Object.values(icons as unknown as Record<string, Icon & { slug: string }>).map((i) => [i.slug, i]));

/** `slug` is a simple-icons slug or a key of `files`; `name` gives the initial fallback (projects without a logo). */
export function logo(slug: string | undefined, name: string): Logo {
  if (slug && files[slug]) return { kind: "img", src: files[slug] };
  const icon = slug ? bySlug.get(slug) : undefined;
  if (icon) return { kind: "svg", path: icon.path, hex: `#${icon.hex}` };
  return { kind: "none", initials: name.charAt(0).toUpperCase() };
}

// Tools named in the CV, mapped to their logo.
const tools: Record<string, string> = {
  Kubernetes: "kubernetes",
  "Argo CD": "argo",
  NixOS: "nixos",
  Java: "openjdk",
  "GitLab CI": "gitlab",
  "GitLab Runner": "gitlab",
  MinIO: "minio",
  Prometheus: "prometheus",
  Grafana: "grafana",
  OVHcloud: "ovh",
  Terraform: "terraform",
  Helm: "helm",
  Proxmox: "proxmox",
};
export const toolLogo = (name: string): Logo | undefined => (tools[name] ? logo(tools[name], name) : undefined);
