import Link from "next/link";
import LanguageToggle from "../../components/LanguageToggle";
import { PROPERTIES } from "../../lib/properties";
import { getLang } from "../../../lib/locale";
import { t } from "../../../lib/i18n";

export const metadata = { title: "Properties â€” OptiLoves Invest" };

export default function Properties() {
  const lang = getLang();
  const list = Object.values(PROPERTIES);
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t(lang, "properties.title")}</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-600">{t(lang, "properties.listed", { count: list.length })}</p>
          <LanguageToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(p => (
          <div key={p.id} className="rounded-2xl border bg-white p-5 hover:shadow-sm transition">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-xs text-neutral-500">ID: {p.id}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-neutral-50 border p-3">
                <p className="text-neutral-600 text-xs">{t(lang, "label.token_price")}</p>
                <p className="font-semibold">${p.price}</p>
              </div>
              <div className="rounded-xl bg-neutral-50 border p-3">
                <p className="text-neutral-600 text-xs">{t(lang, "label.available")}</p>
                <p className="font-semibold">{p.available.toLocaleString()} tokens</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/property/${p.id}`} className="rounded-lg border px-3 py-1 text-xs hover:bg-neutral-100">{t(lang, "label.view")}</Link>
              <Link href={`/checkout?property=${p.id}&qty=1`} className="rounded-lg bg-black text-white px-3 py-1 text-xs">{t(lang, "label.buy")}</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}