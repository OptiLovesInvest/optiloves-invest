"use client";
import { useEffect, useState } from "react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "../../lib/solana";

export default function AccountPage() {
  const [pubkey, setPubkey] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    // @ts-ignore
    const provider = window?.solana;
    if (!provider) return;
    const res = await provider.connect();
    setPubkey(new PublicKey(res.publicKey.toString()));
  };

  const disconnect = async () => {
    // @ts-ignore
    const provider = window?.solana;
    if (provider?.disconnect) await provider.disconnect();
    setPubkey(null); setBalance(null); setTxs([]);
  };

  const refresh = async () => {
    if (!pubkey) return;
    setLoading(true);
    const lamports = await connection.getBalance(pubkey, "confirmed");
    setBalance(lamports / LAMPORTS_PER_SOL);
    const sigs = await connection.getSignaturesForAddress(pubkey, { limit: 10 });
    const parsed = await connection.getParsedTransactions(
      sigs.map(s => s.signature),
      { maxSupportedTransactionVersion: 0 }
    );
    const items = parsed.map((p, i) => ({
      sig: sigs[i]?.signature,
      slot: p?.slot,
      time: p?.blockTime ? new Date(p.blockTime * 1000).toISOString() : "",
      err: sigs[i]?.err || null,
      amountSOL: extractSolTransfer(p)
    }));
    setTxs(items);
    setLoading(false);
  };

  useEffect(() => {
    // @ts-ignore
    const provider = window?.solana;
    if (provider?.isPhantom) {
      provider.on?.("connect", () => {});
      provider.on?.("disconnect", () => {});
    }
    return () => { if (provider?.removeAllListeners) provider.removeAllListeners(); };
  }, []);

  useEffect(() => { if (pubkey) refresh(); }, [pubkey]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Account</h1>
      <div className="flex gap-2">
        {!pubkey ? (
          <button onClick={connect} className="px-4 py-2 rounded-xl shadow">Connect Phantom</button>
        ) : (
          <>
            <button onClick={refresh} className="px-4 py-2 rounded-xl shadow" disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button onClick={disconnect} className="px-4 py-2 rounded-xl shadow">Disconnect</button>
          </>
        )}
      </div>
      <div className="rounded-xl shadow p-4">
        <p><strong>Wallet:</strong> {pubkey ? pubkey.toBase58() : "Not connected"}</p>
        <p><strong>Balance:</strong> {balance !== null ? `${balance.toFixed(4)} SOL` : "-"}</p>
      </div>
      <div className="rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Recent Transactions</h2>
        {txs.length === 0 ? <p>No data</p> : (
          <ul className="space-y-2">
            {txs.map((t, idx) => (
              <li key={idx} className="border rounded-lg p-2">
                <div><strong>Signature:</strong> <a className="underline" target="_blank" href={`https://explorer.solana.com/tx/${t.sig}?cluster=devnet`}>{t.sig}</a></div>
                <div><strong>Time:</strong> {t.time || "-"}</div>
                <div><strong>Slot:</strong> {t.slot ?? "-"}</div>
                <div><strong>Error:</strong> {t.err ? JSON.stringify(t.err) : "None"}</div>
                <div><strong>Amount (approx):</strong> {t.amountSOL ?? "-"} SOL</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
function extractSolTransfer(p: any): number | null {
  if (!p?.meta || !p?.transaction) return null;
  const pre = p.meta.preBalances || [];
  const post = p.meta.postBalances || [];
  if (pre.length && post.length && pre.length === post.length) {
    let max = 0;
    for (let i = 0; i < pre.length; i++) {
      const diff = Math.abs((post[i] - pre[i]) / 1_000_000_000);
      if (diff > max) max = diff;
    }
    return Number(max.toFixed(6));
  }
  return null;
}
