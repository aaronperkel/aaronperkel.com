import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Self-hosted from committed files (Fontsource latin-subset woff2) rather than
// next/font/google so builds never depend on reaching Google Fonts.
const plexSerif = localFont({
  variable: "--font-plex-serif",
  src: [
    { path: "../assets/fonts/ibm-plex-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ibm-plex-serif-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  adjustFontFallback: "Times New Roman",
});

const plexMono = localFont({
  variable: "--font-plex-mono",
  src: [
    { path: "../assets/fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

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
    other: [{ rel: "mask-icon", url: "/img/favicon.svg", color: "#0f1a29" }],
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
  // data-scroll-behavior lets Next disable the CSS smooth scrolling (used for
  // in-page anchors) during route transitions, so page changes jump instantly
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plexSerif.variable} ${plexMono.variable}`}
    >
      <body className="mx-auto flex min-h-svh max-w-[44rem] flex-col px-6 font-serif max-md:px-5">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
