# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Aaron Perkel's personal website (aaronperkel.com) — a Next.js (App Router) + Tailwind CSS v4 + TypeScript site, fully static, deployed on Vercel. It was migrated from a hand-written PHP site in July 2026 (the PHP version is in git history before that point). The old PHP-hosted sub-apps (`checklist/`, `riley21/`, `videos/`) were never part of this repo — they have their own repos in `~/Documents/projects/` and still live on UVM's server.

## Commands

```bash
npm run dev     # dev server
npm run build   # production build (all routes prerender static)
npm run lint    # eslint
```

## Architecture

- **`PRODUCT.md` and `DESIGN.md` at the repo root are the product and design record** — who the site is for, what it must never break, and the visual system ("System Native": the visitor's own platform faces, two tones per scheme, the OS accent colour, hairline rules). `.impeccable/design.json` is DESIGN.md's machine-readable sidecar. Read them before changing how anything looks; update them when the system itself changes.
- **`data/*.ts` is the only "CMS"** — `projects.ts` (home-page cards), `about.ts`, `resume.ts`. Edit these to change site copy, resume entries, skills, etc. Some fields in `projects.ts`/`about.ts` are HTML strings rendered with `dangerouslySetInnerHTML` (a carry-over from the PHP site), so only trusted content belongs there. `resume.ts` is plain structured data (no HTML) because it feeds both the `/resume` page and the PDF.
- `app/layout.tsx` — site-wide metadata (favicons, manifest, apple-web-app, theme-color per scheme), JSON-LD Person schema, and the chrome: `Toolbar` and `Footer` around one narrow column (`max-w-[42rem]`). **No webfonts load at all** — type is the platform's own UI and mono stacks, by design. No third-party icon/font scripts either; glyphs are plain text and the one SVG (the disclosure chevron) is inline.
- `components/Toolbar.tsx` — the slim sticky top bar (name left; Home/About/Resume and the email address right). Client component only because it reads `usePathname()` to mark the current route with `aria-current`. The email link is the site's primary action and never scrolls away.
- `components/Section.tsx` — the grouped-list heading every page's sections use (small, uppercase, secondary). One size, no second treatment.
- `components/WorkList.tsx` — the one interactive piece: projects render as native `<details>` rows sharing `name="work"`, so opening one closes the rest (name, stack, and tagline always visible; description, links, and screenshot on expand). Opening `/?project=<Name>` expands that entry and scrolls to it (resume "Projects" links and old indexed URLs rely on this); a project with `featured: false` is appended for that visit only, so deep links keep working while the home list stays short.
- Design tokens (ground/raise/ink/ink-2/line/accent) are Tailwind `@theme` variables in `app/globals.css`. Two committed tones per scheme, inverted under `prefers-color-scheme: dark`, neither one "the" theme. The accent is the reader's own `AccentColor` where the browser exposes it (neutral blue fallback) and carries underlines, focus rings, and the open-row marker — never body text. Anything legibility rests on uses `--color-accent-ink`, the accent mixed 55% into ink, so a pale OS accent still reads. `--img-dim` (1 light, 0.88 dark) holds project screenshots back from glaring on the dark ground — it is a token rather than a `dark:` utility so it moves with the scheme like the colour roles. Styling is Tailwind utilities in JSX; globals.css holds base element styles plus the `.tnum`/`.bar` helpers.
- `app/opengraph-image.tsx` — the 1200×630 social card, generated at build time with `next/og`. It deliberately registers no font files (the site loads none), so it renders in next/og's default UI sans.
- `app/robots.ts` / `app/sitemap.ts` generate robots.txt and sitemap.xml.
- `next.config.ts` — permanent redirects from the PHP-era URLs (`/index.php`, `/about.php`, `/resume.php`, `/generate_resume_pdf.php`), redirects sending the UVM-hosted sub-app paths (`/checklist`, `/riley21`, `/videos`) to `aperkel.w3.uvm.edu`, and a rewrite mapping the old `/public/:path*` asset URLs onto `/:path*` (used by `public/me.html`, the web manifest, and any external hotlinks).
- **Resume PDF**: `/resume.pdf` is generated at build time — `app/resume.pdf/route.ts` (`force-static`) renders `components/ResumePdf.tsx` with `@react-pdf/renderer` from the same `data/resume.ts` as the page, so editing the data updates both on the next deploy. This replaced both the PHP/Dompdf generator and the hand-exported `public/resume.pdf` that briefly succeeded it. To eyeball the output locally: `npm run build`, then open `.next/server/app/resume.pdf.body` (it's a plain PDF file).
- **CLI/curl experience** (content ported from a retired Cloudflare Worker): `proxy.ts` detects curl/httpie/wget user agents on `/`, `/help`, `/links`, `/projects`, `/json` and rewrites them to `app/cli/[page]/route.ts`, which serves plain text from `data/cli.ts` (ASCII-art landing, links, JSON). `/vcard` (app/vcard/route.ts) serves a downloadable contact card to everyone. Browsers hitting the CLI-only paths get the normal site/404. No-scheme `curl aaronperkel.com` (plain HTTP) additionally depends on a small Cloudflare Worker in front of the apex — see "Deployment / hosting context".

## Static odds and ends

- `public/me.html` — standalone self-contained contact card (a printed luggage-tag QR code points at it). Not part of the Next app; don't rename its URL.
- `public/img/` — all images, committed to the repo (they were deployed out-of-band in the PHP era).

## Deployment / hosting context

- Vercel deploys from this repo; pushing to `main` updates production once the Vercel project is connected.
- DNS is on Cloudflare. The apex record is intentionally **Proxied** (orange cloud): a tiny Cloudflare Worker (not in this repo, route `aaronperkel.com/*`) fronts plain-HTTP traffic — browsers get a 308 to HTTPS, but curl/httpie/wget user agents are served by fetching from Vercel over HTTPS, since curl defaults to `http://` and won't follow Vercel's forced redirect. Two side effects to leave alone: Vercel's dashboard permanently shows "Invalid Configuration" for the apex (cosmetic — the proxy hides the CNAME from Vercel's DNS check), and Cloudflare SSL/TLS mode must stay Full (Strict). All other records (`www`, `utilities`, `pi`, mail) are DNS-only on purpose; don't "fix" either warning by toggling proxy status.
- The UVM server (`aperkel.w3.uvm.edu`, "silk") still hosts the sub-apps and `cal.ics`; `minecraft.aaronperkel.com` points at a separate host. Keep those DNS records intact when changing domain settings.
