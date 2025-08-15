export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '') || 'http://127.0.0.1:5000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  listProperties: () => request('/properties'),
  getProperty: (id: string) => request(`/properties/${id}`),
  purchase: (data: { propertyId: string; wallet: string; amount: number }) =>
    request('/purchase', { method: 'POST', body: JSON.stringify(data) }),
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getProperties() { return (await fetch(`${BASE}/properties`, { cache: 'no-store' })).json(); }
export async function getPrice(id: string) { return (await fetch(`${BASE}/price/${id}`, { cache: 'no-store' })).json(); }
export async function buy(property_id: string, quantity: number, wallet: string) {
  const r = await fetch(`${BASE}/buy`, { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ property_id, quantity, wallet }) });
  return r.json();
}
export async function apiAirdrop(wallet: string) {
  const r = await fetch(`${BASE}/airdrop`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ wallet }) });
  return r.json();
}

