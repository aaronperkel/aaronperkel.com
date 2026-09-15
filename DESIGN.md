---
name: aaronperkel.com
description: A personal site built like a man page — one document that reads the same in a browser and a terminal.
colors:
  page: "#ffffff"
  ink: "#171717"
  muted: "#6f6f6f"
  rule: "#e4e4e4"
  page-dark: "#0a0a0a"
  ink-dark: "#ededed"
  muted-dark: "#969696"
  rule-dark: "#2a2a2a"
typography:
  display:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.65
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  detail:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  tagline:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "0.15em"
  meta:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "6px"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  section: "2.5rem"
  page-block: "3.5rem"
  grid-gap-x: "1.5rem"
  grid-gap-y: "2.25rem"
  footer-offset: "4rem"
components:
  section-label:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
  avatar:
    rounded: "{rounded.full}"
    size: "2.25rem"
  project-entry:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "1rem 0"
  project-entry-marker:
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  project-entry-image:
    rounded: "{rounded.sm}"
    height: "280px"
---

# Design System: aaronperkel.com

## Overview

**Creative North Star: "The Man Page"**

This is one document that reads the same in a browser and a terminal. Prose is set in a serif;
everything that is *about* the prose — a section heading, a date, a nav item, a project count, a
command — is set in mono. Rules divide, space groups, weight emphasizes. Nothing else is asked to
carry meaning, which is why the same content survives being piped through `curl` with only ANSI
bold, dim, and underline standing in for the browser's type scale.

The result is deliberately undecorated but not unconsidered. There is no color, no shadow, no
illustration, no motion beyond the browser's own view transitions, and no component whose job is
ornament. Density is moderate and consistent: a single 44rem column, hairline rules at every
structural seam, and a vertical rhythm that repeats at 2.5rem between sections and 3.5rem around a
page's main block. Both light and dark are first-class, defined by the same four tokens inverted —
neither is a "theme" layered on the other.

The voice this dresses is first-person and understated: copy that says what a thing does and who it
was for, never how impressive it is. The type system matches that register. It does not raise its
voice, and it has exactly one way of saying "this is a heading."

**Key Characteristics:**
- Two typefaces, two jobs: IBM Plex Serif for prose, IBM Plex Mono for every piece of metadata.
- A four-token palette with no hue at all, inverted for dark mode.
- One column, 44rem, with hairline rules as the only divider.
- Links are ink with a muted underline — never a color.
- Section headings are mono, uppercase, letterspaced, and muted, at one size only.

## Colors

The palette has no hue. It is four tokens — a page, an ink, a muted ink, and a rule — inverted
wholesale for dark mode, so there is no separate dark palette to maintain and no accent to place.

### Primary
- **Ink** (`#171717` light / `#ededed` dark): All primary text, active navigation, link text, and the
  focus outline. This is the only "strong" value in the system; anything that needs emphasis gets
  ink plus weight, not a different color.

### Neutral
- **Page** (`#ffffff` light / `#0a0a0a` dark): The single background. There are no surface tiers, no
  cards on a tinted ground — the dialog sits on the same page color as the page behind it.
- **Muted Ink** (`#6f6f6f` light / `#969696` dark): Secondary text — taglines, dates, locations,
  inactive nav, footer, section labels, and link underlines at rest. Both values clear WCAG AA on
  their own page color (5.0:1 light, 8.9:1 dark), so muted is legitimately readable, not decorative
  grey.
- **Rule** (`#e4e4e4` light / `#2a2a2a` dark): Every divider and every image or dialog border, always
  at 1px. It is deliberately close to the page so structure is felt more than seen.

### Named Rules
**The No-Hue Rule.** There is no accent color, and adding one is a change to the system rather than a
choice within it. Emphasis is produced by weight, rule, and whitespace. If a design needs a color to
work, the design is wrong before the palette is.

**The Underline-Not-Color Rule.** Links are ink with a `muted` underline offset 3px, darkening to ink
on hover. Navigation and footer links invert this — muted with no underline, gaining ink and an
underline on hover — so a link never announces itself with color anywhere in the system.

## Typography

**Display / Body Font:** IBM Plex Serif (fallback Georgia, serif), self-hosted at 400 and 600.
**Label / Mono Font:** IBM Plex Mono (fallback ui-monospace, SFMono-Regular, Menlo, monospace),
self-hosted at 400 and 500.

