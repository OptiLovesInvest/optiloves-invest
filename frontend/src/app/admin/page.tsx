export const dynamic = "force-dynamic";

const fmtDT = (ts: number) => new Date(ts * 1000).toLocaleString();

async function getKYC() {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL))_URL) || "${process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL)}";
  const token = process.env.ADMIN_TOKEN || "devadmin";
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/admin/kyc.json`, {
      headers: { "X-Admin-Token": token },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : Array.isArray((data as any)?.value) ? (data as any).value : [];
    return list;
  } catch {
    return [];
  }
}

export default async function Page() {
  const list = await getKYC();
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">Ã¢â€ Â Back</a>

        <div className="rounded-3xl border bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Admin Ã‚Â· KYC</h1>
            <a href="/api/admin/kyc.csv" className="rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:bg-neutral-800">
              Download CSV
            </a>
          </div>

          {list.length === 0 ? (
            <p className="text-neutral-600 text-sm">No KYC submissions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-neutral-600">
                  <tr>
                    <th className="py-2">Full name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Country</th>
                    <th className="py-2">ID number</th>
                    <th className="py-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((r: any, i: number) => (
                    <tr key={i} className="border-t">
                      <td className="py-2">{r.full_name}</td>
                      <td className="py-2">{r.email}</td>
                      <td className="py-2">{r.country}</td>
                      <td className="py-2">{r.id_number}</td>
                      <td className="py-2">{fmtDT(Number(r.ts || 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}




