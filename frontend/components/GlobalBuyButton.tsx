"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function GlobalBuyButton() {
  const pathname = usePathname();
  if (!pathname || !pathname.startsWith("/property/")) return null;

  const [busy, setBusy] = useState(false);

  async function onBuy() {
    setBusy(true);
    try {
      const slug = pathname.split("/").pop() || "kin-001";
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ property_id: slug, quantity: 1 }),
      });
      const data = await r.json().catch(() => ({} as any));
      if (data?.url) window.location.assign(data.url); else alert(JSON.stringify(data));
    } finally { setBusy(false); }
  }

  return (
    <button onClick={onBuy} disabled={busy}
      style={{
        position:"fixed", right:"24px", bottom:"24px",
        padding:"12px 18px", borderRadius:"9999px",
        fontWeight:700, border:"none", cursor:"pointer",
        boxShadow:"0 8px 24px rgba(0,0,0,0.15)",
        zIndex:2147483647, background:"#111", color:"#fff"
      }}>
      {busy ? "Processing…" : "Buy"}
    </button>
  );
}