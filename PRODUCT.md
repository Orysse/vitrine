# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical recruiters, infrastructure engineers, SREs, DevSecOps engineers, and engineering leads evaluating Abel Chartier (5th-year engineering student at EPITA, Systems, Networks and Security major; contributor at La Forge) for a 6-month end-of-studies internship starting February 2027.

They arrive from a CV PDF, GitHub, or LinkedIn. Some scan the main page in 30 seconds to read the CV and grab the PDF; others inspect the project deep-dives and architectural diagrams to verify technical depth on NixOS, Kubernetes networking, and security.

## Product Purpose

`vitrine.abe.lc` is Abel Chartier's minimalist, text-based portfolio and CV, showcasing his career path alongside the unusual and complex architectural choices of his personal projects, illustrated by detailed modern technical diagrams.

A visit succeeds when the visitor:
1. Understands Abel's profile, experience, and technical depth from the main scrollable page,
2. Explores the project tabs (`Homelab`, `Config NixOS`, `Vitrine`) and their detailed architectural diagrams,
3. Downloads the CV (`ABEL_CHARTIER_CV_fr.pdf` or `ABEL_CHARTIER_CV_en.pdf`) or contacts Abel directly (`abel.chartier@gmail.com` or GitHub).

## Positioning

Proof by architecture and artifact. Rather than listing generic buzzwords, the portfolio highlights unusual, concrete systems engineering choices:
- Declarative diskless QEMU microVMs running on `tmpfs` generated from a single `topology.nix` file, with persistent state on host `btrfs` and host-level monitoring that outlives the cluster.
- Kubernetes zero-trust networking with Cilium eBPF `default-deny` policies, node-to-node WireGuard, dynamic PostgreSQL credentials rotated by OpenBao, and passkey-only OIDC via Pocket-ID.
- Ephemeral `tmpfs` root workstation on NixOS (`preservation` + `lanzaboote` Secure Boot + TPM2 LUKS + YubiKey `sops-nix`) using self-contained `nix-wrapper-modules` instead of `home-manager`.

## Operating Context

- **Main scrollable page (`/`, `/en/`)**: Combines Abel's introduction, internship availability (February 2027), an architectural focus on his personal projects (with an overview diagram and tabs/links to each project), and his full Curriculum Vitae (Experience, Education, Skills, Associations, Interests).
- **Project tabs (`/systemes/[slug]/`, `/en/systems/[slug]/`)**: Dedicated technical write-ups for `Homelab`, `Config NixOS`, and `Vitrine`, illustrated by wide, detailed static SVG architecture diagrams.
- **Bilingual parity**: French by default (`/`), English under `/en/`.
- **Minimal footer**: Version, git revision, commit date, source link, and a discreet link to the `/303/` synthesizer easter egg (no dedicated Colophon tab in the main navigation).

## Capabilities and Constraints

- **Stack**: Static Astro site, Tailwind CSS v4, TypeScript, packaged reproducibly via Nix Flakes (`flake.nix`).
- **Strict Content Security Policy (CSP)**: `default-src 'none'; script-src 'self' https://pulse.abe.lc; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://pulse.abe.lc; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. No inline styles (`inlineStylesheets: "never"`), no inline scripts, no external CDN requests.
- **Operational Security (OPSEC)**: Never expose private LAN IP addresses, internal ports, private subdomains, or VPN endpoints on public pages.
- **Print Fidelity**: Formats cleanly as a single-column A4 curriculum vitae under `@media print`.

## Brand Commitments

- **Minimalist, text-based clarity (`paco.me` × `hara.ndc.co.jp`)**: Calm typography, generous negative space, no giant billboard headings, no decorative ALL-CAPS eyebrows.
- **Detailed modern diagrams as illustrations**: Fine-line static SVG schematics that accurately depict system boundaries, data flows, network policies, and storage persistence.
- **Factual, anti-bullshit tone**: Concise, technical, and verifiable. Never use em dashes or en dashes in prose or UI labels.
