"use client";

import { useState } from "react";

const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(/\/+$/, "");

export default function ClientBuy({ propertyId }: { propertyId: string }) {
  const [qty, setQty] = useState(1);
  const [wallet, setWallet] = useState("test1"); // demo wallet field
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setStatus(null);
    if (qty < 1) return setStatus("Quantity must be at least 1");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: propertyId, quantity: qty, wallet }),
      });

      const json = await res.json().catch(() => ({} as any));

      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error ?? `Buy failed (${res.status})`);
      }

      // ✅ Redirect to Stripe Checkout if backend returns a URL
      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      // Fallback: show tx or generic success
      if (json?.tx_signature) {
        setStatus(`✅ Success. Tx: ${json.tx_signature}`);
      } else {
        setStatus(`✅ Order created.`);
      }
    } catch (e: any) {
      setStatus(`❌ ${e?.message ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-3 rounded-xl border p-4">
      <div className="text-sm font-semibold">Buy tokens</div>

      <div className="flex gap-3 items-center">
        <label className="text-sm">Qty</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
          className="w-24 rounded border px-2 py-1"
        />
      </div>

      <div className="flex gap-3 items-center">
        <label className="text-sm">Wallet</label>
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-64 rounded border px-2 py-1"
          placeholder="test1 (demo) or your address"
        />
      </div>

      <button
        onClick={handleBuy}
        disabled={loading}
        className="rounded-lg border px-4 py-2 hover:shadow-sm disabled:opacity-60"
      >
        {loading ? "Processing..." : "Buy"}
      </button>

      <div className="text-xs opacity-70">
        You’ll be redirected to Stripe Checkout to complete payment.
      </div>

      {status && <div className="text-sm">{status}</div>}
    </div>
  );
}
