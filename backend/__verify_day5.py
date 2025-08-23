import os, psycopg2, json
url = os.environ["DATABASE_URL"]
def run(sql, params=None, fetch=None):
    with psycopg2.connect(url) as conn, conn.cursor() as cur:
        cur.execute(sql, params or [])
        if fetch=="one":  return cur.fetchone()
        if fetch=="all":  return cur.fetchall()

# 1) Check orders table
exists = run("select to_regclass('public.orders')", fetch="one")[0] is not None
result = {"orders_table": "present" if exists else "missing"}

# 2) Create if missing (no-op if exists)
run("""
create table if not exists public.orders (
  id bigserial primary key,
  wallet text not null,
  property_id text not null references public.properties(id),
  quantity integer not null check (quantity <> 0),
  price_usd integer not null,
  total_usd integer not null,
  tx_signature text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_orders_wallet on public.orders(wallet);
create index if not exists idx_orders_property on public.orders(property_id);
""")

# 3) Count rows (to know if we need seed)
cnt = run("select count(*) from public.orders", fetch="one")[0]
result["orders_rows"] = int(cnt)

# 4) Seed only if empty
if cnt == 0:
    try:
        run("""insert into public.orders (wallet, property_id, quantity, price_usd, total_usd, tx_signature)
               values
               ('test1','kin-001',5,50,250,'demo-kin-001-a'),
               ('test1','lua-001',2,50,100,'demo-lua-001-a')""")
        result["seeded"] = True
    except Exception as e:
        result["seeded"] = False
        result["seed_error"] = str(e)

print(json.dumps(result))
