---
name: aaronperkel.com
description: A site that looks like it shipped with the computer — the visitor's own platform faces, two tones per scheme, and their own OS accent colour.
colors:
  ground: "#ffffff"
  raise: "#f4f4f6"
  ink: "#1a1a1c"
  ink-2: "#5c5c61"
  line: "#d7d7dc"
  accent: "#0b5fff"
  ground-dark: "#161619"
  raise-dark: "#202026"
  ink-dark: "#f2f2f4"
  ink-2-dark: "#a2a2aa"
  line-dark: "#33333a"
  accent-dark: "#4d9bff"
  accent-ink: "color-mix(in oklab, var(--color-accent) 55%, var(--color-ink))"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  secondary:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  utility:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0.04em"
  meta:
    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
rounded:
  sm: "2px"
  md: "4px"
  full: "9999px"
spacing:
  gutter: "1.25rem"
  page-block: "2.5rem"
  section: "2.25rem"
  section-head: "0.5rem"
  row: "0.75rem"
  footer-offset: "3rem"
components:
  toolbar:
    backgroundColor: "{colors.ground}"
    height: "2.75rem"
    padding: "0 1.25rem"
  toolbar-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.utility}"
    padding: "0.75rem 0"
  toolbar-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.utility}"
    padding: "0.75rem 0"
  section-label:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  work-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0.75rem 0"
  work-row-hover:
    backgroundColor: "{colors.raise}"
    rounded: "{rounded.md}"
  work-row-open:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 0"
  work-row-meta:
    textColor: "{colors.ink-2}"
    typography: "{typography.meta}"
  work-row-mat:
    backgroundColor: "{colors.raise}"
    rounded: "{rounded.md}"
    padding: "0.375rem"
  work-row-image:
    rounded: "{rounded.sm}"
    height: "300px"
  footer:
    textColor: "{colors.ink-2}"
    typography: "{typography.utility}"
    padding: "1.25rem"
  footer-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.utility}"
    padding: "0.75rem 0"
---

# Design System: aaronperkel.com

## Overview

**Creative North Star: "System Native"**

The page looks like it shipped with the computer. It loads no webfonts at all: headings, prose, and
metadata are set in whatever the visitor's operating system already uses for its own interface, and
the one colour in the design is the accent colour that visitor picked in their own system settings.
Nothing about the surface is a costume put on over the content — the type, the spacing, the
disclosure rows, and the focus ring are the platform's own vocabulary used literally.

Density is that of a native settings screen rather than a marketing page: a 42rem column, prose held
to 60ch, hairline separators at every seam, near-square 4px corners, and rows that are 0.75rem tall
in their padding rather than cards floating on a tinted ground. There are no cards, no shadows, no
gradients, no coloured badges, and no icon set — the single piece of drawn geometry in the whole
site is one inline chevron that marks a disclosure row's open state, which is the native control's
own marker.

Both colour schemes are first-class. Each is two committed tones — a ground and a raised ground,
an ink and a secondary ink, plus a hairline — and neither was designed first and inverted after.
`color-scheme: light dark` is declared so that scrollbars, form controls, and the caret come from the
platform in the matching scheme. The register is plain because the product argument is plain: a
recruiter mid-skim should meet the facts with nothing between them and the page.

**Key Characteristics:**
- No webfonts load. The platform UI stack carries everything; the system mono stack carries data.
- Two committed tones per scheme, defined from the same five roles and inverted wholesale.
- The accent is the visitor's own OS accent (`AccentColor`), never body text.
- Hairline separators, ~4px near-square radii, no cards, no shadows, no badges.
- An open work row is the platform's selected row: a raised-ground fill closed by a 2px accent rule.
- State is said in type (a mono `LIVE` in secondary ink), never in colour.
- Tabular numerics on every date and figure.

## Colors

Five roles per scheme plus one accent, and the accent is not ours — it is read from the operating
system where the browser exposes it, with a neutral blue standing in where it does not.

