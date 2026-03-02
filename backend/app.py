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


# ---------------------------
# Optiloves Invest — API (Apply)
# Stability-first minimal routes
# ---------------------------
from flask import request, jsonify
import os

def _opti_require_api_key():
    expected = os.getenv("OPTILOVES_API_KEY") or os.getenv("OPTI_API_KEY")
    # If no key configured, fail closed (security-first)
    if not expected:
        return jsonify({"ok": False, "error": "Server missing OPTILOVES_API_KEY"}), 500

    got = request.headers.get("x-api-key", "")
    if not got or got != expected:
        return jsonify({"ok": False, "error": "Unauthorized"}), 401
    return None

@app.get("/api/ping")
def api_ping():
    gate = _opti_require_api_key()
    if gate: return gate
    return jsonify({"ok": True})

@app.get("/api/routes")
def api_routes():
    gate = _opti_require_api_key()
    if gate: return gate
    # Return a simple list of routes for debugging (no secrets)
    out = []
    try:
        for r in app.url_map.iter_rules():
            out.append({"rule": str(r), "methods": sorted([m for m in r.methods if m not in ("HEAD","OPTIONS")])})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500
    return jsonify({"ok": True, "routes": out})

@app.post("/api/apply")
def api_apply():
    gate = _opti_require_api_key()
    if gate: return gate

    body = request.get_json(silent=True) or {}

    amount = body.get("amount", body.get("allocation", body.get("amount_usd", 0)))
    try:
        amount = float(amount)
    except Exception:
        return jsonify({"ok": False, "error": "Invalid amount"}), 400

    if amount < 100 or amount > 1000:
        return jsonify({"ok": False, "error": "Amount must be between 100 and 1000"}), 400

    # Minimal acceptance response (storage can be added next)
    return jsonify({
        "ok": True,
        "received": {
            "full_name": (body.get("full_name") or "").strip(),
            "email": (body.get("email") or "").strip(),
            "phone": (body.get("phone") or "").strip(),
            "country": (body.get("country") or "").strip(),
            "wallet": (body.get("wallet") or "").strip(),
            "amount": amount,
            "note": (body.get("note") or "").strip(),
        }
    })
