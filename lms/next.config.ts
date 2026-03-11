// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'ggu.edu.in',
//       },
//       {
//         protocol: 'https',
//         hostname: 'kalvium.community',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'storage.googleapis.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'www.hackboats.com',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const ContentSecurityPolicy = `
default-src 'self';
script-src 'self' https://www.youtube.com ${process.env.NODE_ENV === "development" ? "'unsafe-eval' 'unsafe-inline'" : ""};
style-src 'self' https://fonts.googleapis.com ${process.env.NODE_ENV === "development" ? "'unsafe-inline'" : ""};
img-src 'self' data: blob: https://*.supabase.co https://res.cloudinary.com https://storage.googleapis.com https://lh3.googleusercontent.com https://ggu.edu.in https://kalvium.community https://www.hackboats.com;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://*.supabase.co http://127.0.0.1:54321;
frame-src 'self' https://www.youtube.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ggu.edu.in",
      },
      {
        protocol: "https",
        hostname: "kalvium.community",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.hackboats.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;