"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error("GlobalError:", error);
  return (
    <html>
      <body style={{ fontFamily: "ui-sans-serif, system-ui", padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Something went wrong</h1>
        <p>Please try again. Ref: {error.digest ?? "n/a"}</p>
        <button onClick={reset} style={{ marginTop: 12, padding: "8px 12px", border: "1px solid #000" }}>
          Retry
        </button>
      </body>
    </html>
  );
}