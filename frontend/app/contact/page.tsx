export const metadata = {
  title: "Contact — Optiloves Invest",
  description: "Get in touch with Optiloves Invest.",
};

function env(name: string, fallback: string) {
  return process.env[name] || fallback;
}

export default function ContactPage() {
  const email = env("NEXT_PUBLIC_CONTACT_EMAIL", "info@optilovesinvest.com");
  const wa    = env("NEXT_PUBLIC_WHATSAPP", "447900000000"); // international format without +
  const addr  = env("NEXT_PUBLIC_ADDRESS", "Kinshasa — Nsele HQ, Democratic Republic of Congo");
  const gmap  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-gray-600">We’re here to help investors and partners.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 space-y-2">
          <h2 className="font-semibold">Email</h2>
          <a className="underline break-all" href={`mailto:${email}`}>{email}</a>
          <p className="text-xs text-gray-500">Business enquiries & support</p>
        </div>

        <div className="border rounded-xl p-5 space-y-2">
          <h2 className="font-semibold">WhatsApp</h2>
          <a className="underline" href={`https://wa.me/${wa}`} rel="noopener" target="_blank">Message us on WhatsApp</a>
          <p className="text-xs text-gray-500">Mon–Fri, 09:00–17:00 (London)</p>
        </div>

        <div className="border rounded-xl p-5 space-y-2 md:col-span-2">
          <h2 className="font-semibold">Address</h2>
          <p>{addr}</p>
          <a className="underline" href={gmap} rel="noopener" target="_blank">Open in Google Maps</a>
        </div>
      </section>

      <footer className="text-xs text-gray-500">
        © 2025 Optiloves Invest • FIGHTING POVERTY WITH LOVE AND INVESTMENT
      </footer>
    </main>
  );
}