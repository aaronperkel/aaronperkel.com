// Home-page project cards. `descHtml` may contain trusted HTML (links, etc.)
// and is rendered with dangerouslySetInnerHTML — only trusted content belongs here.
export interface Project {
  name: string;
  image: string;
  descHtml: string;
}

export const projects: Project[] = [
  {
    name: "Íocón",
    image: "/img/iocon.webp",
    descHtml:
      'Íocón is the business site I built for my girlfriend\'s custom Irish dance graphics studio — a gallery, multi-step order flows for each product, and a live waitlist, built with Next.js, TypeScript & Tailwind CSS. <a href="https://iocongraphics.com" target="_blank">View Site</a> · <a href="https://github.com/aaronperkel/iocon" target="_blank">GitHub Repo</a>',
  },
  {
    name: "UVM Sublets",
    image: "/img/sublet.webp",
    descHtml:
      'UVM Sublets is a PHP/MySQL platform for UVM students to post & manage sublet listings. Uses noUiSlider & Leaflet for filters & interactive maps. <a href="https://github.com/aaronperkel/sublet" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Utility Manager",
    image: "/img/utility.webp",
    descHtml:
      "A personal portal for my two roommates’ and my utility bills—built with HTML, CSS, PHP, SQL & Python. Features include bill listing, cost splitting, PDF downloads, admin portal, email reminders (automated via Raspberry Pi). <a href=\"https://github.com/aaronperkel/Utility-Manager\" target=\"_blank\">GitHub Repo</a>",
  },
  {
    name: "Message/Doodle Board",
    image: "/img/board.webp",
    descHtml:
      'I built a lightweight birthday guestbook that lets visitors write notes or draw on a canvas; entries are saved to MySQL and rendered in a masonry gallery with live refresh. Stack: PHP (PDO), vanilla JS/Canvas, and a simple email notify flow with CSRF + honeypot spam protection. <a href="https://github.com/aaronperkel/message-doodle-board.git" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Finance Tracker",
    image: "/img/finance-tracker.webp",
    descHtml:
      'Developed a full-stack “Finance Tracker” web app (PHP, MySQL, JavaScript/Chart.js, CSS) to help users monitor net worth, manage accounts, and log work hours. <a href="https://github.com/aaronperkel/finance-tracker" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Blob Kart",
    image: "/img/img.gif",
    descHtml:
      'Blob Kart is a game inspired by Mario Kart created in C++ using GLM, GLFW, and OpenGL. My partner Owen Cook and I created this project for our Advanced Programming class at UVM. Graphics starter code was provided by the teaching assistants and the instructor. <a href="https://github.com/owncook/Blob-Kart" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Web Site Dev Final",
    image: "/img/cs1080final.webp",
    descHtml:
      'This project was built with Lily Bonds using HTML, CSS & PHP for a fictitious company Green Mountain Cycles. It includes 5 pages and a form that emails submissions. <a href="https://courses.aperkel.w3.uvm.edu/cs1080/final/" target="_blank">View Site</a>',
  },
  {
    name: "DormKit",
    image: "/img/dormkit.webp",
    descHtml:
      'DormKit is a "smart dorm" prototype—Flask web app + Raspberry Pi + Arduino to control dorm electronics remotely. Built with Owen Cook, Alexa Witkin & Sam Zimpfer. <a href="https://github.com/aaronperkel/DormKit" target="_blank">GitHub Repo</a>',
  },
  {
    name: "Custom PCB",
    image: "/img/pcb.webp",
    descHtml:
      "Designed a custom KiCad PCB for a prosthetic glove detecting high temperatures to assist people with neuropathy.",
  },
  {
    name: "Lights Out",
    image: "/img/lightsout.gif",
    descHtml:
      'Lights Out is a puzzle where toggling a cell and its neighbors toggles lights on/off. Goal: turn off all lights. Built in C++ with GLM, GLFW & OpenGL by Owen Cook and me. <a href="https://github.com/aaronperkel/Lights-Out" target="_blank">GitHub Repo</a>',
  },
  {
    name: "CodeBuilder",
    image: "/img/combine.webp",
    descHtml:
      'CodeBuilder is an iOS app to learn coding via drag‑and‑drop code blocks, articles, daily challenges & community forum. <a href="https://github.com/gohacki/CodeBuilder" target="_blank">GitHub Repo</a>',
  },
  // {
  //   name: "Room Status Sign",
  //   image: "/img/sign.webp",
  //   descHtml:
  //     'An E‑Ink door display showing my current status (e.g. "Do Not Disturb") with timeframe, powered by Flask on Raspberry Pi. <a href="https://github.com/aaronperkel/Room-Display-Sign" target="_blank">GitHub Repo</a>',
  // },
];
