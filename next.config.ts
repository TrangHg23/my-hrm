import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Turbopack does not support the "style" exports condition.
  // These aliases explicitly map CSS @imports to their actual file paths.
  turbopack: {
    resolveAlias: {
      'tw-animate-css': './node_modules/tw-animate-css/dist/tw-animate.css',
      'shadcn/tailwind.css': './node_modules/shadcn/dist/tailwind.css',
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
