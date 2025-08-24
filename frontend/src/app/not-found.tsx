import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-neutral-600 mt-2">The page youâ€™re looking for doesnâ€™t exist.</p>
      <Link href="/" className="mt-6 rounded-xl bg-black text-white px-4 py-2 text-sm">Go home</Link>
    </main>
  );
}
