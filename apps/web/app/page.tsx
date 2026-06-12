import { TrpcPingBadge } from "@/components/trpc-ping-badge";

export default function Home() {
  return (
    <div
      className="
        flex
        flex-1
        flex-col
        items-center
        justify-center
        bg-zinc-50
        dark:bg-black
      "
    >
      <main
        className="
          flex
          flex-col
          items-center
          gap-6
          px-6
          py-16
          text-center
        "
      >
        <h1
          className="
            text-3xl
            font-semibold
            tracking-tight
            text-black
            dark:text-zinc-50
          "
        >
          CADchat
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          3D design review tool — API connectivity check below.
        </p>
        <TrpcPingBadge />
      </main>
    </div>
  );
}
