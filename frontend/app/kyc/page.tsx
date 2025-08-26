export const dynamic = "force-dynamic";

import { properties } from "@/lib/properties";

type Search = { [key: string]: string | string[] | undefined };

export default function KycPage({ searchParams }: { searchParams: Search }) {
  const asset = typeof searchParams.asset === "string" ? searchParams.asset : undefined;
  const p = properties.find(x => x.id === asset);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Start KYC</h1>
      <p className="mt-2 text-gray-600">
        To buy tokens you must complete identity verification.
      </p>

      <div className="mt-6 rounded-2xl border p-4 bg-white">
        <div className="font-medium">Selected asset</div>
        {p ? (
          <p className="mt-1 text-sm text-gray-700">
            {p.city} — {p.title} · ${p.pricePerTokenUsd} per token
          </p>
        ) : (
          <p className="mt-1 text-sm text-gray-700">No asset selected.</p>
        )}
      </div>

      <ol className="mt-6 list-decimal pl-5 space-y-3 text-sm text-gray-700">
        <li>Provide your legal name and date of birth.</li>
        <li>Submit a government ID (photo).</li>
        <li>Confirm residency and source of funds.</li>
      </ol>

      <div className="mt-6 flex gap-3">
        <a href="/contact" className="rounded-xl px-5 py-3 border border-gray-300 hover:bg-gray-50 transition">
          Ask a question
        </a>
        <a href="/contact?topic=kyc" className="rounded-xl px-5 py-3 bg-black text-white shadow-md hover:shadow-lg transition">
          Continue (manual process)
        </a>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        For stability, KYC is handled manually at this stage. You&apos;ll receive step-by-step instructions after you contact us.
      </p>
    </section>
  );
}