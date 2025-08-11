'use client';
import { useEffect, useState } from 'react';
type Prop = { id: string; title: string };

export default function Home() {
  const [list, setList] = useState<Prop[]>([]);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/properties')
      .then(r => r.json()).then(setList)
      .catch(e => setErr(e.message));
  }, []);

  if (err) return <main style={{padding:20}}>Error: {err}</main>;

  return (
    <main style={{ padding: 20 }}>
      <h2>Properties</h2>
      {list.map(p => (
        <div key={p.id} style={{ border:'1px solid #ccc', padding:10, margin:'10px 0' }}>
          <h3><a href={`/property/${p.id}`}>{p.title}</a></h3>
          <button>Invest (demo)</button>
        </div>
      ))}
    </main>
  );
}
