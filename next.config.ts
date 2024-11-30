import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle the canvas.node binary module
    config.module.rules.push({ test: /\.node$/, use: "raw-loader" });

    if (!isServer) {
      config.externals.push("@napi-rs/canvas");
    }

    return config;
  },
};

export default nextConfig;
