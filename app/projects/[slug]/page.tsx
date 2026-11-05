import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { openGraph } from "@/app/og";
import { featured, findProject } from "@/data/projects";

// One short case study per featured project, all prerendered.
export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} – Aaron Perkel`,
    description: `${project.tagline}. ${project.highlights[0]}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: openGraph(`/projects/${project.slug}`),
  };
}

const sectionLabel =
  "mb-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";
const dashLi =
  "relative mb-2 pl-5 before:absolute before:left-0 before:text-muted before:content-['–']";

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const meta = [
    { label: "Status", value: project.status },
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Stack", value: project.stack.join(", ") },
  ];

  return (
    <main className="py-14">
      <p className="font-mono text-[0.85rem] text-muted">
        <Link href="/projects" className="text-muted no-underline hover:text-ink hover:underline">
          projects
        </Link>{" "}
        / {project.slug}
      </p>
      <h1 className="mt-2 text-[2rem] font-semibold leading-tight">{project.name}</h1>
      <p className="mt-2 max-w-[38rem] text-muted">{project.tagline}</p>

      {project.image && (
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          width={700}
          height={467}
          sizes="(max-width: 704px) 100vw, 704px"
          priority
          className="mt-8 aspect-[3/2] w-full rounded-[3px] border border-rule object-cover"
        />
      )}

      <dl className="mt-8 border-t border-rule">
        {meta.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-2.5"
          >
            <dt className="w-20 shrink-0 font-mono text-[0.8rem] text-muted">{row.label}</dt>
            <dd className="min-w-0 flex-1 text-[0.95rem]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-10">
        <h2 className={sectionLabel}>Highlights</h2>
        <ul>
          {project.highlights.map((item) => (
            <li key={item} className={dashLi}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Overview</h2>
        <p>{project.overview}</p>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>How it works</h2>
        {project.howItWorks.map((part) => (
          <article key={part.title} className="mb-5">
            <h3 className="font-semibold">{part.title}</h3>
            <p className="text-[0.95rem] text-muted">{part.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>What I’d do next</h2>
        <ul>
          {project.next.map((item) => (
            <li key={item} className={dashLi}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Links</h2>
        {project.links.length > 0 && (
          <ul className="font-mono text-[0.85rem]">
            {project.links.map((link) => (
              <li key={link.href} className="mb-1">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
        {project.privateNote && <p className="text-[0.95rem] text-muted">{project.privateNote}</p>}
      </section>

      <p className="mt-12 font-mono text-[0.85rem]">
        <Link href="/projects">← All projects</Link>
      </p>
    </main>
  );
}
