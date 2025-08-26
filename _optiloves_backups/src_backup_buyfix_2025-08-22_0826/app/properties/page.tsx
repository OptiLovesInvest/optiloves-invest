export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
  const res = await fetch(`${base}/properties`, { cache: "no-store" });
  const list = await res.json();
  return (
    <main>
      <h1>Properties</h1>
      <ul>
        {list.map((p:any) => (
          <li key={p.id}><a href={`/property/${p.id}`}>{p.title}</a></li>
        ))}
      </ul>
    </main>
  );
}
