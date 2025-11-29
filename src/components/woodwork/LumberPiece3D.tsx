import { useRef, useState, useEffect } from 'react';
import { Mesh, Euler } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, TransformControls, useCursor } from '@react-three/drei';
import { LumberPiece, useProjectStore } from '@/store/projectStore';

interface LumberPiece3DProps {
  piece: LumberPiece;
}

export const LumberPiece3D = ({ piece }: LumberPiece3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const controlsRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  
  const { 
    selectedPieceId, 
    selectPiece, 
    showDimensions, 
    activeTool, 
    removePiece,
    updatePiece,
    snapToGrid,
    gridSize
  } = useProjectStore();
  
  const isSelected = selectedPieceId === piece.id;
  useCursor(hovered);

  // Calculate actual dimensions in inches
  const scaleFactor = 0.1;
  const length = (piece.customLength || piece.type.defaultLength) * scaleFactor;
  const width = piece.type.actualWidth * scaleFactor;
  const height = piece.type.actualHeight * scaleFactor;

  const handleClick = (e: any) => {
    e.stopPropagation();
    
    if (activeTool === 'delete') {
      removePiece(piece.id);
    } else {
      selectPiece(piece.id);
    }
  };

  // Handle transform controls changes
  useEffect(() => {
    if (controlsRef.current && isSelected) {
      const controls = controlsRef.current;
      
      const handleObjectChange = () => {
        if (meshRef.current) {
          let newPosition = meshRef.current.position.toArray() as [number, number, number];
          
          // Apply grid snapping for move tool
          if (snapToGrid && activeTool === 'move') {
            const snapSize = gridSize * scaleFactor;
            newPosition = [
              Math.round(newPosition[0] / snapSize) * snapSize,
              Math.round(newPosition[1] / snapSize) * snapSize,
              Math.round(newPosition[2] / snapSize) * snapSize,
            ];
          }
          
          updatePiece(piece.id, {
            position: newPosition.map(p => p / scaleFactor) as [number, number, number],
            rotation: meshRef.current.rotation.toArray().slice(0, 3) as [number, number, number],
            scale: meshRef.current.scale.toArray() as [number, number, number],
          });
        }
      };

      controls.addEventListener('objectChange', handleObjectChange);
      return () => controls.removeEventListener('objectChange', handleObjectChange);
    }
  }, [piece.id, updatePiece, snapToGrid, gridSize, activeTool, isSelected]);

  // Subtle hover animation
  useFrame((state) => {
    if (meshRef.current && isSelected && !showGizmo) {
      const time = state.clock.getElapsedTime();
      // Subtle pulse
    }
  });

  const formatDimension = (inches: number): string => {
    if (inches >= 12) {
      const feet = Math.floor(inches / 12);
      const remainingInches = inches % 12;
      return remainingInches > 0 ? `${feet}' ${remainingInches}"` : `${feet}'`;
    }
    return `${inches}"`;
  };

  const getMode = (): 'translate' | 'rotate' | 'scale' | undefined => {
    switch (activeTool) {
      case 'move':
        return 'translate';
      case 'rotate':
        return 'rotate';
      case 'scale':
        return 'scale';
      default:
        return undefined;
    }
  };

  const showGizmo = isSelected && (activeTool === 'move' || activeTool === 'rotate' || activeTool === 'scale');
  const displayLength = piece.customLength || piece.type.defaultLength;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[
          piece.position[0] * scaleFactor,
          piece.position[1] * scaleFactor,
          piece.position[2] * scaleFactor,
        ]}
        rotation={new Euler(...piece.rotation)}
        scale={piece.scale}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color={piece.color}
          roughness={0.8}
          metalness={0.1}
          emissive={isSelected ? '#f59e0b' : hovered ? '#78716c' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
        />
      </mesh>

      {/* Selection outline */}
      {isSelected && (
        <mesh
          position={[
            piece.position[0] * scaleFactor,
            piece.position[1] * scaleFactor,
            piece.position[2] * scaleFactor,
          ]}
          rotation={new Euler(...piece.rotation)}
          scale={[piece.scale[0] * 1.02, piece.scale[1] * 1.02, piece.scale[2] * 1.02]}
        >
          <boxGeometry args={[length, height, width]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
        </mesh>
      )}

      {/* Dimension labels */}
      {showDimensions && (isSelected || hovered) && (
        <Html 
          position={[
            piece.position[0] * scaleFactor,
            piece.position[1] * scaleFactor + height / 2 + 0.3,
            piece.position[2] * scaleFactor,
          ]} 
          center
        >
          <div className="dimension-label whitespace-nowrap pointer-events-none">
            {piece.type.name} • {formatDimension(displayLength)}
          </div>
        </Html>
      )}

      {/* Transform Controls */}
      {showGizmo && meshRef.current && (
        <TransformControls
          ref={controlsRef}
          object={meshRef.current}
          mode={getMode()}
          size={0.5}
          translationSnap={snapToGrid ? gridSize * scaleFactor : undefined}
          rotationSnap={snapToGrid ? Math.PI / 12 : undefined}
          scaleSnap={snapToGrid ? 0.1 : undefined}
        />
      )}
    </group>
  );
};
