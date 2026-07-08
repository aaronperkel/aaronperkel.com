// Content for the curl/CLI experience (ported from the old Cloudflare Worker).
// Served by app/cli/[page]/route.ts when proxy.ts detects a CLI user agent.
//
// Styling mirrors the site theme in ANSI: no color, just ink — bold headings,
// dim for muted text and hairline rules, underline for links (the site
// underlines links rather than coloring them). Pad raw text BEFORE applying
// styles so escape codes don't break column alignment. Keep visible lines
// ≤ 72 columns so nothing wraps in a default 80-column terminal.

const style = (code: string, s: string) => `\x1b[${code}m${s}\x1b[0m`;
const bold = (s: string) => style("1", s);
const dim = (s: string) => style("2", s);
const note = (s: string) => style("2;3", s); // dim italic — comments/taglines
const link = (s: string) => style("4", s);

const RULE_WIDTH = 64;

// "── LINKS ────────…" — the site's hairline rules + uppercase mono labels.
const section = (label: string) =>
  dim("── ") +
  bold(label.toUpperCase()) +
  " " +
  dim("─".repeat(RULE_WIDTH - label.length - 4));

const row = (label: string, url: string) => dim(label.padEnd(10)) + link(url);

const cmd = (c: string, comment: string) =>
  dim("$ ") + c.padEnd(33) + note(`# ${comment}`);

const endpoint = (path: string, comment: string) =>
  path.padEnd(12) + note(`# ${comment}`);

const project = (name: string, tagline: string, url: string) =>
  name.padEnd(17) + note(tagline) + "\n" + " ".repeat(17) + link(url);

// ---- Header: "AARON PERKEL" in half-block caps (46 cols, 2 rows). ----
export const headerTxt = [
  "▄▀█ ▄▀█ █▀█ █▀█ █▄ █   █▀█ █▀▀ █▀█ █▄▀ █▀▀ █",
  "█▀█ █▀█ █▀▄ █▄█ █ ▀█   █▀▀ ██▄ █▀▄ █ █ ██▄ █▄▄",
].join("\n");

export const landing = [
  "I'm a network technician at the University of Vermont with a",
  "B.S. in Computer Science. I like building small, reliable",
  "systems: networks, web apps, and the occasional Raspberry Pi",
  "project.",
  "",
  section("links"),
  "",
  row("web", "https://aaronperkel.com"),
  row("about", "https://aaronperkel.com/about"),
  row("resume", "https://aaronperkel.com/resume"),
  row("github", "https://github.com/aaronperkel"),
  row("email", "me@aaronperkel.com"),
  "",
  section("legend"),
  "",
  cmd("curl aaronperkel.com", "this page"),
  cmd("curl aaronperkel.com/links", "links + projects"),
  cmd("curl aaronperkel.com/json", "the above, as JSON"),
  cmd("curl aaronperkel.com/help", "every endpoint"),
  cmd("curl -OJ aaronperkel.com/vcard", "contact card (.vcf)"),
].join("\n");

export const linksTxt = [
  section("links"),
  "",
  row("web", "https://aaronperkel.com"),
  row("about", "https://aaronperkel.com/about"),
  row("resume", "https://aaronperkel.com/resume"),
  row("github", "https://github.com/aaronperkel"),
  row("linkedin", "https://linkedin.com/in/aaronperkel"),
  row("email", "me@aaronperkel.com"),
  "",
  section("projects"),
  "",
  project(
    "Íocón",
    "Next.js storefront for an Irish dance graphics studio",
    "https://iocongraphics.com",
  ),
  "",
  project(
    "UVM Sublets",
    "Sublet listings platform for UVM students",
    "https://github.com/aaronperkel/sublet",
  ),
  "",
  project(
    "Utility Manager",
    "Bill splitting & reminders for my apartment",
    "https://github.com/aaronperkel/Utility-Manager",
  ),
  "",
  project(
    "Finance Tracker",
    "Net-worth dashboard with Chart.js",
    "https://github.com/aaronperkel/finance-tracker",
  ),
  "",
  project(
    "Blob Kart",
    "Two-player C++/OpenGL kart racer",
    "https://github.com/owncook/Blob-Kart",
  ),
].join("\n");

export const helpTxt = [
  section("endpoints"),
  "",
  endpoint("/", "landing page"),
  endpoint("/links", "links + projects (also /projects)"),
  endpoint("/json", "links + projects, as JSON"),
  endpoint("/help", "this page"),
  endpoint("/vcard", "contact card (.vcf) — works in a browser too"),
].join("\n");

export const cliJson = {
  name: "Aaron Perkel",
  title: "Network Technician @ UVM",
  location: "Burlington, Vermont",
  email: "me@aaronperkel.com",
  site: "https://aaronperkel.com",
  github: "https://github.com/aaronperkel",
  links: [
    { title: "Home", url: "https://aaronperkel.com/" },
    { title: "About", url: "https://aaronperkel.com/about" },
    { title: "Resume", url: "https://aaronperkel.com/resume" },
  ],
  projects: [
    { title: "Íocón", url: "https://iocongraphics.com" },
    { title: "UVM Sublets", url: "https://github.com/aaronperkel/sublet" },
    { title: "Utility Manager", url: "https://github.com/aaronperkel/Utility-Manager" },
    { title: "Finance Tracker", url: "https://github.com/aaronperkel/finance-tracker" },
    { title: "Blob Kart", url: "https://github.com/owncook/Blob-Kart" },
  ],
};

// No home address here — this file is downloadable by anyone on the internet.
export const vcard = `
BEGIN:VCARD
VERSION:3.0
N:Perkel;Aaron;;;
FN:Aaron Perkel
EMAIL;TYPE=INTERNET,PREF:me@aaronperkel.com
TEL;TYPE=CELL:478-262-8935
URL:https://aaronperkel.com
END:VCARD`.trim();
