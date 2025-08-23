"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center p-8 bg-neutral-50">
        <div className="max-w-md w-full rounded-2xl border bg-white p-6 text-center space-y-4">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-neutral-600 text-sm">Please try again. If the problem persists, contact support.</p>
          {error?.digest && <p className="text-[10px] text-neutral-400">Ref: {error.digest}</p>}
          <button onClick={() => reset()} className="rounded-lg bg-black text-white px-4 py-2 text-sm">Try again</button>
        </div>
      </body>
    </html>
  );
}
