import { SceneViewer } from '@/components/scene-viewer';
import { TrpcPingBadge } from '@/components/trpc-ping-badge';

export default function Home() {
  return (
    <div
      className="
        flex
        flex-1
        flex-col
        bg-zinc-50
        dark:bg-black
      "
    >
      <header
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-200
          px-6
          py-4
        "
      >
        <h1
          className="
            text-xl
            font-semibold
            text-black
            dark:text-zinc-50
          "
        >
          CADchat
        </h1>
        <TrpcPingBadge />
      </header>
      <main className="relative min-h-0 flex-1">
        <SceneViewer />
      </main>
    </div>
  );
}
