import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <section className="mb-12 rounded-lg bg-panel px-8 py-16 text-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-[700px]">
          <h1 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-semibold">Hello! I’m Aaron.</h1>
          <p>Network Technician @ UVM; B.S. in Computer Science.</p>
        </div>
      </section>

      <section>
        <h2 className="mx-auto mb-8 block pb-4 text-center text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">
          Projects
        </h2>
        <ProjectsGrid />
      </section>
    </main>
  );
}
