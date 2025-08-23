"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { getProperty } from "../../lib/properties";
import { useEffect, useMemo, useState } from "react";
import { getClientLang, t, type Lang } from '../lib/i18n';
import LanguageToggle from "../../components/LanguageToggle";

export default function Checkout() {
  const sp = useSearchParams();
  const router = useRouter();
  const propertyId = sp?.get("property") ?? "";
  const initialQty = Math.max(1, Number(sp?.get("qty") ?? 1));
  const [qty, setQty] = useState(initialQty);
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(getClientLang()), []);

  const p = useMemo(() => getProperty(propertyId), [propertyId]);
  useEffect(() => { if (!p) router.replace("/properties"); }, [p, router]);

  if (!p) return null;
  const total = (p.price * qty).toFixed(2);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t(lang, "checkout.title")}</h1>
        <LanguageToggle />
      </div>
      <div className="rounded-2xl border bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{p.title}</p>
            <p className="text-xs text-neutral-500">ID: {p.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-600">{t(lang, "label.token_price")}</p>
            <p className="font-semibold">${p.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="qty" className="text-sm w-24">{t(lang, "checkout.quantity")}</label>
          <input
            id="qty"
            type="number"
            min={1}
            max={p.available}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(p.available, Number(e.target.value))))}
            className="w-28 rounded-lg border px-3 py-2"
          />
          <span className="ml-auto text-sm text-neutral-600">{t(lang, "label.available")}: {p.available.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-neutral-600">{t(lang, "checkout.total")}</span>
          <span className="text-lg font-semibold">${total}</span>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            onClick={() => router.push(`/checkout/confirm?property=${p.id}&qty=${qty}`)}
            className="rounded-lg bg-black text-white px-4 py-2 text-sm"
          >
            {t(lang, "checkout.continue")}
          </button>
          <button onClick={() => router.back()} className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100">
            {t(lang, "checkout.cancel")}
          </button>
        </div>
      </div>
    </main>
  );
}
