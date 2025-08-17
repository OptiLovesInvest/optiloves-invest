const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getProperties() {
  const res = await fetch(`${BASE_URL}/properties`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);
  return res.json();
}

export async function createCheckout(propertyId: string, quantity: number) {
  const res = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ property_id: propertyId, quantity }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Checkout failed (${res.status}): ${text || 'unknown error'}`);
  }
  return res.json() as Promise<{ ok: boolean; checkout_url?: string }>;
}
