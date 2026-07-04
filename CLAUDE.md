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

- **`data/*.ts` is the only "CMS"** — `projects.ts` (home-page cards), `about.ts`, `resume.ts`. Edit these to change site copy, resume entries, skills, etc. Several fields are HTML strings rendered with `dangerouslySetInnerHTML` (a carry-over from the PHP site), so only trusted content belongs there.
- `app/layout.tsx` — Inter via `next/font`, site-wide metadata (favicons, manifest, apple-web-app), JSON-LD Person schema, and the Font Awesome kit script (`kit.fontawesome.com/c428e5511d.js`) that turns `<i class="fa-...">` into icons everywhere. Header/Nav/Footer render around every page.
- `components/ProjectsGrid.tsx` — the one interactive piece: project cards + popup with prev/next. Opening `/?project=<Name>` auto-opens that card's popup (resume "Projects" links and old indexed URLs rely on this).
- Design tokens (page/panel/primary/muted/accent colors) are Tailwind `@theme` variables in `app/globals.css`, carried over from the PHP site's stylesheet. Styling is Tailwind utilities in JSX; globals.css has only base element styles and the footer's Minecraft-icon hover gradient.
- `app/robots.ts` / `app/sitemap.ts` generate robots.txt and sitemap.xml.
- `next.config.ts` — permanent redirects from the PHP-era URLs (`/index.php`, `/about.php`, `/resume.php`, `/generate_resume_pdf.php`) and a rewrite mapping the old `/public/:path*` asset URLs onto `/:path*` (used by `public/me.html`, the web manifest, and any external hotlinks).

## Static odds and ends

- `public/me.html` — standalone self-contained contact card (a printed luggage-tag QR code points at it). Not part of the Next app; don't rename its URL.
- `public/resume.pdf` — static file linked from the resume page. It is **not** generated at build time; the old PHP/Dompdf generator was retired at migration. To update it: change `data/resume.ts`, then re-export a PDF by hand (or print the resume page) and replace this file.
- `public/img/` — all images, committed to the repo (they were deployed out-of-band in the PHP era).

## Deployment / hosting context

- Vercel deploys from this repo; pushing to `main` updates production once the Vercel project is connected.
- The UVM server (`aperkel.w3.uvm.edu`, "silk") still hosts the sub-apps and `cal.ics`; `minecraft.aaronperkel.com` points at a separate host. Keep those DNS records intact when changing domain settings.
