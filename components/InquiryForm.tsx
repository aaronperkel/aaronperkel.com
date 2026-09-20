"use client";

import { useEffect, useRef, useState } from "react";
import { budgetOptions, timelineOptions } from "@/data/services";

type Status = "idle" | "sending" | "sent" | "error";

const label = "block font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";

// Inputs stay on the page background with a hairline border, like every other
// rule on the site. Focus rings come from the global :focus-visible rule.
const field =
  "mt-2 w-full rounded-none border border-rule bg-page px-3 py-2 font-serif text-[0.95rem] text-ink";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Bots fill and submit instantly; a real person cannot. Measured from mount
  // rather than build time because this page is prerendered, and set in an
  // effect because reading the clock during render isn't pure.
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsed: mountedAt.current === null ? 0 : Date.now() - mountedAt.current,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong. Please email me instead.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("Couldn’t reach the server. Please email me instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 border border-rule px-4 py-5" role="status">
        Thanks — I got it. I’ll reply within a few days, usually sooner.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input className={field} id="name" name="name" type="text" maxLength={100} required autoComplete="name" />
        </div>

        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input className={field} id="email" name="email" type="email" maxLength={200} required autoComplete="email" />
        </div>

        <div>
          <label className={label} htmlFor="message">
            What are you trying to build?
          </label>
          <textarea
            className={`${field} min-h-40 resize-y`}
            id="message"
            name="message"
            minLength={20}
            maxLength={5000}
            required
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex-1">
            <label className={label} htmlFor="timeline">
              Timeline
            </label>
            <select className={field} id="timeline" name="timeline" defaultValue={timelineOptions[0]}>
              {timelineOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className={label} htmlFor="budget">
              Rough budget
            </label>
            <select className={field} id="budget" name="budget" defaultValue={budgetOptions[0]}>
              {budgetOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="border border-ink bg-ink px-5 py-2 font-mono text-[0.85rem] text-page transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send inquiry"}
          </button>

          <p aria-live="polite" className="font-mono text-[0.8rem] text-muted">
            {status === "error" ? error : ""}
          </p>
        </div>
      </form>

      {/* Always visible, so the page still works with JS off or the API down. */}
      <p className="mt-6 font-mono text-[0.8rem] text-muted">
        Prefer email? <a href="mailto:me@aaronperkel.com">me@aaronperkel.com</a>
      </p>
    </>
  );
}
