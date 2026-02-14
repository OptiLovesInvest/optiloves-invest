"use client";

import { useEffect, useState } from "react";

export default function BuyCheckoutPage() {
  const [msg, setMsg] = useState("Preparing checkout…");

  useEffect(() => {
    (async () => {
      try {
        // Keep this minimal and stable: call our Next API route which returns { ok:true, url:"..." }
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ propertyId: "kin-001", quantity: 1 }),
        });

        const j = await res.json().catch(() => ({} as any));
        const url = (j && j.url) ? String(j.url) : "/thank-you";

        window.location.assign(url);
      } catch {
        setMsg("Checkout is temporarily unavailable. Please try again.");
      }
    })();
  }, []);

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
