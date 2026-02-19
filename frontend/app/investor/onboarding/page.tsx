"use client";

export default function InvestorOnboardingPage() {
  const flowUrl = process.env.NEXT_PUBLIC_KYC_FLOW_URL;

  const startKyc = () => {
    if (!flowUrl) {
      alert("KYC Flow URL missing in Vercel settings.");
      return;
    }
    window.location.href = flowUrl;
  };

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28 }}>Investor Onboarding</h1>
      <p>Step 1: Complete KYC verification.</p>

      <button
        onClick={startKyc}
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          border: "1px solid #111",
          cursor: "pointer",
          fontWeight: 600,
          marginTop: 12
        }}
      >
        Start KYC Verification
      </button>
    </main>
  );
}
