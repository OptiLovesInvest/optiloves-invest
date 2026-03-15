"use client";

import { useState } from "react";

export default function KycPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function startKyc() {
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please enter your first name, last name, and email.");
      return;
    }

    try {
      setBusy(true);

      const res = await fetch("/api/kyc/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim()
        })
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start KYC.");
      }

      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start KYC.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        maxWidth: 720,
        margin: "0 auto"
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Identity Verification (KYC)</h1>

      <p style={{ marginTop: 0 }}>
        To invest with Optiloves Invest, identity verification is required as part of our private placement compliance process.
      </p>

      <ul style={{ marginTop: 16, paddingLeft: 20, lineHeight: 1.7 }}>
        <li>Takes under 10 minutes</li>
        <li>Secure hosted verification</li>
        <li>Required before investing</li>
        <li>Powered by ComplyCube</li>
      </ul>

      <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          style={{
            padding: "12px 14px",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 12
          }}
        />

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          autoComplete="family-name"
          style={{
            padding: "12px 14px",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 12
          }}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          inputMode="email"
          style={{
            padding: "12px 14px",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 12
          }}
        />
      </div>

      <button
        type="button"
        onClick={startKyc}
        disabled={busy}
        style={{
          display: "inline-block",
          marginTop: 16,
          padding: "12px 16px",
          borderRadius: 12,
          textDecoration: "none",
          border: "1px solid rgba(0,0,0,0.2)",
          background: busy ? "#f3f4f6" : "#ffffff",
          cursor: busy ? "not-allowed" : "pointer"
        }}
      >
        {busy ? "Starting secure verification..." : "Start Secure Verification"}
      </button>

      {error ? (
        <p style={{ marginTop: 14, color: "#b91c1c" }}>{error}</p>
      ) : null}

      <p style={{ marginTop: 28, fontSize: 13, opacity: 0.75 }}>
        Optiloves Invest - Prosper through Love and Investment.
      </p>
    </main>
  );
}