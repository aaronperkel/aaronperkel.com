import type { Metadata } from "next";
import Link from "next/link";
import { resumeData } from "@/data/resume";

export const metadata: Metadata = {
  title: "Aaron Perkel – Resume",
  description:
    "Aaron Perkel's resume: experience as a network technician, education, skills, and side projects.",
  alternates: { canonical: "/resume" },
};

const arrowLi =
  "relative mb-2 pl-6 before:absolute before:left-0 before:text-accent before:content-['▹']";

export default function Resume() {
  return (
    <main className="mx-auto max-w-[1100px]">
      <div className="mx-auto grid max-w-[1000px] grid-cols-[250px_1fr] gap-8 rounded-2xl border-[3px] border-accent p-[1%] max-md:grid-cols-1 max-md:gap-4 max-md:border-none">
        <aside className="rounded-lg bg-panel p-6">
          <section>
            <h3 className="mb-4 text-[1.1rem] font-semibold uppercase text-accent">Contact</h3>
            <ul className="[&_a]:text-primary">
              {resumeData.contactInfo.map((item, i) => (
                <li key={i} className="mb-3 text-[0.95rem]">
                  <i className={item.icon}></i>{" "}
                  {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mt-6 mb-4 text-[1.1rem] font-semibold uppercase text-accent">
              Honors and Awards
            </h3>
            <ul>
              {resumeData.honorsAndAwards.map((honor) => (
                <li key={honor.title} className="mb-3 text-[0.95rem]">
                  {honor.title} {honor.date && <em>{honor.date}</em>}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section>
          <h3 className="mt-6 inline-block border-b-2 border-accent pb-1 font-semibold">
            Experience
          </h3>
          {resumeData.experience.map((job) => (
            <article key={job.title} className="mb-6">
              <h4 className="mb-1 font-semibold">{job.title}</h4>
              {job.location && <h5 className="mb-1 text-muted">{job.location}</h5>}
              <time className="mb-2 block text-[0.9rem] text-muted">{job.time}</time>
              {job.details && job.details.length > 0 && (
                <ul>
                  {job.details.map((detail, i) => (
                    <li key={i} className={arrowLi}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <h3 className="mt-6 inline-block border-b-2 border-accent pb-1 font-semibold">
            Education
          </h3>
          {resumeData.education.map((edu) => (
            <article key={edu.institution}>
              <strong>{edu.institution}</strong>
              {edu.degree && <> — {edu.degree}</>}
              <br />
              <time className="mb-2 block text-[0.9rem] text-muted">{edu.time}</time>
            </article>
          ))}

          <h3 className="mt-6 inline-block border-b-2 border-accent pb-1 font-semibold">
            Skills &amp; Interests
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              resumeData.skills.slice(0, Math.ceil(resumeData.skills.length / 2)),
              resumeData.skills.slice(Math.ceil(resumeData.skills.length / 2)),
            ].map((column, i) => (
              <ul key={i}>
                {column.map((group) => (
                  <li key={group.category} className={arrowLi}>
                    <strong>{group.category}:</strong> {group.items.join(", ")}
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <h3 className="mt-6 inline-block border-b-2 border-accent pb-1 font-semibold">
            Projects
          </h3>
          <ul>
            {resumeData.projects.map((project) => (
              <li key={project.name} className={arrowLi}>
                <Link href={project.link}>{project.name}</Link>
                {project.description && <> — {project.description}</>}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-8 text-center">
        <a
          href="/resume.pdf"
          className="rounded bg-accent px-6 py-3 font-medium text-white hover:bg-accent-light hover:no-underline"
        >
          <i className="fas fa-file-pdf"></i> Download PDF
        </a>
      </p>
    </main>
  );
}
