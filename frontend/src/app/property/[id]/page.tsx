'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

type Details = {
  id: string; title: string; city: string; country: string;
  token_price_usd: number; available_tokens: number; description: string;
};

type Receipt = {
  property_id: string;
  tokens: number;
  total_usd: number;
  time: string;
};

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Details | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/properties/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject('Failed to load'))
      .then(setData)
      .catch(e => setErr(String(e)));
  }, [id]);

  const clampedQty = useMemo(() => {
    if (!data) return qty;
    const n = Math.max(1, Math.floor(Number(qty) || 1));
    return Math.min(n, data.available_tokens || 1);
  }, [qty, data]);

  const totalUsd = useMemo(() => {
    if (!data) return 0;
    return clampedQty * data.token_price_usd;
  }, [clampedQty, data]);

  function onQtyChange(v: string) {
    setQty(Math.floor(Number(v) || 0));
  }

  async function invest() {
    if (!data) return;
    setErr(null);
    setReceipt(null);
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/invest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: data.id, tokens: clampedQty })
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || res.statusText);

      setData(d => d ? { ...d, available_tokens: d.available_tokens - out.tokens } : d);
      setReceipt({
        property_id: out.property_id,
        tokens: out.tokens,
        total_usd: out.total_usd,
        time: new Date().toLocaleString()
      });
    } catch (e: any) {
      setErr(e.message || 'Invest failed');
    } finally {
      setLoading(false);
    }
  }

  if (err) return <main style={{ padding: 20 }}>Error: {err}</main>;
  if (!data) return <main style={{ padding: 20 }}>Loading…</main>;

  const disabled = loading || clampedQty < 1 || clampedQty > data.available_tokens;

  return (
    <main style={{ padding: 20 }}>
      <a href="/" style={{ textDecoration: 'underline' }}>← Back to properties</a>
      <h1 style={{ marginTop: 10 }}>{data.title}</h1>
      <p>{data.city}, {data.country}</p>

      <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 12 }}>
        <p>Token price: ${data.token_price_usd}</p>
        <p>Available tokens: {data.available_tokens}</p>

        <div style={{ marginTop: 8 }}>
          <label>Tokens:&nbsp;
            <input
              type="number"
              min={1}
              value={clampedQty}
              onChange={e => onQtyChange(e.target.value)}
              style={{ width: 90 }}
            />
          </label>
          <span style={{ marginLeft: 10 }}>Total: <strong>${totalUsd}</strong></span>
          {clampedQty > data.available_tokens && (
            <span style={{ marginLeft: 10, color: 'crimson' }}>
              Not enough tokens available
            </span>
          )}
          <button
            disabled={disabled}
            onClick={invest}
            style={{ marginLeft: 10, padding: '6px 10px' }}
          >
            {loading ? 'Processing…' : 'Invest'}
          </button>
        </div>

        {receipt && (
          <div style={{ marginTop: 12, padding: 10, border: '1px solid #ddd', background: '#fafafa' }}>
            <h3 style={{ margin: 0 }}>✅ Purchase Receipt</h3>
            <p style={{ margin: '6px 0' }}>Property: {receipt.property_id}</p>
            <p style={{ margin: '6px 0' }}>Tokens: {receipt.tokens}</p>
            <p style={{ margin: '6px 0' }}>Total: ${receipt.total_usd}</p>
            <p style={{ margin: '6px 0' }}>Time: {receipt.time}</p>
          </div>
        )}

        <p style={{ marginTop: 12 }}>{data.description}</p>
      </div>
    </main>
  );
}
