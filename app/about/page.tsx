import type { Metadata } from "next";
import { aboutData } from "@/data/about";
import { ManSection, RunningHead, docDate } from "@/components/ManPage";

export const metadata: Metadata = {
  title: "Aaron Perkel – About",
  description:
    "About Aaron Perkel: a computer science grad and network technician based in Burlington, VT, working at the intersection of networking, software, and automation.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="py-14">
      <RunningHead
        left="perkel(7)"
        center="Miscellaneous Information"
        right="perkel(7)"
        decorative
      />

      <h1 className="mt-9 text-[2rem] font-semibold leading-tight">{aboutData.pageTitle}</h1>

      {aboutData.sections.map((section) => (
        <ManSection key={section.title} title={section.title}>
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
        </ManSection>
      ))}

      <div className="mt-14">
        <RunningHead left="Burlington, VT" center={docDate} right="perkel(7)" />
      </div>
    </main>
  );
}
