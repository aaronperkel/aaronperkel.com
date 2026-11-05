// Content for the curl/CLI experience (ported from the old Cloudflare Worker).
// Served by app/cli/[page]/route.ts when proxy.ts detects a CLI user agent.
//
// Styling mirrors the site theme in ANSI: no color, just ink — bold headings,
// dim for muted text and hairline rules, underline for links (the site
// underlines links rather than coloring them). Pad raw text BEFORE applying
// styles so escape codes don't break column alignment. Keep visible lines
// ≤ 72 columns so nothing wraps in a default 80-column terminal.

import { identity } from "@/data/identity";

const style = (code: string, s: string) => `\x1b[${code}m${s}\x1b[0m`;
const bold = (s: string) => style("1", s);
const dim = (s: string) => style("2", s);
const note = (s: string) => style("2;3", s); // dim italic — comments/taglines
const link = (s: string) => style("4", s);

const RULE_WIDTH = 64;

// Greedy word wrap for prose pulled from data/identity.ts (curly quotes are
// fine; ANSI styling is applied after wrapping, never before).
const wrap = (text: string, width = RULE_WIDTH) => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && line.length + 1 + word.length > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
};

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

// Wide enough for the longest project name plus a two-space gutter.
const PROJECT_COL = 22;
const project = (name: string, tagline: string, url: string) =>
  name.padEnd(PROJECT_COL) + note(tagline) + "\n" + " ".repeat(PROJECT_COL) + link(url);

// ---- Header: "AARON PERKEL" in half-block caps (46 cols, 2 rows). ----
export const headerTxt = [
  "▄▀█ ▄▀█ █▀█ █▀█ █▄ █   █▀█ █▀▀ █▀█ █▄▀ █▀▀ █",
  "█▀█ █▀█ █▀▄ █▄█ █ ▀█   █▀▀ ██▄ █▀▄ █ █ ██▄ █▄▄",
].join("\n");

export const landing = [
  bold(identity.role),
  "",
  ...wrap(identity.intro),
  "",
  section("links"),
  "",
  row("web", identity.site),
  row("projects", `${identity.site}/#projects`),
  row("about", `${identity.site}/about`),
  row("resume", `${identity.site}/resume`),
  row("contact", `${identity.site}/contact`),
  row("github", identity.github),
  row("linkedin", identity.linkedin),
  row("email", identity.email),
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
  row("web", identity.site),
  row("projects", `${identity.site}/#projects`),
  row("about", `${identity.site}/about`),
  row("resume", `${identity.site}/resume`),
  row("contact", `${identity.site}/contact`),
  row("services", `${identity.site}/services`),
  row("github", identity.github),
  row("linkedin", identity.linkedin),
  row("email", identity.email),
  "",
  section("projects"),
  "",
  project(
    "Lejer",
    "Shared bills for the people you live with",
    "https://uselejer.com",
  ),
  "",
  project(
    "Íocón",
    "Storefront for an Irish dance graphics studio",
    "https://iocongraphics.com",
  ),
  "",
  project(
    "Catamount Sublets",
    "Sublet listings platform for UVM students",
    "https://catamountsublets.com",
  ),
  "",
  project(
    "Vermont Plate Log",
    "Logging Vermont plates spotted around Burlington",
    "https://github.com/aaronperkel/vermont-plate-log",
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
  name: identity.name,
  title: identity.role,
  tagline: identity.tagline,
  dayJob: `${identity.currentRole.title} @ ${identity.currentRole.org}`,
  location: "Burlington, Vermont",
  email: identity.email,
  site: identity.site,
  github: identity.github,
  linkedin: identity.linkedin,
  links: [
    { title: "Home", url: `${identity.site}/` },
    { title: "About", url: `${identity.site}/about` },
    { title: "Resume", url: `${identity.site}/resume` },
    { title: "Contact", url: `${identity.site}/contact` },
    { title: "Services", url: `${identity.site}/services` },
  ],
  projects: [
    { title: "Lejer", url: "https://uselejer.com" },
    { title: "Íocón", url: "https://iocongraphics.com" },
    { title: "Catamount Sublets", url: "https://catamountsublets.com" },
    { title: "Vermont Plate Log", url: "https://github.com/aaronperkel/vermont-plate-log" },
  ],
};

// No phone or home address here — this file is downloadable by anyone on the
// internet, and both live only on /me (data/contact.ts).
export const vcard = `
BEGIN:VCARD
VERSION:3.0
N:Perkel;Aaron;;;
FN:${identity.name}
TITLE:${identity.role}
EMAIL;TYPE=INTERNET,PREF:${identity.email}
URL:${identity.site}
END:VCARD`.trim();
