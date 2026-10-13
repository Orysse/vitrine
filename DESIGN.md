# Design System: Surgical Engineering Brutalism

## 1. Visual Thesis & Reference World

`vitrine.abe.lc` embodies **Surgical Engineering Brutalism**: a cross-pollination of three reference worlds tailored to a Systems, Infrastructure, and Security engineer:

1. **Oxide Computer (`oxide.computer`) — Exposed Engineering Chassis**:
   1px structural hairlines, exposed tabular specification matrices, hardware/kernel datasheet rigor, schematic wireframe diagrams, and explicit system state indicators.
2. **Hara Design Institute (`hara.ndc.co.jp`) — Radical Emptiness (*Ma*) & Surgical Monochrome**:
   Pure unbleached/surgical white ground (`#FFFFFF`) and carbon ink (`#0A0A0A`), zero chromatic noise, strict typographic scale, and deliberate negative space (at least 35% of every viewport remains open paper/canvas so the exposed grid never feels cramped).
3. **Stripe Press (`press.stripe.com`) — Archival Edition & Tactile Artifact**:
   Catalog-style edition indexing (`[01]` to `[04]`), rich colophon metadata, and a manipulable 3D/isometric CAD technical artifact that gives physical presence to abstract infrastructure.

### Core Aesthetic Rules
- **One System Everywhere**: Every route shares the exact same chassis, grid, typography, and monochrome polarity. Never invent per-page themes or "universes".
- **Zero Radius (`0px`)**: Every cell, button, badge, diagram frame, and table uses sharp `0px` corners.
- **Zero Shadows, Gradients, or Blur**: Depth and hierarchy are achieved strictly through `1px solid` rules, solid black/white polarity inversion, SVG hatching/stipple patterns, and typographic weight/scale.
- **Structure Is Information**: Every `1px` line separates distinct semantic regions (index column vs specification body, key vs value, layer vs inspector). Never draw boxes inside boxes.

### Explicit Anti-Goals (Banned Patterns)
- No rounded SaaS cards, soft drop shadows, glassmorphism, or decorative gradients.
- No third-party brand logo walls or colorful tech badges.
- No decorative all-caps eyebrows above every heading or single italicized/colored accent words inside headlines.
- No em dashes or en dashes in UI copy or prose.
- No scroll-jacking, fade-and-slide-up section reveals, or unrequested background animations.

---

## 2. Chromatic System: Surgical Monochrome & Polarity Inversion (`[INV]`)

The palette is strictly **achromatic (`hue = 0`, `chroma = 0`)**. There is no accent hue. Hierarchy, active states, and focus are communicated through **full polarity inversion** (white ink on solid black ground in light mode; black ink on solid white ground in dark mode) and **geometric SVG line patterns** (diagonal 45deg hatching, cross-hatching, and dot matrices).

Default polarity is **Hara Surgical Light (`#FFFFFF`)**, while honoring `prefers-color-scheme: dark` on first visit if the user's OS requests it, and providing an instant manual/keyboard polarity switch (`[INV]` / key `i`) persisted via `data-theme="light | dark"` on `<html>`.

### Token Table

| CSS Custom Property | Light Mode (Hara Paper) | Dark Mode (Oxide Rack `[INV]`) | Semantic Role |
|---|---|---|---|
| `--bg-canvas` | `#FFFFFF` | `#0A0A0A` | Primary page background |
| `--bg-surface` | `#F6F6F6` | `#121212` | Secondary technical cells, inactive spec panels, code blocks |
| `--bg-elevated` | `#EEEEEE` | `#1A1A1A` | Hover surface for non-inverted interactive rows |
| `--bg-inverse` | `#0A0A0A` | `#FFFFFF` | Active tab, selected architecture layer, primary CTA fill, focus badge |
| `--ink-primary` | `#0A0A0A` | `#FFFFFF` | Primary prose, headlines, active SVG strokes (Contrast 19.6:1) |
| `--ink-secondary` | `#404040` | `#B0B0B0` | Supporting descriptions, secondary table cells (Contrast ≥ 9.5:1) |
| `--ink-muted` | `#6E6E6E` | `#808080` | Coordinate labels, index numbers, keyboard hints, inactive wireframe lines (Contrast ≥ 4.8:1) |
| `--ink-inverse` | `#FFFFFF` | `#0A0A0A` | Text and icons rendered on `--bg-inverse` |
| `--rule-strong` | `#0A0A0A` | `#FFFFFF` | Outer chassis frame, major section dividers, active cell borders (`1px solid`) |
| `--rule-hairline` | `#E0E0E0` | `#242424` | Internal 12-column grid lines, fact matrix rows, diagram axes (`1px solid`) |
| `--pattern-hatch` | `rgba(10,10,10,0.08)` | `rgba(255,255,255,0.10)` | 45deg diagonal 1px SVG/CSS repeating linear pattern for structural zones |

