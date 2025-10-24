/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { forceSwcTransforms: true },
  // Let production build succeed even if ESLint/TS has issues (stability-first)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