### Primary
- **System Accent** (`AccentColor`, falling back to a plain blue `#0b5fff` light / `#4d9bff` dark):
  Link underlines, focus rings, text selection, the caret, and the open-row chevron. It is a marker
  colour. It never sets body text, never fills a surface, and never carries information on its own.
- **Bounded Accent Ink** (`accent-ink`, the accent mixed 55% into ink): Everything whose legibility
  actually rests on the accent — underline colour, focus outline, chevron, caret, and the 2px rule
  that closes an open work row. Because a visitor's system accent can be pale yellow or near-white
  graphite, the raw value is never trusted for contrast; the mix pulls it back toward ink while
  keeping its hue recognisably theirs. The open-row rule is where the borrowed accent first becomes
  visible at reader scale rather than at hairline scale — and nothing there is load-bearing: the
  fill, the rotated chevron, and the revealed content each say "open" independently.

### Neutral
- **Ground** (`#ffffff` light / `#161619` dark): The page. Every page, every scheme, one background.
- **Raised Ground** (`#f4f4f6` light / `#202026` dark): The only second surface. It does three jobs
  and no others: the hover wash behind a work row, the fill of an *open* work row, and the mat behind
  an expanded screenshot. It is not a card fill, not an elevation claim, and not a section background.
- **Ink** (`#1a1a1c` light / `#f2f2f4` dark): All primary text, link text, active toolbar route.
  Near-black and near-white rather than pure, so the page does not glare in either scheme.
- **Secondary Ink** (`#5c5c61` light / `#a2a2aa` dark): Taglines, dates, locations, section labels,
  inactive toolbar routes, footer, the `LIVE` mark, and body copy inside an expanded row. Both values
  clear WCAG AA on their own ground, so secondary ink is genuinely readable text, not grey décor.
- **Hairline** (`#d7d7dc` light / `#33333a` dark): Every divider, every image border, and the border
  of the screenshot mat, always 1px. Also the scrollbar thumb, so even the scrollbar reads as part of
  the same sheet.
- **Screenshot Dimmer** (`--img-dim`, `1` light / `0.88` dark): Not a colour but a scheme-bound token,
  declared in the same `:root` block as `accent-ink` and overridden under `prefers-color-scheme:
  dark`. Project screenshots are the one saturated surface in this world, and at full brightness they
  outshine the dark ground; the multiplier holds them back so the two tones stay the page. It is
  deliberately a token rather than a `dark:` utility so it moves with the scheme exactly the way the
  five colour roles do.

### Named Rules
**The Borrowed-Accent Rule.** The accent belongs to the visitor, not to the site. Where the browser
exposes `AccentColor`, the page adopts it unchanged; the fallback blue is a fallback, not a brand
colour, and no second hue may be introduced beside it.

**The Never-Load-Bearing-Colour Rule.** No fact is communicated by colour alone. Anything a reader
must be able to read goes through `accent-ink`, and anything a reader must be able to *know* — a
project being live, a route being current — is said in words or weight. Audit test: render the page
with the accent forced to the ground colour; nothing should become unreadable or ambiguous.

**The Two-Tone Rule.** Each scheme gets one ground and one raised ground. A third surface tier is a
change to the system, not a choice within it. Imagery is held to the same commitment: any full-colour
image sits behind `--img-dim` so it cannot become a third, brighter surface in the dark scheme.

## Typography

**Display / Body Font:** the platform UI stack — `-apple-system, BlinkMacSystemFont, "Segoe UI",
system-ui, Roboto, "Helvetica Neue", Arial, sans-serif`.
**Data / Metadata Font:** the platform mono stack — `ui-monospace, SFMono-Regular, "SF Mono", Menlo,
Consolas, "Liberation Mono", monospace`.

**Character:** There is no typographic personality to describe, and that is the decision. The visitor
gets San Francisco, Segoe UI, or Roboto — whichever their machine already renders best — so the page
inherits their platform's hinting, metrics, and reading habits instead of teaching them new ones. No
font file is fetched, so no text ever swaps or blocks.

### Hierarchy
- **Display** (600, 1.75rem, 1.25 line-height, -0.02em): The page title, once per page, and the name
  on the home page. The tightened tracking is the only optical correction in the system.
