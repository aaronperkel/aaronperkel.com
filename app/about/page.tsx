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
    <main>
      <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2">
        <h2 className="col-span-full border-b-2 border-accent pb-2 text-center text-[2.25rem] font-semibold">
          {aboutData.pageTitle}
        </h2>

        {aboutData.sections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg bg-panel p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          >
            <h3 className="mb-3 font-semibold text-accent">{section.title}</h3>
            {section.contentHtml && (
              <p
                className="leading-normal text-muted"
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />
            )}
            {section.list && (
              <ul className="text-muted">
                {section.list.map((item, i) => (
                  <li
                    key={i}
                    className="relative mb-2 pl-5 before:absolute before:left-0 before:text-accent before:content-['▹']"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
