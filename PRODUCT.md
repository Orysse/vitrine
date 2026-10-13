# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical recruiters: infrastructure, systems or security engineers and leads evaluating Abel
Chartier for an internship starting February 2027. They arrive from the CV, LinkedIn or GitHub,
usually with the CV already in hand, and want to judge quickly whether the technical depth is
real.

## Product Purpose

vitrine.abe.lc is Abel's CV expanded into a site: who he is, what he does, and the technical
detail behind each project. A visit succeeds when the recruiter:

- downloads the CV (French or English PDF),
- gets in touch (email or LinkedIn),
- goes on to read the repositories on GitHub.

## Positioning

The site is written and run by the candidate himself: built reproducibly with Nix and served
from his own homelab. It shows each project through what is different about it, not through an
inventory of everything it contains.

## Operating Context

- Visitors read on desktop between other candidates, or on a phone from a link; the page must
  make sense in under a minute and reward a deeper read.
- French by default (`/`), English under `/en/`; every string exists in both.
- Content lives in `src/content/` and `src/profile.ts`; CV PDFs are copied from the CV
  repository into `public/cv/`.
- Released by semver tags; CI publishes `ghcr.io/orysse/vitrine:X.Y.Z`, Renovate and Flux
  deploy it in homelab-cluster.

## Capabilities and Constraints

- Static Astro site, Tailwind, Nix flake, unprivileged nginx image.
- Strict CSP: scripts, styles and fonts from self only (plus Umami at pulse.abe.lc); nothing
  inline, no third-party requests.
- Pages must read fully without JavaScript.
- No LAN IPs, ports, internal subdomains or VPN details on public pages.
- Contact: email (abel.chartier@gmail.com, as on the CV) and LinkedIn. **Open:** LinkedIn URL
  to be provided by Abel; no LinkedIn link is on the CV today.
- The VTR-303 (`/303/`) stays as a hidden extra, reachable but not promoted.

## Brand Commitments

- Copy is concise and factual, French and English, never salesy, no flattery, no editorial
  framing, and no em or en dashes.
- Every sentence comes from Abel; nothing is written in his place, and every number is true.
- The current sober design (v0.8.0) is the accepted look. Two wholesale redesigns (0.9.0 and
  an unreleased page-based variant) were rejected; changes are incremental.

## Evidence on Hand

- CV PDFs: `public/cv/ABEL_CHARTIER_CV_fr.pdf`, `public/cv/ABEL_CHARTIER_CV_en.pdf`.
- Experience, education, associations, skills, interests: `src/content/*.yaml`.
- Projects: `src/content/projects/{fr,en}/homelab.md` and `config.md`; repositories
  github.com/Orysse/homelab-nix, homelab-cluster, config, vitrine.
- No testimonials, references, metrics or employer endorsements exist; none may be invented.

## Product Principles

1. Recruiter first: the CV, the contact and GitHub are always one step away.
2. Show what is different about a project, not everything in it. Abel does not want the full
   NixOS config or the whole cluster laid out; pick the distinctive decisions.
3. Facts over adjectives: real values, real paths, real repositories.
4. Evolve the accepted design; never replace it without asking.
