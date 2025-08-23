"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string; price: number; availableTokens: number };

export default function Home() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/properties", { headers: { accept: "application/json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ margin: 0 }}>OptiLoves Invest</h1>
      <p style={{ color: "#555" }}>Live properties (from /properties)</p>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {data.map((it) => (
          <div key={it.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ marginTop: 0 }}>{it.title}</h3>
            <div>Price: ${it.price}</div>
            <div>Available Tokens: {it.availableTokens}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
