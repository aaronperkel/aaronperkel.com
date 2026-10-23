import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";
import { contact } from "@/data/contact";

// Reached from the QR code printed on a luggage tag. It shows a phone number
// and street address, so it stays out of search results and the sitemap.
export const metadata: Metadata = {
  title: "Aaron Perkel – Contact",
  description: "Tap to call, text, email, or get directions.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/me" },
};

export default function Me() {
  return (
    <main className="py-14">
      <p className="font-mono text-[0.85rem] text-muted">Contact card</p>
      <h1 className="mt-2 text-[2rem] font-semibold leading-tight">{contact.name}</h1>
      <p className="mt-4 max-w-[38rem]">{contact.tagline}</p>
      <ContactCard />
    </main>
  );
}
