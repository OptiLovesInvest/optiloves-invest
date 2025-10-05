from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.get("/health")
def health():
    return jsonify(status="ok"), 200

@app.get("/")
def home():
    # Empty 204 for root (Render health checks still pass via /health)
    return make_response("", 204)

@app.post("/api/buy")
def api_buy():
    data = request.get_json(silent=True) or {}
    property_id = data.get("property_id")
    try:
        quantity = int(data.get("quantity") or 1)
    except Exception:
        quantity = 1
    # TODO: replace with real checkout (Stripe, etc.)
    # Frontend can follow this URL (works now for e2e)
    return jsonify(ok=True, url="/thank-you", property_id=property_id, quantity=quantity), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=False)