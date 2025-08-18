# backend/app.py
import os
import json
import time
import uuid
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe

# ---- Config ---------------------------------------------------------------

# Stripe (keep your LIVE key in Render env)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Frontend base (no trailing slash is enforced)
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://app.optilovesinvest.com").rstrip("/")

# Price per token (USD) for MVP – change later if needed
USD_PER_TOKEN = float(os.getenv("USD_PER_TOKEN", "1.0"))

# Paths
ROOT = Path(__file__).resolve().parent
PROPERTIES_JSON = ROOT / "properties.json"

# ---- App ------------------------------------------------------------------

app = Flask(__name__)

# CORS: allow your dev + preview + production frontends
CORS(
    app,
    resources={r"*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:3001",
            "https://*.vercel.app",
            "https://app.optilovesinvest.com",
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
    }}
)

# ---- Helpers --------------------------------------------------------------

def load_properties():
    if PROPERTIES_JSON.exists():
        with PROPERTIES_JSON.open("r", encoding="utf-8") as f:
            return json.load(f)
    # Fallback (shouldn't happen in your repo)
    return []

def find_property(prop_id: str):
    for p in load_properties():
        if p.get("id") == prop_id:
            return p
    return None

def mk_order_id() -> str:
    return f"order_{uuid.uuid4().hex[:16]}"

# ---- Routes ---------------------------------------------------------------

@app.get("/health")
def health():
    return jsonify({"ok": True, "ts": int(time.time()), "ver": "buy-returns-url-v4"})


@app.get("/properties")
def properties():
    """
    Returns the simple list used by the frontend:
    [{ id, title, price, availableTokens }]
    """
    return jsonify(load_properties())

@app.post("/buy")
def buy():
    """
    Creates a Stripe Checkout Session and returns its URL.
    Body: { property_id: str, quantity: int, wallet: str }
    Response: { ok: true, order_id: str, url: str }
    """
    try:
        data = request.get_json(force=True) or {}
        property_id = str(data.get("property_id", "")).strip()
        quantity = int(data.get("quantity", 1))
        wallet = str(data.get("wallet", "")).strip()

        if not property_id:
            return jsonify({"ok": False, "error": "property_id required"}), 400
        if quantity < 1:
            quantity = 1  # clamp minimal
        if quantity > 1000:
            quantity = 1000  # guardrail

        prop = find_property(property_id)
        if not prop:
            return jsonify({"ok": False, "error": f"unknown property_id: {property_id}"}), 404

        # MVP token pricing: $1 per token (change when you want real pricing)
        unit_amount_cents = int(round(USD_PER_TOKEN * 100))

        # Build clean return URLs
        success_url = f"{FRONTEND_URL}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{FRONTEND_URL}/checkout/cancel"

        # Create Stripe Checkout Session (Live if you set a live key)
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": f"{prop.get('title', 'Optiloves')} ({property_id})",
                        # Optionally include an image URL here if you have one
                    },
                    "unit_amount": unit_amount_cents,
                },
                "quantity": quantity,
            }],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "property_id": property_id,
                "wallet": wallet,
                "quantity": str(quantity),
                "order_hint": "tokenized_real_estate",
            },
            # You can restrict payment methods or enable automatic_tax later if needed
        )

        order_id = mk_order_id()
        return jsonify({"ok": True, "order_id": order_id, "url": session.url})

    except stripe.error.StripeError as e:
        # Known Stripe errors
        return jsonify({"ok": False, "error": str(e)}), 400
    except Exception as e:
        # Unexpected exceptions
        return jsonify({"ok": False, "error": f"server_error: {e}"}), 500


# (Optional) simple /airdrop stub so builds never fail if called; safe no-op
@app.post("/airdrop")
def airdrop_stub():
    return jsonify({"ok": False, "error": "airdrop_not_enabled"}), 501


# ---- Local dev ------------------------------------------------------------

if __name__ == "__main__":
    # For local testing only. In Render, Gunicorn will run the app.
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
