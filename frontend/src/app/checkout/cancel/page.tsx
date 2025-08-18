export const dynamic = "force-dynamic";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payment canceled</h1>
      <p className="opacity-80">No charges were made. You can return and try again any time.</p>
      <div className="flex gap-3">
        <a className="underline" href="/">← Back to properties</a>
        <a className="underline" href="mailto:support@optilovesinvest.com">Contact support</a>
      </div>
    </main>
  );
}
