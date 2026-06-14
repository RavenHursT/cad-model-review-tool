'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { CommentPanel } from '@/components/comment-panel';
import { TRPCProvider, trpc } from '@/lib/trpc/react';

const CAMERA_DISTANCE = 6;
const CUBE_SIZE = 2;
const CLICK_MOVE_THRESHOLD_SQ = 25;
const cubeTarget = new Vector3(0, 0, 0);

function getLocalClickAnchor(event: ThreeEvent<MouseEvent>, cubeSize: number) {
  const { object, point, face } = event;
  const anchor = object.worldToLocal(point.clone());

  if (face) {
    const { normal } = face;
    anchor.add(normal.clone().multiplyScalar(cubeSize * 0.02));
  }

  return anchor;
}

function getPinColor(approved: boolean | null) {
  return approved === null
    ? '#f59e0b'
    : approved
      ? '#22c55e'
      : '#ef4444';
}

type CommentPin = {
  id: string;
  approved: boolean | null;
  anchorX: number;
  anchorY: number;
  anchorZ: number;
};

type CubeProps = {
  size: number;
  comments: CommentPin[];
  dialogOpen: boolean;
  dialogAnchor: Vector3 | null;
  selectedCommentId: string | null;
  onCubeClick: (anchor: Vector3) => void;
  onPinClick: (comment: CommentPin) => void;
  onClose: () => void;
  onCommentCreated: () => void;
};

function Cube({
  size,
  comments,
  dialogOpen,
  dialogAnchor,
  selectedCommentId,
  onCubeClick,
  onPinClick,
  onClose,
  onCommentCreated,
}: CubeProps) {
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  return (
    <mesh
      rotation={[Math.PI / 4, Math.PI / 4, 0]}
      onPointerDown={(event) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        pointerStart.current = { x: clientX, y: clientY };
      }}
      onClick={(event) => {
        event.stopPropagation();
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!start) {
          return;
        }
        const { clientX, clientY } = event;
        const dx = clientX - start.x;
        const dy = clientY - start.y;
        if (dx * dx + dy * dy > CLICK_MOVE_THRESHOLD_SQ) {
          return;
        }
        onCubeClick(getLocalClickAnchor(event, size));
      }}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={dialogOpen ? '#3b82f6' : '#6366f1'}
        roughness={0.72}
        metalness={0.08}
      />
      {comments.map((comment) => {
        const { id, approved, anchorX, anchorY, anchorZ } = comment;
        return (
          <group key={id} position={[anchorX, anchorY, anchorZ]}>
            <Html center zIndexRange={[50, 0]} pointerEvents="auto">
              <button
                type="button"
                aria-label="Open comment"
                onClick={(event) => {
                  event.stopPropagation();
                  onPinClick(comment);
                }}
                className="
                  h-4
                  w-4
                  cursor-pointer
                  rounded-full
                  border-2
                  border-white
                  shadow-md
                  transition-transform
                  hover:scale-110
                "
                style={{ backgroundColor: getPinColor(approved) }}
              />
            </Html>
          </group>
        );
      })}
      {dialogOpen && dialogAnchor ? (
        <group position={dialogAnchor}>
          <Html center zIndexRange={[100, 0]} pointerEvents="auto">
            <TRPCProvider>
              <CommentPanel
                commentId={selectedCommentId}
                anchorX={dialogAnchor.x}
                anchorY={dialogAnchor.y}
                anchorZ={dialogAnchor.z}
                onClose={onClose}
                onCreated={onCommentCreated}
              />
            </TRPCProvider>
          </Html>
        </group>
      ) : null}
    </mesh>
  );
}

function SceneContent() {
  const { camera } = useThree();
  const { data: comments = [] } = trpc.comment.list.useQuery({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAnchor, setDialogAnchor] = useState<Vector3 | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );

  useLayoutEffect(() => {
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.lookAt(cubeTarget);
    camera.updateProjectionMatrix();
  }, [camera]);

  const handleCubeClick = (clickAnchor: Vector3) => {
    setSelectedCommentId(null);
    setDialogAnchor(clickAnchor.clone());
    setDialogOpen(true);
  };

  const handlePinClick = (comment: CommentPin) => {
    const { id, anchorX, anchorY, anchorZ } = comment;
    setSelectedCommentId(id);
    setDialogAnchor(new Vector3(anchorX, anchorY, anchorZ));
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setDialogAnchor(null);
    setSelectedCommentId(null);
  };

  const handleCommentCreated = () => {
    setDialogOpen(false);
    setDialogAnchor(null);
    setSelectedCommentId(null);
  };

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        intensity={2}
        position={[5, 8, 6]}
      />
      <directionalLight
        intensity={0.3}
        position={[-4, -2, -5]}
      />
      <Cube
        size={CUBE_SIZE}
        comments={comments}
        dialogOpen={dialogOpen}
        dialogAnchor={dialogAnchor}
        selectedCommentId={selectedCommentId}
        onCubeClick={handleCubeClick}
        onPinClick={handlePinClick}
        onClose={handleClose}
        onCommentCreated={handleCommentCreated}
      />
      <OrbitControls target={cubeTarget} />
    </>
  );
}

export function Scene() {
  return (
    <Canvas className="h-full w-full" camera={{ fov: 50, near: 0.1, far: 1000 }}>
      <SceneContent />
    </Canvas>
  );
}
