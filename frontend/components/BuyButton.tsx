"use client";
import React, { useState } from "react";
export default function BuyButton({ propertyId, quantity = 1 }:{ propertyId:string; quantity?:number }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const onBuy = async () => {
  const params = new URLSearchParams((typeof window!=="undefined" && window.location && window.location.search) || "");
  const owner = params.get("owner") || undefined;
    try {
      setLoading(true); setMsg(null);
      const r = await fetch("/api/checkout", { method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ property_id: propertyId, quantity, owner }) });
      const j = await r.json();
      setMsg(j?.ok ? "Checkout ready." : "Could not start checkout.");
      if (j?.url) location.href = j.url;
    } catch { setMsg("Network error."); } finally { setLoading(false); }
  };
  return (<div className="mt-6">
    <button id="buy-always-visible" onClick={onBuy} className="px-5 py-3 rounded-2xl shadow font-semibold" disabled={loading}>
      {loading ? "Processing…" : "Buy"}
    </button>
    {msg && <p className="text-sm mt-2">{msg}</p>}
  </div>);
}