'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(
  () =>
    import('@/components/scene').then((module) => ({ default: module.Scene })),
  { ssr: false },
);

export function SceneViewer() {
  return (
    <div className="h-full w-full">
      <Scene />
    </div>
  );
}
