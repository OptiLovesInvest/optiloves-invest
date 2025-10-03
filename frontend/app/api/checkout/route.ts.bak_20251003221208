export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const property_id = body?.property_id ?? "kin-001";
  const quantity = Number(body?.quantity ?? 1);
  const owner = body?.owner;

  // Demo-friendly: if no owner yet (wallet not connected), just succeed
  if (!owner) {
    return new Response(
      JSON.stringify({ ok: true, url: "/thank-you", property_id, quantity, note: "owner missing -> stubbed redirect" }),
      { headers: { "content-type": "application/json" }, status: 200 }
    );
  }

  // Proxy to backend when owner is present
  const BE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://optiloves-backend.onrender.com";
  const r = await fetch(`${BE}/buy/checkout`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ property_id, quantity, owner }),
    cache: "no-store",
  });

  let data: any = null;
  try { data = await r.json(); } catch {}

  if (r.ok && data?.url) {
    return new Response(JSON.stringify({ ok: true, url: data.url }), {
      headers: { "content-type": "application/json" }, status: 200
    });
  }

  return new Response(JSON.stringify({ ok: false, error: "checkout_failed", backend: data ?? null }), {
    headers: { "content-type": "application/json" }, status: 400
  });
}