export default async function Page() {
  const res = await fetch("http://127.0.0.1:5000/orders", { cache: "no-store" });
  const orders = await res.json();
  return (
    <main style={{ padding: 24 }}>
      <h1>Orders</h1>
      {orders.length ? (
        <ul>{orders.map((o:any,i:number)=><li key={i}>{o.quantity} × {o.id} — ${o.total}</li>)}</ul>
      ) : "No orders yet."}
    </main>
  );
}
