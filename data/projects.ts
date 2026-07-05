// Home-page project cards. `descHtml` may contain trusted HTML (links, etc.)
// and is rendered with dangerouslySetInnerHTML — only trusted content belongs here.
// `tagline` is the one-line summary shown under the card name in the grid.
export interface Project {
  name: string;
  image: string;
  tagline: string;
  descHtml: string;
}

export const projects: Project[] = [
  {
    name: "Íocón",
    image: "/img/iocon.webp",
    tagline: "Next.js storefront for an Irish dance graphics studio",
    descHtml:
      'Íocón is the business site I built for my girlfriend\'s custom Irish dance graphics studio — a gallery, multi-step order flows for each product, and a live waitlist, built with Next.js, TypeScript & Tailwind CSS. <a href="https://iocongraphics.com" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/iocon" target="_blank">GitHub Repo</a>',
  },
  {
    name: "UVM Sublets",
    image: "/img/uvm-sublets.webp",
    tagline: "Sublet listings platform for UVM students",
    descHtml:
      'UVM Sublets is a platform I built for UVM students to find and post sublet listings — browse with price, distance, and semester filters, see every listing on an interactive Leaflet map, and sign in with a UVM NetID to post your own. PHP & MySQL, with noUiSlider and Leaflet on the front end. <a href="https://sublet.aperkel.w3.uvm.edu" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/sublet" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Utility Manager",
    image: "/img/utility-manager.webp",
    tagline: "Bill splitting & reminders for my apartment",
    descHtml:
      'Utility Manager is the dashboard my roommates and I use to keep up with our gas, electric, and internet bills — it splits each bill, tracks who has paid, charts cost trends, publishes an iCal feed of due dates, and sends automated email reminders from a cron job. Built with PHP, MySQL & Python on UVM\'s web server. <a href="https://github.com/aaronperkel/Utility-Manager" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Message/Doodle Board",
    image: "/img/message-doodle-board.webp",
    tagline: "Birthday guestbook with canvas doodles",
    descHtml:
      'A guestbook I built for my girlfriend\'s 21st birthday — friends could leave a note or draw a doodle on a canvas, and every entry lands in a live-refreshing masonry gallery. PHP (PDO) and vanilla JS/Canvas, with CSRF + honeypot spam protection and an email ping when someone posts. <a href="https://aperkel.w3.uvm.edu/riley21/" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/message-doodle-board" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Finance Tracker",
    image: "/img/finance-tracker.webp",
    tagline: "Net-worth dashboard with Chart.js",
    descHtml:
      'Finance Tracker is a personal net-worth dashboard: I log snapshots of each account and it charts balances, net worth over time, and logged work hours with Chart.js. Full-stack PHP, MySQL & vanilla JavaScript. <a href="https://github.com/aaronperkel/finance-tracker" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Blob Kart",
    image: "/img/blob-kart.gif",
    tagline: "Two-player C++/OpenGL kart racer",
    descHtml:
      'Blob Kart is a two-player kart racer inspired by Mario Kart, written with Owen Cook in C++ and OpenGL (GLM + GLFW) for UVM\'s Advanced Programming course. It has a character select screen, boost pads, and lap checkpoints so nobody can cheat by circling the finish line — and driving through the grass really does slow you down. Graphics starter code came from our instructor and TAs. <a href="https://github.com/owncook/Blob-Kart" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Custom PCB",
    image: "/img/custom-pcb.webp",
    tagline: "KiCad board for a temperature-sensing glove",
    descHtml:
      "I designed this custom PCB in KiCad for a prosthetic glove that senses dangerously hot surfaces — a warning system for people with neuropathy who can't feel heat themselves.",
  },
  {
    name: "Lights Out",
    image: "/img/lights-out.gif",
    tagline: "Classic puzzle in C++ and OpenGL",
    descHtml:
      'Lights Out is the classic puzzle: toggling a cell flips its neighbors too, and the goal is to switch every light off in as few clicks as possible. Owen Cook and I wrote it in C++ with OpenGL (GLM + GLFW). <a href="https://github.com/aaronperkel/Lights-Out" target="_blank">GitHub Repo</a>',
  },
];
