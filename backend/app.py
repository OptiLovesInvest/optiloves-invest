# app.py
import os
import time
import uuid
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# --- env ---
from dotenv import load_dotenv
load_dotenv()

# --- Optional Sentry (set SENTRY_DSN in env to enable) ---
try:
    import sentry_sdk
    from sentry_sdk.integrations.flask import FlaskIntegration
    SENTRY_DSN = os.environ.get("SENTRY_DSN", "").strip()
    if SENTRY_DSN:
        sentry_sdk.init(dsn=SENTRY_DSN, integrations=[FlaskIntegration()])
except Exception:
    pass

app = Flask(__name__)
CORS(app)

# --- Rate limiting ---
limiter = Limiter(get_remote_address, app=app, default_limits=["200 per hour"])

# --- Demo catalog (in-memory; resets on deploy) ---
PROPERTIES = [
    {"id": "kin-001", "title": "Kinshasa — Gombe Apartments", "price": 120000, "availableTokens": 4995},
    {"id": "lua-001", "title": "Luanda — Ilha Offices",       "price": 250000, "availableTokens": 2999},
]
def find_property(pid: str):
    return next((p for p in PROPERTIES if p["id"] == pid), None)

# --- Supabase (SDK if legacy key; otherwise REST) ---
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").strip()
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "").strip()
SUPABASE_MODE = os.environ.get("SUPABASE_MODE", "auto").lower()  # auto|rest|sdk

sb = None
def _use_sdk_with_key(key: str) -> bool:
    return "." in key and not key.startswith("sb_")

if SUPABASE_URL and SUPABASE_SERVICE_KEY and SUPABASE_MODE != "rest" and _use_sdk_with_key(SUPABASE_SERVICE_KEY):
    try:
        from supabase import create_client  # type: ignore
        sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        print("Supabase SDK enabled")
    except Exception as e:
        print("Supabase SDK init failed, falling back to REST:", e)
        sb = None
else:
    print("Supabase SDK disabled (using REST)")

def insert_order_row(row: dict):
    """
    Insert into public.orders.
    Uses SDK if available; otherwise REST (works with sb_secret_*).
    """
    if sb:
        return sb.table("orders").insert(row).execute()
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        raise RuntimeError("Supabase config missing")
    url = f"{SUPABASE_URL}/rest/v1/orders"
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    r = requests.post(url, headers=headers, json=row, timeout=10)
    if r.status_code not in (200, 201):
        raise RuntimeError(f"REST insert failed: {r.status_code} {r.text}")
    return r.json()

def update_order_status(order_id: str, status: str):
    if sb:
        return sb.table("orders").update({"status": status}).eq("id", order_id).execute()
    url = f"{SUPABASE_URL}/rest/v1/orders?id=eq.{order_id}"
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    r = requests.patch(url, headers=headers, json={"status": status}, timeout=10)
    if r.status_code not in (200, 204):
        raise RuntimeError(f"REST update failed: {r.status_code} {r.text}")
    return True

# --- Stripe ---
import stripe  # type: ignore
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "").strip()
stripe.api_key = STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "").strip()

# Where Stripe should return the user after payment
FRONTEND_BASE_URL = os.environ.get("FRONTEND_BASE_URL", "https://app.optilovesinvest.com")
# Keep MVP charge small (override via env)
CHECKOUT_PRICE_USD = int(os.environ.get("CHECKOUT_PRICE_USD", "1"))

def cents(usd: int) -> int:
    return int(usd) * 100

# --- Routes ---
@app.get("/health")
def health():
    return {"ok": True, "ts": int(time.time()), "ver": "buy-returns-url-v2"}

@app.get("/properties")
def properties():
    return jsonify(PROPERTIES)

