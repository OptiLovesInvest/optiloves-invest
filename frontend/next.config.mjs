/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/kyc",
        destination: process.env.NEXT_PUBLIC_KYC_FLOW_URL || "/investor/onboarding",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;


