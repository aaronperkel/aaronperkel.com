// Resume content. `html` fields may contain trusted HTML and are rendered
// with dangerouslySetInnerHTML — only trusted content belongs here.
export interface ContactItem {
  icon: string; // Font Awesome class, e.g. "fas fa-envelope"
  html: string;
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

export interface ResumeProject {
  link: string;
  name: string;
  description?: string;
}

export const resumeData = {
  pageTitle: "Resume",
  contactInfo: [
    { icon: "fas fa-envelope", html: '<a href="mailto:me@aaronperkel.com">me@aaronperkel.com</a>' },
    { icon: "fas fa-phone", html: '<a href="tel:4782628935">(478) 262‑8935</a>' },
    { icon: "fas fa-map-marker-alt", html: "81 Buell St #1, Burlington VT 05401" },
    { icon: "fas fa-globe", html: '<a href="https://aaronperkel.com">https://aaronperkel.com</a>' },
    { icon: "fab fa-github", html: '<a href="https://github.com/aaronperkel">/aaronperkel</a>' },
    { icon: "fab fa-linkedin", html: '<a href="https://linkedin.com/in/aaronperkel">/aaronperkel</a>' },
  ] satisfies ContactItem[],
  honorsAndAwards: [
    { title: "Golden Key Honor Society", date: "Oct 2023" },
    // { title: "Excellence in Technology", date: "May 2021" },
  ] satisfies Honor[],
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
        "Primary IT support contact for UVM staff & students",
        "Respond to tickets via phone & email; escalated to the appropriate group",
        "Maintained internal documentation and assisted lower level techs",
      ],
    },
    // {
    //   title: "Computer Science Teaching Assistant",
    //   location: "University of Vermont – Burlington, VT",
    //   time: "Jan 2024 – May 2025 • 1 yr 5 mos",
    //   details: [
    //     "Grade weekly assignments and provide detailed feedback",
    //     "Co‑develop lecture materials and lab exercises for CS2100 & CS2300",
    //     "Built a Java‑based autograder leveraging JUnit to streamline grading",
    //   ],
    // },
  ] satisfies Job[],
  education: [
    {
      institution: "University of Vermont",
      degree: "B.S. Computer Science, Math Minor",
      time: "Aug 2022 – May 2025",
    },
    // {
    //   institution: "Middle Georgia State University",
    //   degree: "M.S. Management, Aviation Concentration",
    //   time: "Admitted",
    // },
  ] satisfies School[],
  skillsAndInterests: {
    categories: [
      [
        "<strong>Languages:</strong> Python, Java, C++, C",
        "<strong>Web:</strong> HTML5, CSS3, PHP",
        "<strong>Mobile:</strong> iOS (Swift), Xcode",
      ],
      [
        "<strong>Database:</strong> SQL",
        "<strong>Tools:</strong> Git, Docker, NGINX",
        "<strong>Soft Skills:</strong> Leadership, Communication, Problem‑Solving",
      ],
    ],
  },
  projects: [
    { link: "/?project=UVM%20Sublets", name: "UVM Sublets", description: "PHP/MySQL platform for off‑campus housing listings" },
    { link: "/?project=Utility%20Manager", name: "Utility Manager", description: "Web portal for splitting & tracking roommate bills" },
    { link: "/?project=CodeBuilder", name: "CodeBuilder", description: "iOS app teaching coding via drag‑and‑drop blocks" },
    { link: "/?project=Blob%20Kart", name: "Blob Kart", description: "C++/OpenGL racing game for Advanced Programming class" },
  ] satisfies ResumeProject[],
};
