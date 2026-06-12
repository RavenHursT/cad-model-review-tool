import { resolve } from 'node:path';
import { config } from 'dotenv';
import type { NextConfig } from 'next';

config({ path: resolve(__dirname, '../../.env') });
config({ path: resolve(__dirname, '../../.env.local') });

const apiUrl = process.env.API_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/trpc'],
  async rewrites() {
    return [
      {
        source: '/api/trpc/:path*',
        destination: `${apiUrl}/trpc/:path*`,
      },
    ];
  },
};

export default nextConfig;
