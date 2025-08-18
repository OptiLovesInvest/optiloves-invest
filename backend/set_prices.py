import os, sys, pathlib
from sqlalchemy import create_engine, text

def get_engine():
    url = os.getenv("DATABASE_URL")
    if url:
        return create_engine(url, pool_pre_ping=True)
    # fallback to local SQLite in backend folder
    db_path = pathlib.Path(__file__).with_name("app.db")
    return create_engine(f"sqlite:///{db_path}")

engine = get_engine()
with engine.begin() as conn:
    # Set desired per-token prices here:
    updates = [
        ("kin-001", 50),
        ("lua-001", 50),
    ]
    for pid, price in updates:
        conn.execute(text("update properties set price=:price where id=:pid"), {"price": price, "pid": pid})
    rows = conn.execute(text("select id, title, price, available_tokens from properties")).fetchall()
    for r in rows:
        print(dict(r._mapping))
