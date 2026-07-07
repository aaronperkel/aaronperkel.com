import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // me.html (the luggage-tag contact card) opts out via its own noindex meta
  // tag — a Disallow here would stop crawlers from ever seeing that tag.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://aaronperkel.com/sitemap.xml",
  };
}
