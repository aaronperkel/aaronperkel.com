import type { Metadata } from "next";
import { identity } from "@/data/identity";

// A page's `openGraph` replaces the layout's wholesale (Next merges metadata
// shallowly), so every page builds its block here: shared fields plus its own
// og:url. og:title/og:description still fall back to the page's title and
// description. Overriding openGraph also drops the image inherited from
// app/opengraph-image.tsx, so it's listed here explicitly (same size/alt).
export const openGraph = (path: string): NonNullable<Metadata["openGraph"]> => ({
  type: "website",
  siteName: identity.name,
  url: path,
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${identity.name} — ${identity.role.toLowerCase()}`,
    },
  ],
});
