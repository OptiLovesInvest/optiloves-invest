// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import BackendStatus from "../components/BackendStatus";
import { getProperties } from "../lib/api";

export const dynamic = "force-dynamic";

type Prop = {
  id: string;
  title: string;
  price: number;           // USD per token (integer)
  availableTokens: number; // tokens left
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default async function Home() {
  let props: Prop[] = [];
  try {
    props = await getProperties();
  } catch {
    // keep empty; we’ll show a friendly message below
  }

  return (
    <>
      {/* Top-right live status pill */}
      <BackendStatus className="fixed top-3 right-3 z-50 bg-white/90 backdrop-blur border-gray-200 shadow-sm text-gray-800" />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-green-700 via-yellow-400 to-red-600 text-white">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay" />
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-10 md:px-10">
          <div className="shrink-0">
            <Image
              src="/logo-optiloves.png"
              alt="Optiloves Invest"
              width={84}
              height={84}
              className="rounded-xl ring-1 ring-white/30"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
              Optiloves Invest
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base">
              Tokenized access to African real estate. $1 per token.
            </p>
            <p className="mt-1 text-xs md:text-sm opacity-90 tracking-wide">
              FROM CONSUMER TO HAPPY INVESTOR
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/properties"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow hover:shadow-md transition"
              >
                View Properties
              </Link>
              <a
                href="#list"
                className="rounded-xl border border-white/60 px-4 py-2 text-sm font-medium text-white/95 hover:bg-white/10 transition"
              >
                Explore Tokens
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="list" className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Properties</h2>
          <Link href="/properties" className="text-sm underline hover:no-underline">
            See all
          </Link>
        </div>

        {props.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-sm text-gray-600">
            No properties to show right now. Please refresh in a moment.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.map((p) => (
              <li
                key={p.id}
                className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 text-sm text-gray-500">{p.id.toUpperCase()}</div>
                <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                  {p.title}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-sm">
                    {formatUSD(p.price)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Tokens left: <span className="font-medium text-gray-800">{p.availableTokens}</span>
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/property/${p.id}`}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                  >
                    Buy
                  </Link>
                  <Link
                    href={`/properties/${p.id}`}
                    className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* TRUST NOTE */}
      <section className="mt-10">
        <div className="rounded-2xl border bg-white p-5 text-xs text-gray-600">
          Prices shown are per token (USD). Availability updates in real time.
        </div>
      </section>
    </>
  );
}
