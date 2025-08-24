/** @type {import('next').NextConfig} */

const csp = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  img-src 'self' data: https:;
  object-src 'none';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://optiloves-backend.onrender.com;
`;

const nextConfig = {
  poweredByHeader: false,
  { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'geolocation=()' },
          { key: 'Content-Security-Policy', value: csp.replace(/\s{2,}/g, ' ').trim() },
        ],
      },
      {
        // Long-term cache for Next static assets
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;