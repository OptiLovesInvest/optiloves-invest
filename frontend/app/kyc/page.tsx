export const dynamic = "force-static";

export default function KycPage() {
  const flowUrl = process.env.NEXT_PUBLIC_KYC_FLOW_URL;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Identity Verification (KYC)</h1>

      <p style={{ marginTop: 0 }}>
        Optiloves Invest uses a secure hosted verification flow.
      </p>

      {!flowUrl ? (
        <p style={{ marginTop: 16 }}>
          KYC is not configured. Missing <code>NEXT_PUBLIC_KYC_FLOW_URL</code>.
        </p>
      ) : (
        <a
          href={flowUrl}
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "12px 16px",
            borderRadius: 12,
            textDecoration: "none",
            border: "1px solid rgba(0,0,0,0.2)"
          }}
        >
          Start KYC
        </a>
      )}

      <p style={{ marginTop: 28, fontSize: 13, opacity: 0.75 }}>
        Optiloves Invest — Prosper through Love and Investment.
      </p>
    </main>
  );
}