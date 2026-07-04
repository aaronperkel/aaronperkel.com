import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old PHP-era URLs that may still be indexed or bookmarked.
    // Query strings (e.g. /index.php?project=X) are carried over automatically.
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/resume.php", destination: "/resume", permanent: true },
      { source: "/generate_resume_pdf.php", destination: "/resume.pdf", permanent: true },
    ];
  },
  async rewrites() {
    // The PHP site served assets from /public/img/...; me.html, the web
    // manifest, and any external hotlinks still use those paths.
    return [{ source: "/public/:path*", destination: "/:path*" }];
  },
};

export default nextConfig;