@app.post("/buy")
@limiter.limit("10 per minute")
def buy():
    """
    Creates a PENDING order + Stripe Checkout session.
    We DO NOT decrement availability here; we do it on successful webhook.
    """
    data = request.get_json(force=True) or {}
    prop_id = str(data.get("property_id") or "").strip()
    wallet  = str(data.get("wallet") or "unknown")[:128]
    try:
        qty = int(data.get("quantity", 0))
    except Exception:
        qty = 0

    p = find_property(prop_id)
    if not p:
        return jsonify({"ok": False, "error": "not_found"}), 404
    if qty <= 0:
        return jsonify({"ok": False, "error": "bad_qty"}), 400

    order_id = f"order_{uuid.uuid4().hex[:16]}"

    # Log as PENDING (best-effort)
    try:
        insert_order_row({
            "id": order_id,
            "property_id": prop_id,
            "wallet": wallet,
            "quantity": qty,
            "unit_price_usd": CHECKOUT_PRICE_USD,
            "total_usd": CHECKOUT_PRICE_USD * qty,
            "status": "PENDING_PAYMENT",
            "ts": int(time.time()),
        })
    except Exception as e:
        print("Order logging failed:", e)

    success_url = f"{FRONTEND_BASE_URL}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order_id}"
    cancel_url  = f"{FRONTEND_BASE_URL}/checkout/cancel?order_id={order_id}"

    if not STRIPE_SECRET_KEY:
        # No key configured
        return jsonify({"ok": False, "error": "stripe_key_missing"}), 500

    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "order_id": order_id,
                "property_id": prop_id,
                "quantity": str(qty),
                "wallet": wallet,
            },
            line_items=[{
                "quantity": qty,
                "price_data": {
                    "currency": "usd",
                    "unit_amount": cents(CHECKOUT_PRICE_USD),
                    "product_data": {"name": p["title"]},
                },
            }],
        )
        print("BUY", order_id, "URL", session.url)
        return jsonify({"ok": True, "url": session.url, "order_id": order_id})
    except Exception as e:
        print("BUY_ERROR", order_id, str(e))
        return jsonify({"ok": False, "error": "stripe_failed", "detail": str(e)}), 500

@app.post("/stripe/webhook")
def stripe_webhook():
    """
    Handles checkout.session.completed.
    - Marks order as PAID
    - Decrements in-memory availability
    """
    payload = request.get_data(as_text=True)
    sig = request.headers.get("Stripe-Signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        md = session.get("metadata", {}) or {}
        order_id = md.get("order_id", "")
        prop_id = md.get("property_id", "")
        qty = int(md.get("quantity", "1") or "1")

        # Mark order paid (best-effort)
        try:
            if order_id:
                update_order_status(order_id, "PAID")
        except Exception as e:
            print("update_order_status failed:", e)

        # Decrement availability now that it's actually paid
        p = find_property(prop_id)
        if p:
            p["availableTokens"] = max(0, int(p["availableTokens"]) - qty)

    return jsonify({"ok": True})

@app.post("/airdrop")
def airdrop():
    data = request.get_json(force=True) or {}
    wallet = str(data.get("wallet","")).strip()
    if not wallet:
        return jsonify({"ok": False, "error": "wallet required"}), 400
    rpc_url = "https://api.devnet.solana.com"
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "requestAirdrop",
        "params": [wallet, 1_000_000_000]  # 1 SOL
    }
    try:
        r = requests.post(rpc_url, json=payload, timeout=15)
        j = r.json()
        if "result" in j:
            return jsonify({"ok": True, "tx": j["result"]})
        return jsonify({"ok": False, "error": j.get("error")}), 500
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

# (Optional) quick env debug
@app.get("/_debug")
def _debug():
    def mode(k): 
        return "test" if k.startswith("sk_test") else ("live" if k.startswith("sk_live") else "missing")
    return {
        "stripe_key_mode": mode(STRIPE_SECRET_KEY or ""),
        "webhook_set": bool(STRIPE_WEBHOOK_SECRET),
        "frontend_base_url": FRONTEND_BASE_URL,
        "price_per_unit_usd": CHECKOUT_PRICE_USD,
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))
