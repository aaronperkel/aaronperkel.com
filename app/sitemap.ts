import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aaronperkel.com";

  // Canonical URLs only — the /?project= deep links serve HTML identical to /
  // (the popup opens client-side), so listing them just creates duplicate noise.
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/resume`, priority: 0.8 },
  ];
}
