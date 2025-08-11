from flask import Flask, jsonify

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)
