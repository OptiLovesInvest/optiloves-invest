"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getClientLang, t, type Lang } from "../../../lib/i18n";
import LanguageToggle from "../../../components/LanguageToggle";
import { useEffect, useState } from "react";

export default function Success() {
  const sp = useSearchParams();
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(getClientLang()), []);

  const orderId = sp?.get("orderId");
  const property = sp?.get("property");
  const qty = sp?.get("qty");

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6 text-center">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">{t(lang, "success.title")}</h1>
        <LanguageToggle />
      </div>
      <p className="text-neutral-600">{t(lang, "success.msg")}</p>
      <div className="rounded-2xl border bg-white p-6 inline-block text-left space-y-2">
        {orderId && <p><span className="text-neutral-600 text-sm">{t(lang, "success.order")}:</span> <span className="font-mono">{orderId}</span></p>}
        {property && <p><span className="text-neutral-600 text-sm">{t(lang, "success.property")}:</span> {property}</p>}
        {qty && <p><span className="text-neutral-600 text-sm">{t(lang, "success.qty")}:</span> {qty}</p>}
      </div>
      <div className="pt-4 flex justify-center gap-3">
        <Link href="/properties" className="rounded-lg bg-black text-white px-4 py-2 text-sm">{t(lang, "success.view_more")}</Link>
        <Link href="/" className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100">{t(lang, "success.home")}</Link>
      </div>
    </main>
  );
}
