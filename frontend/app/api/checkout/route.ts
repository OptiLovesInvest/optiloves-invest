export const dynamic = "force-dynamic";
const BE = process.env.BACKEND_URL || "https://optiloves-backend.onrender.com";

async function postCheckout(body: string) {
  const res = await fetch(`${BE}/buy/checkout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.OPTI_API_KEY || ""
    },
    body,
    cache: "no-store",
  });
  return new Response(await res.text(), {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "application/json" }
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get("owner") || "";
  const property = url.searchParams.get("property") || "kin-001";
  const body = JSON.stringify({ owner, property_id: property, quantity: 1 });
  return postCheckout(body);
}

export async function POST(req: Request) {
  const raw = await req.text();
  let data: any = {};
  try { data = JSON.parse(raw || "{}"); } catch {}
  // normalize keys in case caller sent "property"
  if (!data.property_id && data.property) data.property_id = data.property;
  if (!data.property_id) data.property_id = "kin-001";
  if (!("quantity" in data)) data.quantity = 1;
  const body = JSON.stringify(data);
  return postCheckout(body);
}
