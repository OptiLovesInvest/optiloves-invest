export default function Invest() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Invest with Optiloves Invest</h1>

      <p style={{ marginTop: 0 }}>
        Optiloves Invest is a private investment platform focused on disciplined capital allocation and long-term value creation.
      </p>

      <h2 style={{ marginTop: 22, fontSize: 18 }}>How it works</h2>
      <ol style={{ marginTop: 8, paddingLeft: 22, lineHeight: 1.6 }}>
        <li>Complete identity verification (KYC).</li>
        <li>Confirm your Solana wallet address.</li>
        <li>Select your allocation (min , max ,000).</li>
        <li>Receive confirmation and portfolio visibility.</li>
      </ol>

      <h2 style={{ marginTop: 22, fontSize: 18 }}>Current allocation policy</h2>
      <ul style={{ marginTop: 8, paddingLeft: 22, lineHeight: 1.6 }}>
        <li>Minimum: </li>
        <li>Maximum per investor: ,000</li>
        <li>Selective onboarding (private placement phase)</li>
      </ul>

      <p style={{ marginTop: 20 }}>
        <a href="/kyc" style={{ textDecoration: "underline" }}>Start KYC</a>
        {"  "}·{"  "}
        <a href="/buy/checkout?qty=2" style={{ textDecoration: "underline" }}>Buy (min 2 tokens)</a>
      </p>

      <p style={{ marginTop: 28, fontSize: 13, opacity: 0.75 }}>
        Optiloves Invest — Prosper through Love and Investment.
      </p>
    </main>
  );
}