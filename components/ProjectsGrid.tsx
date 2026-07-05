"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

// Match the old main.js behavior: normalize NBSP so ?project=Blob Kart
// matches names containing non-breaking spaces.
const normalize = (s: string) => s.replace(/ /g, " ").trim();

const pagerButton = "cursor-pointer font-mono text-[0.85rem] text-muted transition-colors hover:text-ink";

export default function ProjectsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Open a card when arriving with ?project=Name (used by resume links & old sitemap URLs)
  useEffect(() => {
    const project = new URLSearchParams(window.location.search).get("project");
    if (!project) return;
    const idx = projects.findIndex((p) => normalize(p.name) === normalize(project));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL on mount; state must start closed for SSR
    if (idx !== -1) setOpenIndex(idx);
  }, []);

  const close = () => setOpenIndex(null);
  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? null : (i + delta + projects.length) % projects.length));

  // Disable background scroll and handle keyboard nav while the popup is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", openIndex !== null);
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [openIndex]);

  const open = openIndex === null ? null : projects[openIndex];

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 max-sm:grid-cols-1">
        {projects.map((project, idx) => (
          <article key={project.name} className="group cursor-pointer" onClick={() => setOpenIndex(idx)}>
            <Image
              src={project.image}
              alt={project.name}
              width={640}
              height={427}
              className="aspect-[3/2] w-full rounded-[3px] border border-rule object-cover"
            />
            <h3 className="mt-2.5 font-semibold group-hover:underline group-hover:underline-offset-4">
              {project.name}
            </h3>
            <p className="mt-0.5 text-[0.9rem] text-muted">{project.tagline}</p>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          onClick={close}
        >
          <div
            className="flex h-[660px] max-h-[85vh] w-[90vw] max-w-[560px] flex-col rounded-md border border-rule bg-page"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
              <h3 className="font-semibold">{open.name}</h3>
              <button
                aria-label="Close"
                className="cursor-pointer font-mono text-[1.1rem] leading-none text-muted transition-colors hover:text-ink"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <Image
                src={open.image}
                alt={open.name}
                width={700}
                height={467}
                className="mx-auto h-[340px] w-auto max-w-full rounded-[3px] border border-rule object-contain"
              />
              <p
                className="mt-4 text-[0.95rem] leading-[1.7] text-muted"
                dangerouslySetInnerHTML={{ __html: open.descHtml }}
              />
            </div>

            <div className="flex items-center justify-between border-t border-rule px-5 py-3">
              <button aria-label="Previous project" className={pagerButton} onClick={() => step(-1)}>
                ← prev
              </button>
              <span className="font-mono text-[0.85rem] text-muted">
                {(openIndex ?? 0) + 1} / {projects.length}
              </span>
              <button aria-label="Next project" className={pagerButton} onClick={() => step(1)}>
                next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
