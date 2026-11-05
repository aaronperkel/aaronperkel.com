import type { Metadata } from "next";
import { openGraph } from "@/app/og";
import ProjectList from "@/components/ProjectList";
import { identity } from "@/data/identity";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: openGraph("/"),
};

const sectionLabel =
  "font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";

export default function Home() {
  return (
    <main>
      <section className="py-14">
        <h1 className="text-[2rem] font-semibold leading-tight">{identity.headline}</h1>
        <p className="mt-4 max-w-[38rem]">{identity.intro}</p>
        <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[0.85rem]">
          {[
            { href: `mailto:${identity.email}`, label: identity.email },
            { href: identity.linkedin, label: "LinkedIn" },
            { href: identity.github, label: "GitHub" },
            { href: identity.resumePdf, label: "Resume (PDF)" },
          ].map((link, i) => (
            <li key={link.label} className="flex gap-x-2">
              {i > 0 && <span className="text-muted">·</span>}
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-6 border-t border-rule pt-10">
        <h2 className={`mb-8 ${sectionLabel}`}>Projects</h2>
        <ProjectList />
      </section>

      <section className="mt-14 border-t border-rule pt-10">
        <h2 className={`mb-3 ${sectionLabel}`}>Get in touch</h2>
        <p className="max-w-[38rem]">
          Email is the best way to reach me:{" "}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>. I’m also on{" "}
          <a href={identity.linkedin}>LinkedIn</a> and <a href={identity.github}>GitHub</a>.
        </p>
      </section>
    </main>
  );
}
