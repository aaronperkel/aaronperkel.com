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
    ];
  },
  async rewrites() {
    // The PHP site served assets from /public/img/...; me.html, the web
    // manifest, and any external hotlinks still use those paths.
    return [{ source: "/public/:path*", destination: "/:path*" }];
  },
};

export default nextConfig;
