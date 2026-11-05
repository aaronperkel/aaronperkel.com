import type { MetadataRoute } from "next";
import { featured } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aaronperkel.com";

  // Canonical URLs only — the old /?project= deep links are redirects now.
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/resume`, priority: 0.8 },
    { url: `${base}/projects`, priority: 0.9 },
    ...featured.map((project) => ({ url: `${base}/projects/${project.slug}`, priority: 0.8 })),
    { url: `${base}/contact`, priority: 0.7 },
  ];
}
