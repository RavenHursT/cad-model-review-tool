'use client';

import { trpc } from '@/lib/trpc/react';

export function TrpcPingBadge() {
  const { data, error, isLoading } = trpc.health.ping.useQuery();

  if (isLoading) {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          px-3
          py-1
          text-sm
          font-medium
          text-zinc-500
        "
      >
        Checking API…
      </span>
    );
  }

  if (error) {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-red-100
          px-3
          py-1
          text-sm
          font-medium
          text-red-800
        "
      >
        API unreachable · {error.message}
      </span>
    );
  }

  if (!data) {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          px-3
          py-1
          text-sm
          font-medium
          text-zinc-500
        "
      >
        Checking API…
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-green-100
        px-3
        py-1
        text-sm
        font-medium
        text-green-800
      "
    >
      API connected · {data.ts}
    </span>
  );
}
