// frontend/src/app/page.tsx
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

type PropertyItem = {
  id: string;
  title: string;
  price: number;
  availableTokens: number;
};

async function fetchProperties(): Promise<PropertyItem[]> {
  const res = await fetch(`${BASE}/properties`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load properties (${res.status})`);
  return res.json();
}

export default async function Home() {
  const data = await fetchProperties();

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Optiloves Invest</h1>

      <div className="grid gap-3">
        {data.map((p) => (
          <Link
            key={p.id}
            href={`/property/${p.id}`}
            className="border p-3 rounded hover:bg-gray-50"
          >
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">
              Price: {Number(p.price ?? 0).toLocaleString()} • Available:{' '}
              {Number(p.availableTokens ?? 0).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