**Character:** Plex Serif is a workhorse text face with slightly mechanical joints — it reads as
documentation rather than as literature, which is exactly the register here. Plex Mono is its
sibling, so metadata set beside prose looks like the same family speaking in a different mode, not a
second brand. Both are self-hosted from committed woff2 files; no build depends on reaching a font
CDN.

### Hierarchy
- **Display** (600, 2rem, 1.25): Page titles only — one per page, first thing in `<main>`.
- **Title** (600, 1rem, 1.65): Project names, job titles, institutions, dialog headings. Note it is
  the *same size as body text* and separates by weight alone.
- **Body** (400, 1rem, 1.65): All prose. The 44rem column holds it to roughly 70 characters.
- **Detail** (400, 0.95rem, muted): Supporting lines that belong to the entry above them — a job's
  location, a degree, the project dialog's description.
- **Tagline** (400, 0.9rem, muted): The one-line summary under a project card name.
- **Label** (500, 0.8rem, 0.15em tracking, uppercase, muted): Every section heading on every page —
  "Projects", "Experience", "Who I Am". One size, one treatment, no exceptions.
- **Meta** (400, 0.85rem, mono): Nav, dates, the footer, pager controls, the `resume.pdf ↓` link,
  the `HTTP/1.1 404` line. Dates and the footer step down to 0.8rem.

### Named Rules
**The Two-Voice Rule.** Serif states, mono annotates. If a string is content, it is serif; if it
describes, locates, counts, or addresses content, it is mono. There is no third voice.

**The Weight-Not-Size Rule.** Below the page title, hierarchy is made with weight and color, not with
size. A project name and the sentence under it are the same 1rem; only 600-vs-400 and ink-vs-muted
separate them. Introducing intermediate heading sizes breaks the man-page logic.

## Layout

One column, `max-width: 44rem`, centered, with a 1.5rem gutter that narrows to 1.25rem below the
`md` breakpoint. Header and footer live inside that same column, so the hairline rules under the
header and above the footer end exactly where the text does — the column edge is the only vertical
line in the design, and it is implied rather than drawn.

Vertical rhythm: 3.5rem of padding around a page's main block, 2.5rem between sibling sections,
1.75rem between entries within a section (jobs, education), and 4rem above the footer. The home page
separates its intro from the projects section with a rule plus 2.5rem of padding rather than extra
space alone.

The projects grid is two equal columns with 1.5rem column gap and 2.25rem row gap, collapsing to one
column below `sm` (640px). Cards are fixed at a 3:2 aspect ratio so rows align regardless of source
image dimensions. The page is a `min-h-svh` flex column, so the footer sits at the bottom of short
pages without being fixed.

### Named Rules
**The One-Column Rule.** Everything is in the 44rem column: header, main, footer, rules, and dialog
alike. There is no full-bleed element, no sidebar, and no element that escapes the measure.

## Elevation & Depth

The system is currently flat: no `box-shadow` anywhere, no elevation scale, no surface tiers. Depth
where it exists is drawn, not simulated — a 1px `rule` border around images and the project dialog,
and hairline rules separating header, sections, and footer. The single exception is the project
dialog's backdrop (`rgba(0,0,0,0.5)` plus a 2px blur), which pushes the page back while the dialog
is open.

**This is recorded as the current state, not as an invariant.** The owner has explicitly left depth
open for future work to reconsider, so a design that introduces shadow or elevation is a decision to
make deliberately, not a violation to reject on sight. What it must not do is introduce depth
*accidentally* — a card lift copied in from a component library is not the same as choosing to add
one.

## Shapes

Corners are nearly square. Images and project thumbnails use a 3px radius (`rounded.sm`) — just
enough to avoid a hard pixel corner against the rule border. The project dialog is 6px
(`rounded.md`). The header avatar is the only fully round element in the system. Buttons have no
radius because there are no filled buttons: every control is a text button or a glyph.

Borders are always 1px in `rule`. The focus ring is the one deliberate exception to the hairline
vocabulary: a 2px solid ink outline at 2px offset, applied globally via `:focus-visible`, and it is
intentionally the heaviest line on the page.

### Named Rules
**The Hairline Rule.** Structural division is a 1px `rule` border. Not a 2px bar, not a shadow, not a
background change. The one line allowed to be heavier than a hairline is the focus ring.

## Components

### Navigation
Mono at 0.85rem, three lowercase items (`home`, `about`, `resume`), right-aligned in the header
opposite a 36px round headshot and the name in serif 600. The active route is ink with a 4px-offset
ink underline; inactive routes are muted with no underline and gain ink on hover. Lowercase is
deliberate and matches the CLI page's link rows.

