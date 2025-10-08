"use client";
import React from "react";

export default function BuyClient() {
  async function go() {
    try {
      const r = await fetch("/api/checkout", { method:"POST", headers:{ "Content-Type":"application/json" } });
      const d = await r.json().catch(()=>null);
      if (d && d.url) { window.location.href = d.url; return; }
    } catch {}
    window.location.href = "/thank-you";
  }
  return (
    <button
      onClick={go}
      id="buy-fixed"
      style={{position:"fixed",bottom:16,right:16,zIndex:2147483647,
              padding:"12px 18px",borderRadius:9999,background:"#111",
              color:"#fff",fontWeight:700,border:"none",cursor:"pointer"}}
      aria-label="Buy"
    >Buy</button>
  );
}
