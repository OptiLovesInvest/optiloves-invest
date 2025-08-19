export const dynamic = "force-dynamic";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">← Back</a>
        <article className="rounded-3xl border bg-white p-6 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-neutral-600 text-sm">Last updated: 2025-08-19</p>

          <h2 className="text-xl font-semibold mt-4">1) What we collect</h2>
          <p>Basic account data (name, email), usage analytics, and transaction metadata necessary to provide the service.</p>

          <h2 className="text-xl font-semibold mt-4">2) How we use data</h2>
          <p>Operate and improve the app, fulfill transactions, prevent abuse, and comply with law.</p>

          <h2 className="text-xl font-semibold mt-4">3) Sharing</h2>
          <p>We do not sell personal data. We may share with service providers under contract and authorities where legally required.</p>

          <h2 className="text-xl font-semibold mt-4">4) Security & retention</h2>
          <p>We apply reasonable security measures and retain data only as long as needed for the purposes above.</p>

          <h2 className="text-xl font-semibold mt-4">5) Your choices</h2>
          <p>Contact us to access, correct, or delete your data where applicable.</p>

          <p className="text-sm text-neutral-500">Questions? Contact: privacy@optiloves.example</p>
        </article>
      </div>
    </main>
  );
}