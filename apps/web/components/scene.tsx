'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { ReviewPanel } from '@/components/review-panel';

type CubeProps = {
  selected: boolean;
  onToggle: () => void;
};

function Cube({ selected, onToggle }: CubeProps) {
  return (
    <mesh
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={selected ? '#3b82f6' : '#6366f1'} />
      {selected ? (
        <Html center distanceFactor={8} zIndexRange={[100, 0]}>
          <ReviewPanel onClose={onToggle} />
        </Html>
      ) : null}
    </mesh>
  );
}

export function Scene() {
  const [selected, setSelected] = useState(false);

  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [3, 3, 3], fov: 50 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <Cube
        selected={selected}
        onToggle={() => setSelected((value) => !value)}
      />
      <OrbitControls />
    </Canvas>
  );
}
