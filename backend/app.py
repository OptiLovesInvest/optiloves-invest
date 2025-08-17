# app.py — Stripe + Postgres + CORS (business-ready MVP)
import os, decimal
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import stripe

from sqlalchemy import create_engine, Column, Integer, String, Numeric, select, text, UniqueConstraint
from sqlalchemy.orm import sessionmaker, declarative_base

# ---------- Config ----------
DATABASE_URL = os.environ.get("DATABASE_URL")  # e.g. postgres://... from Render Postgres
FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "*")  # set to your Vercel URL
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": FRONTEND_ORIGIN}})

stripe.api_key = STRIPE_SECRET_KEY

# ---------- DB setup ----------
Base = declarative_base()
engine = create_engine(DATABASE_URL, pool_pre_ping=True) if DATABASE_URL else create_engine("sqlite:///local.db")
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

class Property(Base):
    __tablename__ = "properties"
    id = Column(String, primary_key=True)           # e.g., "kin-001"
    title = Column(String, nullable=False)
    price = Column(Integer, nullable=False)         # USD per token (integer dollars)
    available_tokens = Column(Integer, nullable=False)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    property_id = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    email = Column(String, nullable=True)
    stripe_session_id = Column(String, nullable=False)
    amount_usd = Column(Integer, nullable=False)
    __table_args__ = (UniqueConstraint("stripe_session_id", name="uq_orders_stripe_session"),)

def init_db():
    Base.metadata.create_all(engine)
    # seed baseline properties if missing
    with SessionLocal() as s:
        existing = {p.id for p in s.execute(select(Property)).scalars()}
        seeds = [
            ("kin-001", "Kinshasa — Gombe Apartments", 120_000, 4995),
            ("lua-001", "Luanda — Ilha Offices",       250_000, 2999),
        ]
        for pid, title, price, avail in seeds:
            if pid not in existing:
                s.add(Property(id=pid, title=title, price=price, available_tokens=avail))
        s.commit()

init_db()

# ---------- Routes ----------
@app.get("/")
def root():
    return jsonify({"ok": True, "service": "optiloves-backend"})

@app.get("/health")
def health():
    return jsonify({"ok": True})

@app.get("/properties")
def list_properties():
    with SessionLocal() as s:
        rows = s.execute(select(Property)).scalars().all()
        return jsonify([
            {
                "id": r.id,
                "title": r.title,
                "price": int(r.price),
                "availableTokens": int(r.available_tokens),
            } for r in rows
        ])

@app.post("/checkout")
def checkout():
    if not STRIPE_SECRET_KEY:
        abort(400, "Stripe not configured (missing STRIPE_SECRET_KEY)")
    data = request.get_json(force=True) or {}
    prop_id = data.get("property_id")
    qty = int(data.get("quantity", 1))
    email = (data.get("email") or "").strip() or None

    if qty < 1: abort(400, "Invalid quantity")

    with SessionLocal() as s:
        p = s.get(Property, prop_id)
        if not p: abort(400, "Property not found")
        if p.available_tokens < qty: abort(400, "Not enough tokens available")

        # Stripe price in cents
        unit_amount_cents = int(p.price) * 100

        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                customer_email=email,
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {"name": p.title, "metadata": {"property_id": p.id}},
                        "unit_amount": unit_amount_cents,
                    },
                    "quantity": qty,
                }],
                success_url=f"{FRONTEND_ORIGIN}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{FRONTEND_ORIGIN}/checkout/cancel",
                metadata={"property_id": p.id, "quantity": str(qty), "email": email or ""},
            )
            return jsonify({"ok": True, "checkout_url": session.url})
        except Exception as e:
            abort(400, f"Stripe error: {e}")

@app.post("/stripe/webhook")
def stripe_webhook():
    if not STRIPE_WEBHOOK_SECRET:
        abort(400, "Webhook secret not set")

    payload = request.data
    sig_header = request.headers.get("Stripe-Signature", "")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except Exception as e:
        return str(e), 400

    if event["type"] == "checkout.session.completed":
        sess = event["data"]["object"]
        session_id = sess.get("id")
        meta = sess.get("metadata") or {}
        prop_id = meta.get("property_id")
        qty = int(meta.get("quantity", "1"))
        email = meta.get("email") or (sess.get("customer_details") or {}).get("email")
        amount_total = int((sess.get("amount_total") or 0) / 100)

        with SessionLocal() as s:
            # idempotent: skip if already recorded
            exists = s.execute(select(Order).where(Order.stripe_session_id == session_id)).first()
            if not exists:
                # decrement inventory
                p = s.get(Property, prop_id)
                if p:
                    p.available_tokens = max(0, int(p.available_tokens) - qty)
                # record order
                s.add(Order(
                    property_id=prop_id,
                    quantity=qty,
                    email=email,
                    stripe_session_id=session_id,
                    amount_usd=amount_total,
                ))
                s.commit()

    return "", 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port)
