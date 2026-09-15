"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

// The platform's own toolbar: translucent, hairline-bottomed, and pinned — which
// is also what keeps the way to reach him on screen at every scroll position.
export default function Toolbar() {
  const pathname = usePathname();

  return (
    <header className="bar sticky top-0 z-10 border-b border-line bg-ground/85 backdrop-blur-sm">
      <div className="mx-auto flex h-11 w-full max-w-[42rem] items-center justify-between gap-4 px-5">
        <Link href="/" className="-my-3 py-3 text-[0.9375rem] font-semibold no-underline">
          Aaron Perkel
        </Link>
        <nav className="flex items-center gap-4 text-[0.8125rem]">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              className={
                pathname === route.href
                  ? "-my-3 py-3 font-medium text-ink no-underline"
                  : "-my-3 py-3 text-ink-2 no-underline hover:text-ink"
              }
            >
              {route.label}
            </Link>
          ))}
          <a href="mailto:me@aaronperkel.com" className="-my-3 py-3 text-ink-2 hover:text-ink">
            <span className="max-sm:hidden">me@aaronperkel.com</span>
            <span className="sm:hidden">Email</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
