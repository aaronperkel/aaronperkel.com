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
      // Sub-apps that still live on UVM's server (they were proxied by the
      // old Cloudflare Worker; now they redirect to their real home).
      { source: "/checklist/:path*", destination: "https://aperkel.w3.uvm.edu/checklist/:path*", permanent: false },
      { source: "/riley21/:path*", destination: "https://aperkel.w3.uvm.edu/riley21/:path*", permanent: false },
      { source: "/videos/:path*", destination: "https://aperkel.w3.uvm.edu/videos/:path*", permanent: false },
      // The luggage-tag contact card lives at /me; its printed QR code points
      // at the old /me.html, which the rewrite below serves at the clean URL.
      { source: "/me.html", destination: "/me", permanent: true },
    ];
  },
  async rewrites() {
    // The PHP site served assets from /public/img/...; me.html, the web
    // manifest, and any external hotlinks still use those paths.
    return [
      { source: "/public/:path*", destination: "/:path*" },
      // Clean URL for public/me.html (see the /me.html redirect above).
      { source: "/me", destination: "/me.html" },
    ];
  },
};

export default nextConfig;
