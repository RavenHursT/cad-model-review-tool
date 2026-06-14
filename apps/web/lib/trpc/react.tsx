'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, type TRPCClient } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/trpc';

export const trpc = createTRPCReact<AppRouter>();

type SharedClients = {
  queryClient: QueryClient;
  trpcClient: TRPCClient<AppRouter>;
};

let sharedClients: SharedClients | null = null;

function getSharedClients(): SharedClients {
  if (!sharedClients) {
    const queryClient = new QueryClient();
    const trpcClient = trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    });
    sharedClients = { queryClient, trpcClient };
  }
  return sharedClients;
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [{ queryClient, trpcClient }] = useState(getSharedClients);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
