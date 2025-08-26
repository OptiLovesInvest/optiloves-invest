"use client";

import React, { useState } from "react";

type Props = { id: string; price?: number };

export default function ClientBuy({ id, price }: Props) {
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function demoBuy() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch("/api/demo-buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: id, quantity: qty }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || "Demo buy failed");
      setMsg(
        `Success: ${json.quantity} × ${json.price.toLocaleString()} = ${json.total_usd.toLocaleString()} (tx ${json.tx_signature})`
      );
    } catch (e: any) {
      setMsg(`Demo failed: ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  }

  async function buyWithCard() {
    setBusy(true);
    setMsg(null);
    try {
      if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
      const r = await fetch(`${backend}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: id,
          quantity: qty,
          wallet: "web-checkout",
          success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/property/${id}`,
        }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || "Checkout failed");
      if (json?.url) {
        window.location.href = json.url as string;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e: any) {
      setMsg(`Checkout failed: ${e.message || e}`);
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <label style={{ display: "block", marginBottom: 8 }}>
        Quantity
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) =>
            setQty(Math.max(1, Number(e.target.value || 1)))
          }
          style={{
            width: "100%",
            marginTop: 6,
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
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
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          Buy (demo)
        </button>

        <button
          onClick={buyWithCard}
          disabled={busy || !backend}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #635bff",
            background: "#635bff",
            color: "white",
            cursor: "pointer",
            opacity: busy || !backend ? 0.6 : 1,
          }}
          title={!backend ? "Set NEXT_PUBLIC_BACKEND_URL" : ""}
        >
          Buy with card
        </button>
      </div>

      {msg && <div style={{ marginTop: 12, fontSize: 14 }}>{msg}</div>}
    </div>
  );
}
