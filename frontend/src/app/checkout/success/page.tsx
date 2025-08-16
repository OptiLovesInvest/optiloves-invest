"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");

  return (
    <main style={{ maxWidth: 720, margin: "48px auto", fontFamily: "system-ui", lineHeight: 1.5 }}>
      <h1>✅ Payment received</h1>
      <p>Thanks! We’re confirming your payment and updating your order.</p>
      {sessionId && (
        <p style={{ color: "#666" }}>
          Session ID: <code>{sessionId}</code>
        </p>
      )}
      <a href="/properties" style={{ display: "inline-block", marginTop: 16 }}>
        Back to properties
      </a>
    </main>
  );
}
