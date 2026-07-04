import { vcard } from "@/data/cli";

// Downloadable contact card (available to browsers and CLI alike).
export function GET() {
  return new Response(vcard, {
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": 'attachment; filename="Aaron-Perkel.vcf"',
    },
  });
}
