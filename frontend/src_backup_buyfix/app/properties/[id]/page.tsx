"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Detail = {
  id: string; title: string; city: string; country: string;
  price_usd: number; token_price_usd: number; available_tokens: number;
  description: string; images?: string[];
};

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Detail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${id}`, { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(setData)
      .catch(e => setError(e?.message || "Failed to load"));
  }, [id]);

  if (error) return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-sm hover:underline">← Back</Link>
      <div className="text-red-600 mt-3">Error: {error}</div>
    </main>
  );

  if (!data) return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-sm hover:underline">← Back</Link>
      <div className="mt-3">Loading…</div>
    </main>
  );

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <Link href="/" className="text-sm hover:underline">← Back</Link>
      <h1 className="text-2xl font-semibold">{data.title}</h1>

      {data.images?.[0] && (
        <img src={data.images[0]} alt={data.title} className="w-full rounded-2xl border" />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-2xl border">
          <div className="text-sm opacity-70">{data.city}, {data.country}</div>
          <div className="mt-2">Project size: <b>${data.price_usd.toLocaleString()}</b></div>
          <div>Token price: <b>${data.token_price_usd}</b></div>
          <div>Available tokens: <b>{data.available_tokens.toLocaleString()}</b></div>
        </div>
        <div className="p-4 rounded-2xl border">
          <div className="font-medium mb-2">About</div>
          <p className="opacity-80">{data.description}</p>
        </div>
      </div>
    </main>
  );
}
