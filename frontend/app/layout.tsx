export const metadata = {
  title: "OptiLoves Invest",
  description: "Fighting poverty with love and investment.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