---

## 3. Typography & Scannable Hierarchy

All fonts are self-hosted (`font-src 'self'`) via `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`.

### Font Families
1. **`--font-sans`**: `'Geist Variable', system-ui, -apple-system, sans-serif`
   - Used for primary titles, system summaries, architectural prose, and biographical descriptions.
   - Features: `"kern" 1, "liga" 1`.
2. **`--font-mono`**: `'Geist Mono Variable', ui-monospace, SFMono-Regular, monospace`
   - Used for the top chassis bar, edition indices (`[01]`-`[04]`), specification keys, dates, durations, file paths, git revisions, keyboard shortcuts, and diagram annotations.
   - Mandatory numeric discipline: `font-variant-numeric: tabular-nums slashed-zero`.

### Typographic Scale & Rhythm

| Role | Family | Size (Fluid / Desktop) | Weight | Line Height | Tracking | Measure / Notes |
|---|---|---|---|---|---|---|
| **Display / Index Title (`h1`)** | `--font-sans` | `clamp(1.75rem, 2.8vw, 2.5rem)` (`28px`–`40px`) | `600` | `1.1` | `-0.03em` | Max `28ch`. Crisp, architectural, never oversized billboard text. |
| **System / Section Header (`h2`)** | `--font-sans` | `clamp(1.25rem, 1.8vw, 1.5rem)` (`20px`–`24px`) | `600` | `1.2` | `-0.02em` | Preceded by its tabular index in `--font-mono` (e.g. `02.1`). |
| **Sub-heading / Highlight (`h3`)** | `--font-sans` | `1.0rem` (`16px`) | `600` | `1.35` | `-0.01em` | Paired directly with factual body text. |
| **Primary Prose (`body`)** | `--font-sans` | `0.9375rem` (`15px`) | `400` | `1.6` | `0em` | Strict reading measure: `58ch` to `68ch`. |
| **Specification Table Value** | `--font-sans` | `0.875rem` (`14px`) | `400` | `1.45` | `0em` | Aligned against monospace keys in fact matrices. |
| **Chassis / Spec Key / Meta** | `--font-mono` | `0.75rem` (`12px`) | `500` | `1.4` | `0.02em` | `tabular-nums`. Used for keys, dates, stack tags, and `[KEY]` hints. |
| **Micro Coordinate / CAD Label** | `--font-mono` | `0.6875rem` (`11px`) | `400` | `1.2` | `0.04em` | Used inside SVG schematic diagrams and colophon stamps. |

---

## 4. Layout Architecture, Grid & Exposed Chassis

### The Page Chassis
- **Max Width**: `1200px` centered in the viewport, bounded on left and right (on viewports `>= 1200px`) by continuous `1px solid var(--rule-hairline)` vertical rails, with a `1px solid var(--rule-strong)` top chassis header and bottom colophon bar.
- **12-Column Structural Grid**:
  - Desktop (`>= 1024px`): 12 columns, `0px` outer gap (cells share `1px` borders via CSS grid border-collapse patterns or `gap: 1px` on a `--rule-hairline` background where a full matrix is displayed), with generous internal cell padding (`24px` to `40px`).
  - Asymmetric split by default: **Left Index Column (3 or 4 cols)** carries section numbers, metadata, dates, and mode controls; **Right Content Column (8 or 9 cols)** carries the thesis, specification tables, prose, and interactive schematics.
  - Tablet (`768px`–`1023px`): 8 columns (2 cols index / 6 cols content).
  - Mobile (`< 768px`): Single column stack with horizontal `1px solid var(--rule-hairline)` dividers and `16px` horizontal padding.

### Negative Space Ratio (*Ma*)
To prevent the Oxide-style grid from becoming an oppressive wall of text:
- Every major section reserves **at least one unoccupied structural zone** (either the lower portion of the left index column or breathing margin around the CAD diagram) on desktop.
- Cell padding is never tighter than `16px 20px` in data tables and `32px 32px` in primary narrative/diagram cells.

