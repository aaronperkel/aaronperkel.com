import type { ReactNode } from "react";

// The grouped-list header every native settings screen uses: small, secondary,
// and the same on every page. One size, no second treatment.
export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-2 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-ink-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
