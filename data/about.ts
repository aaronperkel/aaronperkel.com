// About-page content. `contentHtml` may contain trusted HTML and is rendered
// with dangerouslySetInnerHTML — only trusted content belongs here.
export interface AboutSection {
  title: string;
  contentHtml?: string;
  list?: string[];
}

export const aboutData: { pageTitle: string; sections: AboutSection[] } = {
  pageTitle: "About",
  sections: [
    {
      title: "What I build",
      contentHtml:
        "I’m a full-stack developer in Burlington, Vermont. I build web apps for real users: registration and payments for a nonprofit, a bill-splitting app households use every month, a sublet marketplace for UVM students, and a storefront that takes real orders. Most of it is Next.js and TypeScript on Postgres, and the parts I like best are underneath — data models, auth, payments, and the jobs that run when nobody’s watching. <a href=\"/projects\">See the case studies</a>.",
    },
    {
      title: "How I work",
      contentHtml:
        "I take projects end to end, from the first conversation through deploy and the maintenance after. I lean on the database to keep data correct — constraints, row-level security, transactions — write tests for the rules that cost money when they’re wrong, and plan migrations so cutovers are boring: Catamount Sublets moved 44 live listings and 199 photos in about twenty minutes.",
    },
    {
      title: "Background",
      contentHtml:
        "I graduated from the University of Vermont with a B.S. in Computer Science and a minor in Mathematics, finishing in three years. Since May 2025 I’ve been a network technician on UVM’s Enterprise Technology Services team. I also run <strong>Aaron Perkel LLC</strong>, building software for small businesses and nonprofits — <a href=\"/services\">see services</a>.",
    },
    {
      title: "What I’m looking for",
      contentHtml:
        "A backend or full-stack role on a team that ships to real users — owning features from schema to production, with people I can learn from in code review.",
    },
    {
      title: "Outside of work",
      contentHtml:
        "I’m an aviation nerd (flight sim on VATSIM, and I plan to earn a private pilot certificate), and I make music and short films.",
    },
  ],
};
