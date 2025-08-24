export const dynamic = "force-dynamic";

type Order = {
  session_id: string;
  property_id: string;
  quantity: number;
  wallet: string;
  amount_cents: number;
  currency: string;
  status: string;
  created_at: number;
};

async function fetchOrders(): Promise<Order[]> {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))))?.replace(/\/+$/, "") ?? "";
  const res = await fetch(`${base}/orders`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load orders");
  return res.json();
}

function fmtMoney(cents: number, cur: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur.toUpperCase() }).format(cents / 100);
}

export default async function OrdersPage() {
  let orders: Order[] = [];
  let error: string | null = null;
  try {
    orders = await fetchOrders();
  } catch (e: any) {
    error = e?.message || "Error";
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Recent orders</h1>
      {error ? (
        <div className="rounded border p-3 text-sm">{error}</div>
      ) : orders.length === 0 ? (
        <div className="opacity-70 text-sm">No orders yet.</div>
      ) : (
        <div className="rounded border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">When</th>
                <th className="text-left p-2">Property</th>
                <th className="text-right p-2">Qty</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.session_id} className="border-t">
                  <td className="p-2">{new Date(o.created_at * 1000).toLocaleString()}</td>
                  <td className="p-2">{o.property_id}</td>
                  <td className="p-2 text-right">{o.quantity}</td>
                  <td className="p-2 text-right">{fmtMoney(o.amount_cents, o.currency)}</td>
                  <td className="p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <a className="underline text-sm" href="/">â† Back to properties</a>
    </main>
  );
}




