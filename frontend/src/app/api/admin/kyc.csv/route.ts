export const dynamic = "force-dynamic";

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://optiloves-backend.onrender.com");
  const token = process.env.ADMIN_TOKEN || "devadmin";
  const res = await fetch(`${base.replace(/\/$/, "")}/admin/kyc.csv`, {
    headers: { "X-Admin-Token": token },
    cache: "no-store",
  });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kyc.csv"',
    },
  });
}



