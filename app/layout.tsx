import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaronperkel.com"),
  title: "Aaron Perkel – CS Grad and Network Technician",
  description:
    "Computer science grad, network technician, and avgeek blending tech and flight. Check out my projects, resume, & more.",
  icons: {
    icon: [
      { url: "/img/favicon.svg", type: "image/svg+xml" },
      { url: "/img/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/img/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/img/favicon.svg", color: "#1a1a1c" }],
  },
  manifest: "/img/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AP",
    statusBarStyle: "default",
  },
  // og:title/og:description fall back to each page's resolved title/description.
  openGraph: {
    type: "website",
    url: "https://aaronperkel.com",
    siteName: "Aaron Perkel",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161619" },
  ],
};

// Deliberately no street address, birth date, or other PII here — this JSON
// blob is served machine-readable to every scraper. City/state is enough.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Perkel",
  url: "https://aaronperkel.com",
  email: "mailto:me@aaronperkel.com",
  sameAs: [
    "https://github.com/aaronperkel",
    "https://linkedin.com/in/aaronperkel",
    "https://youtube.com/@aaronperkel",
    "https://instagram.com/aaronperkel",
    "https://aperkel.w3.uvm.edu",
  ],
  jobTitle: "Network Technician",
  worksFor: {
    "@type": "Organization",
    name: "University of Vermont",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Vermont",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "VT",
    addressCountry: "US",
  },
  image: "https://aaronperkel.com/img/headshot.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Toolbar />
        <div className="mx-auto w-full max-w-[42rem] flex-1 px-5">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
