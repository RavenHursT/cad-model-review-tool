import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/trpc', '@repo/ui'],
};

export default nextConfig;
