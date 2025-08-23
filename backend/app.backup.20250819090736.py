from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os, io, csv, json, time, smtplib, uuid
from email.message import EmailMessage

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------- DB helpers --------------------
BASE_DIR = os.path.dirname(__file__)
DB_FILE  = os.path.join(BASE_DIR, "db.json")
KYC_FILE = os.path.join(BASE_DIR, "kyc.json")
ORD_FILE = os.path.join(BASE_DIR, "orders.json")
OUTBOX   = os.path.join(BASE_DIR, "outbox")

def _ensure_outbox():
    try: os.makedirs(OUTBOX, exist_ok=True)
    except Exception: pass

def _db_seed():
    return {
        "properties": {
            "kin-001": {"id":"kin-001","title":"Kinshasa — Gombe Apartments","price":120000,"availableTokens":4997},
            "lua-001": {"id":"lua-001","title":"Luanda — Ilha Offices","price":250000,"availableTokens":3000},
        }
    }

def _db_load():
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        obj = _db_seed()
        _db_save(obj)
        return obj

def _db_save(obj):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

# -------------------- Properties --------------------
@app.route("/properties", methods=["GET"])
def list_properties():
    db = _db_load()
    items = list(db.get("properties", {}).values())
    return jsonify({"value": items, "Count": len(items)})

# -------------------- Buy (MVP – no decrement here) --------------------
@app.route("/buy", methods=["POST", "OPTIONS"])
def buy():
    if request.method == "OPTIONS":
        return ("", 204)
    data = request.get_json(silent=True) or {}
    pid  = str(data.get("property_id","")).strip()
    qty  = int(data.get("quantity", 0) or 0)
    if not pid or qty <= 0:
        return jsonify(ok=False, error="invalid request"), 400
    # In prod you would create a Stripe Checkout Session here.
    session_id = f"sess_{uuid.uuid4().hex[:12]}"
    url = f"https://checkout.stripe.com/pay/{session_id}"  # placeholder
    return jsonify(ok=True, order_id=session_id, url=url)

# -------------------- KYC store (demo) --------------------
def _kyc_load():
    try:
        with open(KYC_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def _kyc_save(items):
    try:
        with open(KYC_FILE, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

@app.route("/kyc", methods=["POST"])
def kyc_post():
    data = request.get_json(silent=True) or {}
    full_name = str(data.get("full_name","")).strip()
    email     = str(data.get("email","")).strip()
    country   = str(data.get("country","")).strip()
    id_number = str(data.get("id_number","")).strip()
    if not (full_name and email and country and id_number):
        return jsonify(ok=False, error="missing fields"), 400
    items = _kyc_load()
    items.append({
        "full_name": full_name,
        "email": email,
        "country": country,
        "id_number": id_number,  # stored server-side
        "ts": int(time.time()),
    })
    _kyc_save(items)
    return jsonify(ok=True)

@app.route("/kyc", methods=["GET"])
def kyc_get():
    items = _kyc_load()
    red = [{k:v for k,v in it.items() if k!="id_number"} for it in items]
    return jsonify({"value": red, "Count": len(red)})

# -------------------- Admin guards --------------------
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "devadmin")
def _is_admin(req):
    tok = req.headers.get("X-Admin-Token") or req.args.get("token") or ""
    return tok == ADMIN_TOKEN

# -------------------- Admin KYC export --------------------
@app.route("/admin/kyc.json", methods=["GET"])
def kyc_admin_json():
    if not _is_admin(request):
        return jsonify(ok=False, error="unauthorized"), 401
    return jsonify(_kyc_load())

@app.route("/admin/kyc.csv", methods=["GET"])
def kyc_admin_csv():
    if not _is_admin(request):
        return ("unauthorized", 401)
    items = _kyc_load()
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["full_name","email","country","id_number","ts"])
    writer.writeheader()
    for it in items:
        writer.writerow({
            "full_name": it.get("full_name",""),
            "email": it.get("email",""),
            "country": it.get("country",""),
            "id_number": it.get("id_number",""),
            "ts": it.get("ts",""),
        })
    data = output.getvalue()
    resp = make_response("\ufeff" + data)
    resp.headers["Content-Type"] = "text/csv; charset=utf-8"
    resp.headers["Content-Disposition"] = "attachment; filename=kyc.csv"
    return resp

