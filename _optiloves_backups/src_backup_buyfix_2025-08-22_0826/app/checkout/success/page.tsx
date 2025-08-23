export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function Success() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
      <p className="text-sm">Thanks! Your payment was confirmed.</p>
    </main>
  );
}

