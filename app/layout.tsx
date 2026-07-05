import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
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
    other: [{ rel: "mask-icon", url: "/img/favicon.svg", color: "#58a6ff" }],
  },
  manifest: "/img/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AP",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1A29",
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
    <html lang="en" className={inter.variable}>
      <body className="mx-auto my-8 max-w-[80%] px-4 font-sans max-md:m-4 max-md:max-w-full max-md:px-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script src="https://kit.fontawesome.com/c428e5511d.js" crossOrigin="anonymous" />
        <Header />
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
