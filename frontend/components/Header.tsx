"use client";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Optiloves logo" className="h-6 w-auto" />
          <span className="font-semibold">Optiloves Invest</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a href="/properties" className="hover:underline">Properties</a>
          <a href="/how-it-works" className="hover:underline">How it works</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/wallet" className="px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90">Connect Wallet</a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <nav className="mx-auto max-w-5xl px-4 py-3 grid gap-2 text-sm">
            <a href="/properties" className="py-1 hover:underline">Properties</a>
            <a href="/how-it-works" className="py-1 hover:underline">How it works</a>
            <a href="/faq" className="py-1 hover:underline">FAQ</a>
            <a href="/wallet" className="mt-2 inline-block px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90">Connect Wallet</a>
          </nav>
        </div>
      )}
    </header>
  );
}