"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id") || "";
  const orderId = sp.get("order_id") || "";
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payment successful</h1>
      <p>Thank you! Your order is confirmed.</p>
      <div className="rounded-xl border p-4 text-sm">
        <div><span className="font-semibold">Order:</span> {orderId || "—"}</div>
        <div><span className="font-semibold">Stripe session:</span> {sessionId || "—"}</div>
      </div>
      <Link className="underline" href="/">Back to Properties</Link>
    </main>
  );
}
