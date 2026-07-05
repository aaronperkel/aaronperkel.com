import type { Metadata } from "next";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "Aaron Perkel – About",
  description:
    "About Aaron Perkel: a computer science grad and network technician based in Burlington, VT, working at the intersection of networking, software, and automation.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="py-14">
      <h1 className="text-[2rem] font-semibold leading-tight">{aboutData.pageTitle}</h1>

      {aboutData.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="mb-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted">
            {section.title}
          </h2>
          {section.contentHtml && (
            <p dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
          )}
          {section.list && (
            <ul>
              {section.list.map((item, i) => (
                <li
                  key={i}
                  className="relative mb-2 pl-5 before:absolute before:left-0 before:text-muted before:content-['–']"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}