- **Title** (600, 0.9375rem): Project names, job titles, institutions, the toolbar wordmark. The
  *same size as body text*; semibold weight alone separates it.
- **Body** (400, 0.9375rem, 1.55): All prose, held to 60ch, and the resume's "Download PDF" action —
  a real action gets real body size, not utility size.
- **Secondary** (400, 0.875rem, secondary ink): Taglines, job locations, degrees, and the description
  inside an expanded work row (1.6 line-height there, for the longer measure).
- **Utility** (400, 0.8125rem): Toolbar routes, footer, in-row links.
- **Label** (500, 0.75rem, 0.04em tracking, uppercase, secondary ink): Every section heading on every
  page — NOW, WORK, CONTACT, EXPERIENCE. One size, one treatment, no exceptions.
- **Meta** (400, 0.75rem, mono, tabular): Stack lists, dates, and the `LIVE` mark. Mono is reserved
  for data — strings that line up, get compared, or get scanned in a column.

### Named Rules
**The Two-Stack Rule.** Sans states, mono tabulates. If a string is language, it is the UI stack; if
it is data a reader might align or compare, it is the mono stack. There is no third voice and no
webfont.

**The Weight-Not-Size Rule.** Below the 1.75rem page title, everything lives between 0.75rem and
0.9375rem. Hierarchy comes from weight (600 vs 400) and ink-vs-secondary-ink. Adding an intermediate
heading size breaks the native-list logic.

**The Tabular Rule.** Every date and figure gets tabular numerics — applied automatically to `<time>`
and available as `.tnum` for anything else (the footer's copyright year, resume contact items,
award dates).

## Layout

One column, `max-width: 42rem`, centred, with a 1.25rem gutter. The toolbar and the footer use the
same inner column at the same gutter, so the hairlines under the toolbar and above the footer run
full-bleed while their content lines up exactly with the text above it — the only place the design
crosses the measure is a rule, never a word.

The body is a `min-h-svh` flex column so the footer settles at the bottom of short pages without
being fixed. Vertical rhythm: 2.5rem of padding around a page's main block, 2.25rem between sections,
0.5rem between a section label and its body, 0.75rem of vertical padding per work row, and 3rem above
the footer. Prose is additionally capped at 60ch inside the 42rem column.

Responsive behaviour is almost nil, which is the point: one column needs no breakpoints. The only two
adaptations are the toolbar's email item, which shows the full address above `sm` (640px) and the
word "Email" below it, and the work row's name/stack line, which is a baseline-aligned row spread to
the edges above `sm` and a plain stacked column below it.

Every interactive target in the chrome — toolbar wordmark, toolbar routes, the toolbar email, and the
footer's social links — carries negative-margin vertical padding (`-my-3 py-3`) so its hit area is
~44px while its optical position is unchanged. The measure is uniform; no chrome link is smaller.

### Named Rules
**The One-Column Rule.** Toolbar, main, and footer share one 42rem measure. No full-bleed section, no
sidebar, no element that escapes the column except a hairline.

**The Reachable-Contact Rule.** The email address lives in the sticky toolbar and never scrolls away.
The primary action does not depend on the reader reaching the bottom.

## Elevation & Depth

There are no shadows anywhere in the system, and no elevation scale. Depth is either drawn as a 1px
hairline or expressed as a tonal wash: a work row fills with the raised ground on hover and stays
filled while open, and an expanded screenshot sits on a raised-ground mat inside a hairline border.
The mat is not a card — no shadow, no lift, no elevation claim, hairline only. Nothing floats,
nothing casts.

The one atmospheric effect in the build is the toolbar, which sits at 85% ground with a small
backdrop blur so page content is felt passing beneath it. It is explicitly conditional: under
`prefers-reduced-transparency: reduce` the toolbar drops to a solid ground with no blur. That is the
only translucency in the design and it may not spread to another element.

### Named Rules
**The No-Shadow Rule.** A surface is separated from another surface by a hairline or by a tonal step,
never by a shadow. A component-library default shadow arriving with a copied pattern is a bug.

