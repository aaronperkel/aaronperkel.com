import { headerTxt, landing, linksTxt, helpTxt, cliJson } from "@/data/cli";

const text = (body: string, type = "text/plain; charset=utf-8") =>
  new Response(body, {
    headers: { "content-type": type, "x-aaron-cli": "1" },
  });

export async function GET(_req: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  switch (page) {
    case "home":
      return text(`${headerTxt}\n\n${landing}\n`);
    case "help":
      return text(helpTxt + "\n");
    case "links":
      return text(linksTxt + "\n");
    case "json":
      return text(JSON.stringify(cliJson), "application/json; charset=utf-8");
    default:
      return new Response("Not found\n", { status: 404 });
  }
}
