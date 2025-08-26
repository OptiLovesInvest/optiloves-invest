"use client";

import { useState } from "react";
import { t, L } from "../lib/i18n";

type Property = {
  id: string;
  title: string;
  price: number;
  availableTokens: number;
};

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export default function PropertyCard({ p, lng }: { p: Property; lng: L }) {
  const [loading, setLoading] = useState(false);

  const buyOne = async () => {
    try {
      setLoading(true);
      const r = await fetch(`${API}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: p.id, wallet: "web", quantity: 1 }),
      });
      const j = await r.json();
      if (j?.url) window.location.href = j.url;
      else alert(j?.error || "Checkout unavailable.");
    } catch {
      alert("Buy failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p.price);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-lg font-semibold">{p.title}</div>
      <div className="mb-1 text-sm opacity-70">{usd}</div>
      <div className="mb-4 text-sm">Tokens left: <span className="font-medium">{p.availableTokens}</span></div>
      <button
        onClick={buyOne}
        disabled={loading}
        className="rounded-xl px-3 py-2 text-sm font-medium text-white bg-black disabled:opacity-60"
      >
        {loading ? "Loading…" : t(lng, "buy") || "Buy"}
      </button>
    </div>
  );
}
