# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** hiring managers and technical recruiters evaluating Aaron Perkel for software
engineering roles. They arrive from a résumé link, LinkedIn, GitHub, or a name search, usually
mid-screen, and they are deciding whether to spend more time on him.

**Also explicitly served, not merely tolerated:** anyone who ends up here by googling the name —
prospective clients for commissioned work under Aaron Perkel LLC, colleagues, and people who were
handed the URL in person or scanned the printed luggage-tag QR code. The site is a professional
home that has to work for whoever arrives; when a tradeoff forces a choice, the hiring-manager
read wins.

## Product Purpose

Aaron Perkel's personal site at aaronperkel.com: a home page, About, a résumé (page and PDF), and
a grid of project cards. It exists so that someone assessing Aaron — for a job or for commissioned
work — can see who he is, what he has actually built, and how to reach him, in one short visit.

**Success is being remembered.** The stated win is that a visitor leaves with an impression
distinct enough to survive a stack of twenty other portfolio sites. Contact is the desired
outcome, but memorability, not conversion, is the measure the owner chose.

## Positioning

Two identities, held deliberately in parallel, with neither subordinated to the other:

- A network technician inside a real enterprise environment — campus-wide networking and
  telecom at UVM's Enterprise Technology Services, phone-system migrations, wireless AP
  installs.
- An engineer who ships and maintains production full-stack software, for other people, on
  live infrastructure.

The projects are the proof that separates this from a student portfolio: they are live,
maintained, and in some cases used by people who are not Aaron. Íocón Graphics is a storefront
built for a paying, non-technical client and takes real orders today.

Aaron Perkel LLC — in formation, for commissioned web and software development — may appear on the
site now, in ambient places such as the footer. It is a fact the site is allowed to state, not a
reframing of what the site is: this remains a personal site under Aaron's own name, and the LLC does
not become the headline.

## Operating Context

- Visitors arrive by name search, a résumé link, GitHub, LinkedIn, or a printed QR code on a
  luggage tag. Most are not looking for a blog; they are verifying a person.
- The résumé is frequently consumed as a downloaded PDF rather than as the web page, so the two
  must say the same thing.
- Content lives in `data/*.ts` and is edited directly there; there is no CMS and no non-technical
  editor to design around. Aaron is the only author.
- Deployment is a push to `main` → Vercel; DNS is on Cloudflare, with a small Worker fronting the
  apex for plain-HTTP requests.
- Some older work is still hosted on UVM's server (`aperkel.w3.uvm.edu`) and linked from here.

## Capabilities and Constraints

**Fixed — future work must not break these:**

- `/resume.pdf` is generated at build time from `data/resume.ts`, the single source for both the
  `/resume` page and the PDF. Page and PDF must never be able to drift apart.
- `public/me.html` (standalone contact card) and `/vcard`. A printed luggage-tag QR code points at
  `me.html`, so that URL cannot change.

**Present, but not binding:**

- The curl/CLI layer (`curl aaronperkel.com`, plus `/help`, `/links`, `/projects`, `/json`, and the
  Cloudflare Worker that serves plain-HTTP CLI agents). The owner's own words: "kinda cool but it
  might just be a gimmick" — it was modeled on Dave Eddy's ysap.sh. Keeping it is fine; it is **not**
  a constraint to preserve, and it specifically does **not** need to be advertised on the site. The
  home page currently promotes it with a `$ curl aaronperkel.com` line; removing that promotion is
  allowed without further permission, removing the endpoints themselves is not assumed.
- The permanent redirects in `next.config.ts` from PHP-era URLs (`/index.php`, `/about.php`,
  `/resume.php`, `/generate_resume_pdf.php`) and from `/checklist`, `/riley21`, `/videos` to the UVM
  host. These keep indexed URLs and old links alive. Not confirmed either way by the owner — treat
  as a live technical fact and ask before removing.

**Open decisions — record, do not invent:**

- A contact or commission page for Aaron Perkel LLC is planned, and is explicitly **not** to be
  built yet. Leave room for it; do not ship it unasked. A footer mention or similar ambient
  reference to the LLC is allowed; a page, a services section, or a call to hire is not.
- No decision has been made about whether writing, aviation content, or photo/video work ever
  becomes part of the site.

**Technical:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. Fully static — every
route prerenders, including the PDF route. Self-hosted fonts, no third-party icon or font scripts.
Vercel Analytics and Speed Insights are installed.

## Brand Commitments

- The name is **Aaron Perkel**; the business entity is **Aaron Perkel LLC**, which the site names.
- Voice: first person, understated, concrete, occasionally dry. Existing copy describes what a
  thing does and who it was for, never how impressive it is. No marketing superlatives, no
  growth-hack claims.
- **Privacy floor, deliberate and documented in code:** city and state only, never a street
  address, never a birth date — including in the JSON-LD Person schema that is served to every
  scraper. Email, phone, and Burlington/VT are public on purpose; anything more specific is not.

## Evidence on Hand

Real and available:

- Eight project cards in `data/projects.ts`, most with live URLs and public repos: Íocón Graphics
  (live storefront, real orders), UVM Sublets, Utility Manager, Message/Doodle Board, Finance
  Tracker, Blob Kart, a KiCad PCB for a heat-sensing prosthetic glove, Lights Out.
- Verified work history in `data/resume.ts`: UVM Network Technician (May 2025–present), CS Teaching
  Assistant, ETS Student Technician II; B.S. Computer Science with a Mathematics minor from UVM,
  completed in three years; Golden Key Honor Society.
- Project screenshots and a headshot in `public/img/`.

Absences that future work must not paper over with invention: **no testimonials, no client quotes,
no usage metrics or user counts, no press mentions, no awards beyond Golden Key, and no pricing,
service tiers, or availability claims for Aaron Perkel LLC.**

## Product Principles

1. **Memorable beats optimized.** The owner's stated win is being remembered. A safe, template-
   shaped site that converts nothing is the actual failure mode here.
2. **Both identities, in parallel.** Network infrastructure and shipped software are co-equal.
   Never flatten him into "web developer" or into "IT guy."
3. **Only real work, only real claims.** Everything shown must be something that exists and that he
   built or maintains. Fabricated proof is the one unrecoverable mistake on a site whose whole job
   is credibility.
4. **One short visit has to be enough.** Who he is, what he built, and how to reach him should all
   be reachable without hunting. Depth is available for those who want it; nothing important is
   buried behind it.
5. **Page and PDF are one artifact.** Résumé content has exactly one source, and any change to how
   it is presented must hold for both.
