/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/kyc",
        has: [{ type: "query", key: "property" }],
        destination: "/api/checkout?property=:property",
        permanent: false, // temporary (307/308)
      },
      {
        source: "/kyc",
        destination: "/api/checkout",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;