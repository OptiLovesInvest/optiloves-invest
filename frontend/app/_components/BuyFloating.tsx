"use client";
import React, { useState } from "react";

export default function BuyFloating() {
  const [busy, setBusy] = useState(false);

  async function handleBuy() {
    try {
      setBusy(true);
      const slug = typeof window !== "undefined"
        ? (window.location.pathname.split("/").pop() || "kin-001")
        : "kin-001";

      const res = await fetch(`/api/checkout?property=${encodeURIComponent(slug)}&owner=`, { method: "GET", cache: "no-store" });
      const text = await res.text();
      let data:any=null; try{ data = JSON.parse(text) } catch {}
      if (!res.ok || !data || data.ok !== true) { alert("Checkout not ready. Please try again."); return; }
      if (data.url) window.location.href = data.url; else alert("No checkout URL received.");
    } catch { alert("Network error. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={busy}
      className="fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 shadow-lg bg-black text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      aria-label="Buy"
      title="Buy"
    >
      {busy ? "Processing..." : "Buy"}
    </button>
  );
}
