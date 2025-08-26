// frontend/src/app/(legal)/terms/page.tsx
export const dynamic = 'force-dynamic';

export default function Terms() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Terms of Use</h1>
      <p>Optiloves Invest is an early-stage product. Nothing here is an offer to the public or investment advice. Any future tokenized interests will be offered only to eligible participants subject to applicable laws and KYC/AML checks.</p>
      <h2 className="text-lg font-semibold">Use of Service</h2>
      <p>Do not misuse or bypass security. We may modify or suspend features.</p>
      <h2 className="text-lg font-semibold">Risk Notice</h2>
      <p>Digital assets are volatile and may result in loss of capital.</p>
      <h2 className="text-lg font-semibold">Limitation of Liability</h2>
      <p>Service is provided “as is” without warranties.</p>
      <h2 className="text-lg font-semibold">Contact</h2>
      <p>hello@optilovesinvest.com</p>
    </main>
  );
}
