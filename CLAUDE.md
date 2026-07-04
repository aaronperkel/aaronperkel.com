# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Aaron Perkel's personal website (aaronperkel.com) — a small server-rendered PHP site (no build step, no JS framework), hosted on UVM's Apache/PHP shared hosting (`aperkel.w3.uvm.edu`, the "silk" server). This repo tracks the main portfolio site only. The live server also hosts self-contained sub-apps under the same webroot — `checklist/`, `riley21/`, `videos/` — which have their own separate repos in `~/Documents/projects/` and must not be added here. A working copy of the full live webroot is sometimes mounted/synced at `silk/` (gitignored); when present, it is the reference for what's actually deployed.

## Repo layout

All site code lives in `www-root/` — this is the actual document root served by Apache (the repo root is not the web root). Key files:

- `partials/layout.php` — emits the full `<head>` (per-page title/description from a `$pageMeta` array keyed by filename, JSON-LD schema, favicons) and opens `<body>`, then includes `partials/header.php` and `partials/nav.php`. Every page starts with `include 'partials/layout.php';`.
- `partials/footer.php` — closes `</body></html>`, so it must be the last include on a page.
- `index.php`, `about.php`, `resume.php` — the three real pages. Pattern: include `partials/layout.php` → include page data file → render → include `partials/footer.php`.
- `data/about.php`, `data/resume.php` — page content as plain PHP arrays (`$aboutData`, `$resumeData`). This is the only "CMS" — edit these arrays to change site copy, resume entries, skills, etc. Values may contain raw HTML and are echoed unescaped, so only trusted content belongs here.
- `generate_resume_pdf.php` — builds the same resume data into a standalone HTML document and renders it to PDF via Dompdf (`vendor/dompdf`). It has its own inline `<style>` markup — keep it in sync with `resume.php`/`public/css/style.css` if the resume layout changes.
- `public/css/style.css`, `public/js/main.js` — single global stylesheet and script, loaded by `layout.php`. `main.js` is only included on `index.php` (project card popup behavior).
- `public/img/` — static assets (icons, screenshots, favicons). Gitignored (`www-root/public/img/` in `.gitignore`); images are deployed separately, not committed.
- `.htaccess` — forces HTTPS, rewrites `/about` and `/resume` to their `.php` files, excludes the `/riley21/` subsite (present on the server, not in this repo) from rewriting, serves `notfound.html` for 404s, and gzips common asset types.

## Conventions

- CSS/JS includes in `layout.php` are cache-busted with `?<?php echo time(); ?>` — there's no asset pipeline or versioning beyond that.
- `$pathParts['filename']` (derived from `PHP_SELF` in `layout.php`) drives the `<body class="...">`, the `$pageMeta` lookup, the canonical URL, and the active nav link in `partials/nav.php` — keep this in mind if adding a new top-level page.
- Dependencies are managed via Composer (`dompdf/dompdf`) with the vendor directory committed under `www-root/vendor/`; there's no other package manager or build process.

## Working locally

There's no dev server script — serve `www-root/` with PHP's built-in server, e.g. `php -S localhost:8000 -t www-root`, then visit `/`, `/about.php`, `/resume.php`.

## Deploying

No deploy script in the repo; the live site is updated by manual file transfer to UVM's server (the gitignore references an SFTP client config). Committing and pushing here does not change the live site.
