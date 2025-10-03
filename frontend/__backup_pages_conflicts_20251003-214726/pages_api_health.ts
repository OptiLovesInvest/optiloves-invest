import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { externalResolver: true } };

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.status(200).json({
    ok: true,
    service: "health",
    backend: process.env.BACKEND_URL || null,
    rateLimit: {
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
      max: Number(process.env.RATE_LIMIT_MAX || 5),
    },
    ts: new Date().toISOString(),
  });
}