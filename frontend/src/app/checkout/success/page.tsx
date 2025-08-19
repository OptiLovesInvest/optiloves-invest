export const dynamic = "force-dynamic";
export default function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined>; }) {
  const pid = String(searchParams.pid || "");
  const qty = Number(searchParams.qty || 0);
  const price = Number(searchParams.price || 0);
  const total = Number(searchParams.total || price * qty);
  const tx = String(searchParams.tx || "");
  const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">← Back</a>
        <div className="rounded-3xl border bg-white p-6 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Purchase confirmed</h1>
          <p className="text-neutral-600">Thank you. Your order was processed successfully.</p>
          <div className="rounded-xl bg-neutral-50 border p-4 text-sm">
            <p><strong>Property:</strong> {pid}</p>
            <p><strong>Quantity:</strong> {fmt(qty)}</p>
            <p><strong>Price:</strong> ${fmt(price)} / token</p>
            <p><strong>Total:</strong> ${fmt(total)}</p>
            <p className="truncate"><strong>Reference:</strong> {tx || "pending"}</p>
          </div>
          <div className="flex gap-3">
            <a href={`/property/${pid}`} className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-neutral-100">Back to property</a>
            <a href="/" className="flex-1 rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800">Home</a>
          </div>
        </div>
      </div>
    </main>
  );
}