### Top Chassis Bar (Persistent System Header)
A single-row (or two-row on mobile) structural bar at the top of every page, rendered in `--font-mono` (`12px`), divided into bordered cells:
1. **Identity Cell**: `ABEL CHARTIER` + status badge `SYSOPS / DEVSECOPS · STAGE FÉV. 2027`
2. **Navigation Matrix**:
   - `[01] INDEX`
   - `[02] SYSTÈMES`
   - `[03] PARCOURS`
   - `[04] COLOPHON`
   *(The active pole is rendered in solid inverted colors: `background: var(--bg-inverse); color: var(--ink-inverse)`).*
3. **System Controls Cell**:
   - Density switch: `[MODE: SYNTHÈSE | SPEC]` (shortcut `D`)
   - Polarity switch: `[INV]` (shortcut `I`)
   - Locale switch: `[FR | EN]` (shortcut `L`)
   - Primary artifact action: `[CV.PDF]`

---

## 5. Component & Interactive Grammar

### A. Fact & Specification Matrices (Oxide Datasheet Pattern)
Projects and systems never use marketing feature cards. They use **2-column or 4-column bordered specification tables**:
- **Key cell**: `140px`–`180px` wide, `--font-mono`, `--ink-muted`, `--bg-surface`, right-bordered `1px solid var(--rule-hairline)`.
- **Value cell**: `--font-sans` (with inline `--font-mono` for paths, binaries, and Nix attributes), `--ink-primary`, `--bg-canvas`.

### B. Density Mode (`data-density="summary | spec"`)
- **`summary` (Default — 30-second Recruiter Scan)**:
  Displays system summaries, the 3 to 5 distinctive architectural highlights per project, core experience roles, and primary CTAs. Deep implementation prose, secondary fact rows, and file-level Nix/Flux mappings are collapsed behind a clean `1px` status bar (`[+ N SPÉCIFICATIONS TECHNIQUES — BASCULER EN MODE SPEC (D)]`).
- **`spec` (Raw Engineering Specification)**:
  Expands all architectural prose, full `facts` tables, exact repository file paths, security invariants, and detailed coursework/stack breakdowns across the entire site simultaneously.

### C. Interactive Architecture Inspector & Manipulable Isometric Artifact
- Rendered in **crisp `1px` vector SVG** (`vector-effect: non-scaling-stroke`), using only `--ink-primary`, `--ink-muted`, `--bg-canvas`, `--bg-surface`, and diagonal SVG hatch fills.
- **Manipulable Isometric Stack (on `[01] Index` and `[02] Systèmes`)**:
  - Displays the 6 physical-to-application layers of the homelab (`Matériel NUC10i7FNH` → `Hôte NixOS` → `3 × microVMs tmpfs` → `Cluster k3s/Cilium` → `Plateforme Flux/OpenBao/Pocket-ID` → `Ce site nginx:65534`).
  - **Interactive CAD Controls**: Visitors can drag to rotate/tilt the isometric projection within bounded angles (or step through Z-axis explosion levels `[COMPACT / ÉCLATÉ / COUPE]`) and click or keyboard-select (`j`/`k` or `1`–`6`) any plate.
  - Selecting a plate inverts that plate (`--bg-inverse` fill, `--ink-inverse` stroke) and updates the adjacent **Layer Specification Readout** with the exact source file in `Orysse/homelab-nix` or `Orysse/homelab-cluster`, its runtime invariant, and failure/recovery behavior.
  - **Zero-JS Fallback**: Without JavaScript, the SVG renders in its canonical exploded isometric view with all 6 layers clearly labeled in an adjacent static specification table.

### D. Keyboard Command System
- Pressing `1`–`4` navigates to the corresponding pole.
- Pressing `d` toggles `SYNTHÈSE` / `SPEC BRUTE`.
- Pressing `i` toggles light/dark polarity (`[INV]`).
- Pressing `l` switches between French and English equivalents of the current route.
- Pressing `j` / `k` steps through inspectable architecture layers or system entries on the current page.
- Pressing `?` toggles a compact, bordered monochrome keyboard reference overlay anchored to the bottom-right chassis rail.
- All single-key shortcuts are automatically disabled when focus is inside an input, when modifier keys (`Ctrl`, `Alt`, `Meta`) are held, or on `/303/` where the synthesizer uses its own controls.

### E. Print Stylesheet (`@media print`)
- Hides the top chassis control cells, keyboard hints, interactive CAD sliders, and footer colophon links.
- Forces light polarity (`#FFFFFF` paper, `#000000` ink) and single-column A4 geometry so `/parcours/` (and `/`) can be printed or saved to PDF as a clean engineering resume.