### Text Links
Prose links are ink with a `muted` underline at 3px offset that darkens to ink on hover. Utility
links (footer, nav) start muted and undecorated, and gain both ink and an underline on hover. No
link changes color, ever.

### Project Entry
Projects are a definition list, the way a man page renders `OPTIONS`: a rule-separated stack of
native `<details>` entries, the set bounded by a hairline top and bottom. Each closed row shows a
mono `+` marker in a 1.25rem gutter, the project name in serif 600 on the left, its stack as mono
0.8rem muted on the right (baseline-aligned, the same row grammar as a résumé entry's title and
date), and the tagline in `detail` muted beneath. Expanding swaps the marker to `−` and reveals the
description and a 280px-tall contained screenshot, indented to the name column.

Everything a visitor needs to judge a project — what it is, what it is built with, who it was for —
is visible before any interaction; the expansion adds evidence, it does not gate the content. The
whole description ships in the HTML at load rather than appearing on open. `<summary>` supplies the
control, the focus ring, Enter/Space, and the expanded state announcement with no JavaScript, and
arriving at `/?project=<Name>` opens that entry and scrolls it into view.

**The No-Modal Rule.** Reading is not a task that needs interruption or protected focus. Content
expands in place; a dialog is reserved for something that genuinely must block the page.

### Section Heading
The `label` role, used identically on every page: mono, 0.8rem, 500, uppercase, 0.15em tracking,
muted, with 1rem–2rem of space beneath. This single component is most of what makes the site feel
systematic.

### Dash List
List items are marked with a typographic en-dash set in muted via a `::before` at `padding-left:
1.25rem` — not a disc, not a custom SVG marker. Used for résumé bullets, skills, honors, and
projects, and nested one level deep without changing the marker.

### Signature: The Terminal Rendering
The site's CLI pages are a real component of this design system, not a separate artifact. They
reproduce the same rhetoric in ANSI: bold for headings, dim for muted text and hairline rules, dim
italic for taglines and comments, underline for links (because the site underlines links rather than
coloring them), `── SECTION ─────` rules at 64 columns standing in for the hairline `border-t`, and
the name set in half-block capitals as the one piece of display type. Lines are padded before
styling so escape codes never break column alignment, and visible lines stay ≤72 columns so nothing
wraps at 80. Any change to the site's structural vocabulary should be answerable here too — if it
cannot be said in bold, dim, and underline, it is probably decoration.

## Do's and Don'ts

### Do:
- **Do** set every piece of metadata in mono and every piece of prose in serif. Dates, counts, nav,
  commands, and section labels are mono without exception.
- **Do** build hierarchy from weight (600 vs 400) and color (ink vs muted) before reaching for size.
  Only the page title is larger than 1rem.
- **Do** use a 1px `rule` border for every structural division, and keep it inside the 44rem column.
- **Do** keep both color schemes working from the same four tokens; test any change in dark mode
  before shipping it.
- **Do** ask whether a new structural element can be expressed in the terminal rendering. If it
  can't, it is probably ornament.
- **Do** keep muted text at the token value — it is chosen to clear AA on its own background in both
  schemes, and lightening it breaks that.

### Don't:
- **Don't** introduce an accent color, a gradient, or a colored link. The palette has no hue by
  design.
- **Don't** build the dev-portfolio dark theme: neon on near-black, glassmorphism, gradient text,
  glowing cards, terminal typing animations. Explicitly rejected.
- **Don't** build the SaaS landing page: full-bleed hero, pill CTA, three feature icons, logo strip,
  testimonial cards, big rounded shadows. Explicitly rejected.
- **Don't** build the awards-site portfolio: oversized display type, custom cursor, scroll-jacking,
  heavy page transitions, loading counters. Explicitly rejected.
- **Don't** build the template résumé site: skills bar charts, proficiency rings, dotted timelines,
  generic icon sets. Explicitly rejected.
- **Don't** add icon fonts, icon packs, or third-party font/icon scripts. Glyphs in this system are
  plain text characters (`×`, `←`, `→`, `↓`, `–`, `·`), and the fonts are self-hosted on purpose.
- **Don't** add intermediate heading sizes between 1rem and 2rem, or a second section-heading
  treatment.
- **Don't** let a component library's default shadow, radius, or elevation arrive by accident —
  depth is an open question here, and any depth should be a deliberate decision.
