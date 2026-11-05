import type { Metadata } from "next";
import Link from "next/link";
import { identity } from "@/data/identity";

// The public contact page. No phone number — that lives only on /me.
export const metadata: Metadata = {
  title: "Aaron Perkel – Contact",
  description: `Get in touch with ${identity.name}: email, LinkedIn, GitHub, and resume.`,
  alternates: { canonical: "/contact" },
};

const rows = [
  { label: "Email", value: identity.email, href: `mailto:${identity.email}` },
  { label: "LinkedIn", value: identity.linkedin.replace(/^https:\/\//, ""), href: identity.linkedin },
  { label: "GitHub", value: identity.github.replace(/^https:\/\//, ""), href: identity.github },
  { label: "Resume", value: "resume.pdf", href: identity.resumePdf },
];

export default function Contact() {
  return (
    <main className="py-14">
      <h1 className="text-[2rem] font-semibold leading-tight">Get in touch</h1>
      <p className="mt-4 max-w-[38rem]">
        Email is the best way to reach me. I read everything and reply within a few days, usually
        sooner.
      </p>

      <dl className="mt-8 border-t border-rule">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-3"
          >
            <dt className="w-20 shrink-0 font-mono text-[0.8rem] text-muted">{row.label}</dt>
            <dd className="min-w-0 flex-1 break-words">
              <a href={row.href}>{row.value}</a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 max-w-[38rem] text-[0.95rem] text-muted">
        Have a freelance project in mind? The <Link href="/services">services page</Link> has an
        inquiry form.
      </p>
    </main>
  );
}
