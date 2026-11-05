// Project case studies (/projects/[slug]) and the smaller "Other projects"
// list. Plain strings only — no HTML. Facts here come from each project's own
// repo; anything unverified should stay out rather than be guessed.
//
// `aliases` are former names: old /?project=<Name> links (resumes already
// sent out, indexed URLs) are redirected by proxy.ts to the matching page.
export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  aliases?: string[];
  tagline: string;
  image?: string;
  status: string;
  role: string;
  timeline: string;
  stack: string[];
  highlights: string[];
  overview: string;
  howItWorks: ProjectSection[];
  next: string[];
  links: ProjectLink[];
  // Shown instead of a repo link when the code can't be public.
  privateNote?: string;
}

export interface OtherProject {
  slug: string;
  name: string;
  aliases?: string[];
  summary: string;
  links: ProjectLink[];
}

// Featured order is display order.
export const featured: Project[] = [
  {
    slug: "catamount-sublets",
    name: "Catamount Sublets",
    aliases: ["UVM Sublets"],
    tagline: "Sublet marketplace for UVM students",
    image: "/img/catamount-sublets.webp",
    status: "Live",
    role: "Designed, built, and run it solo",
    timeline: "Mar 2025 – present (rebuilt Oct 2026)",
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Better Auth",
      "Zod",
      "sharp",
      "MapLibre",
      "Vercel (Blob, Cron)",
      "Resend",
      "Vitest",
      "GitHub Actions",
    ],
    highlights: [
      "141 UVM students and 75 listings (Nov 2026), running since 2025.",
      "Live migration from PHP on UVM’s Silk server to Next.js on Vercel: ~20 minutes from freeze to open writes, and old links kept working.",
      "Replaced CAS single sign-on with email one-time codes restricted to NetID@uvm.edu, so every student maps to exactly one account.",
    ],
    overview:
      "Catamount Sublets is where UVM students find and post sublets — browse by price, semester, and distance from campus on a grid or a map, and share any listing with a public link. It’s the second version. The first, UVM Sublets, was a PHP and MySQL app I launched in March 2025 on UVM’s Silk web server, behind CAS single sign-on. I rebuilt it as Next.js and TypeScript on Vercel and moved everyone over in a live cutover on October 9, 2026.",
    howItWorks: [
      {
        title: "From → to",
        body: "PHP 8 and MySQL on UVM’s Silk shared hosting, behind CAS → Next.js 16 and TypeScript on Vercel, Neon Postgres with Drizzle, Vercel Blob for photos, and Resend for mail.",
      },
      {
        title: "Sign-in without CAS",
        body: "CAS sign-in came from an Apache module on Silk, so leaving Silk meant replacing it. Sign-in is now a one-time email code through Better Auth (hashed, 10-minute expiry, three attempts), sent with Resend. Sign-up is restricted to NetID@uvm.edu: dotted First.Last aliases are refused so every student maps to one account, migrated accounts are matched by NetID, and anyone else needs an admin-approved access request. The domain check runs before any email is sent and again when the user row is created, and a resend cooldown plus per-email and per-IP limits in Postgres-backed buckets sit in front of every code.",
      },
      {
        title: "The migration script",
        body: "A tested TypeScript script reads the legacy MySQL — from a dump or over an SSH tunnel — prints every planned insert, update, and delete as a dry run, then applies them and verifies each photo against the original by hash. It honors opt-outs and was rehearsed against a Neon branch before the real run. It moved 44 listings and 199 photos, reusing 196 images already uploaded in rehearsal.",
      },
      {
        title: "The cutover",
        body: "Freeze the old site read-only, take a final export, dry-run against production, snapshot a Neon restore branch, apply, open read-only, swap Silk’s document root for a redirect shim, smoke-test, and turn writes on — 07:45 to 08:03 on a Friday morning. Old share links and preview images redirect to the new site, go.uvm.edu/sublet points there until January 2027, and a 48-hour rollback path was ready.",
      },
      {
        title: "Data model",
        body: "Users and sessions, listings with their photos, semesters, and an event history, plus access requests and Postgres-backed rate-limit buckets. Six Drizzle migrations.",
      },
      {
        title: "Photos",
        body: "Uploaded straight from the browser to a private Blob store, then processed with sharp: auto-rotated, capped at 3000px, EXIF and GPS stripped, and written out as a 1600px WebP, a 600px thumbnail, and a JPEG share card.",
      },
      {
        title: "Tests and CI",
        body: "36 Vitest files cover the schema, services, rate limits, the legacy migration and its dump parser, image processing, and the auth allowlist. GitHub Actions runs lint, typecheck, tests, and the build on every push.",
      },
      {
        title: "Admin",
        body: "A moderation console: bans, listing status, photo cleanup, semester archives, announcements, a read-only switch, and broadcast email.",
      },
    ],
    next: [
      "Open sign-up to other Vermont schools.",
      "Handle Resend bounce webhooks so dead addresses stop getting mail.",
    ],
    links: [{ label: "catamountsublets.com", href: "https://catamountsublets.com" }],
  },
  {
    slug: "red-king-registration",
    name: "Red King Registration",
    tagline: "Feis registration and payments for a nonprofit Irish dance tabulation org",
    status: "In development; first season 2027",
    role: "Sole developer (Aaron Perkel LLC)",
    timeline: "Sep 2026 – present",
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Auth.js",
      "Stripe",
      "Resend",
      "Vercel",
      "Vitest",
      "Playwright",
    ],
    highlights: [
      "Built for a nonprofit that runs three feiseanna a year, about 350 dancers each; first season 2027.",
      "The signed Stripe webhook is the only source of payment state; deduplicated events and idempotency keys make retries and off-session waitlist charges safe.",
      "79 Vitest files against in-memory Postgres plus 8 Playwright end-to-end specs, including a concurrent capacity race.",
    ],
    overview:
      "Red King Tabulation is a nonprofit that runs results for Irish dance competitions (feiseanna) — about 350 dancers per feis, three feiseanna a year. This app replaces a third-party registration service. Families register dancers into competitions, pay through Stripe, and get competitor numbers and schedules by email; feis chairs and admins handle setup, waitlists, check-in, and exports from an admin console.",
    howItWorks: [
      {
        title: "Auth",
        body: "Passwordless sign-in with Auth.js magic links, sent through Resend and rate-limited per address. The emailed link opens a confirm page and only signs you in on a button press, so mail scanners that prefetch links can’t burn the token. Database sessions and three roles — parent, admin, and feis chair — with chairs scoped to their own feis.",
      },
      {
        title: "Data model",
        body: "Families own dancers; a registration ties a dancer to a feis, and entries tie a registration to individual competitions. Composite foreign keys keep every entry inside its own feis, CHECK constraints guard valid states, and unique indexes enforce competitor numbers, dancing order, duplicate-dancer detection, and one active waitlist spot per family. Money is integer cents with non-negative checks.",
      },
      {
        title: "Payments",
        body: "Stripe Checkout for registration. The signed webhook is the only thing that marks a payment paid, and every event is recorded insert-on-conflict so Stripe’s retries are no-ops. Waitlisted families save a card with a SetupIntent and are charged off-session, with an idempotency key, when a spot opens. Fee rules — per-competition fees, a capped family fee, date-based late fees — live in one pure, tested module.",
      },
      {
        title: "Capacity",
        body: "A per-feis dancer cap with 15-minute holds, evaluated when it’s read rather than by a cleanup job — there’s no cron to fail.",
      },
      {
        title: "Admin and exports",
        body: "Feis setup (competitions, stages, running order, schedule, waiver), payments including cash and check, waitlist release, competitor numbers, and duplicate review. Exports to the .xlsx format the tabulation workbooks already use, plus PDF check-in sheets. Every admin change writes an audit-log row in the same transaction.",
      },
      {
        title: "Migrations and tests",
        body: "16 Drizzle SQL migrations. 79 Vitest files run against in-memory Postgres (PGlite) — fee rules, database constraints, migrations, a concurrent cap race, the webhook — plus 8 Playwright end-to-end specs.",
      },
    ],
    next: [
      "An admin dashboard with an audit-log view, reports, and a full data export.",
      "Assisted import of each feis’s syllabus, so setup isn’t typed in by hand.",
    ],
    links: [],
    privateNote:
      "The code is private (client project). I’m happy to walk through the architecture in an interview.",
  },
  {
    slug: "lejer",
    name: "Lejer",
    aliases: ["77 N Union Utilities", "Utility Manager"],
    tagline: "Shared bills for the people you live with",
    image: "/img/lejer.webp",
    status: "Live",
    role: "Designed, built, and run it solo",
    timeline: "Oct 2026 – present",
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL (Neon) via postgres.js",
      "Vercel (Blob, Cron, Queues)",
      "Resend + React Email",
    ],
    highlights: [
      "Postgres row-level security per household; the app’s database role can’t bypass it.",
      "Email sign-in codes stored only as SHA-256 hashes, compared in constant time, behind layered rate limits.",
      "~790 verification checks across 14 suites, run against a Neon branch.",
    ],
    overview:
      "Lejer is a free bill-splitting app for people who share a lease. Someone posts each house bill with its statement; everyone sees their share, gets a reminder before it’s due, and checks off when they’ve paid — whether one person pays everything or each bill has its own owner who fronts it. It grew out of a PHP dashboard my roommates and I used, and two households moved onto it at launch.",
    howItWorks: [
      {
        title: "Tenant isolation",
        body: "Postgres row-level security per household. Each request runs in a transaction that sets the household with set_config(…, true), and every policy reads it. The app connects as a role without BYPASSRLS — the migration refuses to run otherwise — and the owner role is confined to five listed call sites.",
      },
      {
        title: "Auth",
        body: "Email sign-in codes: six digits from a CSPRNG, stored only as a SHA-256 hash, 10-minute expiry, dead after five wrong guesses, and compared in constant time. Rate limits per email, per (hashed) IP, and a global daily cap. Sessions are a signed JWT in an httpOnly cookie, 30 days with sliding renewal.",
      },
      {
        title: "Reminders",
        body: "An hourly Vercel Cron tick sends each household’s reminders at its own local send hour; a Vercel Queues topic handles delayed wake-ups. 14 React Email templates.",
      },
      {
        title: "Files",
        body: "Statements live in a private Blob store and are served only through an authenticated route; documents upload straight from the browser.",
      },
      {
        title: "Migrations and import",
        body: "18 hand-written SQL migrations with a small runner. Both legacy households were imported from the old app’s database in a single transaction at launch.",
      },
      {
        title: "Verification",
        body: "14 verification suites (~790 checks) run against a Neon dev branch: RLS isolation, identity, bills, cron, the import, and HTTP.",
      },
      {
        title: "Admin",
        body: "The operator console reads only through SECURITY DEFINER functions that never return dollar amounts.",
      },
    ],
    next: ["Venmo and Zelle pay links.", "Run the verification suites in CI on every pull request."],
    links: [
      { label: "uselejer.com", href: "https://uselejer.com" },
      { label: "Sample household", href: "https://uselejer.com/demo" },
    ],
  },
  {
    slug: "iocon-graphics",
    name: "Íocón Graphics",
    aliases: ["Iocon Graphics"],
    tagline: "Storefront and live order queue for an Irish dance graphics studio",
    image: "/img/iocon.webp",
    status: "Live since August 2026, taking real orders",
    role: "Sole developer for a non-technical client (Aaron Perkel LLC)",
    timeline: "Jun 2026 – present",
    stack: ["Next.js 15", "TypeScript", "TiDB Cloud (MySQL)", "Vercel Blob", "Nodemailer", "Tailwind CSS"],
    highlights: [
      "Live since August 2026; the owner runs orders, the queue, and reviews herself from an admin portal.",
      "A public live order queue that emails customers when they move up.",
      "A pre-launch gate that opened itself at a fixed launch time, with no redeploy.",
    ],
    overview:
      "Íocón Graphics makes custom graphics for Irish dancers. The site runs the business: a gallery, an order form for each product, a public waitlist showing where every order stands, moderated reviews, and an admin portal the owner runs day to day.",
    howItWorks: [
      {
        title: "Orders",
        body: "Four order types share one configurable form and one orders table. Pricing per type lives in one module and gives customers an estimate up front; bulk, logo, and custom requests go through a separate inquiry flow.",
      },
      {
        title: "Live queue",
        body: "A customer’s place in line is computed from open orders by date. When the owner marks an order done, everyone behind it gets a “you’ve moved up” email. The public waitlist renders live, keeps finished orders visible for 14 days, and estimates the wait from queue depth.",
      },
      {
        title: "Admin auth",
        body: "Emailed six-digit codes with signed, stateless cookies; the admin allowlist is re-checked on every request, and sign-in is rate-limited.",
      },
      {
        title: "Reviews",
        body: "New reviews stay hidden until approved.",
      },
      {
        title: "Reliability",
        body: "Uploads go to Vercel Blob with type checks, size caps, and rate limits. A failed email never loses an order, and with no database or mail server configured the app falls back to in-memory storage and logged email, so it runs locally with zero setup.",
      },
      {
        title: "Launch",
        body: "A pre-launch gate held every public page and refused submissions until a fixed launch instant, then opened on its own — no redeploy.",
      },
    ],
    next: [
      "Stripe Checkout in the order flow instead of invoices sent by hand.",
      "Structured columns for order details instead of a text field.",
    ],
    links: [{ label: "iocongraphics.com", href: "https://iocongraphics.com" }],
  },
];

export const otherProjects: OtherProject[] = [
  {
    slug: "vermont-plate-log",
    name: "Vermont Plate Log",
    summary:
      "A phone-first app for logging Vermont plates. It checks each plate against the state’s real issuing sequence and estimates issue dates from sightings. Next.js, Turso, Drizzle.",
    links: [{ label: "GitHub", href: "https://github.com/aaronperkel/vermont-plate-log" }],
  },
  {
    slug: "message-doodle-board",
    name: "Message/Doodle Board",
    summary:
      "A guestbook for a 21st birthday: notes and canvas doodles in a live-refreshing gallery. PHP (PDO), vanilla JS, CSRF and honeypot spam protection.",
    links: [
      { label: "Site", href: "https://aperkel.w3.uvm.edu/riley21/" },
      { label: "GitHub", href: "https://github.com/aaronperkel/message-doodle-board" },
    ],
  },
];

export const findProject = (slug: string) => featured.find((p) => p.slug === slug);
