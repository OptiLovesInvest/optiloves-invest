"use client";
import { useEffect, useState } from "react";

export default function Pending() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(sessionStorage.getItem("lastCheckoutUrl"));
    }
  }, []);

  return (
    <main className="mx-auto max-w-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Complete your payment</h1>
      <p className="opacity-80">
        We opened Stripe Checkout in a new tab. If it didnÃ¢â‚¬â„¢t open, use the button below.
      </p>

      <div className="flex gap-3">
        <a
          className="rounded-md border px-4 py-2 underline"
          href={url ?? "#"}
          target="_blank"
          rel="noreferrer"
        >
          Open Stripe Checkout
        </a>
        <a className="rounded-md border px-4 py-2 underline" href="/checkout/cancel">
          Cancel and return
        </a>
      </div>

      <p className="text-sm opacity-70">
        After you pay on Stripe, youÃ¢â‚¬â„¢ll be redirected back here automatically.
      </p>
    </main>
  );
}

