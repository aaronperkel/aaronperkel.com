import type { Metadata } from "next";
import Link from "next/link";
import ProjectsList from "@/components/ProjectsList";
import { ManSection, RunningHead, docDate } from "@/components/ManPage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="py-14">
      <RunningHead left="perkel(1)" center="User Commands" right="perkel(1)" decorative />

      <ManSection title="Name">
        <h1 className="font-semibold">
          aaron perkel <span className="text-muted">—</span> network technician and software
          engineer
        </h1>
      </ManSection>

      <ManSection title="Synopsis">
        <p className="font-mono text-[0.85rem]">
          perkel <span className="text-muted">[--network] [--software] [--vermont]</span>
        </p>
      </ManSection>

      <ManSection title="Description">
        <p className="max-w-[38rem]">
          I’m a network technician at the University of Vermont with a B.S. in Computer
          Science. I like building small, reliable systems: networks, web apps, and the
          occasional Raspberry Pi project.
        </p>
      </ManSection>

      <ManSection title="Projects">
        <ProjectsList />
      </ManSection>

      <ManSection title="Author">
        <p>
          Aaron Perkel <span className="text-muted">·</span>{" "}
          <a href="mailto:me@aaronperkel.com">me@aaronperkel.com</a>{" "}
          <span className="text-muted">·</span> Burlington, Vermont
        </p>
      </ManSection>

      <ManSection title="See Also">
        <p className="font-mono text-[0.85rem]">
          <Link href="/resume">resume(1)</Link>
          <span className="text-muted">, </span>
          <Link href="/about">about(7)</Link>
          <span className="text-muted">, </span>
          <a href="https://github.com/aaronperkel">github(1)</a>
          <span className="text-muted">, </span>
          <a href="https://linkedin.com/in/aaronperkel">linkedin(1)</a>
        </p>
        <p className="mt-2 font-mono text-[0.85rem] text-muted">curl aaronperkel.com</p>
      </ManSection>

      <div className="mt-14">
        <RunningHead left="Burlington, VT" center={docDate} right="perkel(1)" />
      </div>
    </main>
  );
}
