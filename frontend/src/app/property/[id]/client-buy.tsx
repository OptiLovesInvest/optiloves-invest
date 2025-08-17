// src/app/property/[id]/client-buy.tsx
"use client";

import { useState } from "react";
import { createCheckout } from "../../../lib/api"; // note: 3 levels up

export default function BuyClient({ id, price }: { id: string; price: number }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = price * qty;

  async function onCard() {
    setLoading(true);
    try {
      const r = await createCheckout(id, qty);
      if (r.checkout_url) window.location.href = r.checkout_url;
      else alert("Checkout ok (demo).");
    } catch (e: any) {
      alert(`Checkout failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ margin: "12px 0" }}>
        <label>
          Quantity&nbsp;
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            style={{ width: 80 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 10 }}>Total: {total.toLocaleString()}</div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => alert("Buy (demo)")}
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Buy (demo)
        </button>
        <button
          onClick={onCard}
          disabled={loading}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-60"
        >
          {loading ? "Processing…" : "Buy with card"}
        </button>
      </div>
    </div>
  );
}
