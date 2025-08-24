export async function GET() {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND)))) || "${process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))}";
  const url  = `${base.replace(/\/$/, "")}/kyc`;
  const res  = await fetch(url, { cache: "no-store" });
  const data = await res.json().catch(() => ([]));
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : res.status, headers: { "Content-Type": "application/json" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND)))) || "${process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))}";
  const url  = `${base.replace(/\/$/, "")}/kyc`;
  const res  = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : res.status, headers: { "Content-Type": "application/json" } });
}



