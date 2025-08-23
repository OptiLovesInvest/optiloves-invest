import Link from "next/link";

export type Property = {
  id: string;
  title: string;
  price: number;
  availableTokens: number;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <div className="group rounded-2xl border border-neutral-200/60 bg-white/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-4">
      <div className="h-32 w-full rounded-xl bg-gradient-to-br from-[#2e7d32] via-[#f9a825] to-[#c62828] opacity-90 group-hover:opacity-100 transition" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
          {p.title}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">ID: {p.id}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-neutral-50 border border-neutral-200/70 p-3">
            <p className="text-neutral-500">Price (USD)</p>
            <p className="font-semibold">${fmt(p.price)}</p>
          </div>
          <div className="rounded-lg bg-neutral-50 border border-neutral-200/70 p-3">
            <p className="text-neutral-500">Available</p>
            <p className="font-semibold">{fmt(p.availableTokens)} tokens</p>
          </div>
        </div>
      </div>
      <Link
        href={`/property/${p.id}`}
        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 transition w-full"
      >
        View details
      </Link>
    </div>
  );
}

