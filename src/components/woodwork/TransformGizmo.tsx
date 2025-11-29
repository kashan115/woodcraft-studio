import { TransformControls } from '@react-three/drei';
import { useProjectStore } from '@/store/projectStore';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface TransformGizmoProps {
  pieceRef: React.RefObject<THREE.Mesh>;
  pieceId: string;
}

export const TransformGizmo = ({ pieceRef, pieceId }: TransformGizmoProps) => {
  const { activeTool, updatePiece, snapToGrid, gridSize } = useProjectStore();
  const controlsRef = useRef<any>(null);

  const getMode = (): 'translate' | 'rotate' | 'scale' => {
    switch (activeTool) {
      case 'move':
        return 'translate';
      case 'rotate':
        return 'rotate';
      case 'scale':
        return 'scale';
      default:
        return 'translate';
    }
  };

  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      
      const handleChange = () => {
        if (pieceRef.current) {
          let newPosition = pieceRef.current.position.toArray() as [number, number, number];
          
          // Apply grid snapping
          if (snapToGrid && activeTool === 'move') {
            newPosition = [
              Math.round(newPosition[0] / gridSize) * gridSize,
              Math.round(newPosition[1] / gridSize) * gridSize,
              Math.round(newPosition[2] / gridSize) * gridSize,
            ];
            pieceRef.current.position.set(...newPosition);
          }
          
          updatePiece(pieceId, {
            position: newPosition,
            rotation: pieceRef.current.rotation.toArray().slice(0, 3) as [number, number, number],
            scale: pieceRef.current.scale.toArray() as [number, number, number],
          });
        }
      };

      controls.addEventListener('change', handleChange);
      return () => controls.removeEventListener('change', handleChange);
    }
  }, [pieceId, updatePiece, snapToGrid, gridSize, activeTool]);

  const showGizmo = activeTool === 'move' || activeTool === 'rotate' || activeTool === 'scale';

  if (!showGizmo || !pieceRef.current) return null;

  return (
    <TransformControls
      ref={controlsRef}
      object={pieceRef.current}
      mode={getMode()}
      size={0.75}
      translationSnap={snapToGrid ? gridSize : undefined}
      rotationSnap={snapToGrid ? Math.PI / 12 : undefined}
      scaleSnap={snapToGrid ? 0.1 : undefined}
    />
  );
};
