import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/Final_BHK" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
