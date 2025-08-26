export async function safeGetJSON<T = unknown>(url: string, opts?: RequestInit & { timeoutMs?: number }): Promise<{ ok: boolean; data: T | null; status?: number; error?: string; }> {
  const timeoutMs = opts?.timeoutMs ?? 6000;
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal, cache: "no-store" as RequestCache });
    let json: any = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }
    return { ok: res.ok, data: json, status: res.status };
  } catch (e: any) {
    return { ok: false, data: null, error: e?.message ?? "fetch-failed" };
  } finally {
    clearTimeout(id);
  }
}