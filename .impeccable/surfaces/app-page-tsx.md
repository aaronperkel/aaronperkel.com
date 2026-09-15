---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/about/page.tsx","app/resume/page.tsx","app/layout.tsx"]
---

Scope: aaronperkel.com — home, about, resume, 404, and the site chrome. Visitor mode: Persuade.

Audience: hiring managers and technical recruiters mid-skim, often arriving from a resume PDF;
secondarily anyone googling the name, including prospective Aaron Perkel LLC clients. Job: decide
within one short visit whether this person builds and maintains real systems, and how to reach him.
Proof on hand: eight real projects (live links and public repos), verified UVM work history.
Constraints: user steer, binding — "it needs to be simpler. i dont want a themed out the wazoo
site. its meant to be simple and efficient." No commission page. Build-time resume PDF and
public/me.html are fixed.

## Direction contract

THESIS: A site that looks like it shipped with the computer. The page speaks the visitor's own
operating system — system font stack, native controls, platform spacing, the reader's own accent
color — and refuses the category default of a themed world with a webfont personality bolted on.
Simplicity here is the argument, not the absence of one: nothing sits between the reader and the
facts.

OWN-WORLD: The platform's own interface language. System font stack (-apple-system / Segoe UI /
system-ui) with system mono for all data; no webfonts load at all. Two committed tones per scheme
(near-white ground with near-black ink, inverted for dark, driven by prefers-color-scheme, neither
chosen as "the" theme) plus one accent taken from CSS AccentColor with a neutral blue fallback.
Hairline separators, near-square corners, a slim sticky toolbar, native disclosure rows, tabular
numerics on every date and figure. No cards, no shadows, no badges, no icon set, no decoration.

STORY: The visitor learns in one screen who he is and that both halves are real — the university
network he keeps running and the production software other people depend on. Scrolling one list
tells them what he built, what it is built with, and where it lives. They leave able to mail him
without hunting, and remembering a site that was faster and plainer than the twenty before it.

FIRST VIEWPORT: A slim sticky toolbar spans the top — name flush left, about / resume / email flush
right, hairline beneath. Below it, in a single column capped at 68ch: his name at system heading
size, then two sentences of plain prose, then a one-line NOW row naming the current role. Beneath
that, WORK begins immediately: hairline-separated disclosure rows, each carrying project name in
semibold, stack in system mono at small size, and a one-line description, with "site" and "source"
as plain text links. The primary action — email — lives in the toolbar and never scrolls away.

FORM: System Native, candidate 5 of the grounded list, assigned by the roll; seed key 7a8504bb,
re-roll round 1, plain register after the user's "simple and efficient" steer. Raised by three
donations from declined challengers: state said as a mark not a hue (Select Rail), absolute two-tone
commitment with tabular numerics (Data Field), and contact that never scrolls out of reach (Choice
Frame). Signature interaction: the accent is the visitor's own system accent color, so links, focus
rings, and open-row markers adopt the reader's platform identity. Motion grammar: platform-timed
disclosure and hover at 150ms, nothing else, disabled under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
