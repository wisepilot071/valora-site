import type { NextConfig } from 'next';

/** STATIC_PREVIEW=1 builds a plain static copy (used only for shareable previews). */
const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticPreview ? { output: 'export' as const, trailingSlash: true } : {}),
  images: {
    // next/image serves AVIF first, then WebP, falling back to the source JPG.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    unoptimized: staticPreview,
  },
  ...(staticPreview
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/images/:path*',
              headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
          ];
        },
      }),
};

export default nextConfig;
