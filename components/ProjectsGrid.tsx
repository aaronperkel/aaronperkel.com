"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

// Match the old main.js behavior: normalize NBSP so ?project=Blob Kart
// matches names containing non-breaking spaces.
const normalize = (s: string) => s.replace(/ /g, " ").trim();

const popupNavButton =
  "fixed top-1/2 z-[1001] flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-[rgba(40,58,80,0.7)] text-[1.8rem] text-primary transition-[background,scale] hover:bg-[rgba(50,72,99,0.9)] hover:scale-110 active:scale-95 max-md:top-auto max-md:bottom-4 max-md:h-12 max-md:w-12 max-md:translate-y-0 max-md:text-2xl";

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

  // Disable background scroll while the popup is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", openIndex !== null);
    return () => document.body.classList.remove("overflow-hidden");
  }, [openIndex]);

  const close = () => setOpenIndex(null);
  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? null : (i + delta + projects.length) % projects.length));

  const open = openIndex === null ? null : projects[openIndex];

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {projects.map((project, idx) => (
          <article
            key={project.name}
            onClick={() => setOpenIndex(idx)}
            className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-panel shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
          >
            <Image
              src={project.image}
              alt={project.name}
              width={600}
              height={200}
              className="h-[200px] w-full object-cover"
            />
            <h3 className="mt-auto p-4 text-center text-[1.1rem]">{project.name}</h3>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/[0.88] p-4"
          onClick={close}
        >
          <button
            aria-label="Previous project"
            className={`${popupNavButton} left-4 min-[800px]:left-[calc(50%-350px-4rem)]`}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <i className="fa-solid fa-caret-left"></i>
          </button>

          <div
            className="relative max-h-[90vh] w-[90vw] max-w-[700px] overflow-y-auto rounded-xl bg-panel p-8 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              className="absolute top-0 right-0 h-8 w-8 cursor-pointer text-center text-[1.2rem] leading-8 text-muted transition-[rotate,scale,color] duration-[250ms] hover:rotate-90 hover:scale-125 hover:text-accent active:scale-100"
              onClick={close}
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <Image
              src={open.image}
              alt={open.name}
              width={700}
              height={400}
              className="mx-auto mb-4 block w-full max-h-[60vh] rounded-lg object-contain"
            />
            <div className="mt-4 leading-[1.7] text-muted">
              <h3 className="mb-3 text-primary">{open.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: open.descHtml }} />
            </div>
          </div>

          <button
            aria-label="Next project"
            className={`${popupNavButton} right-4 min-[800px]:right-[calc(50%-350px-4rem)]`}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
