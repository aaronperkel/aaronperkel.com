import { ImageResponse } from "next/og";

// Social-preview card, generated at build time. Deliberately no font files:
// this world loads none, so the card takes next/og's default UI sans rather
// than shipping a display face the site itself does not use.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aaron Perkel — network technician and software engineer";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          backgroundColor: "#ffffff",
          color: "#1a1a1c",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Aaron Perkel
          </div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#5c5c61" }}>
            Network technician and software engineer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid #d7d7dc",
            fontSize: 26,
            color: "#5c5c61",
          }}
        >
          <div>aaronperkel.com</div>
          <div>Burlington, Vermont</div>
        </div>
      </div>
    ),
    size
  );
}
