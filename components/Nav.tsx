"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// /services lives in the footer and on /about — the nav is for hiring managers.
const links = [
  { href: "/#projects", label: "projects", match: "/projects" },
  { href: "/about", label: "about" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5 font-mono text-[0.85rem]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            pathname === link.href || (link.match && pathname.startsWith(link.match))
              ? "text-ink underline decoration-ink underline-offset-4"
              : "text-muted no-underline hover:text-ink"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
