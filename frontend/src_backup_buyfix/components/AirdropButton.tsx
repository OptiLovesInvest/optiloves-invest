'use client';
import { useState } from 'react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { apiAirdrop } from '../lib/api';

const CLUSTER = (process.env.NEXT_PUBLIC_SOL_CLUSTER || 'devnet') as 'devnet' | 'mainnet-beta';

export default function AirdropButton({ wallet }: { wallet: string }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const run = async () => {
    if (!wallet) { setMsg('Connect wallet first.'); return; }
    if (CLUSTER === 'mainnet-beta') { setMsg('Airdrop disabled on mainnet.'); return; }
    try {
      setBusy(true); setMsg('Requesting 1 SOL (devnet)…');
      const conn = new Connection(clusterApiUrl(CLUSTER), 'confirmed');
      const sig = await conn.requestAirdrop(new PublicKey(wallet), 1 * LAMPORTS_PER_SOL);
      await conn.confirmTransaction(sig, 'confirmed');
      setMsg(`Airdropped 1 SOL (sig: ${sig.slice(0,10)}…)`);
      await apiAirdrop(wallet);
    } catch (e: any) {
      setMsg(`Airdrop failed: ${e?.message || e}`);
    } finally { setBusy(false); }
  };

  return (
    <div className="flex flex-col gap-1">
      <button disabled={!wallet || busy} onClick={run}
        className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50">
        {busy ? 'Airdropping…' : 'Airdrop (devnet)'}
      </button>
      {msg && <span className="text-xs text-gray-600">{msg}</span>}
    </div>
  );
}
