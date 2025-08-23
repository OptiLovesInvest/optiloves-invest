"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { getProperty } from "../../../lib/properties";
import { useMemo, useState, useEffect } from "react";
import { getClientLang, t, type Lang } from "../../../lib/i18n";
import LanguageToggle from "../../../components/LanguageToggle";

export default function Confirm() {
  const sp = useSearchParams();
  const router = useRouter();
  const propertyId = sp?.get("property") ?? "";
  const qty = Math.max(1, Number(sp?.get("qty") ?? 1));
  const p = useMemo(() => getProperty(propertyId), [propertyId]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(getClientLang()), []);

  useEffect(() => { if (!p) router.replace("/properties"); }, [p, router]);
  if (!p) return null;

  const total = (p.price * qty).toFixed(2);

  async function handleConfirm() {
    setSubmitting(true); setErr(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: p.id, qty }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      router.replace(`/checkout/success?orderId=${encodeURIComponent(data.orderId)}&property=${p.id}&qty=${qty}`);
    } catch (e: any) {
      setErr(e.message || "Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t(lang, "confirm.title")}</h1>
        <LanguageToggle />
      </div>
      <div className="rounded-2xl border bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{p.title}</p>
            <p className="text-xs text-neutral-500">ID: {p.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-600">Qty</p>
            <p className="font-semibold">{qty}</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-neutral-600">{t(lang, "checkout.total")}</span>
          <span className="text-lg font-semibold">${total}</span>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <div className="pt-2 flex gap-3">
          <button onClick={handleConfirm} disabled={submitting} className="rounded-lg bg-black text-white px-4 py-2 text-sm">
            {submitting ? "Processing..." : t(lang, "confirm.pay")}
          </button>
          <button onClick={() => history.back()} className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100">{t(lang, "checkout.cancel")}</button>
        </div>
      </div>
    </main>
  );
}
