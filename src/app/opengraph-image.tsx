import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Bereket Kinfe — Software Engineer";

export default async function OpenGraphImage() {
  let avatarDataUrl = "";
  try {
    const avatarPath = path.join(
      process.cwd(),
      "public",
      "android-chrome-512x512.png",
    );
    if (fs.existsSync(avatarPath)) {
      const buffer = fs.readFileSync(avatarPath);
      avatarDataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
    }
  } catch (error) {
    console.error("Failed to load avatar for OG image:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#121211",
          backgroundImage:
            "radial-gradient(circle at 90% 15%, rgba(201, 75, 50, 0.18) 0%, transparent 60%), radial-gradient(circle at 10% 85%, rgba(201, 75, 50, 0.08) 0%, transparent 50%)",
          padding: "52px 64px",
          color: "#ECE8E0",
          fontFamily: "sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle grid border frame */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(236, 232, 224, 0.08)",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "1px solid rgba(236, 232, 224, 0.12)",
            paddingBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#C94B32",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "#C94B32",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              BEREKET KINFE // PORTFOLIO
            </span>
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#848077",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ADDIS ABABA (UTC+3) &bull; REMOTE WORLDWIDE
          </span>
        </div>

        {/* Center Main Stage (Text Left, Framed Avatar Right) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
            margin: "auto 0",
          }}
        >
          {/* Left Column (Hero Content) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "680px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#A6A299",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span>[01] // FULL-STACK &amp; AI SYSTEMS ARCHITECTURE</span>
            </div>

            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ECE8E0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>I BUILD SYSTEMS,</span>
              <span style={{ color: "#C94B32" }}>NOT JUST INTERFACES.</span>
            </div>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                color: "#A6A299",
                margin: "4px 0 0 0",
              }}
            >
              Software engineer specializing in high-concurrency frontend
              architecture, real-time voice streaming pipelines, and enterprise
              data systems.
            </p>

            {/* Tech Stack Badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              {["Next.js", "React 19", "TypeScript", "Tailwind", "GSAP", "AI Systems"].map(
                (tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "rgba(236, 232, 224, 0.05)",
                      border: "1px solid rgba(236, 232, 224, 0.12)",
                      borderRadius: "3px",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: "#ECE8E0",
                    }}
                  >
                    {tag}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right Column (Framed Avatar) */}
          {avatarDataUrl ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px",
                backgroundColor: "#181816",
                border: "1px solid #3F3E3A",
                borderRadius: "8px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarDataUrl}
                alt="Bereket Kinfe"
                width={220}
                height={220}
                style={{
                  borderRadius: "4px",
                  objectFit: "cover",
                  filter: "grayscale(100%) contrast(105%)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "10px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#A6A299",
                  letterSpacing: "0.08em",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#C94B32",
                  }}
                />
                <span>BEREKET KINFE</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(236, 232, 224, 0.12)",
            paddingTop: "18px",
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#6E6B63",
          }}
        >
          <span>github.com/Bekione &bull; linkedin.com/in/bereket-k</span>
          <span style={{ color: "#C94B32", fontWeight: 600 }}>
            BUILT WITH CURIOSITY // SHIPPED WITH INTENT.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
