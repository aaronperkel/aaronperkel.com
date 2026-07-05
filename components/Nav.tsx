"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/resume", label: "resume" },
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
            pathname === link.href
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
