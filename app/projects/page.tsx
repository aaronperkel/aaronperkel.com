import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Aaron Perkel – Projects",
  description:
    "Production web apps by Aaron Perkel, each with a short case study: auth, data models, payments, migrations, and deploys.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <main className="py-14">
      <h1 className="text-[2rem] font-semibold leading-tight">Projects</h1>
      <p className="mt-4 mb-10 max-w-[38rem]">
        Production apps I’ve built and run, each with a short write-up of how it works under the
        hood.
      </p>
      <ProjectList />
    </main>
  );
}
