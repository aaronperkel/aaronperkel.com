import { identity } from "@/data/identity";

// YouTube/Instagram stay in the layout's Person schema (sameAs) but not here:
// the footer is for the links a hiring manager or client actually wants.
const links = [
  { href: `mailto:${identity.email}`, label: identity.email },
  { href: "/services", label: "services" },
  { href: identity.github, label: "github" },
  { href: identity.linkedin, label: "linkedin" },
];

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-rule py-6 font-mono text-[0.8rem] text-muted">
      <p>© {new Date().getFullYear()} {identity.name}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {links.map((s) => (
          <a key={s.label} href={s.href} className="text-muted no-underline hover:text-ink hover:underline">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
