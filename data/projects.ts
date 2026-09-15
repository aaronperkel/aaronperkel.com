// Home-page project cards. `descHtml` may contain trusted HTML (links, etc.)
// and is rendered with dangerouslySetInnerHTML — only trusted content belongs here.
// `tagline` is the one-line summary shown under the card name in the grid.
export interface Project {
  name: string;
  image: string;
  tagline: string;
  // Lowercase, as displayed — the stack each descHtml already names.
  stack: string[];
  // Pulled out of descHtml so rows can link them as plain text.
  site?: string;
  repo?: string;
  // false keeps a project off the home list while leaving /?project=<Name>
  // deep links (resume entries, old indexed URLs) working.
  featured?: boolean;
  descHtml: string;
}

export const projects: Project[] = [
  {
    name: "Iocon Graphics",
    image: "/img/iocon.webp",
    tagline: "Next.js storefront for an Irish dance graphics studio",
    stack: ["next.js", "typescript", "tailwind"],
        site: "https://iocongraphics.com",
    repo: "https://github.com/aaronperkel/iocon",
descHtml:
      'Iocon is the business site I built for my girlfriend\'s custom Irish dance graphics studio — a gallery, multi-step order flows for each product, and a live waitlist, built with Next.js, TypeScript & Tailwind CSS.',
  },
  {
    name: "UVM Sublets",
    image: "/img/uvm-sublets.webp",
    tagline: "Sublet listings platform for UVM students",
    stack: ["php", "mysql", "leaflet"],
        site: "https://sublet.aperkel.w3.uvm.edu",
    repo: "https://github.com/aaronperkel/sublet",
descHtml:
      'UVM Sublets is a platform I built for UVM students to find and post sublet listings — browse with price, distance, and semester filters, see every listing on an interactive Leaflet map, and sign in with a UVM NetID to post your own. PHP & MySQL, with noUiSlider and Leaflet on the front end.',
  },
  {
    name: "Utility Manager",
    image: "/img/utility-manager.webp",
    tagline: "Bill splitting & reminders for my apartment",
    stack: ["php", "mysql", "python"],
        repo: "https://github.com/aaronperkel/Utility-Manager",
descHtml:
      'Utility Manager is the dashboard my roommates and I use to keep up with our gas, electric, and internet bills — it splits each bill, tracks who has paid, charts cost trends, publishes an iCal feed of due dates, and sends automated email reminders from a cron job. Built with PHP, MySQL & Python on UVM\'s web server.',
  },
  {
    name: "Message/Doodle Board",
    image: "/img/message-doodle-board.webp",
    tagline: "Birthday guestbook with canvas doodles",
    stack: ["php", "canvas", "vanilla js"],
        site: "https://aperkel.w3.uvm.edu/riley21/",
    repo: "https://github.com/aaronperkel/message-doodle-board",
descHtml:
      'A guestbook I built for my girlfriend\'s 21st birthday — friends could leave a note or draw a doodle on a canvas, and every entry lands in a live-refreshing masonry gallery. PHP (PDO) and vanilla JS/Canvas, with CSRF + honeypot spam protection and an email ping when someone posts.',
  },
  {
    name: "Finance Tracker",
    image: "/img/finance-tracker.webp",
    tagline: "Net-worth dashboard with Chart.js",
    stack: ["php", "mysql", "chart.js"],
        repo: "https://github.com/aaronperkel/finance-tracker",
descHtml:
      'Finance Tracker is a personal net-worth dashboard: I log snapshots of each account and it charts balances, net worth over time, and logged work hours with Chart.js. Full-stack PHP, MySQL & vanilla JavaScript.',
  },
  {
    name: "Blob Kart",
    image: "/img/blob-kart.webp",
    tagline: "Two-player C++/OpenGL kart racer",
    stack: ["c++", "opengl", "glfw"],
    featured: false,
        repo: "https://github.com/owncook/Blob-Kart",
descHtml:
      'Blob Kart is a two-player kart racer inspired by Mario Kart, written with Owen Cook in C++ and OpenGL (GLM + GLFW) for UVM\'s Advanced Programming course. It has a character select screen, boost pads, and lap checkpoints so nobody can cheat by circling the finish line — and driving through the grass really does slow you down. Graphics starter code came from our instructor and TAs.',
  },
  {
    name: "Custom PCB",
    image: "/img/custom-pcb.webp",
    tagline: "KiCad board for a temperature-sensing glove",
    stack: ["kicad"],
    featured: false,
    descHtml:
      "I designed this custom PCB in KiCad for a prosthetic glove that senses dangerously hot surfaces — a warning system for people with neuropathy who can't feel heat themselves.",
  },
  {
    name: "Lights Out",
    image: "/img/lights-out.webp",
    tagline: "Classic puzzle in C++ and OpenGL",
    stack: ["c++", "opengl"],
    featured: false,
        repo: "https://github.com/aaronperkel/Lights-Out",
descHtml:
      'Lights Out is the classic puzzle: toggling a cell flips its neighbors too, and the goal is to switch every light off in as few clicks as possible. Owen Cook and I wrote it in C++ with OpenGL (GLM + GLFW).',
  },
];
