"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mt-2 mb-8 flex gap-4 rounded-lg bg-panel px-4 py-2 shadow-[0_2px_4px_rgba(0,0,0,0.3)] max-md:justify-center">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-[0.3em] px-4 py-2 text-primary transition-colors hover:bg-accent hover:text-white hover:no-underline ${
            pathname === link.href ? "bg-accent text-white" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
