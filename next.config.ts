import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/BHK_FINAL" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
