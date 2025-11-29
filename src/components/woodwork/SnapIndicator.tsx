import { useProjectStore } from '@/store/projectStore';
import { useMemo } from 'react';
import * as THREE from 'three';

export const SnapIndicator = () => {
  const { pieces, selectedPieceId, snapToGrid } = useProjectStore();

  const selectedPiece = pieces.find(p => p.id === selectedPieceId);

  const snapPoints = useMemo(() => {
    if (!selectedPiece || !snapToGrid) return [];

    const scaleFactor = 0.1;
    const snapDistance = 5; // inches
    const points: { position: [number, number, number]; color: string }[] = [];

    // Get selected piece bounds
    const selLength = selectedPiece.customLength || selectedPiece.type.defaultLength;
    const selWidth = selectedPiece.type.actualWidth;
    const selHeight = selectedPiece.type.actualHeight;

    pieces.forEach(piece => {
      if (piece.id === selectedPieceId) return;

      const length = piece.customLength || piece.type.defaultLength;
      const width = piece.type.actualWidth;
      const height = piece.type.actualHeight;

      // Calculate distance between pieces
      const dx = Math.abs(selectedPiece.position[0] - piece.position[0]);
      const dy = Math.abs(selectedPiece.position[1] - piece.position[1]);
      const dz = Math.abs(selectedPiece.position[2] - piece.position[2]);

      // Check if pieces are close enough to show snap points
      const proximityThreshold = Math.max(length, selLength) + snapDistance;

      if (dx < proximityThreshold && dy < proximityThreshold && dz < proximityThreshold) {
        // Add snap points at piece corners and centers
        const corners = [
          [piece.position[0] + length/2, piece.position[1], piece.position[2]],
          [piece.position[0] - length/2, piece.position[1], piece.position[2]],
          [piece.position[0], piece.position[1] + height/2, piece.position[2]],
          [piece.position[0], piece.position[1] - height/2, piece.position[2]],
          [piece.position[0], piece.position[1], piece.position[2] + width/2],
          [piece.position[0], piece.position[1], piece.position[2] - width/2],
        ];

        corners.forEach(corner => {
          points.push({
            position: corner.map(c => c * scaleFactor) as [number, number, number],
            color: '#00ff88',
          });
        });
      }
    });

    return points;
  }, [pieces, selectedPieceId, snapToGrid, selectedPiece]);

  if (!selectedPiece || snapPoints.length === 0) return null;

  return (
    <group>
      {snapPoints.map((point, index) => (
        <mesh key={index} position={point.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={point.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};
