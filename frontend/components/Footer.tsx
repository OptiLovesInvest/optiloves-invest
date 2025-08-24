export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>© {new Date().getFullYear()} Optiloves Invest</div>
          <nav className="flex flex-wrap gap-4">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/kyc" className="hover:underline">KYC</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}