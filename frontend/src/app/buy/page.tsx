"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function BuyPage() {
  const sp = useSearchParams();
  useEffect(() => { (async () => {
    const payload = { property_id: sp.get("pid") || "kin-001", quantity: Number(sp.get("qty")||1) };
    const r = await fetch("/api/checkout",{ method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(payload) });
    const j = await r.json().catch(()=>null);
    if (j?.ok && j?.url) location.href = j.url; else location.href="/thank-you?fallback=1";
  })(); }, [sp]);
  return <main style={{display:"grid",placeItems:"center",minHeight:"60vh"}}><p>Redirecting…</p></main>;
}
