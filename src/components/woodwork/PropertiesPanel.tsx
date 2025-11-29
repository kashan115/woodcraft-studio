import { Settings2, Palette, Ruler, RotateCcw, Move, Trash2 } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PropertiesPanel = () => {
  const { pieces, selectedPieceId, updatePiece, removePiece, duplicatePiece } = useProjectStore();
  const selectedPiece = pieces.find((p) => p.id === selectedPieceId);

  if (!selectedPiece) {
    return (
      <div className="panel w-72 animate-slide-in-right">
        <div className="panel-header">
          <Settings2 size={16} />
          <span>Properties</span>
        </div>
        <div className="p-6 text-center text-muted-foreground">
          <Settings2 size={32} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a piece to view its properties</p>
        </div>
      </div>
    );
  }

  const handlePositionChange = (axis: 0 | 1 | 2, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newPosition: [number, number, number] = [...selectedPiece.position];
    newPosition[axis] = numValue;
    updatePiece(selectedPiece.id, { position: newPosition });
  };

  const handleRotationChange = (axis: 0 | 1 | 2, value: string) => {
    const numValue = (parseFloat(value) || 0) * (Math.PI / 180); // Convert to radians
    const newRotation: [number, number, number] = [...selectedPiece.rotation];
    newRotation[axis] = numValue;
    updatePiece(selectedPiece.id, { rotation: newRotation });
  };

  const handleLengthChange = (value: string) => {
    const numValue = parseFloat(value) || selectedPiece.type.defaultLength;
    updatePiece(selectedPiece.id, { customLength: numValue });
  };

  const handleColorChange = (color: string) => {
    updatePiece(selectedPiece.id, { color });
  };

  const displayLength = selectedPiece.customLength || selectedPiece.type.defaultLength;

  return (
    <div className="panel w-72 flex flex-col animate-slide-in-right">
      <div className="panel-header">
        <Settings2 size={16} />
        <span>Properties</span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Piece Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded shadow-inner"
                style={{ backgroundColor: selectedPiece.color }}
              />
              <div>
                <p className="font-medium">{selectedPiece.type.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedPiece.type.actualWidth}" × {selectedPiece.type.actualHeight}"
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dimensions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Ruler size={14} />
              <span>Dimensions</span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label className="text-xs">Length</Label>
                <Input
                  type="number"
                  value={displayLength}
                  onChange={(e) => handleLengthChange(e.target.value)}
                  className="col-span-2 h-8 text-sm font-mono"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Width: {selectedPiece.type.actualWidth}" • Height: {selectedPiece.type.actualHeight}"
              </p>
            </div>
          </div>

          <Separator />

          {/* Position */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Move size={14} />
              <span>Position</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{axis}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={selectedPiece.position[index as 0 | 1 | 2].toFixed(2)}
                    onChange={(e) => handlePositionChange(index as 0 | 1 | 2, e.target.value)}
                    className="h-8 text-sm font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rotation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <RotateCcw size={14} />
              <span>Rotation (°)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{axis}</Label>
                  <Input
                    type="number"
                    step="15"
                    value={((selectedPiece.rotation[index as 0 | 1 | 2] * 180) / Math.PI).toFixed(0)}
                    onChange={(e) => handleRotationChange(index as 0 | 1 | 2, e.target.value)}
                    className="h-8 text-sm font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Color */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Palette size={14} />
              <span>Color</span>
            </div>
            <div className="flex gap-2">
              {['#D4A574', '#C9956C', '#8B7355', '#5D4E37', '#F5DEB3', '#A0522D'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-8 h-8 rounded shadow-inner border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedPiece.color === color ? 'hsl(var(--primary))' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => duplicatePiece(selectedPiece.id)}
        >
          Duplicate Piece
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => removePiece(selectedPiece.id)}
        >
          <Trash2 size={16} className="mr-2" />
          Delete Piece
        </Button>
      </div>
    </div>
  );
};
