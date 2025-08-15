'use client';
import { useEffect, useRef, useState } from 'react';
import ConnectPhantom from '../../../components/ConnectPhantom';
import AirdropButton from '../../../components/AirdropButton';
import { buy } from '../../../lib/api';

type Props = { propId?: string; id?: string; price: number };

export default function ClientBuy({ propId, id, price }: Props) {
  const propertyId = propId ?? id ?? '';
  const [wallet, setWallet] = useState('');
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const hideRef = useRef<number | null>(null);
  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ msg, type });
    if (hideRef.current) window.clearTimeout(hideRef.current);
    hideRef.current = window.setTimeout(() => setToast(null), 4000);
  };
  useEffect(() => () => { if (hideRef.current) window.clearTimeout(hideRef.current); }, []);

  const onBuy = async () => {
    if (!propertyId) { showToast('Missing property id', 'error'); return; }
    if (qty <= 0) { showToast('Quantity must be at least 1', 'error'); return; }

    try {
      setBusy(true);
      showToast('Submitting order…', 'info');
      const out = await buy(propertyId, qty, wallet || 'test-wallet');

      if (out?.ok) {
        const total = Number(out.total_usd ?? qty * price).toLocaleString();
        const unit = Number(out.price ?? price).toLocaleString();
        const tx = String(out.tx_signature || '').slice(0, 12);
        showToast(`Success: ${qty} × ${unit} = ${total} (tx ${tx}…)`, 'success');
      } else {
        showToast(`Error: ${out?.error || 'Unknown error'}`, 'error');
      }
    } catch (e: any) {
      showToast(`Error: ${e?.message || e}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 border p-4 rounded relative">
      <div className="flex items-center justify-between">
        <ConnectPhantom onConnected={setWallet} />
        {wallet && <AirdropButton wallet={wallet} />}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Quantity</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={e => setQty(Math.max(1, parseInt(e.target.value || '1')))}
          className="border rounded px-2 py-1 w-24"
        />
        <span className="text-sm text-gray-600">
          Total: {(qty * price).toLocaleString()}
        </span>
      </div>

      <button
        onClick={onBuy}
        disabled={busy}
        className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
      >
        {busy ? 'Processing…' : 'Buy'}
      </button>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded shadow
            ${toast.type === 'success' ? 'bg-emerald-600 text-white'
            : toast.type === 'error' ? 'bg-rose-600 text-white'
            : 'bg-gray-900 text-white'}`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
