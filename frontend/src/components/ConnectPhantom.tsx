'use client';
import { useEffect, useState } from 'react';
declare global { interface Window { solana?: any } }

export default function ConnectPhantom({ onConnected }: { onConnected: (pubkey: string) => void }) {
  const [pubkey, setPubkey] = useState('');

  useEffect(() => {
    const ph = typeof window !== 'undefined' ? (window as any).solana : undefined;
    if (ph?.isPhantom) {
      ph.on('connect', (pk: any) => {
        const key = typeof pk === 'string' ? pk : pk?.publicKey?.toString();
        if (key) { setPubkey(key); onConnected(key); }
      });
    }
  }, [onConnected]);

  const connect = async () => {
    const ph = (window as any).solana;
    if (!ph?.isPhantom) { alert('Install Phantom to continue.'); return; }
    const resp = await ph.connect();
    const key = resp.publicKey?.toString();
    setPubkey(key); onConnected(key);
  };

  const disconnect = async () => {
    const ph = (window as any).solana;
    if (ph?.disconnect) await ph.disconnect();
    setPubkey(''); onConnected('');
  };

  return (
    <div className="flex gap-2 items-center">
      {pubkey ? (
        <>
          <span className="text-sm">Wallet: {pubkey.slice(0,4)}â€¦{pubkey.slice(-4)}</span>
          <button onClick={disconnect} className="px-3 py-1 rounded bg-gray-200">Disconnect</button>
        </>
      ) : (
        <button onClick={connect} className="px-3 py-1 rounded bg-black text-white">Connect Phantom</button>
      )}
    </div>
  );
}

