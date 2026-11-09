import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js "N" badge shown in the corner during development
  devIndicators: false,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
