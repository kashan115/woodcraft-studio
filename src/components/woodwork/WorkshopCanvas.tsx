import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, PerspectiveCamera } from '@react-three/drei';
import { useProjectStore } from '@/store/projectStore';
import { LumberPiece3D } from './LumberPiece3D';
import { SnapIndicator } from './SnapIndicator';
import { Suspense, useEffect, useRef } from 'react';

const Scene = () => {
  const { pieces, selectPiece, viewMode } = useProjectStore();

  const handleCanvasClick = () => {
    selectPiece(null);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-10, 10, -10]} intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.2} />

      {/* Environment */}
      <Environment preset="warehouse" />

      {/* Ground plane for clicking to deselect */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        onClick={handleCanvasClick}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1e1e24" transparent opacity={0.8} />
      </mesh>

      {/* Grid */}
      <Grid
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#2a2a35"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#3a3a45"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* Lumber pieces */}
      {pieces.map((piece) => (
        <LumberPiece3D key={piece.id} piece={piece} />
      ))}

      {/* Snap indicators */}
      <SnapIndicator />

      {/* Axes helper */}
      <axesHelper args={[5]} />
    </>
  );
};

export const WorkshopCanvas = () => {
  const { viewMode } = useProjectStore();

  const getCameraProps = () => {
    switch (viewMode) {
      case 'top':
        return { position: [0, 30, 0] as [number, number, number], rotation: [-Math.PI / 2, 0, 0] as [number, number, number] };
      case 'front':
        return { position: [0, 5, 30] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] };
      case 'side':
        return { position: [30, 5, 0] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number] };
      default:
        return { position: [15, 12, 15] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] };
    }
  };

  const cameraProps = getCameraProps();

  return (
    <div className="w-full h-full bg-background">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={cameraProps.position}
            fov={50}
            near={0.1}
            far={1000}
          />
          <Scene />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2 - 0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
