"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const msg = error?.message ?? "";
    const isChunkError =
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("Loading CSS chunk") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("Importing a module script failed");

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#F7FAFC",
          color: "#1A202C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: "#fff",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 900,
              margin: "0 0 12px",
              color: "#2D3748",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#4A5568",
              lineHeight: 1.6,
              margin: "0 0 28px",
            }}
          >
            Please refresh the page. If the problem continues, call us on{" "}
            <a
              href="tel:1300572464"
              style={{ color: "#5A67D8", fontWeight: 700 }}
            >
              1300 572 464
            </a>
            .
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                background: "#ABB3F1",
                color: "#1A202C",
                fontWeight: 700,
                padding: "12px 24px",
                border: "none",
                borderRadius: 999,
                cursor: "pointer",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#2D3748",
                fontWeight: 700,
                padding: "12px 24px",
                border: "1px solid #E2E8F0",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
