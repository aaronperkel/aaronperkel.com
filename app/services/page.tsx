import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Aaron Perkel – Services",
  description:
    "Freelance web and software development through Aaron Perkel LLC — custom web apps, business sites and storefronts, Stripe payments, and automation for small businesses and organizations.",
  alternates: { canonical: "/services" },
};

const sectionLabel =
  "mb-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.15em] text-muted";
const dashLi =
  "relative mb-2 pl-5 before:absolute before:left-0 before:text-muted before:content-['–']";

// Same PII posture as the Person schema in app/layout.tsx: city/state only.
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aaron Perkel LLC",
  url: "https://aaronperkel.com/services",
  email: "mailto:me@aaronperkel.com",
  founder: { "@type": "Person", name: "Aaron Perkel" },
  areaServed: "US",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "VT",
    addressCountry: "US",
  },
  serviceType: servicesData.build.map((item) => item.title),
};

export default function Services() {
  return (
    <main className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      <h1 className="text-[2rem] font-semibold leading-tight">{servicesData.pageTitle}</h1>
      <p className="mt-4 max-w-[38rem]">{servicesData.intro}</p>
      <p className="mt-4 max-w-[38rem] font-mono text-[0.85rem] text-muted">
        {servicesData.availability}
      </p>

      <section className="mt-10">
        <h2 className={sectionLabel}>What I build</h2>
        {servicesData.build.map((item) => (
          <article key={item.title} className="mb-5">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-[0.95rem] text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>How I work</h2>
        <ul>
          {servicesData.process.map((step, i) => (
            <li key={i} className={dashLi}>
              {step}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionLabel}>Recent work</h2>
        <p dangerouslySetInnerHTML={{ __html: servicesData.proofHtml }} />
        <p className="mt-3 font-mono text-[0.85rem]">
          <Link href="/">See more of what I’ve built →</Link>
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-10">
        <h2 className={sectionLabel}>Get in touch</h2>
        <p className="max-w-[38rem]">{servicesData.formIntro}</p>
        <InquiryForm />
      </section>
    </main>
  );
}
