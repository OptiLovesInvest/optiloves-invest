// frontend/src/app/(legal)/privacy/page.tsx
export const dynamic = 'force-dynamic';

export default function Privacy() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p>We collect basic analytics and any information you submit. We do not sell personal data.</p>
      <h2 className="text-lg font-semibold">Data Use</h2>
      <p>Used to operate the app, improve reliability, and prevent abuse.</p>
      <h2 className="text-lg font-semibold">Cookies</h2>
      <p>Used for analytics; you can disable cookies in your browser.</p>
      <h2 className="text-lg font-semibold">Your Rights</h2>
      <p>Request export or deletion of your data: hello@optilovesinvest.com.</p>
      <h2 className="text-lg font-semibold">Processors</h2>
      <p>We use trusted vendors for hosting, analytics, and error tracking.</p>
    </main>
  );
}
