# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical recruiters, infrastructure engineers, SREs, DevSecOps engineers, and engineering leads evaluating Abel Chartier (5th-year engineering student at EPITA, Systems, Networks and Security major; contributor at La Forge) for a 6-month end-of-studies internship starting February 2027.

They arrive from a CV PDF, GitHub, or LinkedIn. Some scan in 30 seconds between candidates to verify profile fit and grab the CV; others (tech leads, staff engineers) inspect the systems architecture, Nix expressions, and security invariants to verify whether the claimed technical depth is genuine.

## Product Purpose

`vitrine.abe.lc` is Abel Chartier's technical portfolio and specification index: who he is, the systems he builds and operates, and the verifiable engineering decisions behind them.

A visit succeeds when the visitor:
1. Downloads the CV (`ABEL_CHARTIER_CV_fr.pdf` or `ABEL_CHARTIER_CV_en.pdf`),
2. Contacts Abel directly (`abel.chartier@gmail.com` or LinkedIn),
3. Inspects the source repositories on GitHub (`homelab-nix`, `homelab-cluster`, `config`, `vitrine`).

## Positioning

Proof by artifact. The site is not a marketing brochure about infrastructure; it is itself a reproducible Nix package (`buildNpmPackage` + `buildLayeredImage`), served by an unprivileged nginx container (`65534:65534`, read-only root filesystem, `/tmp` only) running on Abel's own homelab (an Intel NUC running NixOS with three diskless tmpfs k3s microVMs, Cilium eBPF default-deny networking, and Flux GitOps).

Every project is presented through its distinctive architectural decisions and security invariants rather than an exhaustive inventory of standard boilerplate.

## Operating Context

- Multi-page architecture organized into four indexed poles (`[01] Index`, `[02] Systèmes`, `[03] Parcours`, `[04] Colophon`) plus dedicated specification pages for each system, replacing endless single-page scrolling with purposeful navigation.
- Dual reading depth via a global density toggle (`SYNTHÈSE` vs `SPEC BRUTE`): rapid 30-second triage for recruiters in summary mode, full technical specifications and fact matrices for engineers in raw spec mode.
- Bilingual parity: French by default (`/`), English under `/en/`. Every route, label, and data entry exists in both languages.
- Structured data lives in `src/profile.ts`, `src/homelab.ts`, and `src/content/` (YAML collections and Markdown project specs), validated at build time by Astro content schemas.
- Continuous delivery via semver git tags (`vX.Y.Z`), built and published to `ghcr.io/orysse/vitrine`, tracked by Renovate and deployed by Flux in `homelab-cluster`.

## Capabilities and Constraints

- **Stack**: Static Astro site, Tailwind CSS v4, TypeScript, packaged reproducibly via Nix Flakes (`flake.nix`).
- **Strict Content Security Policy (CSP)**: `default-src 'none'; script-src 'self' https://pulse.abe.lc; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://pulse.abe.lc; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. No inline styles (`inlineStylesheets: "never"`), no inline scripts, no external CDN requests.
- **Progressive Enhancement & Lightweight JS**: Every page must render its complete textual and structural content without JavaScript. Lightweight first-party TypeScript (`'self'`) is used for system-level interactions: keyboard navigation (`1`-`4`, `d`, `i`, `l`, `j`/`k`, `?`), the `[SYNTHÈSE / SPEC BRUTE]` density toggle, `[INV]` monochrome polarity inversion, interactive architecture layer inspection, and the manipulable isometric/CAD stack artifact.
- **Operational Security (OPSEC)**: Never expose private LAN IP addresses, internal ports, private subdomains, or VPN endpoints on public pages.
- **Easter Egg**: The VTR-303 synthesizer (`/303/` and `/en/303/`) remains intact as an unpromoted, reachable extra linked subtly from the Colophon.
- **Print Fidelity**: `/parcours/` (`/en/resume/`) formats cleanly as a single-column A4 curriculum vitae under `@media print`, stripping navigation chrome and interactive controls.
- **Extensibility**: The `[02] Systèmes` collection and layout grid must accommodate future technical write-ups, post-mortems, or Architecture Decision Records (ADRs) without structural changes.

## Brand Commitments

- **Factual, anti-bullshit tone**: Concise, technical, and verifiable. Zero sales adjectives, zero self-congratulatory framing, zero filler.
- **Punctuation discipline**: Never use em dashes or en dashes in prose or UI labels; use colons, semicolons, parentheses, or periods.
- **Authorship & truth**: Every statement, metric, file path, and repository reference is factual and authored from Abel's real infrastructure and career history.
- **Single cohesive system**: One unified visual and structural language across the entire site (no per-page theme switching or disparate "universes").

## Evidence on Hand

- **CV PDFs**: `public/cv/ABEL_CHARTIER_CV_fr.pdf` and `public/cv/ABEL_CHARTIER_CV_en.pdf`.
- **Structured Career Data**: `src/content/experience.yaml` (La Forge EPITA, CEA, Kleis), `src/content/education.yaml` (EPITA SRS, ITS Surabaya), `src/content/associations.yaml` (La Paillasse, Antre), `src/content/skills.yaml`, `src/content/interests.yaml`.
- **System Specifications**: `src/content/projects/{fr,en}/homelab.md`, `config.md`, `vitrine.md`, and `src/homelab.ts`.
- **Public Repositories**: `github.com/Orysse/homelab-nix`, `github.com/Orysse/homelab-cluster`, `github.com/Orysse/config`, `github.com/Orysse/vitrine`.
- **Absences**: No third-party testimonials, commercial client logos, or fabricated performance percentages exist; none may be invented. LinkedIn URL in `src/profile.ts` remains hidden until populated.

## Product Principles

1. **Recruiter & Engineer Dual Speed**: Immediate access to the CV PDF, email, and GitHub within seconds in `SYNTHÈSE` mode; deep architectural proof in `SPEC BRUTE` mode.
2. **Architecture as Proof**: Show what makes a system distinct (diskless tmpfs microVMs, magic rollback, wrapper-modules without home-manager, default-deny Cilium eBPF) rather than listing generic tools.
3. **Zero Decorative Chrome**: Every border, index number, diagram line, and keyboard shortcut encodes real hierarchy, state, or navigation.
4. **Resilient Delivery**: Self-hosted, zero third-party dependencies, strict CSP compliance, and full readability before a single byte of JavaScript executes.

## Accessibility & Inclusion

- WCAG 2.1 AA minimum contrast (and AAA ≥ 7:1 on primary body and specification tables) in both default surgical white (`#FFFFFF`) and inverted carbon black (`#0A0A0A`) polarities.
- Full keyboard operability with high-visibility 1px inverted focus states and shortcut suppression inside interactive controls or when modifiers are pressed.
- Respects `prefers-reduced-motion: reduce` (disables isometric interpolation and smooth transitions) and `prefers-color-scheme` as the initial default before manual `[INV]` override.
