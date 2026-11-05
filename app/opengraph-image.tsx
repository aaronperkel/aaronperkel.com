import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "@/data/identity";

// Social-preview card, generated at build time in the site's text-on-a-page
// style. Fonts are the OFL-licensed IBM Plex TTFs committed in assets/fonts
// (ImageResponse/satori can't consume the woff2 files next/font uses).

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${identity.name} — ${identity.role.toLowerCase()}`;

export default async function OpengraphImage() {
  const [plexSerif, plexMono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/IBMPlexSerif-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/IBMPlexMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#ffffff",
          color: "#171717",
          fontFamily: "IBM Plex Serif",
        }}
      >
        <div
          style={{
            width: 120,
            borderTop: "3px solid #171717",
            marginBottom: 48,
          }}
        />
        <div style={{ fontSize: 84, lineHeight: 1.1 }}>{identity.name}</div>
        <div style={{ marginTop: 24, fontSize: 40 }}>{identity.role}</div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#6f6f6f",
            fontFamily: "IBM Plex Mono",
          }}
        >
          {identity.stack.join(" · ")}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            color: "#6f6f6f",
            fontFamily: "IBM Plex Mono",
          }}
        >
          $ curl aaronperkel.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Serif", data: plexSerif, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono, weight: 400, style: "normal" },
      ],
    }
  );
}
