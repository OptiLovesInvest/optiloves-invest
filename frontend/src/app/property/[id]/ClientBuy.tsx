"use client";
import { useState } from "react";

export default function ClientBuy({
  id,
  price,
  available,
}: { id: string; price: number; available: number }) {
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState<"idle" | "confirm" | "processing">("idle");
  const clamp = (n: number) => Math.max(1, Math.min(available, Math.floor(n || 1)));
  const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
  const total = price * qty;

  async function doBuy() {
    try {
      setStep("processing");
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
      const res = await fetch(`${base.replace(/\/$/, "")}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ property_id: id, quantity: qty }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j.ok === false) throw new Error(j.error || "Purchase failed");
      const sig = j.tx_signature || "demo";
      window.location.href = `/checkout/success?pid=${encodeURIComponent(id)}&qty=${qty}&price=${price}&total=${total}&tx=${encodeURIComponent(sig)}`;
    } catch (e: any) {
      window.location.href = `/checkout/cancel?pid=${encodeURIComponent(id)}&qty=${qty}&price=${price}&msg=${encodeURIComponent(e?.message || "failed")}`;
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5 space-y-4">
      <div className="grid grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-sm text-neutral-600">Quantity</label>
          <input
            type="number"
            min={1}
            max={available}
            value={qty}
            onChange={(e) => setQty(clamp(parseInt(e.target.value, 10)))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          <p className="text-xs text-neutral-500 mt-1">Max {fmt(available)}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-600">Price</p>
          <p className="font-semibold">${fmt(price)} / token</p>
        </div>
        <div>
          <p className="text-sm text-neutral-600">Total</p>
          <p className="font-semibold">${fmt(total)}</p>
        </div>
      </div>

      {step === "idle" && (
        <button
          onClick={() => setStep("confirm")}
          className="w-full rounded-xl bg-black text-white px-4 py-3 text-sm font-medium hover:bg-neutral-800"
        >
          Buy
        </button>
      )}

      {step === "confirm" && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
          <p className="text-sm">
            Confirm purchase of <strong>{qty}</strong> token(s) of <strong>{id}</strong> for{" "}
            <strong>${fmt(total)}</strong>?
          </p>
          <div className="flex gap-3">
            <button onClick={doBuy} className="flex-1 rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800">
              Confirm
            </button>
            <button onClick={() => setStep("idle")} className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-neutral-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      {step === "processing" && <div className="text-sm text-neutral-600">Processing…</div>}
    </div>
  );
}
