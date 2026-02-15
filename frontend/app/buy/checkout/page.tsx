"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BuyCheckoutPage() {
  const [msg, setMsg] = useState("Preparing checkout…");
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const rawQty = searchParams.get("qty");
        let quantity = parseInt(rawQty || "1", 10);

        if (isNaN(quantity) || quantity < 1) quantity = 1;
        if (quantity > 100) quantity = 100;

        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ propertyId: "kin-001", quantity }),
        });

        const j = await res.json().catch(() => ({} as any));
        const url = (j && j.url) ? String(j.url) : "/thank-you";

        window.location.assign(url);
      } catch {
        setMsg("Checkout is temporarily unavailable. Please try again.");
      }
    })();
  }, [searchParams]);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="mt-3 opacity-90">{msg}</p>
        <a className="inline-block mt-6 rounded-xl px-4 py-2 border" href="/">
          Back to home
        </a>
      </div>
    </main>
  );
}
