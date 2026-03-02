import { useState } from "react";

export default function Apply() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: any) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");

    const fd = new FormData(e.currentTarget);

    const payload: any = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      country: String(fd.get("country") || "").trim(),
      wallet: String(fd.get("wallet") || "").trim(),
      amount_usd: Number(String(fd.get("amount_usd") || "0").trim()),
      amount: Number(String(fd.get("amount_usd") || "0").trim()),
      note: String(fd.get("note") || "").trim(),
      website: String(fd.get("website") || "").trim()
    };

    try {
      const r = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const j = await r.json().catch(() => ({}));

      if (!r.ok) {
        setStatus("err");
        setMsg(j?.error || "Submission failed. Please try again.");
        return;
      }

      setStatus("ok");
      setMsg("Application received. We will contact you shortly.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Apply to Invest</h1>

      <p style={{ marginTop: 0 }}>
        Private placement onboarding. Minimum allocation: <b>$100</b>. Maximum per investor: <b>$1,000</b>.
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <label>
          Full name
          <input name="full_name" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Email
          <input name="email" type="email" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Phone / WhatsApp
          <input name="phone" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Country
          <input name="country" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Solana wallet address
          <input name="wallet" required placeholder="Base58 address" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Intended allocation (USD)
          <input name="amount_usd" type="number" min="100" max="1000" step="50" required defaultValue="100"
                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <label>
          Note (optional)
          <textarea name="note" rows={4} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }} />
        </label>

        <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

        <button disabled={status === "sending"}
                style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)", cursor: "pointer" }}>
          {status === "sending" ? "Submitting..." : "Submit application"}
        </button>

        {msg ? <p style={{ marginTop: 6, color: status === "err" ? "crimson" : "green" }}>{msg}</p> : null}
      </form>

      <p style={{ marginTop: 22 }}>
        Already verified? <a href="/kyc" style={{ textDecoration: "underline" }}>Start KYC</a>
      </p>

      <p style={{ marginTop: 28, fontSize: 13, opacity: 0.75 }}>
        Optiloves Invest â€” Prosper through Love and Investment.
      </p>
    </main>
  );
}