"use client";

type Order = {
  id: number;
  property_id: string;
  quantity: number; // negative for refunds
  price_usd: number;
  total_usd: number;
  tx_signature: string;
  created_at: string;
};

export function OrdersList({ orders }: { orders: Order[] }) {
  if (!orders?.length) return null;

  return (
    <div className="space-y-2">
      {orders.map((o) => (
        <div key={o.id} className="border rounded-xl p-3 text-sm">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{o.property_id}</div>
              <div className="text-gray-600">{new Date(o.created_at).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className={o.quantity >= 0 ? "text-green-700" : "text-red-700"}>
                {o.quantity >= 0 ? `+${o.quantity}` : o.quantity} tokens
              </div>
              <div>{"$"}{o.total_usd}</div>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-600 break-all">Tx: {o.tx_signature}</div>
        </div>
      ))}
    </div>
  );
}

