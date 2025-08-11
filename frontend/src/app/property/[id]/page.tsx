'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Details = {
  id: string; title: string; city: string; country: string;
  price_usd: number; token_price_usd: number; available_tokens: number;
  description: string; images: string[];
};

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Details | null>(null);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/properties/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setData)
      .catch(e => setErr(String(e)));
  }, [id]);

  if (err) return <main style={{padding:20}}>Error: {err}</main>;
  if (!data) return <main style={{padding:20}}>Loading…</main>;

  return (
    <main style={{ padding: 20 }}>
      <a href="/" style={{ textDecoration:'underline' }}>← Back</a>
      <h1>{data.title}</h1>
      <p>{data.city}, {data.country}</p>
      <div style={{ border:'1px solid #ccc', padding:12, marginTop:12 }}>
        <p>Property price: ${data.price_usd}</p>
        <p>Token price: ${data.token_price_usd}</p>
        <p>Available tokens: {data.available_tokens}</p>
        <p style={{marginTop:8}}>{data.description}</p>
      </div>
    </main>
  );
}
