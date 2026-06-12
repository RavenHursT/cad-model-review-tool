import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@repo/trpc';

export function createTrpcClient() {
  const apiUrl = process.env.API_URL ?? 'http://localhost:3001';

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${apiUrl}/trpc`,
      }),
    ],
  });
}
