"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error("SegmentError:", error);
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-bold">We hit a snag</h1>
      <p className="text-sm text-gray-600">Ref: {error.digest ?? "n/a"}</p>
      <button onClick={reset} className="mt-3 rounded border px-3 py-1">Retry</button>
    </div>
  );
}

