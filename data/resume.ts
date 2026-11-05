// Resume content — the single source for both the /resume page and the
// PDF generated at build time by app/resume.pdf/route.ts. The PDF must stay
// one page (`npm run check:resume`). No phone number: that lives only on /me.
import { identity } from "@/data/identity";

export interface ContactItem {
  label: string;
  href?: string;
}

export interface Job {
  title: string;
  location?: string;
  time: string;
  details?: string[];
}

export interface School {
  institution: string;
  degree?: string;
  time: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ResumeProject {
  link: string;
  name: string;
  description?: string;
}

export const resumeData = {
  name: identity.name,
  headline: identity.role,
  contactInfo: [
    { label: identity.email, href: `mailto:${identity.email}` },
    // Web page and PDF both show the full host/path from href for http links.
    { label: "aaronperkel.com", href: identity.site },
    { label: "github.com/aaronperkel", href: identity.github },
    { label: "linkedin.com/in/aaronperkel", href: identity.linkedin },
    // City/state only — the full street address doesn't belong on a public page.
    { label: `${identity.location.city}, ${identity.location.region}` },
  ] satisfies ContactItem[],
  experience: [
    {
      title: "Software Engineer — Aaron Perkel LLC (freelance)",
      location: "Burlington, VT",
      time: "Jun 2026 – Present",
      details: [
        "Building registration and Stripe payments for a nonprofit Irish dance org (~1,000 dancer registrations/yr, first season 2027): webhook-driven payment state, idempotent off-session waitlist charges, business rules enforced in Postgres; 87 test files including Playwright E2E",
        "Built and run iocongraphics.com for an independent art studio: order intake, a live order queue with email notifications, moderated reviews, and an owner-run admin portal",
        "Own every engagement end to end: scoping and contracts, schema, migrations, deploys, and support",
      ],
    },
    {
      title: "Network Technician",
      location: "University of Vermont – Burlington, VT",
      time: "May 2025 – Present",
      details: [
        "Support network and telecom infrastructure across UVM’s 205-building campus and 12 remote sites",
        "Migrate departments from Nortel to Cisco phone systems",
        "Install, mount, and patch wireless access points",
        "Wrote the Network Services triage guide used by UVM’s Tech Team as first point of contact for jacks and VoIP phones",
      ],
    },
    {
      title: "Computer Science Teaching Assistant (part-time)",
      location: "University of Vermont – Burlington, VT",
      time: "Jan 2024 – May 2025",
      details: [
        "Built a JUnit autograder on Gradescope for Intermediate Programming (Java), automating grading of weekly assignments",
        "TA for Intermediate Programming and Advanced Programming (C++): graded assignments and projects and helped faculty develop course materials",
      ],
    },
    {
      title: "ETS Student Technician – Level II",
      location: "University of Vermont – Burlington, VT",
      time: "Nov 2023 – May 2025",
    },
  ] satisfies Job[],
  projects: [
    {
      link: "/projects/catamount-sublets",
      name: "Catamount Sublets",
      description:
        "141 UVM students, 75 listings. Rebuilt my 2025 PHP app as Next.js + Postgres (Drizzle, Neon); NetID-restricted email OTP replaced CAS SSO; migrated 44 listings and 199 photos in a ~20-min live cutover; CI with 36 test files.",
    },
    {
      link: "/projects/lejer",
      name: "Lejer",
      description:
        "multi-tenant bill splitting on Next.js + Postgres with per-household row-level security (non-bypassable app role), hashed email-code auth, hourly cron reminders, ~790 verification checks.",
    },
  ] satisfies ResumeProject[],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "SQL", "Python", "Java", "C++", "PHP"] },
    {
      category: "Backend & Data",
      items: [
        "Node.js",
        "REST APIs",
        "PostgreSQL (row-level security, constraints, migrations)",
        "Drizzle ORM",
        "MySQL / TiDB",
        "Stripe (Checkout, webhooks)",
        "Auth (Auth.js, Better Auth)",
        "Resend",
      ],
    },
    { category: "Frontend", items: ["React", "Next.js (App Router)", "Tailwind CSS"] },
    {
      category: "Infra & Tools",
      items: [
        "Vercel (Functions, Cron, Blob, Queues)",
        "Neon",
        "GitHub Actions",
        "Linux",
        "Git",
        "Vitest",
        "Playwright",
        "Claude Code",
      ],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      institution: "University of Vermont",
      degree: "B.S. Computer Science, Mathematics minor — completed in three years",
      time: "Aug 2022 – May 2025",
    },
  ] satisfies School[],
};
