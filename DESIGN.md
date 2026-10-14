# Design System: Flat Editorial Minimalism (Hara Design Institute × nendo)

## 1. Visual Thesis & Reference World

`vitrine.abe.lc` follows the exact spatial and typographic grammar of **Hara Design Institute (`hara.ndc.co.jp/en/about/` & `hara.ndc.co.jp/en/`)** paired with the monochrome logo index of **nendo (`nendo.jp/en/about/`)**:

1. **Zero Typographic Relief (`16px` Flat Topology)**:
   Both body text and headings (`h1`, `h2`, `h3`) are rendered at `16px`. Headings are distinguished strictly by weight (`600`), subtle tracking (`0.08em`), and spatial positioning, never by giant font sizes, callout boxes, inline `<code>` pills, or right-aligned metadata badges. Nothing in a paragraph competes for attention over the next sentence.
2. **Wide Frame (`1280px`) + Centered Reading Stream (`600px`)**:
   - The outer page frame (`--frame-max: 1280px`) holds the incrusted top navigation, the offset page/section titles (`.content-title` and `.column-header`), the nendo-style monochrome technology wall, and the social footer.
   - All narrative prose and CV entries sit inside a centered `600px` reading column (`--col-reading: 600px`, `line-height: 1.95`) with generous vertical rhythm.
3. **Incrusted Header & Social Footer**:
   - **Header**: Pure white (`#ffffff`), `height: 90px`, no bottom border. Navigation links (`14px`, `letter-spacing: 0.08em`) fade to `opacity: 0.45` on hover. The language switcher (`FR | EN`) sits `30px` to the right of the menu, separated by a `1px × 13px` `#999999` vertical bar.
   - **Footer**: Pure white (`#ffffff`), `height: 166px`, no top border. Social/contact links (`GITHUB`, `EMAIL`) on the left, `© Abel Chartier` on the right.

---

## 2. Palette (Pure White Light Mode Only)

| CSS Custom Property | Value | Role |
|---|---|---|
| `--bg` | `#ffffff` | Pure white canvas everywhere (header, body, diagrams, footer) |
| `--ink` | `#000000` | Primary prose, active links, primary SVG strokes |
| `--ink-2` | `#555555` | Secondary roles |
| `--ink-3` | `#828282` | Dates, specification keys, inactive navigation links, diagram subtitles |
| `--ink-muted` | `#999999` | Inactive language switcher item and divider |
| `--line` | `#c8c8c8` | Section header hairlines (`1px solid`) |
| `--line-light` | `#e5e5e5` | Subtle internal CV entry dividers |

---

## 3. Typography (`IBM Plex Sans`)

Self-hosted (`font-src 'self'`) via `@fontsource/ibm-plex-sans`.

| Role | Family | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| **Header / Nav / Lang (`FR \| EN`)** | `IBM Plex Sans` | `14px` | `400` / `600` | `1.0` | `0.08em` |
| **Offset Page / Section Title (`h1`, `.column-header h2`)** | `IBM Plex Sans` | `16px` | `600` | `1.4` | `0.08em` |
| **Essay Subheading (`.project-body h2`)** | `IBM Plex Sans` | `16px` | `600` | `1.6` | `0` |
| **Narrative Prose (`body`, `p`)** | `IBM Plex Sans` | `16px` | `400` | `1.95` | `0` |
| **Bottom Credits / Specs (`.entry-credit`)** | `IBM Plex Sans` | `15px` | `400` / `600` | `1.75` | `0` |

---

## 4. Épuré Diagrams & Technology Wall

1. **Frameless `1px` Line Diagrams (`VmFlow.astro`, `Impermanence.astro`)**:
   - No diagram on the Home page.
   - Exactly 1 minimal SVG diagram per project page (`Homelab` and `Config NixOS`), sitting directly on the `#ffffff` canvas with no outer box, no background fill, no hatch patterns, and only essential component names (`1px` solid `#000` for persistent state, `1px` dashed `#828282` for volatile `tmpfs`).
2. **Monochrome Technology Wall (`TechWall.astro`)**:
   - Inspired by `nendo.jp/en/about/`: a quiet left label (`technologies`) paired with a 6-column borderless grid of 30 monochrome (`#1a1a1a`) marks, five full rows: one line wider than tall.
   - Ordered by what matters to the reader first: cloud-native infrastructure (Linux, NixOS, Windows, Kubernetes, Flux, Argo CD, OpenTofu, Ansible, Proxmox, OVHcloud, Cilium...), then security (OpenBao, Trivy, Let's Encrypt, WireGuard, Tailscale, pfSense, Stormshield), then languages (Python, Java, C).
   - Logos come from simple-icons; Windows uses the official four-pane mark from Material Design Icons (simple-icons dropped Microsoft brands), and Stormshield uses its official favicon (`public/logos/stormshield.png`, credits in `public/logos/CREDITS.md`) filtered to black. Anything without an official mark, any layer duplicate, any homelab-only tool, and desktop garnish is out.
   - On the CV page it replaces the former text `skills` list: the visual wall is for humans, the Typst PDF stays text-only for ATS parsing.
