// Home-page project cards. `descHtml` may contain trusted HTML (links, etc.)
// and is rendered with dangerouslySetInnerHTML — only trusted content belongs here.
// `tagline` is the one-line summary shown under the card name in the grid.
// `aliases` are former card names, so old /?project=<Name> links (resumes
// already sent out, indexed URLs) still open the renamed card.
export interface Project {
  name: string;
  image: string;
  tagline: string;
  descHtml: string;
  aliases?: string[];
}

export const projects: Project[] = [
  {
    name: "Iocon Graphics",
    image: "/img/iocon.webp",
    tagline: "Next.js storefront for an Irish dance graphics studio",
    descHtml:
      'Iocon is the business site I built for my girlfriend\'s custom Irish dance graphics studio — a gallery, multi-step order flows for each product, and a live waitlist, built with Next.js, TypeScript & Tailwind CSS. <a href="https://iocongraphics.com" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/iocon" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Catamount Sublets",
    image: "/img/catamount-sublets.webp",
    tagline: "Sublet listings platform for UVM students",
    descHtml:
      'Catamount Sublets is a platform I built for UVM students to find and post sublets — browse by price, semester, and distance from campus on a grid or a map, sign in with a code sent to your UVM email, and share any listing with a public link. It replaced UVM Sublets, my old PHP app: I rebuilt it in Next.js & TypeScript with Postgres, Vercel Blob, and MapLibre, and moved every live listing over at launch. <a href="https://catamountsublets.com" target="_blank">View Site</a>',
    aliases: ["UVM Sublets"],
  },
  {
    name: "77 N Union Utilities",
    image: "/img/77-n-union-utilities.webp",
    tagline: "Bill splitting & reminders for my apartment",
    descHtml:
      '77 N Union Utilities is the dashboard my roommates and I use to track our gas, electric, and internet bills — it splits each bill, tracks who has paid, charts cost trends, and emails reminders before anything is due. I rewrote it from PHP in Next.js & TypeScript, with TiDB Cloud and Vercel Blob. I\'ve adapted it for a second house (<a href="https://github.com/aaronperkel/peach-cob" target="_blank">Peach Cob</a>) and am now merging both into <a href="https://github.com/aaronperkel/lejer" target="_blank">Lejer</a>, a version for any household. <a href="https://github.com/aaronperkel/utilities" target="_blank">GitHub Repo</a>',
    aliases: ["Utility Manager"],
  },
  {
    name: "Vermont Plate Log",
    image: "/img/vermont-plate-log.webp",
    tagline: "Logging Vermont plates spotted around Burlington",
    descHtml:
      'Vermont Plate Log is a phone-first app my girlfriend and I use to log Vermont plates we spot around Burlington. As you type, it checks each plate against Vermont\'s real issuing sequence (which skips I, J, O, and Q, and only added U, V, and Z in late 2023) and estimates its issue date from first-hand sightings. It also tracks coverage, gaps, and notable combinations. Next.js, TypeScript, Turso, and Drizzle. <a href="https://github.com/aaronperkel/vermont-plate-log" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Message/Doodle Board",
    image: "/img/message-doodle-board.webp",
    tagline: "Birthday guestbook with canvas doodles",
    descHtml:
      'A guestbook I built for my girlfriend\'s 21st birthday — friends could leave a note or draw a doodle on a canvas, and every entry lands in a live-refreshing masonry gallery. PHP (PDO) and vanilla JS/Canvas, with CSRF + honeypot spam protection and an email ping when someone posts. <a href="https://aperkel.w3.uvm.edu/riley21/" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/message-doodle-board" target="_blank">GitHub Repo</a>',
  },
];
