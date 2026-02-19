export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function InvestorOnboardingPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold">Investor Onboarding</h1>
        <p className="mt-2 opacity-80">
          Private placement onboarding for Optiloves Invest.
        </p>

        <div className="mt-6 rounded-2xl border p-3">
          {/* Replace the data-tally-src value with your real Tally link */}
          <iframe
            data-tally-src="https://tally.so/r/YOUR_TALLY_ID"
            loading="lazy"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Optiloves Invest — Investor Onboarding"
          />
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var d=document, w=window;
              var s=d.createElement("script");
              s.src="https://tally.so/widgets/embed.js";
              s.async=true;
              s.onload=function(){ w.Tally && w.Tally.loadEmbeds && w.Tally.loadEmbeds(); };
              d.body.appendChild(s);
            })();
          `,
        }}
      />
    </main>
  );
}