**The Conditional-Blur Rule.** Translucency exists on exactly one element (the toolbar) and must ship
with its reduced-transparency fallback in the same commit.

## Shapes

Corners are nearly square. Interactive rows and images use a 4px radius — enough to read as a native
control, not enough to read as a card. The focus ring's own radius is 2px, so it hugs whatever it
wraps. The home-page headshot (56px) is the only circle in the system, and it is a portrait, not a
shape choice. There are no filled buttons and therefore no button radius: every control in the site
is a text link, a native `<summary>` row, or the toolbar's address.

Borders are always 1px in the hairline role. Two lines are deliberately heavier, and both are state
rather than structure: the focus ring (a 2px `accent-ink` outline at 2px offset, applied globally via
`:focus-visible`) and the 2px `accent-ink` rule that closes an open work row. Link underlines are
1px at a 2px offset, thickening to 2px on hover — the hover feedback is the stroke growing, not the
colour changing.

### Named Rules
**The Hairline Rule.** Structural division is a 1px hairline border. Not a 2px bar, not a shadow, not
a background change. The only lines allowed to be heavier are the focus ring and the open work row's
accent rule — both of which report state, never structure.

## Components

### Toolbar
The platform's own toolbar: 2.75rem tall, sticky at the top, translucent over the ground with a
hairline beneath. The wordmark sits flush left at title size (600, 0.9375rem, undecorated); the
routes and the email address sit flush right at utility size (0.8125rem). The current route is ink
and medium-weight with `aria-current="page"`; the others are secondary ink and gain ink on hover.
Toolbar links carry no underline — they are chrome, not prose — and every one, wordmark included,
carries `-my-3 py-3` so its tap target is ~44px across the full bar height.

### Text Links
Prose links are ink with an `accent-ink` underline, 1px at a 2px offset, thickening to 2px on hover
over 150ms. That is the entire link treatment: no colour change, no background, no arrow glyph.
Toolbar links invert it — secondary ink, no underline, gaining ink on hover — because they are
chrome. Footer links do not: they are ordinary links and carry the base accent-ink underline at rest
like every other link on the page.

### Section Heading
The grouped-list header every native settings screen uses: 0.75rem, 500, uppercase, 0.04em tracking,
secondary ink, 0.5rem above its body, 2.25rem below the previous section. Used identically on home,
about, and resume. This single component is most of what makes the site feel systematic.

### Work Row (signature)
Projects are native `<details>` rows in a hairline-topped, hairline-separated stack, grouped by a
shared `name` attribute so opening one closes the last. The closed row carries, on a single baseline:
the accent chevron, the project name in semibold, a mono `LIVE` mark in secondary ink when the
project has a live site, and the stack list in mono 0.75rem secondary ink pushed to the right edge.
The tagline sits beneath in secondary at 0.875rem. Everything a reader needs to judge the project is
visible before any interaction.

Above `sm` the name/stack line is a baseline-aligned row with the stack pushed to the right edge;
below it the row becomes three even lines — name plus `LIVE`, then stack, then tagline — rather than
letting the stack flip between right-aligned and wrapped depending on how long the name happens to
be. That is the signature component's only responsive rule.

Hovering washes the row with the raised ground inside a 4px radius. The summary has no horizontal
inset, so the wash, the open fill, and the accent rule all span exactly the width of the row
hairlines and the list keeps one unbroken left margin. Opening is the platform's selected-row
treatment: the summary holds the raised-ground fill, squares its bottom corners, and closes on a 2px
`accent-ink` rule, while the chevron rotates 90° over 150ms and the body reveals the description,
plain-text "Visit site" / "Source" links, and a screenshot capped at 300px. The screenshot is matted:
a `w-fit` raised-ground container with a hairline border, 4px radius, and 0.375rem of padding, with
the image itself at a 2px radius and dimmed by `--img-dim`. The mat is the second at-rest use of the
raised ground and is explicitly not a card.

`<summary>` supplies the control, keyboard operation, focus ring, and expanded-state announcement
with no JavaScript; the client code exists only to open and scroll to a row arrived at via
`/?project=<Name>` and to keep that URL in sync.

