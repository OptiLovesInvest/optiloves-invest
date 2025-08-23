import type { NextRequest } from "next/server";
import { getProperty } from "../../../lib/properties";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// --- Config ---
const ALLOWED_ORIGINS_ARR = [
  "https://app.optilovesinvest.com",
  "http://localhost:3000",
];
const ALLOWED_ORIGINS_SET = new Set<string>(ALLOWED_ORIGINS_ARR);

const RATE_LIMIT = { windowMs: 60_000, max: 20 };
const rateStore: Map<string, { count: number; resetAt: number }> =
  (globalThis as any).__oliRate || new Map();
(globalThis as any).__oliRate = rateStore;

function secHeaders(extra: Record<string,string> = {}) {
  return {
    "content-type": "application/json",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "same-origin",
    "permissions-policy": "geolocation=(), microphone=(), camera=()",
    ...extra,
  };
}

function json(data: any, status = 200, extra: Record<string,string> = {}) {
  return new Response(JSON.stringify(data), { status, headers: secHeaders(extra) });
}

function getIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "0.0.0.0";
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "0.0.0.0";
}

function allowedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  if (origin && ALLOWED_ORIGINS_SET.has(origin)) return true;
  for (let i = 0; i < ALLOWED_ORIGINS_ARR.length; i++) {
    const o = ALLOWED_ORIGINS_ARR[i];
    if (referer.startsWith(o)) return true;
  }
  if (req.method === "GET") return true; // diagnostics
  return false;
}

function rateLimit(ip: string) {
  const now = Date.now();
  const slot = rateStore.get(ip);
  if (!slot || now > slot.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { ok: true, remaining: RATE_LIMIT.max - 1, reset: RATE_LIMIT.windowMs };
  }
  if (slot.count >= RATE_LIMIT.max) {
    return { ok: false, remaining: 0, reset: slot.resetAt - now };
  }
  slot.count++;
  return { ok: true, remaining: RATE_LIMIT.max - slot.count, reset: slot.resetAt - now };
}

async function capture(e: unknown) {
  try {
    const S = await import("@sentry/nextjs");
    S.captureException(e);
  } catch { /* Sentry not present */ }
}

// --- Handlers ---
export async function GET() {
  return json({ ok: true, resource: "checkout", methods: ["GET","POST","OPTIONS"] }, 200, {
    allow: "GET,POST,OPTIONS",
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...secHeaders({}),
      allow: "GET,POST,OPTIONS",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!allowedOrigin(req)) {
      return json({ error: "Forbidden origin" }, 403);
    }

    const ip = getIp(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return json({ error: "Too many requests", retryInMs: rl.reset }, 429, {
        "retry-after": Math.ceil(rl.reset / 1000).toString(),
      });
    }

    const body = await req.json().catch(() => ({}));
    const propertyId = typeof body?.propertyId === "string" ? body.propertyId.trim() : "";
    const qtyNum = Number(body?.qty);
    const qtyInt = Number.isFinite(qtyNum) ? Math.floor(qtyNum) : NaN;
    if (!propertyId || !Number.isFinite(qtyInt) || qtyInt < 1) {
      return json({ error: "Invalid input" }, 400);
    }

    const p = getProperty(propertyId);
    if (!p) return json({ error: "Property not found" }, 404);

    const qty = Math.min(qtyInt, p.available);
    const clamped = qty !== qtyInt;

    const orderId = `OLI-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const amount = p.price * qty;

    return json({ ok: true, orderId, amount, currency: "USD", clamped }, 200, {
      allow: "GET,POST,OPTIONS",
    });
  } catch (e) {
    await capture(e);
    return json({ error: "Server error" }, 500);
  }
}