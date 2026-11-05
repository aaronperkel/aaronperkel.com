import { NextRequest, NextResponse } from "next/server";
import { featured, otherProjects } from "@/data/projects";

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

// Old project links were /?project=<Name> (resumes already sent out, indexed
// URLs, the former modal's shareable URLs). Match the name or a former name —
// ignoring case, accents, and the non-breaking spaces the PHP site used — and
// send it to the project's page. Other projects have no page; they anchor
// into /projects. Unknown names land on /projects.
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ /g, " ")
    .trim()
    .toLowerCase();

const matches = (wanted: string) => (p: { name: string; aliases?: string[] }) =>
  [p.name, ...(p.aliases ?? [])].some((n) => normalize(n) === wanted);

function projectRedirect(req: NextRequest) {
  const param = req.nextUrl.searchParams.get("project");
  if (req.nextUrl.pathname !== "/" || param === null) return null;

  const wanted = normalize(param);
  const page = featured.find(matches(wanted));
  const other = page ? undefined : otherProjects.find(matches(wanted));

  const url = req.nextUrl.clone();
  url.search = "";
  url.pathname = page ? `/projects/${page.slug}` : "/projects";
  url.hash = other ? other.slug : "";
  return NextResponse.redirect(url, 308);
}

export default function proxy(req: NextRequest) {
  const redirect = projectRedirect(req);
  if (redirect) return redirect;

  const ua = req.headers.get("user-agent") || "";
  if (!CLI_UA.test(ua)) return NextResponse.next();

  const page = cliPages[req.nextUrl.pathname];
  if (!page) return NextResponse.next();

  return NextResponse.rewrite(new URL(`/cli/${page}`, req.url));
}

export const config = {
  matcher: ["/", "/help", "/links", "/projects", "/json"],
};
