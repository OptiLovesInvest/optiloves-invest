'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Details = {
  id: string; title: string; city: string; country: string;
  token_price_usd: number; available_tokens: number; description: string;
};

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Details | null>(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/properties/${id}`).then(r => r.json()).then(setData);
  }, [id]);

  async function invest() {
    if (!data) return;
    setLoading(true); setMsg('');
    try {
      const res = await fetch('http://127.0.0.1:5000/invest', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ property_id: data.id, tokens: qty })
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || res.statusText);
      setMsg(`✅ Bought ${out.tokens} tokens ($${out.total_usd}).`);
      setData(d => d ? { ...d, available_tokens: d.available_tokens - out.tokens } : d);
    } catch (e:any) { setMsg(`❌ ${e.message}`); } 
    finally { setLoading(false); }
  }

  if (!data) return <main style={{padding:20}}>Loading…</main>;

  return (
    <main style={{ padding: 20 }}>
      <a href="/" style={{ textDecoration:'underline' }}>← Back</a>
      <h1>{data.title}</h1>
      <p>{data.city}, {data.country}</p>
      <div style={{ border:'1px solid #ccc', padding:12, marginTop:12 }}>
        <p>Token price: ${data.token_price_usd}</p>
        <p>Available tokens: {data.available_tokens}</p>
        <label>Tokens:&nbsp;
          <input type="number" min={1} value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)))} style={{width:80}} />
        </label>
        <button onClick={invest} disabled={loading} style={{ marginLeft: 8, padding:'6px 10px' }}>
          {loading ? 'Processing…' : 'Invest'}
        </button>
        {msg && <p style={{marginTop:8}}>{msg}</p>}
        <p style={{marginTop:12}}>{data.description}</p>
      </div>
    </main>
  );
}
