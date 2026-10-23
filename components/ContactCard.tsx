"use client";

import { useEffect, useState } from "react";
import { contact, foundMailto, fullAddress, mapsUrl, phoneDigits } from "@/data/contact";

// Bordered, square, mono — the same vocabulary as the inquiry form's inputs
// and submit button, so this page reads as part of the site rather than a
// standalone widget. Filled ("primary") is reserved for the one action that
// matters most to someone holding a lost bag: calling.
const button =
  "inline-flex items-center justify-center border border-rule bg-page px-3 py-2 font-mono text-[0.85rem] text-ink no-underline transition-colors hover:border-ink disabled:opacity-50";
const primary =
  "inline-flex items-center justify-center border border-ink bg-ink px-3 py-2 font-mono text-[0.85rem] text-page no-underline transition-opacity hover:opacity-80";
const sectionLabel =
  "mb-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";

const rows = [
  { label: "Phone", value: contact.phone, href: `tel:${phoneDigits}` },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Address", value: fullAddress, href: mapsUrl },
];

function useFlash() {
  const [key, setKey] = useState<string | null>(null);
  useEffect(() => {
    if (key === null) return;
    const t = setTimeout(() => setKey(null), 1200);
    return () => clearTimeout(t);
  }, [key]);
  return [key, setKey] as const;
}

export default function ContactCard() {
  const [copied, setCopied] = useFlash();

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
    } catch {
      setCopied(null);
    }
  }

  async function share() {
    // Desktop browsers mostly lack the share sheet; copying is the next best thing.
    if (typeof navigator.share !== "function") {
      return copy("all", [contact.name, contact.phone, contact.email, fullAddress].join("\n"));
    }
    try {
      await navigator.share({
        title: `Contact ${contact.name}`,
        text: `${contact.name} — ${contact.phone}\n${contact.email}\n${fullAddress}`,
        url: location.href,
      });
    } catch {
      // The person dismissed the share sheet; nothing to do.
    }
  }

  function downloadVcf() {
    // Built here rather than linking /vcard because this card includes the
    // mailing address, which the site-wide .vcf intentionally omits.
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${contact.lastName};${contact.firstName};;;`,
      `FN:${contact.name}`,
      `TEL;TYPE=CELL,VOICE:${phoneDigits}`,
      `EMAIL;TYPE=INTERNET:${contact.email}`,
      `ADR;TYPE=HOME:;;${contact.street};${contact.city};${contact.region};${contact.postal};${contact.country}`,
      "URL:https://aaronperkel.com",
      "END:VCARD",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Aaron-Perkel.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  return (
    <>
      <section className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <a className={primary} href={`tel:${phoneDigits}`}>
          Call
        </a>
        <a className={button} href={`sms:${phoneDigits}`}>
          Text
        </a>
        <a className={button} href={`mailto:${contact.email}`}>
          Email
        </a>
        <a className={button} href={mapsUrl} target="_blank" rel="noopener">
          Directions
        </a>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Details</h2>
        <dl className="border-t border-rule">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-3"
            >
              <dt className="w-16 shrink-0 font-mono text-[0.8rem] text-muted">{row.label}</dt>
              <dd className="min-w-0 flex-1 break-words">
                <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                  {row.value}
                </a>
              </dd>
              <button
                type="button"
                onClick={() => copy(row.label, row.value)}
                className="font-mono text-[0.8rem] text-muted hover:text-ink hover:underline"
                aria-label={`Copy ${row.label.toLowerCase()}`}
              >
                {copied === row.label ? "copied" : "copy"}
              </button>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Save or share</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button type="button" className={button} onClick={downloadVcf}>
            Add to contacts
          </button>
          <button
            type="button"
            className={button}
            onClick={() =>
              copy("all", [contact.name, contact.phone, contact.email, fullAddress].join("\n"))
            }
          >
            {copied === "all" ? "Copied" : "Copy all"}
          </button>
          <button type="button" className={button} onClick={share}>
            Share
          </button>
          <a className={button} href={foundMailto}>
            Found this?
          </a>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Copied to clipboard" : ""}
        </p>
      </section>
    </>
  );
}
