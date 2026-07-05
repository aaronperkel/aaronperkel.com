import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ResumePdf from "@/components/ResumePdf";

// /resume.pdf — rendered from data/resume.ts. force-static prerenders it at
// build time, so every deploy ships a PDF in sync with the /resume page
// (this replaced the hand-exported public/resume.pdf in July 2026).
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(createElement(ResumePdf));
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'inline; filename="Aaron-Perkel-Resume.pdf"',
    },
  });
}
