"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";

// Match the old behavior: normalize NBSP so ?project=Blob Kart matches names
// containing non-breaking spaces.
const normalize = (s: string) => s.replace(/ /g, " ").trim();

// Keep the resume's /?project=<Name> deep links pointing at whatever is open.
const syncUrl = (name: string | null) => {
  window.history.replaceState(null, "", name ? `/?project=${encodeURIComponent(name)}` : "/");
};

function Chevron() {
  return (
    <svg
      viewBox="0 0 8 12"
      width="8"
      height="12"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[0.4rem] shrink-0 text-accent transition-transform duration-150 group-open:rotate-90 motion-reduce:transition-none"
    >
      <path d="M1.5 1.5 6.5 6l-5 4.5" />
    </svg>
  );
}

const featured = projects.filter((project) => project.featured !== false);

export default function WorkList() {
  const listRef = useRef<HTMLDivElement>(null);
  // A deep link may name a project that is not on the home list; it gets
  // appended for that visit rather than 404-ing silently.
  const [guest, setGuest] = useState<Project | null>(null);
  const [wanted, setWanted] = useState<string | null>(null);
  const rows = useMemo(() => (guest ? [...featured, guest] : featured), [guest]);

  // Arriving at /?project=Name (resume links, old indexed URLs).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("project");
    if (!param) return;
    const match = projects.find((p) => normalize(p.name) === normalize(param));
    if (!match) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL on mount; rows must start closed for SSR
    if (match.featured === false) setGuest(match);
    setWanted(match.name);
  }, []);

  // Runs after the guest row (if any) has rendered.
  useEffect(() => {
    if (!wanted) return;
    const idx = rows.findIndex((project) => project.name === wanted);
    const row = idx === -1 ? null : listRef.current?.querySelectorAll("details")[idx];
    if (!row) return;
    row.open = true;
    row.scrollIntoView({ block: "center", behavior: "auto" });
  }, [wanted, rows]);

  const onToggle = (name: string) => (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open) return syncUrl(name);
    const stillOpen = listRef.current?.querySelector("details[open] [data-project]");
    syncUrl(stillOpen?.getAttribute("data-project") ?? null);
  };

  return (
    <div ref={listRef} className="border-t border-line">
      {rows.map((project) => (
        <details
          key={project.name}
          className="group border-b border-line"
          onToggle={onToggle(project.name)}
        >
          <summary className="-mx-2 flex cursor-pointer list-none items-start gap-2.5 rounded-[4px] px-2 py-3 hover:bg-raise [&::-webkit-details-marker]:hidden">
            <Chevron />
            <span className="min-w-0 flex-1" data-project={project.name}>
              <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[0.9375rem] font-semibold">
                  {project.name}
                  {/* State said in type, never a coloured badge. */}
                  {project.site && (
                    <span className="ml-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.06em] text-ink-2">
                      live
                    </span>
                  )}
                </span>
                <span className="font-mono text-[0.75rem] text-ink-2">
                  {project.stack.join(" · ")}
                </span>
              </span>
              <span className="mt-0.5 block text-[0.875rem] text-ink-2">{project.tagline}</span>
            </span>
          </summary>

          <div className="pb-4 pl-[1.375rem]">
            <p
              className="max-w-[60ch] text-[0.875rem] leading-[1.6] text-ink-2"
              dangerouslySetInnerHTML={{ __html: project.descHtml }}
            />
            {(project.site || project.repo) && (
              <p className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem]">
                {project.site && <a href={project.site}>Visit site</a>}
                {project.repo && <a href={project.repo}>Source</a>}
              </p>
            )}
            <Image
              src={project.image}
              alt={project.name}
              width={700}
              height={467}
              sizes="(max-width: 640px) 90vw, 620px"
              className="mt-3.5 max-h-[300px] w-auto max-w-full rounded-[4px] border border-line object-contain"
            />
          </div>
        </details>
      ))}
    </div>
  );
}
