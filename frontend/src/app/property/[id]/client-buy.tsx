"use client";

import React, { useState } from "react";

type Props = { id: string; price?: number };

export default function BuyClient({ id, price }: Props) {
  const [qty, setQty] = useState<number>(1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function buyWithCard() {
    setBusy(true);
    setMsg(null);
    try {
      if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
      const r = await fetch(${backend}/checkout, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: id, quantity: qty, wallet: "web-checkout" }),
      });
      if (!r.ok) throw new Error(HTTP );
      const data = await r.json();
      if (data?.url) { window.location.href = data.url; return; }
      setMsg("No checkout URL received from server.");
    } catch (err: any) { setMsg(err?.message ?? "Checkout failed"); }
    finally { setBusy(false); }
  }

  async function demoBuy() {
    setBusy(true);
    setMsg(null);
    try {
      if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
      const r = await fetch(${backend}/buy, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: id, quantity: qty, wallet: "web-demo" }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.error || "Demo buy failed");
      setMsg(Success:  ×  =  (tx ));
    } catch (e: any) { setMsg(e?.message ?? "Demo buy failed"); }
    finally { setBusy(false); }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <label style={{ display: "block", marginBottom: 8 }}>
        Quantity
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          style={{ width: "100%", marginTop: 6, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 8 }}
        />
      </label>

      {typeof price === "number" && (
        <div style={{ marginBottom: 12, fontSize: 14, opacity: 0.8 }}>
          Total: {(price * qty).toLocaleString()}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button
          onClick={demoBuy}
          disabled={busy}
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "#f8f8f8", cursor: "pointer" }}
        >
          Buy (demo)
        </button>

        <button
          onClick={buyWithCard}
          disabled={busy || !backend}
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #635bff", background: "#635bff", color: "white", cursor: "pointer", opacity: busy || !backend ? 0.6 : 1 }}
          title={!backend ? "Set NEXT_PUBLIC_BACKEND_URL" : ""}
        >
          Buy with card
        </button>
      </div>

      {msg && <div style={{ marginTop: 12, fontSize: 14 }}>{msg}</div>}
    </div>
  );
}
