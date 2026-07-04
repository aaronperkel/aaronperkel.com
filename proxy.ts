import { NextRequest, NextResponse } from "next/server";

// Serve the plain-text CLI experience (ported from the old Cloudflare Worker)
// when curl/httpie/wget hit these paths; browsers fall through to the app.
const CLI_UA = /curl|httpie|wget/i;

const cliPages: Record<string, string> = {
  "/": "home",
  "/help": "help",
  "/links": "links",
  "/projects": "links",
  "/json": "json",
};

export default function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (!CLI_UA.test(ua)) return NextResponse.next();

  const page = cliPages[req.nextUrl.pathname];
  if (!page) return NextResponse.next();

  return NextResponse.rewrite(new URL(`/cli/${page}`, req.url));
}

export const config = {
  matcher: ["/", "/help", "/links", "/projects", "/json"],
};
