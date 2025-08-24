"use client";
import * as React from "react";
import { getPortfolio, getOrders } from "../../lib/api";
import { InvestmentsTable } from "../../components/InvestmentsTable";
import { OrdersList } from "../../components/OrdersList";

export default function AccountPage() {
  const [wallet, setWallet] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [holdings, setHoldings] = React.useState<any[]>([]);
  const [totals, setTotals] = React.useState<{ total_tokens:number; total_invested_usd:number; total_est_value_usd:number } | null>(null);
  const [orders, setOrders] = React.useState<any[]>([]);
  React.useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("walletAddress")) || "";
    const qp = new URLSearchParams(window.location.search).get("wallet") || "";
    const w = saved || qp || "test1";
    setWallet(w);
    (async () => {
      try {
        const [p, o] = await Promise.all([getPortfolio(w), getOrders(w)]);
        setHoldings(p.holdings || []);
        setTotals(p.totals || null);
        setOrders(o || []);
      } catch (e:any) {
        setError(e?.message || "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Investments</h1>
        <div className="text-sm text-gray-600">Wallet: <span className="font-mono">{wallet}</span></div>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border rounded-xl p-4"><div className="text-xs text-gray-600">Total Tokens</div><div className="text-2xl font-semibold">{totals?.total_tokens ?? 0}</div></div>
            <div className="border rounded-xl p-4"><div className="text-xs text-gray-600">Invested (USD)</div><div className="text-2xl font-semibold"></div></div>
            <div className="border rounded-xl p-4"><div className="text-xs text-gray-600">Est. Value (USD)</div><div className="text-2xl font-semibold"></div></div>
          </div>
          <section className="space-y-3"><h2 className="text-lg font-semibold">Holdings</h2><InvestmentsTable holdings={holdings} /></section>
          <section className="space-y-3"><h2 className="text-lg font-semibold">Recent Transactions</h2><OrdersList orders={orders} /></section>
        </>
      )}
    </main>
  );
}


