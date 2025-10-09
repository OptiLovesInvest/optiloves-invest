/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/thank-you", permanent: false },
    ];
  },
};
export default nextConfig;
