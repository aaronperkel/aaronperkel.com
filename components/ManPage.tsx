import type { ReactNode } from "react";

// Man-page chrome. See DESIGN.md — "The Man Page": pages open and close with a
// running head, and every section is a flush-left uppercase label with its body
// indented under it, the way `man` renders one.

// Frozen at build time, like a real man page's document date. Every route here
// is statically prerendered, so this is genuinely the date the page was made.
export const docDate = new Date().toISOString().slice(0, 10);

export function RunningHead({
  left,
  center,
  right,
  // The top line is pure typographic convention and repeats its own title
  // twice; screen readers get nothing from it. The bottom line carries real
  // information (place, date), so it stays in the accessibility tree.
  decorative = false,
}: {
  left: string;
  center: string;
  right: string;
  decorative?: boolean;
}) {
  return (
    <p
      aria-hidden={decorative || undefined}
      className="flex items-baseline justify-between gap-4 font-mono text-[0.8rem] uppercase tracking-[0.15em] text-muted"
    >
      <span>{left}</span>
      <span className="tabular-nums max-sm:hidden">{center}</span>
      <span>{right}</span>
    </p>
  );
}

export function ManSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted">
        {title}
      </h2>
      <div className="pl-4 sm:pl-8">{children}</div>
    </section>
  );
}
