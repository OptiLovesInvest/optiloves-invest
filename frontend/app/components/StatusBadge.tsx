"use client";
import { useEffect, useState } from "react";

export default function StatusBadge() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const base = (process.env.NEXT_PUBLIC_BACKEND || "").replace(/\/+$/, "");
    const url  = base ? `${base}/properties` : "";
    async function ping() {
      try {
        if (!url) throw new Error("No backend URL");
        const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
        setOk(res.ok);
      } catch {
        setOk(false);
      }
    }
    ping();
    const id = setInterval(ping, 30000); // refresh every 30s
    return () => { clearInterval(id); ctrl.abort(); };
  }, []);

  const color = ok === null ? "#aaa" : ok ? "#16a34a" : "#dc2626"; // gray / green / red
  const text  = ok === null ? "Checkingâ€¦" : ok ? "Backend: Live" : "Backend: Down";

  return (
    <div style={{
      position: "fixed", left: 12, bottom: 12, zIndex: 40,
      background: "white", border: "1px solid #e5e7eb", borderRadius: 9999,
      padding: "6px 10px", display: "flex", gap: 8, alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <span style={{
        width: 10, height: 10, borderRadius: 9999, background: color,
        display: "inline-block"
      }} />
      <span style={{ fontSize: 12, color: "#111827" }}>{text}</span>
    </div>
  );
}

