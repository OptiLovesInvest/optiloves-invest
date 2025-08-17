export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function Cancel() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-sm">You can try again anytime.</p>
    </main>
  );
}

