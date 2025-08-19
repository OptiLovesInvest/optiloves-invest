export const dynamic = "force-dynamic";

export default function Terms() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">← Back</a>
        <article className="rounded-3xl border bg-white p-6 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Terms of Use</h1>
          <p className="text-neutral-600 text-sm">Last updated: 2025-08-19</p>

          <p>Welcome to Optiloves Invest. By accessing or using our site, you agree to these Terms of Use.</p>
          <h2 className="text-xl font-semibold mt-4">1) Nature of service</h2>
          <p>Our platform provides tokenized access to real-estate opportunities. Tokens are informational units within the app. They are not securities unless stated by applicable law and licensing. Availability and pricing may change.</p>

          <h2 className="text-xl font-semibold mt-4">2) Eligibility & accounts</h2>
          <p>You must comply with your local laws. You’re responsible for the security of your account and any activity under it.</p>

          <h2 className="text-xl font-semibold mt-4">3) Risk disclaimer</h2>
          <p>Real estate and tokenized products carry risk, including loss of value. Historical performance is not indicative of future results.</p>

          <h2 className="text-xl font-semibold mt-4">4) Prohibited use</h2>
          <p>No unlawful activity, reverse engineering, scraping, or attempts to bypass technical controls.</p>

          <h2 className="text-xl font-semibold mt-4">5) Content & IP</h2>
          <p>All content is owned by Optiloves Invest or its licensors. You may not reproduce without permission.</p>

          <h2 className="text-xl font-semibold mt-4">6) Liability</h2>
          <p>To the maximum extent permitted by law, the service is provided “as is”, without warranties; we are not liable for indirect or consequential damages.</p>

          <h2 className="text-xl font-semibold mt-4">7) Changes</h2>
          <p>We may update these Terms. Continued use means you accept the changes.</p>

          <p className="text-sm text-neutral-500">Questions? Contact: support@optiloves.example</p>
        </article>
      </div>
    </main>
  );
}