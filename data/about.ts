// About-page content. `contentHtml` may contain trusted HTML and is rendered
// with dangerouslySetInnerHTML — only trusted content belongs here.
export interface AboutSection {
  title: string;
  contentHtml?: string;
  list?: string[];
}

export const aboutData: { pageTitle: string; sections: AboutSection[] } = {
  pageTitle: "About Me",
  sections: [
    {
      title: "Who I Am",
      contentHtml:
        "Hi, I’m Aaron Perkel. I’m a computer scientist and network technician based in Burlington, Vermont. I graduated from the University of Vermont with a B.S. in Computer Science and a minor in Mathematics, completing the degree in three years. I currently work with UVM’s Enterprise Technology Services (ETS) team, where I focus on network infrastructure, systems support, and automation projects.",
    },
    {
      title: "What I Do",
      contentHtml:
        "My work and side projects live at the intersection of <strong>networking</strong>, <strong>software</strong>, and <strong>automation</strong>. I enjoy designing small, reliable systems that make everyday workflows smoother — from full‐stack web apps to Raspberry Pi projects.",
    },
    {
      title: "What I’m Exploring",
      contentHtml:
        "I’ve always been fascinated by <strong>aviation</strong>, and I’m gradually blending that with my technical background. Whether through flight simulation on VATSIM, network visualization tools, or aviation data systems, I love connecting these two worlds. I’m also planning to pursue an FAA Private Pilot Certificate in the near future.",
    },
    {
      title: "Outside of Tech",
      contentHtml:
        "When I’m not coding or working, I’m probably making music, exploring Vermont, or creating short films and photos for friends. My projects are personal, practical, and usually built just because I can.",
    },
  ],
};
