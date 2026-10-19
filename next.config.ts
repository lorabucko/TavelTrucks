import type { NextConfig } from "next";

const config: NextConfig = {
  // Export is used only for the Computer preview. Vercel uses normal Next.js routing.
  output: process.env.PREVIEW_EXPORT === "true" ? "export" : undefined,
  distDir: process.env.PREVIEW_EXPORT === "true" ? ".next-preview" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
