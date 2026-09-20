// Services-page content (freelance work under Aaron Perkel LLC).
// `proofHtml` may contain trusted HTML and is rendered with
// dangerouslySetInnerHTML — only trusted content belongs here.
export interface ServiceItem {
  title: string;
  body: string;
}

export interface ServicesData {
  pageTitle: string;
  intro: string;
  availability: string;
  build: ServiceItem[];
  process: string[];
  proofHtml: string;
  formIntro: string;
}

export const servicesData: ServicesData = {
  pageTitle: "Services",
  intro:
    "Freelance web and software development, contracted through Aaron Perkel LLC. I build custom software for small businesses and organizations — usually replacing a spreadsheet, a subscription you’ve outgrown, or a process somebody is still doing by hand.",
  availability:
    "I take on a small number of projects at a time alongside my full-time work as a network technician at UVM, so I’ll tell you honestly up front what a realistic timeline looks like.",
  build: [
    {
      title: "Custom web apps and internal tools",
      body: "Registration and intake systems, admin dashboards, reporting. Built around how you already work instead of forcing you into someone else’s software.",
    },
    {
      title: "Business sites and online storefronts",
      body: "Marketing sites, galleries, custom order flows, and waitlists — fast, accessible, and easy to keep updated once they’re yours.",
    },
    {
      title: "Payments and checkout",
      body: "Stripe integration, tiered and conditional pricing, deposits and refunds, and the reporting you need to reconcile all of it.",
    },
    {
      title: "Automation and integrations",
      body: "Scheduled jobs, email and calendar reminders, exports into the spreadsheets and tools you already use, and glue between systems that don’t talk to each other.",
    },
  ],
  process: [
    "A short call first to understand the problem — free, and no obligation.",
    "A written scope and a fixed price before any code. No hourly surprises.",
    "Working software early and often, not a big reveal at the end.",
    "You own the code and the accounts. Nothing is locked to me.",
    "Handoff with documentation, or I stay on for maintenance — your call.",
  ],
  proofHtml:
    'I built and maintain <a href="https://iocongraphics.com" target="_blank">iocongraphics.com</a> — a storefront for a working artist with a gallery, six custom order flows, a live order queue, moderated reviews, and an admin portal she runs herself. It’s live and taking real orders.',
  formIntro:
    "Tell me what you’re trying to build. I read everything and reply within a few days, usually sooner.",
};

// Inquiry-form dropdown options. Shared by components/InquiryForm.tsx and the
// server-side allowlist in app/api/inquiry/route.ts — keep them in one place so
// validation can never drift from what the form actually offers.
export const timelineOptions = [
  "Not sure yet",
  "As soon as possible",
  "Within a month or two",
  "Later this year",
  "Just exploring",
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
] as const;
