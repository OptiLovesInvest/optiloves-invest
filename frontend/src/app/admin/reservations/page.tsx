export const dynamic = "force-dynamic";
type Res = { id: string; property_id: string; quantity: number; total: number; email?: string; ts?: number; };
async function getData(): Promise<Res[]> {
  try {
    const res = await fetch(`${(process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))))?.replace(/\/$/, "")}/reservations`, { cache: "no-store" });
    return await res.json();
  } catch { return []; }
}
const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
export default async function Page() {
  const rows = await getData();
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">Ã¢â€ Â Back</a>
        <div className="rounded-3xl border bg-white p-6 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
          {rows.length === 0 ? (
            <p className="text-sm text-neutral-600">No reservations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-neutral-500">
                  <tr><th className="py-2 pr-4">#</th><th className="py-2 pr-4">Property</th><th className="py-2 pr-4">Qty</th><th className="py-2 pr-4">Total</th><th className="py-2 pr-4">Email</th><th className="py-2 pr-4">Time</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} className="border-t">
                      <td className="py-2 pr-4">{i + 1}</td>
                      <td className="py-2 pr-4">{r.property_id}</td>
                      <td className="py-2 pr-4">{fmt(r.quantity)}</td>
                      <td className="py-2 pr-4">${fmt(r.total || 0)}</td>
                      <td className="py-2 pr-4">{r.email || "Ã¢â‚¬â€"}</td>
                      <td className="py-2 pr-4">{r.ts ? new Date(r.ts * 1000).toLocaleString() : "Ã¢â‚¬â€"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}




