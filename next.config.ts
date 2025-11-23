import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable system TLS certificates for external requests during build
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
