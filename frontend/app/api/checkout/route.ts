export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const property_id = body?.property_id ?? "kin-001";
  const quantity = Number(body?.quantity ?? 1);
  const owner = body?.owner;

  // Optional demo mode: allow ownerless checkout when env flag is "true"
  if (!owner && process.env.NEXT_PUBLIC_ALLOW_OWNERLESS_CHECKOUT === "true") {
    return new Response(
      JSON.stringify({ ok: true, url: "/thank-you", property_id, quantity, note: "owner missing -> stubbed via env" }),
      { headers: { "content-type": "application/json" }, status: 200 }
    );
  }if (!owner) {
    return new Response(
      JSON.stringify({ ok: false, error: "missing owner" }),
      { headers: { "content-type": "application/json" }, status: 400 }
    );
  }

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