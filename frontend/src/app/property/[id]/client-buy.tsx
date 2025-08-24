"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClientBuy({ propertyId }: { propertyId: string }) {
  const [qty, setQty] = useState(1);
  const [wallet, setWallet] = useState("test1");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onBuy() {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            property_id: propertyId,
            quantity: qty,
            wallet,
          }),
        }
      );

      const data = await res.json();
      if (!data?.ok || !data?.url) {
        throw new Error(data?.error || "Buy failed");
      }

      // Save URL for a “Pending” page (or future retry button)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastCheckoutUrl", data.url);
        // Open Stripe Checkout in a NEW TAB so your site can still show Cancel/Help
        window.open(data.url, "_blank", "noopener,noreferrer");
      }

      // Send this tab somewhere helpful (see note below)
      router.push("/checkout/pending"); // or "/" if you don't create a Pending page
    } catch (e: any) {
      alert(e?.message || "Buy failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm">Quantity</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          className="w-20 rounded border px-2 py-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Wallet</label>
        <input
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-56 rounded border px-2 py-1"
        />
      </div>

      <button
        onClick={onBuy}
        disabled={loading}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Opening Stripe…" : "Buy"}
      </button>
    </div>
  );
}
