'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Proposal = {
  property_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  available: number;
  title?: string;
};

export default function AI() {
  const BACKEND = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL)!;
  const [q, setQ] = useState('');
  const [reply, setReply] = useState<any>(null);
  const [status, setStatus] = useState<string>('');

  // Allow prefill via /ai?q=...
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = new URL(window.location.href);
      const preset = u.searchParams.get('q');
      if (preset) setQ(preset);
    }
  }, []);

  const ask = async () => {
    setStatus('thinkingÃ¢â‚¬Â¦');
    setReply(null);
    try {
      const r = await fetch(`${BACKEND}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });
      const j = await r.json();
      setReply(j);
      setStatus('');
    } catch (e: any) {
      setStatus(e?.message || 'Error');
    }
  };

  const confirm = async (p: Proposal) => {
    setStatus('confirmingÃ¢â‚¬Â¦');
    try {
      const r = await fetch(`${BACKEND}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.property_id, quantity: p.quantity }),
      });
      const j = await r.json();
      if (!r.ok || j.error) {
        setStatus(j.error || `Purchase failed (HTTP ${r.status})`);
      } else {
        setStatus(`Ã¢Å“â€¦ Bought ${j.quantity} token(s) for ${p.title || p.property_id}. Total $${j.total}.`);
      }
    } catch (e: any) {
      setStatus(e?.message || 'Purchase failed');
    }
  };

  const proposal: Proposal | null =
    reply?.result?.proposal && reply?.result?.ok ? (reply.result.proposal as Proposal) : null;

  return (
    <main style={{ padding: 24, maxWidth: 800 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>OptiLoves AI</h1>
        <Link href="/" style={{ textDecoration: 'underline' }}>Ã¢â€ Â Back</Link>
      </header>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Try: "list properties", "price kin-001", "buy 2 of kin-001"'
          style={{ flex: 1, padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <button onClick={ask} style={{ padding: '10px 14px', borderRadius: 8 }}>Send</button>
      </div>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}

      {reply && (
        <section style={{ marginTop: 16 }}>
          <h3>AI Response (JSON)</h3>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f7f7f7', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
            {JSON.stringify(reply, null, 2)}
          </pre>
        </section>
      )}

      {proposal && (
        <section style={{ marginTop: 12, border: '1px solid #eee', borderRadius: 10, padding: 12 }}>
          <h3>Proposed Purchase</h3>
          <p><strong>{proposal.title || proposal.property_id}</strong></p>
          <p>Quantity: {proposal.quantity}</p>
          <p>Unit price: ${proposal.unit_price}</p>
          <p>Total: ${proposal.total}</p>
          <p>Available: {proposal.available}</p>
          <button onClick={() => confirm(proposal)} style={{ padding: '10px 14px', marginTop: 8, borderRadius: 8 }}>
            Confirm Purchase
          </button>
        </section>
      )}
    </main>
  );
}


