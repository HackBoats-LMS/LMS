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
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: 
    ggu.edu.in 
    *.supabase.co 
    lh3.googleusercontent.com 
    *.googleusercontent.com 
    *.hackboats.com 
    *.hackboats.in 
    res.cloudinary.com 
    storage.googleapis.com 
    images.unsplash.com 
    via.placeholder.com 
    www.youtube.com 
    i.ytimg.com 
    placehold.co
    https://placehold.co;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co http://127.0.0.1:54321;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
  media-src 'self' data: blob: https://*.supabase.co;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.split(/\s+/).join(" ").trim(),
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
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ggu.edu.in" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "*.hackboats.com" },
      { protocol: "https", hostname: "*.hackboats.in" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "www.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" }
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