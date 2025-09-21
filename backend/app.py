from flask import Flask, jsonify, Response

app = Flask(__name__)

@app.get("/properties")
def get_properties():
    return {
        "value": [
            {"id": "kin-001", "title": "Kinshasa — Gombe Apartments"},
            {"id": "lua-001", "title": "Luanda — Ilha Offices"}
        ],
        "Count": 2
    }

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/_routes")
def routes_dump():
    return {"routes": sorted([r.rule for r in app.url_map.iter_rules()])}

@app.get("/api/portfolio/<owner>")
def portfolio_direct(owner: str):
    from solana_holdings import get_token_balance, MINTS
    rows = []
    for m in MINTS:
        bal = get_token_balance(owner, m["mint"])
        price = float(m.get("price", 0))
        rows.append({
            "propertyId": m["id"],
            "mint": m["mint"],
            "balance": bal,
            "price": price,
            "estValue": round(bal * price, 2)
        })
    return {"owner": owner, "items": rows}

@app.get("/account")
def account():
    return Response("""<!doctype html>
<html><head><meta charset="utf-8"><title>Optiloves — Dashboard</title>
<style>body{font:14px system-ui;margin:20px}table{border-collapse:collapse;margin-top:12px}td,th{border:1px solid #ddd;padding:6px 8px}</style>
</head><body>
<h2>Portfolio</h2>
<input id="w" placeholder="Phantom public key" style="width:420px">
<button onclick="load()">Load</button>
<div id="out"></div>
<script>
async function load(){
  const w=document.getElementById('w').value.trim();
  if(!w){alert('Enter wallet');return;}
  const r=await fetch(`/api/portfolio/${w}`);
  if(!r.ok){document.getElementById('out').textContent='Error '+r.status;return;}
  const j=await r.json();
  const rows=j.items||[];
  let total=0; rows.forEach(x=> total+= (x.estValue||0));
  let html = `<p><b>Owner:</b> ${j.owner}</p><p><b>Total:</b> $${total.toFixed(2)}</p>`;
  html += '<table><tr><th>Property</th><th>Mint</th><th>Balance</th><th>Price</th><th>Est. Value</th></tr>';
  for (const x of rows){
    html += `<tr><td>${x.propertyId}</td><td>${x.mint}</td><td>${x.balance}</td><td>$${x.price}</td><td>$${x.estValue}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('out').innerHTML=html;
}
</script>
</body></html>""", mimetype="text/html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050)
