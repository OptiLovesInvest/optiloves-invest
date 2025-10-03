"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function GlobalBuyButton() {
  const pathname = usePathname();
  const show = typeof pathname === "string" && pathname.startsWith("/property/");
  const [busy, setBusy] = React.useState(false);
  if (!show) return null;

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    try {
      const w = typeof window !== "undefined" ? window : undefined as any;
      const slug = (w?.location?.pathname?.split("/")?.filter(Boolean)?.pop()) || "kin-001";
      const owner =
        (w?.solana?.publicKey?.toString?.() ?? w?.localStorage?.getItem?.("owner")) || null;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ property_id: slug, quantity: 1, ...(owner ? { owner } : {}) }),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.url) {
        w.location.href = data.url; return;
      }
      if (res.status === 400) { w.location.href = "/thank-you"; return; }
      alert("Checkout failed");
    } finally { setBusy(false); }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      style={{
        position: "fixed", right: "16px", bottom: "16px",
        padding: "12px 18px", borderRadius: "9999px",
        fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        background: "#111", color: "#fff", zIndex: 2147483647,
        cursor: busy ? "wait" : "pointer",
      }}
    >
      {busy ? "Processing…" : "Buy"}
    </button>
  );
}