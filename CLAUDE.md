# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Aaron Perkel's personal website (aaronperkel.com) — a Next.js (App Router) + Tailwind CSS v4 + TypeScript site, deployed on Vercel. Every page prerenders static; the single exception is the `/services` inquiry form's POST route (see "Services page" below). It was migrated from a hand-written PHP site in July 2026 (the PHP version is in git history before that point). The old PHP-hosted sub-apps (`checklist/`, `riley21/`, `videos/`) were never part of this repo — they have their own repos in `~/Documents/projects/` and still live on UVM's server.

## Commands

```bash
npm run dev     # dev server
npm run build   # production build (every route prerenders static except /api/inquiry)
npm run lint    # eslint
```

## Architecture

- **`data/*.ts` is the only "CMS"** — `projects.ts` (home-page cards), `about.ts`, `resume.ts`, `services.ts`. Edit these to change site copy, resume entries, skills, etc. Some fields in `projects.ts`/`about.ts` are HTML strings rendered with `dangerouslySetInnerHTML` (a carry-over from the PHP site), so only trusted content belongs there. `resume.ts` is plain structured data (no HTML) because it feeds both the `/resume` page and the PDF. `services.ts` is mostly plain data, with `proofHtml` as the one trusted-HTML field; it also exports `timelineOptions`/`budgetOptions`, which the form renders **and** the API route validates against, so the allowlist can never drift from the dropdown.
- `app/layout.tsx` — IBM Plex Serif (body) + IBM Plex Mono (nav/labels/metadata) via `next/font`, site-wide metadata (favicons, manifest, apple-web-app), JSON-LD Person schema. Header (which includes Nav) and Footer render around every page inside one narrow document column. No third-party icon/font scripts — glyphs are plain text.
- `components/ProjectsGrid.tsx` — the one interactive piece: project cards + popup with prev/next (also Escape/arrow keys). Opening `/?project=<Name>` auto-opens that card's popup (resume "Projects" links and old indexed URLs rely on this).
- Design tokens (page/ink/muted/rule) are Tailwind `@theme` variables in `app/globals.css`. The palette is neutral (white/near-black, inverted for `prefers-color-scheme: dark`); links are underlined ink rather than colored. Styling is Tailwind utilities in JSX; globals.css has only base element styles.
- `app/robots.ts` / `app/sitemap.ts` generate robots.txt and sitemap.xml.
- `next.config.ts` — permanent redirects from the PHP-era URLs (`/index.php`, `/about.php`, `/resume.php`, `/generate_resume_pdf.php`), redirects sending the UVM-hosted sub-app paths (`/checklist`, `/riley21`, `/videos`) to `aperkel.w3.uvm.edu`, and a rewrite mapping the old `/public/:path*` asset URLs onto `/:path*` (used by `public/me.html`, the web manifest, and any external hotlinks).
- **Resume PDF**: `/resume.pdf` is generated at build time — `app/resume.pdf/route.ts` (`force-static`) renders `components/ResumePdf.tsx` with `@react-pdf/renderer` from the same `data/resume.ts` as the page, so editing the data updates both on the next deploy. This replaced both the PHP/Dompdf generator and the hand-exported `public/resume.pdf` that briefly succeeded it. To eyeball the output locally: `npm run build`, then open `.next/server/app/resume.pdf.body` (it's a plain PDF file).
- **CLI/curl experience** (content ported from a retired Cloudflare Worker): `proxy.ts` detects curl/httpie/wget user agents on `/`, `/help`, `/links`, `/projects`, `/json` and rewrites them to `app/cli/[page]/route.ts`, which serves plain text from `data/cli.ts` (ASCII-art landing, links, JSON). `/vcard` (app/vcard/route.ts) serves a downloadable contact card to everyone. Browsers hitting the CLI-only paths get the normal site/404. No-scheme `curl aaronperkel.com` (plain HTTP) additionally depends on a small Cloudflare Worker in front of the apex — see "Deployment / hosting context".
- **Services page** (`/services`) — the freelance/hire-me page for Aaron Perkel LLC, driven by `data/services.ts`. `components/InquiryForm.tsx` (a client component) POSTs to `app/api/inquiry/route.ts`, the site's **only** dynamic route, which mails the inquiry through Resend's REST API via plain `fetch` (deliberately no SDK dependency) and sends the sender an auto-reply. Requires `RESEND_API_KEY` in the Vercel project — see `.env.example`; without it the route 500s and the form falls back to telling people to email directly. Mail is sent `from` `hello@aaronperkel.com` (a Resend-verified sending identity on the domain, aliased to the real inbox) `to` `me@aaronperkel.com`, with `Reply-To` set to the inquirer so a plain reply reaches them. Spam guards are a honeypot field plus a minimum 3s fill time, both of which return `200` so bots learn nothing; a failed auto-reply is caught and logged rather than failing a delivered inquiry. Note the apex is Cloudflare-Proxied, so form POSTs traverse the Worker described below — test the form on `aaronperkel.com`, not just a Vercel preview URL.

## Static odds and ends

- `public/me.html` — standalone self-contained contact card (a printed luggage-tag QR code points at it). Not part of the Next app; don't rename its URL.
- `public/img/` — all images, committed to the repo (they were deployed out-of-band in the PHP era).

## Deployment / hosting context

- Vercel deploys from this repo; pushing to `main` updates production once the Vercel project is connected.
- DNS is on Cloudflare. The apex record is intentionally **Proxied** (orange cloud): a tiny Cloudflare Worker (not in this repo, route `aaronperkel.com/*`) fronts plain-HTTP traffic — browsers get a 308 to HTTPS, but curl/httpie/wget user agents are served by fetching from Vercel over HTTPS, since curl defaults to `http://` and won't follow Vercel's forced redirect. Two side effects to leave alone: Vercel's dashboard permanently shows "Invalid Configuration" for the apex (cosmetic — the proxy hides the CNAME from Vercel's DNS check), and Cloudflare SSL/TLS mode must stay Full (Strict). All other records (`www`, `utilities`, `pi`, mail) are DNS-only on purpose; don't "fix" either warning by toggling proxy status.
- The UVM server (`aperkel.w3.uvm.edu`, "silk") still hosts the sub-apps and `cal.ics`; `minecraft.aaronperkel.com` points at a separate host. Keep those DNS records intact when changing domain settings.
