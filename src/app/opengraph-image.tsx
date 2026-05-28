import { ImageResponse } from "next/og";

import { siteMetadata } from "@/lib/data/site";

export const alt = siteMetadata.description;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #262626 100%)",
          color: "#fafafa",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7, marginBottom: 24, display: "flex" }}>
          {siteMetadata.title}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: -1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>AI で開発プロセス自体を</span>
          <span>設計するエンジニア</span>
        </div>
        <div style={{ fontSize: 28, opacity: 0.6, marginTop: 32, display: "flex" }}>
          {siteMetadata.url}
        </div>
      </div>
    ),
    size,
  );
}
