export default function Page({ params }: { params:{ slug:string } }) {
  return <main style={{padding:16}}>
    <h1>Property: {params.slug}</h1>
    <p>Details loading…</p>
  </main>;
}