"use client";
import React from "react";

export default function BuyButton({ propertyId = "kin-001" }: { propertyId?: string }) {
  const [busy, setBusy] = React.useState(false);

  const getOwner = () => {
    try {
      const o = localStorage.getItem("owner") || "";
      if (o) return o;
      const p = window.prompt("Enter your wallet address");
      if (p) localStorage.setItem("owner", p);
      return p || "";
    } catch { return ""; }
  };

  const onBuy = async () => {
    const owner = getOwner();
    if (!owner) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/checkout?property=${encodeURIComponent(propertyId)}&owner=${encodeURIComponent(owner)}`, { cache: "no-store" });
      const data = await r.json().catch(() => ({}));
      if (data?.ok && data?.url) window.location.href = data.url;
      else alert("Checkout failed. Please try again.");
    } catch {
      alert("Network error. Please try again.");
    } finally { setBusy(false); }
  };

  return (
    <button onClick={onBuy} disabled={busy}
      className="px-5 py-2 rounded-2xl shadow text-white bg-black disabled:opacity-60 z-[9999] relative">
      {busy ? "Processing…" : "Buy"}
    </button>
  );
}
