import Image from "next/image";
import Link from "next/link";
import { featured, otherProjects } from "@/data/projects";

// Featured case-study cards plus the compact "Other projects" list. Shared by
// the home page and /projects so the two can't disagree.

const sectionLabel =
  "font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";
const external = { target: "_blank", rel: "noopener noreferrer" };

export default function ProjectList() {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 max-sm:grid-cols-1">
        {featured.map((project) => (
          <article key={project.slug} className="group relative">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                width={640}
                height={427}
                sizes="(max-width: 640px) 100vw, 316px"
                className="aspect-[3/2] w-full rounded-[3px] border border-rule object-cover"
              />
            ) : (
              // No screenshot yet (private client app): a typographic stand-in.
              <div
                aria-hidden="true"
                className="flex aspect-[3/2] w-full items-center justify-center rounded-[3px] border border-rule px-6 text-center font-mono text-[0.85rem] text-muted"
              >
                {project.name}
              </div>
            )}
            <h3 className="mt-2.5 font-semibold group-hover:underline group-hover:underline-offset-4">
              {/* Stretched link: the whole card is clickable */}
              <Link
                href={`/projects/${project.slug}`}
                className="text-ink no-underline after:absolute after:inset-0"
              >
                {project.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-[0.9rem] text-muted">{project.tagline}</p>
            <p className="mt-1 font-mono text-[0.75rem] text-muted">
              {project.status.split(";")[0]} · {project.stack.slice(0, 3).join(", ")}
            </p>
          </article>
        ))}
      </div>

      <h3 className={`mt-14 mb-4 ${sectionLabel}`}>Other projects</h3>
      <ul>
        {otherProjects.map((project) => (
          <li key={project.slug} id={project.slug} className="mb-4 scroll-mt-6">
            <span className="font-semibold">{project.name}</span>
            <span className="text-muted"> — </span>
            <span className="text-[0.95rem] text-muted">{project.summary}</span>{" "}
            <span className="font-mono text-[0.8rem]">
              {project.links.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && <span className="text-muted"> · </span>}
                  <a href={link.href} {...external}>
                    {link.label}
                  </a>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
