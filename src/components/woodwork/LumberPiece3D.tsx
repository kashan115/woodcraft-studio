import { useRef, useState } from 'react';
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { LumberPiece, useProjectStore } from '@/store/projectStore';

interface LumberPiece3DProps {
  piece: LumberPiece;
}

export const LumberPiece3D = ({ piece }: LumberPiece3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { selectedPieceId, selectPiece, activeTool, showDimensions, updatePiece, removePiece } = useProjectStore();
  const isSelected = selectedPieceId === piece.id;

  // Calculate dimensions in scene units (1 unit = 1 inch, scaled down for visibility)
  const scaleFactor = 0.1; // Scale down for better viewport
  const width = piece.type.actualWidth * scaleFactor;
  const height = piece.type.actualHeight * scaleFactor;
  const length = (piece.customLength || piece.type.defaultLength) * scaleFactor;

  const handleClick = (e: any) => {
    e.stopPropagation();
    
    if (activeTool === 'delete') {
      removePiece(piece.id);
      return;
    }
    
    selectPiece(piece.id);
  };

  // Subtle animation for selected pieces
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = piece.position[1] + Math.sin(time * 2) * 0.02;
    }
  });

  const displayLength = piece.customLength || piece.type.defaultLength;

  return (
    <group position={piece.position} rotation={piece.rotation}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={piece.scale}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color={piece.color}
          emissive={isSelected ? '#f59e0b' : hovered ? '#78716c' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Selection outline */}
      {isSelected && (
        <mesh scale={[piece.scale[0] * 1.02, piece.scale[1] * 1.02, piece.scale[2] * 1.02]}>
          <boxGeometry args={[length, height, width]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
        </mesh>
      )}

      {/* Dimension labels */}
      {showDimensions && (isSelected || hovered) && (
        <Html position={[0, height / 2 + 0.3, 0]} center>
          <div className="dimension-label whitespace-nowrap pointer-events-none">
            {piece.type.name} • {displayLength}"
          </div>
        </Html>
      )}
    </group>
  );
};
