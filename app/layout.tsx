import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Coleman Perkel",
  url: "https://aaronperkel.com",
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
    streetAddress: "77 N Union St #3",
    addressLocality: "Burlington",
    addressRegion: "VT",
    postalCode: "05401",
    addressCountry: "US",
  },
  birthPlace: "Richmond, VA",
  birthDate: "2003-11-11",
  gender: "Male",
  image: "https://aaronperkel.com/img/headshot.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSerif.variable} ${plexMono.variable}`}>
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
