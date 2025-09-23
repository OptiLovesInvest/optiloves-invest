"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const KEY = "optloves-cookie-consent";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(localStorage.getItem(KEY) !== "1");
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem(KEY, "1"); } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-4xl m-4 rounded-xl border bg-white shadow p-4 md:flex md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          We use essential cookies to run this site and basic analytics to improve it. By clicking â€œAcceptâ€, you agree.
        </p>
        <div className="mt-3 md:mt-0 flex gap-2">
          <button onClick={accept} className="px-4 py-2 rounded-lg bg-black text-white">Accept</button>
          <a href="/privacy" className="px-4 py-2 rounded-lg border">Privacy</a>
        </div>
      </div>
    </div>
  );
}
