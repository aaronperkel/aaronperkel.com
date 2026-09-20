// The one dynamic route on the site — everything else is force-static GET.
// Takes the /services inquiry form and mails it via Resend's REST API (plain
// fetch, so no extra dependency).
import { budgetOptions, timelineOptions } from "@/data/services";

export const runtime = "nodejs";

// Sender lives on the Resend-verified domain; replies go to the real inbox.
const FROM = "Aaron Perkel <hello@aaronperkel.com>";
const TO = "me@aaronperkel.com";

const MAX_BODY_BYTES = 20_000;
const MIN_ELAPSED_MS = 3_000;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Log the provider's reason here; never hand it back to the browser.
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured." }, { status: 500 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ error: "That message is too long." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  // Spam guards. Both return 200 so a bot learns nothing from the response.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if (str("company") || elapsed < MIN_ELAPSED_MS) {
    return Response.json({ ok: true });
  }

  const name = str("name");
  const email = str("email");
  const message = str("message");
  const timeline = str("timeline");
  const budget = str("budget");

  if (!name || name.length > 100) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 20 || message.length > 5000) {
    return Response.json(
      { error: "Please describe the project in at least 20 characters." },
      { status: 400 },
    );
  }
  if (!(timelineOptions as readonly string[]).includes(timeline)) {
    return Response.json({ error: "Invalid timeline." }, { status: 400 });
  }
  if (!(budgetOptions as readonly string[]).includes(budget)) {
    return Response.json({ error: "Invalid budget." }, { status: 400 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Timeline", timeline],
    ["Budget", budget],
  ]
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`)
    .join("");

  try {
    await sendEmail({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `Inquiry — ${name}`,
      html: `${rows}<hr><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    // The inquiry is in. A failed auto-reply is a courtesy lost, not a lost
    // lead, so it must never turn a delivered inquiry into an error.
    try {
      await sendEmail({
        from: FROM,
        to: email,
        reply_to: TO,
        subject: "Thanks for reaching out",
        html:
          `<p>Hi ${escapeHtml(name.split(" ")[0])},</p>` +
          `<p>Thanks for getting in touch — I got your note and I'll reply within a few days, usually sooner.</p>` +
          `<p>For reference, here's what you sent:</p>` +
          `<blockquote style="white-space:pre-wrap;border-left:2px solid #e4e4e4;padding-left:12px;color:#6f6f6f">${escapeHtml(message)}</blockquote>` +
          `<p>— Aaron<br>Aaron Perkel LLC</p>`,
      });
    } catch (err) {
      console.error("Auto-reply failed (inquiry was delivered):", err);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return Response.json({ error: "Couldn’t send that. Please email me instead." }, { status: 500 });
  }
}
