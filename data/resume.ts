// Resume content — the single source for both the /resume page and the
// PDF generated at build time by app/resume.pdf/route.ts.
export interface ContactItem {
  label: string;
  href?: string;
}

export interface Honor {
  title: string;
  date?: string;
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
  // Optional sub-bullets for the projects worth more than a one-liner.
  details?: string[];
}

export const resumeData = {
  name: "Aaron Perkel",
  contactInfo: [
    { label: "me@aaronperkel.com", href: "mailto:me@aaronperkel.com" },
    { label: "(478) 262-8935", href: "tel:4782628935" },
    // City/state only — the full street address doesn't belong on a public page.
    { label: "Burlington, VT" },
    // Web page and PDF both show the full host/path from href for http links.
    { label: "aaronperkel.com", href: "https://aaronperkel.com" },
    { label: "github.com/aaronperkel", href: "https://github.com/aaronperkel" },
    { label: "linkedin.com/in/aaronperkel", href: "https://linkedin.com/in/aaronperkel" },
  ] satisfies ContactItem[],
  // `as`, not `satisfies`: an empty array literal infers as never[], which
  // breaks the consumers that map over it. Entries kept for easy restore.
  honorsAndAwards: [
    // { title: "Golden Key Honor Society", date: "Oct 2023" },
    // { title: "Excellence in Technology", date: "May 2021" },
  ] as Honor[],
  experience: [
    {
      title: "Network Technician",
      location: "University of Vermont – Burlington, VT",
      time: "May 2025 – Present",
      details: [
        "Support campus-wide networking and telecommunications infrastructure within an enterprise environment",
        "Execute department-level phone system migrations from Nortel to Cisco",
        "Install, mount, and patch wireless access points across campus buildings",
      ],
    },
    {
      title: "ETS Student Technician - Level II",
      location: "University of Vermont – Burlington, VT",
      time: "Nov 2023 – May 2025 • 1 yr 7 mos",
      details: [
        "Primary IT support contact for UVM staff & students; triaged and escalated tickets",
        "Maintained internal documentation and assisted lower level techs",
      ],
    },
  ] satisfies Job[],
  education: [
    {
      institution: "University of Vermont",
      degree: "B.S. Computer Science, Mathematics Minor — completed in three years",
      time: "Aug 2022 – May 2025",
    },
    // {
    //   institution: "Middle Georgia State University",
    //   degree: "M.S. Management, Aviation Concentration",
    //   time: "Admitted",
    // },
  ] satisfies School[],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "C", "C++", "Java", "PHP"] },
    { category: "Full-Stack", items: ["React", "Next.js (App Router)", "Node.js", "REST APIs", "Tailwind CSS"] },
    { category: "Data", items: ["MySQL", "TiDB Cloud", "Schema design & migrations"] },
    { category: "Cloud & CI", items: ["Git", "GitHub Actions", "Vercel", "Cloudflare", "Docker", "Linux"] },
    { category: "AI Tooling", items: ["Claude Code", "LLM-assisted development"] },
    { category: "Interests", items: ["Aviation", "Flight sim (VATSIM)", "FAA PPL"] },
  ] satisfies SkillGroup[],
  projects: [
    {
      link: "/?project=Iocon%20Graphics",
      name: "Iocon Graphics",
      description: "Production storefront built for a working artist — iocongraphics.com",
      details: [
        "Sole engineer for a non-technical client: gallery, six order flows, a live order queue, moderated reviews, and an admin portal she runs herself — Next.js 15, TypeScript, TiDB Cloud; live and taking real orders",
      ],
    },
    {
      link: "/?project=Utility%20Manager",
      name: "Utility Manager",
      description: "Internal tool for splitting shared household bills — Next.js rewrite of a PHP app",
      details: [
        "Rewrote a two-year-old PHP/MySQL app as Next.js 15 + TypeScript, migrating the live DB to TiDB Cloud and PDFs to Vercel Blob with no user interruption; email-code auth, cron scheduler, signed JSON API",
      ],
    },
    { link: "/?project=UVM%20Sublets", name: "UVM Sublets", description: "Sublet listings platform for UVM students — PHP/MySQL, NetID login, Leaflet maps, faceted filters" },
    { link: "/?project=Blob%20Kart", name: "Blob Kart", description: "Two-player kart racer in C++ and OpenGL (GLFW/GLM) — physics, lap checkpoints, surface friction" },
  ] satisfies ResumeProject[],
};
