export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_BACKEND || process.env.BACKEND;
  let data;
  try {
    if (url) {
      const r = await fetch(`${url}/properties`, { cache: "no-store" });
      data = await r.json();
    }
  } catch {}
  if (!Array.isArray(data)) {
    data = [
      { id: "kin-001", title: "Kinshasa — Gombe Apartments", price: 50, available_tokens: 4997 },
      { id: "lua-001", title: "Luanda — Ilha Offices",      price: 50, available_tokens: 3000 },
    ];
  }

  // normalize potential bad dashes if any upstream issues
  data = data.map(p => ({ ...p, title: String(p.title || "").replace(/â[\u0080-\u00BF]+/g, "—") }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
