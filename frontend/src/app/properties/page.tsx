"use client";
export const dynamic = "force-static";
export const runtime = "nodejs";

import { useEffect, useState } from "react";
type Property = { id:string; title:string; price:number; availableTokens:number };

export default function PropertiesPage() {
  const backend = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))) || "";
  const [items, setItems] = useState<Property[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!backend) { setErr("NEXT_PUBLIC_BACKEND is not set"); return; }
    fetch(`${backend}/properties`).then(r=>r.json()).then(setItems).catch(e=>setErr(String(e)));
  }, [backend]);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Properties</h1>
      <div className="rounded-xl border p-3 text-xs">BACKEND: {backend || "(unset)"}</div>
      {err && <div className="rounded-xl border p-3 text-red-600">{err}</div>}
      {!err && items.length===0 && <div className="rounded-xl border p-3">Loadingâ€¦ or no properties.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p=>(
          <div key={p.id} className="rounded-2xl border bg-white p-5 hover:shadow-sm transition">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-xs text-neutral-500">ID: {p.id}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-neutral-50 border p-3"><p className="text-neutral-600 text-xs">Token price</p><p className="font-semibold">${p.price}</p></div>
              <div className="rounded-xl bg-neutral-50 border p-3"><p className="text-neutral-600 text-xs">Available</p><p className="font-semibold">{p.availableTokens.toLocaleString()} tokens</p></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}


