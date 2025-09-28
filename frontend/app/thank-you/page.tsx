export const dynamic = "force-static";
export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you 🙏</h1>
      <p className="mb-6">Your checkout was initiated. If a payment step is required, it will open automatically.</p>
      <div className="flex gap-3 justify-center">
        <a className="underline" href="/">Go home</a>
        <a className="underline" href="/properties">View properties</a>
        <a className="underline" href="/pledge">Read our Investor Pledge</a>
      </div>
    </main>
  );
}
