// frontend/src/app/property/[id]/page.tsx
import BuyClient from './client-buy';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

async function getPropsList() {
  const r = await fetch(`${BASE}/properties`, { cache: 'no-store' });
  if (!r.ok) return [];
  return r.json(); // [{ id, title, price, availableTokens }]
}

async function getPriceInfo(id: string) {
  try {
    const r = await fetch(`${BASE}/price/${id}`, { cache: 'no-store' });
    if (!r.ok) return null;
    return r.json(); // { ok, price, available }
  } catch {
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const [list, info] = await Promise.all([getPropsList(), getPriceInfo(params.id)]);
  const fromList = Array.isArray(list) ? list.find((x:any) => x.id === params.id) : null;

  const title = fromList?.title ?? `Property ${params.id}`;
  const price = Number(info?.price ?? fromList?.price ?? 0);
  const available = Number(info?.available ?? fromList?.availableTokens ?? 0);

  if (!fromList && !info) {
    return <main className="p-6">Property not found.</main>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="text-sm text-gray-600">
        Token price: {price.toLocaleString()} — Available: {available.toLocaleString()}
      </div>
      <BuyClient propId={params.id} price={price} />
    </main>
  );
}
