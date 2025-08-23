/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    // No host-based redirects here; canonical handled in middleware.
    return [];
  },
};
export default nextConfig;
