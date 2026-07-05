import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <section className="py-14">
        <h1 className="text-[2rem] font-semibold leading-tight">Hello — I’m Aaron.</h1>
        <p className="mt-4 max-w-[38rem]">
          I’m a network technician at the University of Vermont with a B.S. in Computer
          Science. I like building small, reliable systems: networks, web apps, and the
          occasional Raspberry Pi project.
        </p>
        <p className="mt-6 font-mono text-[0.85rem] text-muted">
          $ curl aaronperkel.com{" "}
          <span className="max-sm:hidden"># this site works in your terminal, too</span>
        </p>
      </section>

      <section className="border-t border-rule pt-10">
        <h2 className="mb-8 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted">
          Projects
        </h2>
        <ProjectsGrid />
      </section>
    </main>
  );
}
