import { useProjectStore } from '@/store/projectStore';
import { Grid3X3, Eye, Ruler } from 'lucide-react';

export const StatusBar = () => {
  const { pieces, selectedPieceId, snapToGrid, showDimensions, unit, gridSize } = useProjectStore();
  const selectedPiece = pieces.find((p) => p.id === selectedPieceId);

  return (
    <footer className="h-8 bg-card border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>Pieces: {pieces.length}</span>
        {selectedPiece && (
          <>
            <span className="text-border">|</span>
            <span className="text-foreground">
              Selected: {selectedPiece.type.name}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Grid3X3 size={12} className={snapToGrid ? 'text-primary' : ''} />
          <span>Grid: {snapToGrid ? 'On' : 'Off'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye size={12} className={showDimensions ? 'text-primary' : ''} />
          <span>Dims: {showDimensions ? 'On' : 'Off'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Ruler size={12} />
          <span>Units: {unit}</span>
        </div>
      </div>
    </footer>
  );
};
