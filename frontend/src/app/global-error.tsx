"use client";
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <main className="min-h-screen grid place-items-center p-8 text-center">
          <div>
            <h1 className="text-3xl font-bold">App error</h1>
            <p className="mt-2">We’ve logged it and will fix ASAP.</p>
            {error?.digest && <code className="block mt-3 opacity-60">Ref: {error.digest}</code>}
            <button onClick={() => location.reload()} className="mt-4 underline">Reload</button>
          </div>
        </main>
      </body>
    </html>
  );
}

