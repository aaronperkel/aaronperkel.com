import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="py-10">
      <div className="flex items-center gap-4">
        <Image
          src="/img/headshot.webp"
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
          priority
        />
        <div className="min-w-0">
          <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
            Aaron Perkel
          </h1>
          <p className="text-[0.9375rem] text-ink-2">
            Network technician and software engineer · Burlington, Vermont
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-[60ch] text-[0.9375rem]">
        I’m a network technician at the University of Vermont with a B.S. in Computer
        Science. I like building small, reliable systems: networks, web apps, and the
        occasional Raspberry Pi project.
      </p>

      <Section title="Now">
        <p className="text-[0.9375rem]">
          Network Technician, UVM Enterprise Technology Services{" "}
          <span className="text-ink-2">— since May 2025</span>
        </p>
      </Section>

      <Section title="Work">
        <WorkList />
        <p className="mt-3 text-[0.8125rem] text-ink-2">
          <a href="https://github.com/aaronperkel">More on GitHub</a>
        </p>
      </Section>

      <Section title="Contact">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
          <li>
            <a href="mailto:me@aaronperkel.com">me@aaronperkel.com</a>
          </li>
          <li>
            <a href="https://github.com/aaronperkel">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/aaronperkel">LinkedIn</a>
          </li>
        </ul>
      </Section>
    </main>
  );
}