# -------------------- Orders + email receipts --------------------
def _orders_load():
    try:
        with open(ORD_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def _orders_save(items):
    try:
        with open(ORD_FILE, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

def _send_receipt(to_email, order):
    if not to_email:
        return False, "no email"
    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    pwd  = os.environ.get("SMTP_PASS")
    sender = os.environ.get("SMTP_FROM", "no-reply@optiloves.local")
    subject = f"Receipt • Order {order.get('order_id','')}"
    body = (
        f"Thank you for your purchase!\n\n"
        f"Order: {order.get('order_id','')}\n"
        f"Property: {order.get('property_id','')}\n"
        f"Quantity: {order.get('quantity',0)}\n"
        f"Price per token: ${order.get('price_per_token',0)}\n"
        f"Total: ${order.get('total',0)}\n"
        f"Date: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(order.get('ts',time.time())))}\n"
    )
    try:
        if host and user and pwd:
            msg = EmailMessage()
            msg["From"] = sender
            msg["To"] = to_email
            msg["Subject"] = subject
            msg.set_content(body)
            with smtplib.SMTP(host, port, timeout=15) as s:
                s.starttls()
                s.login(user, pwd)
                s.send_message(msg)
            return True, "sent smtp"
        else:
            _ensure_outbox()
            fn = os.path.join(OUTBOX, f"receipt-{order.get('order_id','')}.txt")
            with open(fn, "w", encoding="utf-8") as f:
                f.write(f"To: {to_email}\nFrom: {sender}\nSubject: {subject}\n\n{body}")
            return True, "saved to outbox"
    except Exception as e:
        _ensure_outbox()
        fn = os.path.join(OUTBOX, f"receipt-{order.get('order_id','')}-error.txt")
        try:
            with open(fn, "w", encoding="utf-8") as f:
                f.write(str(e))
        except Exception:
            pass
        return False, str(e)

@app.route("/orders/confirm", methods=["POST"])
def orders_confirm():
    data = request.get_json(silent=True) or {}
    pid   = str(data.get("property_id","")).strip()
    qty   = int(data.get("quantity",0) or 0)
    email = str(data.get("email","")).strip()
    client_order_id = str(data.get("order_id","")).strip()
    if not pid or qty <= 0:
        return jsonify(ok=False, error="invalid request"), 400

    # MVP price policy
    price_per = 50
    total = price_per * qty
    ts = int(time.time())
    order_id = client_order_id or f"ord_{uuid.uuid4().hex[:10]}"

    # Decrement availability
    db = _db_load()
    props = db.get("properties", {})
    prop = props.get(pid) or {}
    avail = int(prop.get("availableTokens", 0))
    if avail < qty:
        return jsonify(ok=False, error="insufficient availability"), 409
    prop["availableTokens"] = avail - qty
    props[pid] = prop
    db["properties"] = props
    _db_save(db)

    order = {
        "order_id": order_id,
        "property_id": pid,
        "quantity": qty,
        "price_per_token": price_per,
        "total": total,
        "email": email,
        "status": "paid",
        "ts": ts,
        "source": data.get("source","web"),
    }
    orders = _orders_load()
    orders.append(order)
    _orders_save(orders)

    sent, how = _send_receipt(email, order)
    return jsonify(ok=True, order=order, emailed=sent, via=how)

@app.route("/admin/orders.json", methods=["GET"])
def orders_admin_json():
    if not _is_admin(request):
        return jsonify(ok=False, error="unauthorized"), 401
    return jsonify(_orders_load())

@app.route("/admin/orders.csv", methods=["GET"])
def orders_admin_csv():
    if not _is_admin(request):
        return ("unauthorized", 401)
    items = _orders_load()
    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames=["order_id","property_id","quantity","price_per_token","total","email","status","ts","source"])
    writer.writeheader()
    for it in items:
        writer.writerow({
            "order_id": it.get("order_id",""),
            "property_id": it.get("property_id",""),
            "quantity": it.get("quantity",""),
            "price_per_token": it.get("price_per_token",""),
            "total": it.get("total",""),
            "email": it.get("email",""),
            "status": it.get("status",""),
            "ts": it.get("ts",""),
            "source": it.get("source",""),
        })
    data = out.getvalue()
    resp = make_response("\ufeff" + data)
    resp.headers["Content-Type"] = "text/csv; charset=utf-8"
    resp.headers["Content-Disposition"] = "attachment; filename=orders.csv"
    return resp

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)