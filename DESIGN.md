---
name: vitrine.abe.lc
description: A CV laid out like museum signage, in graphite.
colors:
  paper: "#fbfaf8"
  graphite: "#1c1b19"
  stone: "#67645e"
  rule-light: "#e3e0da"
  hover-light: "#f1efea"
  plate: "#ffffff"
  plate-side: "#e9e6e0"
  night: "#151514"
  chalk: "#e9e7e2"
  stone-dark: "#9b978f"
  rule-dark: "#2f2e2b"
  hover-dark: "#1f1f1d"
  plate-dark: "#23231f"
  plate-side-dark: "#1a1a18"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(44px, 8.4vw, 74px)"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  row: "8px"
  section: "64px"
  column: "42rem"
  column-wide: "64rem"
components:
  link:
    textColor: "{colors.graphite}"
    typography: "{typography.title}"
  link-hover:
    textColor: "{colors.graphite}"
  row:
    textColor: "{colors.graphite}"
    padding: "8px 0"
    rounded: "{rounded.none}"
  row-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    padding: "8px 6px"
  legend-on:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
---

# Design System: vitrine.abe.lc

## Overview

**Creative North Star: "The Quiet README"**

The site reads like a good repository README hung on a museum wall: one column of plain facts,
set in black on paper, with the owner's name as the only loud object. The museum treatment
(after the Whitney and the Stedelijk) gives it its rawness: a huge, tight grotesk name, 1px
graphite rules between entries, and states shown by inverting a whole block to black instead
of by colour.

There is no accent colour. Graphite is both the text and the accent, so emphasis comes from
size, weight, rules and inversion only. Light and dark themes are both first-class and follow
the reader's system setting.

The isometric homelab stack is the one drawn object on the site, and the only place with depth.

**Key Characteristics:**
- One huge name, everything else at reading size.
- Graphite on paper, no hue anywhere.
- 1px rules and full-block inversion instead of cards, shadows or tints.
- Square corners everywhere.
- Mono only for values: dates, versions, paths, tool names.

## Colors

Warm-tinted neutrals only; graphite does the work of an accent.

### Primary
- **Graphite** (light text, rules and inverted blocks): body text, the 1px rules between rows, the fill of a hovered row or a picked stack layer, and the focus outline.
- **Chalk** (dark theme counterpart of graphite): the same roles on the night background.

### Neutral
- **Paper**: the light page background, and the text colour inside an inverted block.
- **Night**: the dark page background.
- **Stone** and **Stone dark**: secondary text, metadata, legend values.
- **Rule light** and **Rule dark**: the faint dividers that are not entry rules (the colophon rule).
- **Hover light** and **Hover dark**: the only tint, reserved for quiet hovers (legend lines).
- **Plate**, **Plate side** and their dark counterparts: the top and the edges of the stack's isometric plates.

### Named Rules
**The No Hue Rule.** No colour other than the neutrals above. Status, emphasis and selection are shown by weight, size or inversion, never by a coloured accent.

**The Inversion Rule.** A selected or hovered line inverts as a whole block (graphite ground, paper text): the head line of an entry, a legend line. Never tint a block partially.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (with ui-monospace, Menlo)

**Character:** One grotesk at two extremes: a heavy, tightly tracked display used once, and a calm reading weight everywhere else. The mono is a data face, not a style.

### Hierarchy
- **Display** (700, clamp 44px to 74px, line-height 0.84, tracking -0.06em): the owner's name on the home page and the title of a project page. Once per page.
- **Headline** (600, 15px): section titles (Experience, Projects, Education, Skills).
- **Title** (600, 16px): entry titles, link labels, project names.
- **Body** (400, 16px, line-height 1.6): running text, kept within a 42rem column.
- **Availability** (Body at 600): the internship line under the status, bold, no background; the only emphasis on the home page after the name.
- **Small** (400, 14px): the header line, fact-sheet keys and outside-work notes.
- **Label** (Geist Mono 400, 13px): dates, places, versions, paths, tool lists, the colophon.

### Named Rules
**The One Shout Rule.** Display size appears once per page. Everything else stays at 13 to 16px; hierarchy below the name comes from weight and rules.

**The Mono Is Data Rule.** Mono only for values a reader could copy: dates, versions, paths, tools. Never for labels or decoration.

## Layout

A single left-aligned column of 42rem (64rem for the 303 panel), with a 16px gutter on phones and 24px from the sm breakpoint. Sections are separated by 64px of space, entries by 1px graphite rules with 8px of vertical padding. Rows put the title on the left and the date in mono on the right; on phones the date drops under the title. The stack sits beside its legend from the sm breakpoint and above it on phones. Nothing is centred.

## Elevation & Depth

The page is flat: no shadows, no layered surfaces, no cards. The only depth on the site is the isometric stack, drawn in SVG; picking a layer lifts its plate by 8px.

### Named Rules
**The One Object Rule.** Depth belongs to the stack alone. Any other element that needs emphasis inverts; it never rises.

## Shapes

Square corners throughout (0 radius): rows, inverted blocks, focus outlines, legend lines. Lines are 1px. The stack's plates are the only non-rectangular forms.

The VTR-303 page (`/303/`) is exempt: its panel imitates the hardware, with its own silver, knob and LED colours and small radii.

## Components

### Links
- **Style:** inherit the text colour, 600 weight, no underline at rest.
- **Hover:** a 2px graphite underline appears (3px offset).
- **Focus:** 2px graphite (chalk in dark) outline, 3px offset, square.

### Entry rows
- **Style:** a 1px graphite rule above each entry, title left, mono date and place right; the points of an entry stay visible below its head line.
- **Hover:** only the head line (title, date, place) inverts (graphite ground, paper text, 6px side padding); the points below stay on paper. Inversion is instant, with no transition.

### Project pages
- **Title** in Display; summary in Body stone; repository link in Label.
- **Fact sheet:** key in stone, value in mono, one 1px rule per line.

### Navigation
- **Style:** a small header line: the site name or the owner's name on the left, the language switch on the right, both at 14px in stone, graphite on hover.

### Architecture stack (signature)
- **Plates:** paper tops, plate-side edges, 1px stone outlines; a picked plate fills graphite and lifts 8px.
- **Legend:** layer name in title weight, values in mono stone; the picked line inverts like an entry row.

### Colophon
- **Style:** mono 12.5px in stone under a 1px rule: version linked to its tag, revision, commit date, source.

## Do's and Don'ts

### Do:
- **Do** set the name and project titles in Display (700, up to 74px, line-height 0.84, -0.06em), once per page.
- **Do** separate entries with 1px graphite rules and invert the hovered entry as a whole block.
- **Do** keep every corner square and every line 1px.
- **Do** design the dark theme with the same care: night ground, chalk text, chalk inversions.

### Don't:
- **Don't** add any hue, including blue for links (rejected); graphite is the accent.
- **Don't** use drop shadows, offset shadows, thick borders or rounded cards (the generated neo-brutalist look was rejected).
- **Don't** introduce per-page colour universes (rejected in 0.9.0).
- **Don't** set labels or headings in mono or uppercase-tracked mono; mono is for data only.
