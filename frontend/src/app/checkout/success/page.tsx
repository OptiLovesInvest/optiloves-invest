export const dynamic = "force-dynamic";

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payment successful</h1>
      <p className="opacity-80">Thank you! Your order has been received.</p>

      {searchParams?.session_id ? (
        <div className="rounded border p-3 text-sm">
          Checkout Session ID: <span className="font-mono">{searchParams.session_id}</span>
        </div>
      ) : null}

      <div className="flex gap-3">
        <a className="underline" href="/orders">View recent orders</a>
        <a className="underline" href="/">Back to properties</a>
      </div>

      <p className="text-xs opacity-70">
        Need help? <a className="underline" href="mailto:support@optilovesinvest.com">support@optilovesinvest.com</a>
      </p>
    </main>
  );
}
