export const dynamic = "force-dynamic";

type Status = {
  ok: boolean;
  ts: number;
  ver: string;
  orders_count?: number;
  properties_count?: number;
  available_total?: number;
  cors_dev_enabled?: boolean;
};

async function loadStatus(): Promise<Status> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ?? "";
  const res = await fetch(`${base}/status`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load status");
  return res.json();
}

export default async function StatusPage() {
  let s: Status | null = null;
  let err: string | null = null;
  try {
    s = await loadStatus();
  } catch (e: any) {
    err = e?.message || "Error";
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">System status</h1>
      {err ? (
        <div className="rounded border p-3 text-sm">{err}</div>
      ) : s ? (
        <div className="rounded border p-3 text-sm space-y-1">
          <div><span className="opacity-70">Version:</span> <b>{s.ver}</b></div>
          <div><span className="opacity-70">Server time:</span> {new Date(s.ts*1000).toLocaleString()}</div>
          {"orders_count" in s ? <div><span className="opacity-70">Orders:</span> {s.orders_count}</div> : null}
          {"properties_count" in s ? <div><span className="opacity-70">Properties:</span> {s.properties_count}</div> : null}
          {"available_total" in s ? <div><span className="opacity-70">Tokens available:</span> {s.available_total}</div> : null}
          {"cors_dev_enabled" in s ? <div><span className="opacity-70">Dev CORS:</span> {s.cors_dev_enabled ? "enabled" : "disabled"}</div> : null}
        </div>
      ) : null}
      <a className="underline text-sm" href="/">← Back to properties</a>
    </main>
  );
}
