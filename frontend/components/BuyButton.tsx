"use client";
import React from "react";

type Props = { propertyId: string };

export default function BuyButton({ propertyId }: Props) {
  const [busy, setBusy] = React.useState(false);

  // Read owner (wallet) when running in browser
  const owner = typeof window !== "undefined"
    ? (localStorage.getItem("owner") || "")
    : "";

  const onBuy = async () => {
    if (!owner) { const o = window.prompt("Enter your wallet address"); if (!o) return; localStorage.setItem("owner", o); }
    setBusy(true);
    try {
      const r = await fetch(`/api/checkout?property=${encodeURIComponent(propertyId)}&owner=${encodeURIComponent(owner)}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await r.json().catch(() => ({}));
      if (data?.ok && data?.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
        console.error("Checkout error:", data);
      }
    } catch (e) {
      alert("Network error. Please try again.");
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onBuy}
      disabled={busy}
      className="px-5 py-2 rounded-2xl shadow text-white bg-black disabled:opacity-60"
    >
      {busy ? "Processing…" : "Buy"}
    </button>
  );
}