**The No-Badge Rule.** A project being live is said in type — mono, uppercase, secondary ink — not in
a coloured pill. Any status in this system is a word.

### Dot List
List items are marked with a middle dot (`·`) in secondary ink via a `::before` at 1rem of left
padding — resume bullets, skills, honours, projects, and about-page lists all use the same marker,
nested one level deep without changing it. Not a disc, not an SVG marker, not an icon.

### Footer
A hairline-topped strip 3rem below the content: copyright year in tabular figures flush left, four
social links flush right, all at utility size in secondary ink, gaining ink on hover. The social
links are underlined at rest like any other link — the footer is prose, not chrome — and each carries
`-my-3 py-3` for a ~44px target.

### Social Card
`app/opengraph-image.tsx` renders the same world at 1200×630 and deliberately registers no font
files, taking the renderer's default UI sans because this site loads none either. It reproduces the
system literally: white ground, ink name at 84px semibold with -0.02em tracking, secondary-ink
subtitle, and a single hairline rule above the domain and location.

### Motion

One duration and one job. Disclosure (chevron rotation), row hover wash, link colour, and underline
thickness all transition at 150ms `ease`; nothing else in the site moves. There is no scroll
animation, no page transition, no entrance animation, and no loading shimmer. Under
`prefers-reduced-motion: reduce`, link, summary, and chevron transitions are removed entirely rather
than shortened.

**The One-Tempo Rule.** If an interaction needs a duration other than 150ms, or an easing curve other
than the platform default, it is probably an effect rather than feedback.

## Do's and Don'ts

### Do:
- **Do** let the visitor's platform supply the type. Both stacks are the tokens; adding a font file
  of any kind is a change to the system, not a choice within it.
- **Do** route anything legibility depends on through `accent-ink` rather than the raw accent — a
  visitor's system accent may be pale.
- **Do** build hierarchy from weight and ink-vs-secondary-ink before reaching for size. Only the page
  title exceeds 0.9375rem.
- **Do** use a 1px hairline for every structural division, and keep content inside the 42rem column
  with prose at 60ch.
- **Do** say state in words — a mono uppercase mark in secondary ink — and keep it out of colour.
- **Do** put tabular numerics on every date and figure (`<time>` gets them automatically; otherwise
  `.tnum`).
- **Do** test every change in both schemes, and with reduced motion and reduced transparency, before
  shipping it.
- **Do** keep every interactive target in the chrome at ~44px via negative-margin vertical padding,
  so the hit area grows and the optical rhythm does not.
- **Do** prefer a native element (`<details>`, `<summary>`, `<time>`) over a scripted equivalent; the
  platform's own control is the house component.

### Don't:
- **Don't** add a webfont, an icon font, or an icon pack. The one drawn glyph in the system is the
  inline disclosure chevron; anything else is a text character.
- **Don't** introduce a second hue beside the accent, or use the accent for body text, surface fills,
  or large areas.
- **Don't** add shadows, lifts, or a third surface tier. Hover, the open row, and the screenshot mat
  use the raised ground; everything else is a hairline.
- **Don't** add coloured status badges, pills, or tag chips.
- **Don't** spread translucency past the toolbar, or ship it without the reduced-transparency
  fallback.
- **Don't** add an intermediate heading size between 0.9375rem and 1.75rem, or a second
  section-heading treatment.
- **Don't** build the dev-portfolio dark theme: neon on near-black, glassmorphism, gradient text,
  glowing cards, terminal typing animations. Explicitly rejected.
- **Don't** build the SaaS landing page: full-bleed hero, pill CTA, three feature icons, logo strip,
  testimonial cards, big rounded shadows. Explicitly rejected.
- **Don't** build the awards-site portfolio: oversized display type, custom cursor, scroll-jacking,
  heavy page transitions, loading counters. Explicitly rejected.
- **Don't** build the template resume site: skills bar charts, proficiency rings, dotted timelines,
  generic icon sets. Explicitly rejected.
