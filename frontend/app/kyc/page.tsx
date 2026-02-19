"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function KycRedirectPage() {
  const [msg, setMsg] = useState("Redirecting to KYC...");

  useEffect(() => {
    const flowUrl = process.env.NEXT_PUBLIC_KYC_FLOW_URL;

    if (!flowUrl || !/^https?:\/\/?/i.test(flowUrl)) {
      setMsg("KYC is not configured. Missing or invalid NEXT_PUBLIC_KYC_FLOW_URL.");
      return;
    }

    window.location.replace(flowUrl);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>KYC</h1>
      <p>{msg}</p>
    </main>
  );
}
