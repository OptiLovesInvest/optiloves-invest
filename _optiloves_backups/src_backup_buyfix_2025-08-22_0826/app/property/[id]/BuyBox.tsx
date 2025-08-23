'use client';
import { useEffect, useState } from 'react';

type OrderResp = {
  error?: string;
  id?: string;
  quantity?: number;
  total?: number;
  ts?: string;
};

export default function BuyBox({
  propertyId,
  backend,
  initialAvailable,
}: {
  propertyId: string;
  backend: string;
  initialAvailable: number;
}) {
  const [wallet, setWallet] = useState('4xPHANTOMdemo1111111111111111111111111111111');
  const [qty, setQty] = useState(1);
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [left, setLeft] = useState<number>(initialAvailable);
  const [loading, setLoading] = useState<'airdrop' | 'buy' | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${backend}/price`);
        const j = await r.json();
        setTokenPrice(j.price ?? j.token_price ?? null);
      } catch {}
    })();
  }, [backend]);

  const airdrop = async () => {
    setMessage('');
    if (!wallet) return setMessage('Enter your wallet address first.');
    setLoading('airdrop');
    try {
      const r = await fetch(`${backend}/airdrop`, {
        method: 'POST',
        // no headers -> avoid preflight
        body: JSON.stringify({ wallet }),
      });
      const j = await r.json();
      setMessage(j.ok ? `Airdropped 1 SOL (devnet) to ${wallet}` : j.error || 'Airdrop failed');
    } catch (e: any) {
      setMessage(e?.message || 'Airdrop failed');
    } finally {
      setLoading(null);
    }
  };

  const buy = async () => {
    setMessage('');
    if (!wallet) return setMessage('Enter your wallet address first.');
    if (qty <= 0) return setMessage('Quantity must be at least 1.');
    setLoading('buy');
    try {
      // ✅ Use the property-aware endpoint; no headers -> avoid CORS preflight
      const r = await fetch(`${backend}/orders`, {
        method: 'POST',
        body: JSON.stringify({ id: propertyId, quantity: qty }),
      });
      const j = (await r.json()) as OrderResp;

      if (!r.ok || j.error) {
        setMessage(j.error || `Purchase failed (HTTP ${r.status})`);
      } else {
        const q = j.quantity ?? qty;
        setMessage(`✅ Bought ${q} token(s). Total $${j.total}.`);
        setLeft((prev) => Math.max(0, prev - q));
      }
    } catch (e: any) {
      setMessage(e?.message || 'Purchase failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section style={{ marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
      <h3>Buy Tokens</h3>
      <p>Token price: {tokenPrice != null ? `$${tokenPrice}` : '…'} &nbsp; • &nbsp; Remaining: {left}</p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Your Phantom address"
          style={{ padding: 8, minWidth: 280 }}
        />
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value || '1'))}
          style={{ width: 90, padding: 8 }}
        />
        <button disabled={!wallet || loading === 'buy'} onClick={buy} style={{ padding: '8px 12px' }}>
          {loading === 'buy' ? 'Buying…' : 'Buy'}
        </button>
        <button disabled={!wallet || loading === 'airdrop'} onClick={airdrop} style={{ padding: '8px 12px' }}>
          {loading === 'airdrop' ? 'Airdropping…' : 'Airdrop (devnet)'}
        </button>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </section>
  );
}
