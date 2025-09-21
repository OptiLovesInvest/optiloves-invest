import os, json
from flask import Blueprint, jsonify
from solana.rpc.api import Client
from solders.pubkey import Pubkey
from solana.rpc.types import TokenAccountOpts

bp = Blueprint("holdings", __name__)
RPC = os.getenv("SOLANA_RPC", "https://api.devnet.solana.com")
MINTS = json.loads(os.getenv("OPTILOVES_MINTS", "[]"))
client = Client(RPC)

def _rpc_value(r):
    try:
        return r.value
    except Exception:
        try:
            return r["result"]["value"]
        except Exception:
            return None

def get_token_balance(owner: str, mint: str) -> float:
    try:
        owner_pk = Pubkey.from_string(owner)
        mint_pk = Pubkey.from_string(mint)
        opts = TokenAccountOpts(mint=mint_pk, encoding="jsonParsed")
        accs_resp = client.get_token_accounts_by_owner(owner_pk, opts)
        accs = _rpc_value(accs_resp) or []
        total = 0.0
        for a in accs:
            ata = a.get("pubkey") if isinstance(a, dict) else None
            if not ata:
                continue
            bal_resp = client.get_token_account_balance(Pubkey.from_string(str(ata)))
            val = getattr(bal_resp, "value", None) or (bal_resp.get("result", {}) or {}).get("value", {})
            ui = (val or {}).get("uiAmount", 0) or (val or {}).get("ui_amount", 0)
            total += float(ui or 0)
        return round(total, 6)
    except Exception:
        return 0.0

@bp.get("/api/portfolio/<owner>")
def portfolio(owner):
    rows = []
    for m in MINTS:
        bal = get_token_balance(owner, m["mint"])
        price = float(m.get("price", 0))
        rows.append({
            "propertyId": m["id"],
            "mint": m["mint"],
            "balance": bal,
            "price": price,
            "estValue": round(bal * price, 2),
        })
    return jsonify({"owner": owner, "items": rows})
@bp.get('/api/ping')
def ping():
    return jsonify({'ok': True, 'bp': 'holdings'})
