export default function Page(){
  return (
    <main style={{padding:24}}>
      <h1>Thank you</h1>{typeof window!=="undefined" && new URLSearchParams(window.location.search).get("oid") ? <p>Order: {new URLSearchParams(window.location.search).get("oid")}</p> : null}
      <p>Your request was received. We’ll be in touch shortly.</p>
    </main>
  );
}

