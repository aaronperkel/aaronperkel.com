"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

// Match the old main.js behavior: normalize NBSP so ?project=Blob Kart
// matches names containing non-breaking spaces.
const normalize = (s: string) => s.replace(/ /g, " ").trim();

// Generous hit areas (padding offset by negative margin) without changing the
// visual design — the bare glyphs alone are well under the 24px WCAG minimum.
const pagerButton =
  "-m-3 cursor-pointer p-3 font-mono text-[0.85rem] text-muted transition-colors hover:text-ink";

// Keep the resume's /?project=<Name> deep links in sync with the popup so a
// closed popup doesn't reopen on refresh and an open one can be shared.
const syncUrl = (idx: number | null) => {
  const url = idx === null ? "/" : `/?project=${encodeURIComponent(projects[idx].name)}`;
  window.history.replaceState(null, "", url);
};

export default function ProjectsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open a card when arriving with ?project=Name (used by resume links & old sitemap URLs)
  useEffect(() => {
    const project = new URLSearchParams(window.location.search).get("project");
    if (!project) return;
    const idx = projects.findIndex((p) => normalize(p.name) === normalize(project));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL on mount; state must start closed for SSR
    if (idx !== -1) setOpenIndex(idx);
  }, []);

  const openAt = (idx: number) => {
    setOpenIndex(idx);
    syncUrl(idx);
  };

  const step = (delta: number) => {
    if (openIndex === null) return;
    const next = (openIndex + delta + projects.length) % projects.length;
    setOpenIndex(next);
    syncUrl(next);
  };

  // The native <dialog> handles focus (trap in, restore on close), Escape,
  // and inert background; we only open it and lock body scroll.
  useEffect(() => {
    if (openIndex !== null && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
      // showModal() focuses the close button, drawing a focus ring on every
      // open; park focus on the dialog itself instead (Tab still reaches the
      // button, and keyboard users keep their focus-visible ring).
      dialogRef.current?.focus();
    }
    document.body.classList.toggle("overflow-hidden", openIndex !== null);
    return () => document.body.classList.remove("overflow-hidden");
  }, [openIndex]);

  const open = openIndex === null ? null : projects[openIndex];

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 max-sm:grid-cols-1">
        {projects.map((project, idx) => (
          <article key={project.name} className="group relative">
            <Image
              src={project.image}
              alt=""
              width={640}
              height={427}
              sizes="(max-width: 640px) 100vw, 316px"
              className="aspect-[3/2] w-full rounded-[3px] border border-rule object-cover"
            />
            <h3 className="mt-2.5 font-semibold group-hover:underline group-hover:underline-offset-4">
              {/* Stretched button: keyboard/AT access with the whole card clickable */}
              <button
                type="button"
                className="cursor-pointer text-left after:absolute after:inset-0"
                onClick={() => openAt(idx)}
              >
                {project.name}
              </button>
            </h3>
            <p className="mt-0.5 text-[0.9rem] text-muted">{project.tagline}</p>
          </article>
        ))}
      </div>

      {open && (
        <dialog
          ref={dialogRef}
          tabIndex={-1}
          aria-label={open.name}
          className="m-auto hidden h-[660px] max-h-[85vh] w-[90vw] max-w-[560px] flex-col rounded-md border border-rule bg-page text-ink outline-none backdrop:bg-black/50 backdrop:backdrop-blur-[2px] open:flex"
          onClose={() => {
            setOpenIndex(null);
            syncUrl(null);
          }}
          onClick={(e) => {
            // Only the ::backdrop registers the dialog itself as the target
            if (e.target === dialogRef.current) dialogRef.current?.close();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
          }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
            <h3 className="font-semibold">{open.name}</h3>
            <button
              aria-label="Close"
              className="-m-3 cursor-pointer p-3 font-mono text-[1.1rem] leading-none text-muted transition-colors hover:text-ink"
              onClick={() => dialogRef.current?.close()}
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
              sizes="(max-width: 640px) 90vw, 510px"
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
        </dialog>
      )}
    </>
  );
}
