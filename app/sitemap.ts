import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aaronperkel.com";

  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/resume`, priority: 0.8 },
    { url: `${base}/?project=UVM%20Sublets`, priority: 0.64 },
    { url: `${base}/?project=Utility%20Manager`, priority: 0.64 },
    { url: `${base}/?project=Blob%20Kart`, priority: 0.64 },
  ];
}
