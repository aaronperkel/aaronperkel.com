import type { Metadata } from "next";
import Link from "next/link";
import { resumeData, type ContactItem } from "@/data/resume";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Aaron Perkel – Resume",
  description:
    "Aaron Perkel's resume: experience as a network technician, education, skills, and side projects.",
  alternates: { canonical: "/resume" },
};

const bullet =
  "relative mb-1 pl-4 text-[0.9375rem] before:absolute before:left-0 before:text-ink-2 before:content-['·']";

// Same display rule as the PDF: linked items show the bare host/path.
const display = (item: ContactItem) =>
  item.href?.startsWith("http") ? item.href.replace(/^https?:\/\//, "") : item.label;

export default function Resume() {
  return (
    <main className="py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">Resume</h1>
        <a href="/resume.pdf" download className="text-[0.9375rem]">
          Download PDF
        </a>
      </div>

      <Section title="Contact">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem]">
          {resumeData.contactInfo.map((item) => (
            <li key={item.label} className="tnum">
              {item.href ? <a href={item.href}>{display(item)}</a> : item.label}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        {resumeData.experience.map((job) => (
          <article key={job.title} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[0.9375rem] font-semibold">{job.title}</h3>
              <time className="font-mono text-[0.75rem] text-ink-2">{job.time}</time>
            </div>
            {job.location && <p className="text-[0.875rem] text-ink-2">{job.location}</p>}
            {job.details && job.details.length > 0 && (
              <ul className="mt-1.5">
                {job.details.map((detail, i) => (
                  <li key={i} className={bullet}>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </Section>

      <Section title="Education">
        {resumeData.education.map((edu) => (
          <article key={edu.institution} className="mb-3 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[0.9375rem] font-semibold">{edu.institution}</h3>
              <time className="font-mono text-[0.75rem] text-ink-2">{edu.time}</time>
            </div>
            {edu.degree && <p className="text-[0.875rem] text-ink-2">{edu.degree}</p>}
          </article>
        ))}
      </Section>

      <Section title="Skills & Interests">
        <ul>
          {resumeData.skills.map((group) => (
            <li key={group.category} className={bullet}>
              <span className="font-medium">{group.category}:</span> {group.items.join(", ")}
            </li>
          ))}
        </ul>
      </Section>

      {resumeData.honorsAndAwards.length > 0 && (
        <Section title="Honors & Awards">
          <ul>
            {resumeData.honorsAndAwards.map((honor) => (
              <li key={honor.title} className={bullet}>
                {honor.title}
                {honor.date && <span className="tnum text-ink-2"> — {honor.date}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Projects">
        <ul>
          {resumeData.projects.map((project) => (
            <li key={project.name} className={bullet}>
              <Link href={project.link}>{project.name}</Link>
              {project.description && <span className="text-ink-2"> — {project.description}</span>}
              {project.details && project.details.length > 0 && (
                <ul className="mt-1 mb-2">
                  {project.details.map((detail, i) => (
                    <li key={i} className={`${bullet} text-ink-2`}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
