import type { Metadata } from "next";
import Link from "next/link";
import { resumeData, type ContactItem } from "@/data/resume";

export const metadata: Metadata = {
  title: "Aaron Perkel – Resume",
  description:
    "Aaron Perkel's resume: experience as a network technician, education, skills, and side projects.",
  alternates: { canonical: "/resume" },
};

const sectionLabel =
  "mb-4 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";
const dashLi = "relative mb-1.5 pl-5 before:absolute before:left-0 before:text-muted before:content-['–']";

// Same display rule as the PDF: linked items show the bare host/path.
const display = (item: ContactItem) =>
  item.href?.startsWith("http") ? item.href.replace(/^https?:\/\//, "") : item.label;

export default function Resume() {
  return (
    <main className="py-14">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-[2rem] font-semibold leading-tight">Resume</h1>
        <a href="/resume.pdf" className="font-mono text-[0.85rem]">
          resume.pdf ↓
        </a>
      </div>

      <section className="mt-8">
        <h2 className={sectionLabel}>Contact</h2>
        {/* Same two-line grouping as the PDF: personal info, then web presence */}
        {[resumeData.contactInfo.slice(0, 3), resumeData.contactInfo.slice(3)].map((group, g) => (
          <ul key={g} className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[0.85rem]">
            {group.map((item, i) => (
              <li key={item.label} className="flex gap-x-2">
                {i > 0 && <span className="text-muted">·</span>}
                {item.href ? <a href={item.href}>{display(item)}</a> : item.label}
              </li>
            ))}
          </ul>
        ))}
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Experience</h2>
        {resumeData.experience.map((job) => (
          <article key={job.title} className="mb-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{job.title}</h3>
              <time className="font-mono text-[0.8rem] text-muted">{job.time}</time>
            </div>
            {job.location && <p className="text-[0.95rem] text-muted">{job.location}</p>}
            {job.details && job.details.length > 0 && (
              <ul className="mt-2">
                {job.details.map((detail, i) => (
                  <li key={i} className={dashLi}>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Education</h2>
        {resumeData.education.map((edu) => (
          <article key={edu.institution} className="mb-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{edu.institution}</h3>
              <time className="font-mono text-[0.8rem] text-muted">{edu.time}</time>
            </div>
            {edu.degree && <p className="text-[0.95rem] text-muted">{edu.degree}</p>}
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Skills &amp; Interests</h2>
        <ul>
          {resumeData.skills.map((group) => (
            <li key={group.category} className={dashLi}>
              <strong className="font-semibold">{group.category}:</strong>{" "}
              {group.items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Honors &amp; Awards</h2>
        <ul>
          {resumeData.honorsAndAwards.map((honor) => (
            <li key={honor.title} className={dashLi}>
              {honor.title}
              {honor.date && <span className="text-muted"> — {honor.date}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Projects</h2>
        <ul>
          {resumeData.projects.map((project) => (
            <li key={project.name} className={dashLi}>
              <Link href={project.link}>{project.name}</Link>
              {project.description && <> — {project.description}</>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
