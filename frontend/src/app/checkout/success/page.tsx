// src/app/checkout/success/page.tsx
export const dynamic = 'force-dynamic';

export default function SuccessPage({
  searchParams,
}: {
  searchParams?: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id ?? null;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', fontFamily: 'system-ui', lineHeight: 1.5 }}>
      <h1>✅ Payment received</h1>
      <p>Thanks! We’re confirming your payment and updating your order.</p>
      {sessionId && (
        <p style={{ color: '#666' }}>
          Session ID: <code>{sessionId}</code>
        </p>
      )}
      <a href="/properties" style={{ display: 'inline-block', marginTop: 16 }}>
        Back to properties
      </a>
    </main>
  );
}

