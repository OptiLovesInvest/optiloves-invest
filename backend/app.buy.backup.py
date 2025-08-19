# app.py
import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import stripe

app = Flask(__name__)

# Allow only your frontend in production. For now, accept FRONTEND_ORIGIN or fallback "*".
CORS(app, resources={r"/*": {"origins": os.environ.get("FRONTEND_ORIGIN", "*")}})

# Stripe config (set STRIPE_SECRET_KEY & STRIPE_WEBHOOK_SECRET in Render)
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")

# Demo in-memory store (replace with Postgres later)
PROPERTIES = [
    {"id": "kin-001", "title": "Kinshasa â€” Gombe Apartments", "price": 120_000, "availableTokens": 4995},
    {"id": "lua-001", "title": "Luanda â€” Ilha Offices",       "price": 250_000, "availableTokens": 2999},
]

@app.get("/")
def root():
    return jsonify({"ok": True, "service": "optiloves-backend"})

@app.get("/health")
def health():
    return jsonify({"ok": True})

@app.get("/properties")
def list_properties():
    return jsonify(PROPERTIES)

# Optional demo airdrop stub (safe to remove if unused)
@app.post("/airdrop")
def airdrop():
    data = request.get_json(force=True) or {}
    wallet = data.get("wallet")
    sol = float(data.get("sol", 1))
    return jsonify({"ok": True, "wallet": wallet, "sol": sol, "tx_signature": "demo-tx-123456"})

# Create Stripe Checkout Session
@app.post("/checkout")
def checkout():
    data = request.get_json(force=True) or {}
    prop_id = data.get("property_id")
    qty = int(data.get("quantity", 1))

    prop = next((p for p in PROPERTIES if p["id"] == prop_id), None)
    if not prop or qty < 1:
        abort(400, "Invalid property or quantity")

    if not stripe.api_key:
        abort(400, "Stripe not configured (missing STRIPE_SECRET_KEY)")

    # IMPORTANT: confirm 'price' is USD per token.
    unit_amount_usd = prop["price"]             # e.g. 1 == $1  (yours is 120_000 == $120,000)
    amount_cents = unit_amount_usd * 100

    origin = os.environ.get("FRONTEND_ORIGIN", "https://example.com")
    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": prop["title"], "metadata": {"property_id": prop_id}},
                    "unit_amount": amount_cents,
                },
                "quantity": qty,
            }],
            success_url=f"{origin}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{origin}/checkout/cancel",
            metadata={"property_id": prop_id, "quantity": str(qty)},
        )
        return jsonify({"ok": True, "checkout_url": session.url})
    except Exception as e:
        abort(400, f"Stripe error: {e}")

# Stripe webhook to finalize orders and decrement tokens
@app.post("/stripe/webhook")
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature", "")
    secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, secret)
    except Exception as e:
        return str(e), 400

    if event["type"] == "checkout.session.completed":
        sess = event["data"]["object"]
        pid = (sess.get("metadata") or {}).get("property_id")
        qty = int((sess.get("metadata") or {}).get("quantity", "1"))
        for p in PROPERTIES:
            if p["id"] == pid:
                p["availableTokens"] = max(0, p["availableTokens"] - qty)
                break
        # TODO: persist order + token decrement to Postgres here

    return "", 200

# --- AUTO-INJECT: force $50 per token on /properties ---
import json
from flask import request

@app.after_request
def _force_token_price_50(resp):
    try:
        if request.path.rstrip('/') == "/properties":
            data = None
            try:
                data = resp.get_json(silent=True)
            except Exception:
                pass
            if data is None:
                raw = resp.get_data(as_text=True)
                try:
                    data = json.loads(raw)
                except Exception:
                    return resp  # not JSON, leave untouched

            def fix_item(it):
                if isinstance(it, dict) and it.get("id") in ("kin-001", "lua-001"):
                    it["price"] = 50
                return it

            if isinstance(data, list):
                data = [fix_item(x) for x in data]
            elif isinstance(data, dict):
                if isinstance(data.get("value"), list):
                    data["value"] = [fix_item(x) for x in data["value"]]
                else:
                    data = fix_item(data)

            resp.set_data(json.dumps(data, ensure_ascii=False))
            resp.headers["Content-Type"] = "application/json; charset=utf-8"
    except Exception:
        pass
    return resp
# --- END AUTO-INJECT ---

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port)

