// Who I am, in one place. The home page, /about, site metadata, the Person
// JSON-LD, the OG image, the resume header, and the curl/CLI output all read
// from here, so the headline can't drift between them. Plain strings only —
// no HTML (the CLI prints these verbatim).
//
// No phone number or street address: those live only in data/contact.ts (/me).
export const identity = {
  name: "Aaron Perkel",
  // Short role line: OG image, resume header, Person.jobTitle.
  role: "Full-Stack Developer",
  // Home-page H1.
  headline: "I’m Aaron, a full-stack developer.",
  intro:
    "I build and run production web apps on Next.js, TypeScript, and Postgres — the auth, payments, and data models underneath, not just the UI. Right now that’s registration and payments for a nonprofit Irish dance organization, a multi-tenant bill-splitting app, and a sublet marketplace for UVM students. By day I’m a network technician at UVM; I also run Aaron Perkel LLC.",
  // One line for the OG image subtitle and the Person description.
  tagline: "Full-stack developer building production web apps with Next.js, TypeScript, and Postgres.",
  stack: ["Next.js", "TypeScript", "Postgres"],
  title: "Aaron Perkel – Full-Stack Developer",
  metaDescription:
    "Full-stack developer in Burlington, VT building production web apps with Next.js, TypeScript, and Postgres. Case studies, resume, and contact.",
  email: "me@aaronperkel.com",
  location: { city: "Burlington", region: "VT", country: "US" },
  site: "https://aaronperkel.com",
  github: "https://github.com/aaronperkel",
  linkedin: "https://linkedin.com/in/aaronperkel",
  resumePdf: "/resume.pdf",
  // The honest day job, kept out of the headline but stated in the intro.
  currentRole: { title: "Network Technician", org: "University of Vermont" },
  business: "Aaron Perkel LLC",
};
