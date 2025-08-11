from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
from flask_cors import CORS
CORS(app)


DETAILS = {
    "kin-001": {
        "id": "kin-001",
        "title": "Kinshasa — Gombe Apartments",
        "city": "Kinshasa",
        "country": "DR Congo",
        "price_usd": 250000,
        "token_price_usd": 50,
        "available_tokens": 5000,
        "description": "Modern apartments in Gombe with strong rental demand.",
        "images": ["https://picsum.photos/seed/gombe/1200/600"]
    },
    "lua-001": {
        "id": "lua-001",
        "title": "Luanda — Ilha Offices",
        "city": "Luanda",
        "country": "Angola",
        "price_usd": 480000,
        "token_price_usd": 100,
        "available_tokens": 4800,
        "description": "Prime offices on Ilha do Cabo, close to embassies and banks.",
        "images": ["https://picsum.photos/seed/ilha/1200/600"]
    }
}

@app.get("/")
def index():
    return "Backend is running"

@app.get("/health")
def health():
    return jsonify({"ok": True})

@app.get("/properties")
def properties():
    return jsonify([
        {"id": "kin-001", "title": "Kinshasa — Gombe Apartments"},
        {"id": "lua-001", "title": "Luanda — Ilha Offices"}
    ])

@app.get("/properties/<prop_id>")
def property_detail(prop_id):
    data = DETAILS.get(prop_id)
    if not data:
        return jsonify({"error": "Not found"}), 404
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
