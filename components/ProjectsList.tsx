"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

// Match the old behavior: normalize NBSP so ?project=Blob Kart matches names
// containing non-breaking spaces.
const normalize = (s: string) => s.replace(/ /g, " ").trim();

// Keep the resume's /?project=<Name> deep links pointing at whatever is open,
// so an expanded entry can be shared and a collapsed page doesn't reopen.
const syncUrl = (name: string | null) => {
  window.history.replaceState(null, "", name ? `/?project=${encodeURIComponent(name)}` : "/");
};

export default function ProjectsList() {
  const listRef = useRef<HTMLDivElement>(null);

  // Arriving at /?project=Name (resume links, old indexed URLs) opens that
  // entry in place and brings it into view — no modal to dismiss.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("project");
    if (!wanted) return;
    const idx = projects.findIndex((p) => normalize(p.name) === normalize(wanted));
    if (idx === -1) return;
    const entry = listRef.current?.querySelectorAll("details")[idx];
    if (!entry) return;
    entry.open = true;
    // Explicitly instant: the document sets scroll-behavior: smooth for
    // in-page anchors, and a page that slides on load is a different thing.
    entry.scrollIntoView({ block: "center", behavior: "auto" });
  }, []);

  const onToggle = (name: string) => (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open) return syncUrl(name);
    // Closing: fall back to whichever entry is still open, if any.
    const stillOpen = listRef.current?.querySelector("details[open] [data-project]");
    syncUrl(stillOpen?.getAttribute("data-project") ?? null);
  };

  return (
    <div ref={listRef} className="border-t border-rule">
      {projects.map((project) => (
        <details
          key={project.name}
          className="group border-b border-rule py-4"
          onToggle={onToggle(project.name)}
        >
          <summary className="grid cursor-pointer list-none grid-cols-[1.25rem_1fr] items-baseline gap-x-2 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden
              className="select-none font-mono text-[0.85rem] text-muted transition-colors group-hover:text-ink"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
            <span data-project={project.name}>
              <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">
                  {project.name}
                </span>
                <span className="font-mono text-[0.8rem] text-muted">
                  {project.stack.join(" · ")}
                </span>
              </span>
              <span className="mt-0.5 block text-[0.95rem] text-muted">{project.tagline}</span>
            </span>
          </summary>

          <div className="mt-3 pl-[1.75rem]">
            <p
              className="text-[0.95rem] leading-[1.7] text-muted"
              dangerouslySetInnerHTML={{ __html: project.descHtml }}
            />
            <Image
              src={project.image}
              alt={project.name}
              width={700}
              height={467}
              sizes="(max-width: 640px) 90vw, 560px"
              className="mt-4 h-[280px] w-auto max-w-full rounded-[3px] border border-rule object-contain"
            />
          </div>
        </details>
      ))}
    </div>
  );
}
