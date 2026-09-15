import type { Metadata } from "next";
import { aboutData } from "@/data/about";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Aaron Perkel – About",
  description:
    "About Aaron Perkel: a computer science grad and network technician based in Burlington, VT, working at the intersection of networking, software, and automation.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="py-10">
      <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
        {aboutData.pageTitle}
      </h1>

      {aboutData.sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.contentHtml && (
            <p
              className="max-w-[60ch] text-[0.9375rem]"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />
          )}
          {section.list && (
            <ul className="text-[0.9375rem]">
              {section.list.map((item, i) => (
                <li
                  key={i}
                  className="relative mb-1.5 pl-4 before:absolute before:left-0 before:text-ink-2 before:content-['·']"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          )}
        </Section>
      ))}
    </main>
  );
}
