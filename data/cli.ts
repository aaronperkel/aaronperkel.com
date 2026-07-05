// Content for the curl/CLI experience (ported from the old Cloudflare Worker).
// Served by app/cli/[page]/route.ts when proxy.ts detects a CLI user agent.

// ---- Header (≈67 cols). Keep leading spaces; strip only the end. ----
export const headerTxt = `
    ___                             ____            __        __
   /   | ____ __________  ____     / __ \\___  _____/ /_____  / /
  / /| |/ __ \`/ ___/ __ \\/ __ \\   / /_/ / _ \\/ ___/ //_/ _ \\/ /
 / ___ / /_/ / /  / /_/ / / / /  / ____/  __/ /  / ,< /  __/ /
/_/  |_|\\__,_/_/   \\____/_/ /_/  /_/    \\___/_/  /_/|_|\\___/_/
`.replace(/\s+$/, ""); // do NOT .trim(); it would kill the left padding

export const landing = `
About
- CS + Networks @ UVM
- I build infra tools and tinker a lot.

Links
- Site:    https://aaronperkel.com
- About:   https://aaronperkel.com/about
- Resume:  https://aaronperkel.com/resume


Legend
$ curl aaronperkel.com        # this page
$ curl aaronperkel.com/links  # curated links/projects
$ curl aaronperkel.com/json   # JSON
$ curl aaronperkel.com/help   # endpoints`.trim();

export const linksTxt = `
Links / Projects
- Home:    https://aaronperkel.com
- About:   https://aaronperkel.com/about
- Resume:  https://aaronperkel.com/resume

Code & Repos
- Utility Manager: https://github.com/aaronperkel/Utility-Manager
- UVM Sublets: https://github.com/aaronperkel/sublet
- Finance Tracker: https://github.com/aaronperkel/finance-tracker`.trim();

export const helpTxt = `
Endpoints
- /        Landing (curl)
- /links   Curated links/projects (text)
- /json    JSON version
- /help    This help
- /vcard   Download contact card (.vcf)`.trim();

export const cliJson = {
  owner: "Aaron Perkel",
  site: "https://aaronperkel.com",
  links: [
    { title: "Home", url: "https://aaronperkel.com/" },
    { title: "About", url: "https://aaronperkel.com/about" },
    { title: "Resume", url: "https://aaronperkel.com/resume" },
  ],
  projects: [
    { title: "Utility Manager", url: "https://github.com/aaronperkel/Utility-Manager" },
    { title: "UVM Sublets", url: "https://github.com/aaronperkel/sublet" },
    { title: "Finance Tracker", url: "https://github.com/aaronperkel/finance-tracker" },
  ],
};

export const vcard = `
BEGIN:VCARD
VERSION:3.0
N:Perkel;Aaron;;;
FN:Aaron Perkel
EMAIL;TYPE=INTERNET,PREF:me@aaronperkel.com
TEL;TYPE=CELL:478-262-8935
ADR;TYPE=HOME:;;77 N Union St #3;Burlington;VT;05401;USA
URL:https://aaronperkel.com
END:VCARD`.trim();
