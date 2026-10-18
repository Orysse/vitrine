# Changelog

One entry per tag. Each tag publishes `ghcr.io/orysse/vitrine:X.Y.Z`.

## 2.1.0 (2026-10-18)

The works read as clickable.

- Rows: huge uppercase name that scrolls on hover, short text swapped for an outlined "Voir" pill that slides in from the side.
- One shared blob follows the mouse on a leash, behind the text, with a picture per work (photo, logos) swapped by a wavy wipe. Fine pointers only.
- Phones and touch: no hover effects; each row is a number, a name that wraps, a small pill and the short text under it.
- Header: language link on the left, CV as an outlined pill on the right, site link removed. Faster tech marquee.

## 2.0.0 (2026-10-17)

Rebuilt from scratch as a single page: the project sheet.

- One page, French at `/` and English at `/en/`: hero, five expandable works (Forge, CEA, RedPill, homelab, L'Atelier), education, tech marquee, beer, contact.
- Cream paper, warm ink, one signal colour; Hanken Grotesk and IBM Plex Mono, self-hosted. No client framework, one 600-byte script, no analytics.
- Strict CSP with nothing inline (`pulse.abe.lc` dropped). Port 8080 and `/healthz` unchanged.
- Old URLs (`/systemes/...`, `/projets/...`, `/parcours/`, `/colophon/`, `/303/` and their `/en/` twins) redirect to `/` or to the fiche anchor.
- Removed: separate project pages, resume/studies/colophon pages, VTR-303, density and polarity switches, analytics.

## 0.13.0 (2026-10-14)

Full-width grid minimalism, honest copy, diagrams that explain the systems.

- Layout spans the full width on a 12-column grid: no more narrow centered column.
- Strong text elements carry the page (name, statements, section titles); plain text links.
- Diagrams replace decorative layer stacks, each one saying something true:
  diskless microVMs and where the state goes, data flows and the Cilium default-deny
  boundary, the monitoring that survives the cluster, the impermanence boot chain
  of the NixOS config, the tag-to-production chain of this site.
- Copy rewritten in the first person, humble and factual.

## 0.12.0 (2026-10-13)

The product decisions of `PRODUCT.md` applied.

- Home page about Abel only: the homelab diagram moves to the Homelab page.
- Email on the home page; a LinkedIn link appears once its URL is set in `src/profile.ts`.
- Project pages open on what sets the project apart; facts, stack and write-up fold under "Full details".
- New project page for this site (vitrine).
- NixOS config: river, not sway, as the compositor.

## 0.11.0 (2026-10-13)

The 0.8.0 site in the museum treatment, graphite only (see `DESIGN.md`).

- No hue: graphite is the text and the accent; blue links and focus are gone.
- Huge tight name and project titles (Geist 700, up to 74px).
- Entries under 1px graphite rules; hovering inverts the head line as a black block.
- Links bold, underlined only on hover; the availability line in bold.
- Fact sheets with one rule per line; square corners everywhere.
- `PRODUCT.md` and `DESIGN.md` record the audience, the goals and the design system.

## 0.10.0 (2026-10-13)

- Back to the 0.8.0 design and content: the code is the 0.8.0 tree, under a new version.

## 0.9.0 (2026-10-13)

One page per subject, each in its own universe, see `PITCH.md`.

- Home page about me only: availability, now, CV, experiences that open on click with tool logos, project cards.
- Project pages show their architecture: layers of parts with real logos, a card per part (role, repo path).
- Universes: warm paper (home), blueprint (homelab), Everforest (config), silver (303).
- Trail at the top of every page, kept in place by view transitions, marks visited pages.
- Real photos of the NUC and the ThinkPad are back; logos in `public/logos/` with credits.
- Removed: the isometric homelab stack, project fact sheets.

## 0.8.0 (2026-10-13)

Sober redesign, see `PITCH.md`.

- One column of text, Geist and Geist Mono, light and dark themes.
- Homelab diagram: an isometric SVG stack built at compile time, with its sources in `src/homelab.ts`.
- Colophon: version, git revision and commit date of the build.
- Print sheet: the home page prints as a CV.
- Removed: grounds, halftones, trip slider, photos and the five previous fonts. No JavaScript on content pages.

## 0.7.0 (2026-10-11)

- Homelab map removed, its URLs redirect to the homelab project.
- 303 panel redrawn after the TB-303.

## 0.6.1 (2026-10-10)

- Umami website ID, homelab content matched to the current setup. (No 0.6.0 tag: it was retagged 0.5.1.)

## 0.5.2 (2026-10-09)

- The 303 is a site gadget, not a project.

## 0.5.1 (2026-10-09)

- Homelab explanation page restored.

## 0.5.0 (2026-10-09)

- Homelab map, real photos, no dashes in the copy.

## 0.4.0 (2026-10-09)

- VTR-303 page.

## 0.3.0 (2026-10-08)

- Trimmed content, footer and 303 removed.

## 0.2.0 (2026-10-08)

- Astro rewrite, CV-style content.

## 0.1.0 (2026-10-08)

- First version.
