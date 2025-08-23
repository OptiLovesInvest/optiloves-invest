"use client";

import { useEffect, useState } from "react";

type Props = { className?: string };

export default function BackendStatus({ className }: Props) {
  const [status, setStatus] = useState<"checking" | "ok" | "fail">("checking");
  const [ms, setMs] = useState<number | null>(null);
  const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND))));

  useEffect(() => {
    let alive = true;
    (async () => {
      const start = performance.now();
      try {
        const res = await fetch(`${BASE_URL}/properties`, { cache: "no-store" });
        const t = Math.round(performance.now() - start);
        if (!alive) return;
        setMs(t);
        setStatus(res.ok ? "ok" : "fail");
      } catch {
        if (!alive) return;
        setStatus("fail");
      }
    })();
    return () => { alive = false; };
  }, [BASE_URL]);

  const color = status === "ok" ? "bg-green-500" : status === "fail" ? "bg-red-500" : "bg-gray-400";
  const label = status === "ok" ? "Connected" : status === "fail" ? "Offline" : "Checkingâ€¦";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${className ?? ""}`}
      title={BASE_URL ?? ""}
    >
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span>Backend: {label}</span>
      {status === "ok" && ms !== null ? <span>({ms} ms)</span> : null}
    </span>
  );
}




