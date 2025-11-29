import { 
  MousePointer2, 
  Move, 
  RotateCcw, 
  Maximize2, 
  Trash2, 
  Ruler,
  Grid3X3,
  Eye,
  Undo2,
  Redo2,
  Download,
  FolderOpen,
  Plus,
  Copy
} from 'lucide-react';
import { useProjectStore, ToolType } from '@/store/projectStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ToolButtonProps {
  tool?: ToolType;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  active?: boolean;
  variant?: 'default' | 'destructive';
}

const ToolButton = ({ tool, icon, label, shortcut, onClick, active, variant = 'default' }: ToolButtonProps) => {
  const { activeTool, setActiveTool } = useProjectStore();
  const isActive = active ?? (tool && activeTool === tool);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (tool) {
      setActiveTool(tool);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={cn(
            'tool-button',
            isActive && 'tool-button-active',
            variant === 'destructive' && 'hover:bg-destructive/20 hover:text-destructive'
          )}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2">
        <span>{label}</span>
        {shortcut && (
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded font-mono">{shortcut}</kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export const ToolBar = () => {
  const { 
    snapToGrid, 
    toggleSnapToGrid, 
    showDimensions, 
    toggleShowDimensions,
    selectedPieceId,
    duplicatePiece,
    removePiece,
    clearProject
  } = useProjectStore();

  const handleDuplicate = () => {
    if (selectedPieceId) {
      duplicatePiece(selectedPieceId);
    }
  };

  const handleDelete = () => {
    if (selectedPieceId) {
      removePiece(selectedPieceId);
    }
  };

  return (
    <div className="panel p-2 flex flex-col gap-1 animate-slide-in-left">
      {/* Selection tools */}
      <ToolButton tool="select" icon={<MousePointer2 size={20} />} label="Select" shortcut="V" />
      <ToolButton tool="move" icon={<Move size={20} />} label="Move" shortcut="G" />
      <ToolButton tool="rotate" icon={<RotateCcw size={20} />} label="Rotate" shortcut="R" />
      <ToolButton tool="scale" icon={<Maximize2 size={20} />} label="Scale" shortcut="S" />
      
      <Separator className="my-1 bg-border" />
      
      {/* Measurement */}
      <ToolButton tool="measure" icon={<Ruler size={20} />} label="Measure" shortcut="M" />
      
      <Separator className="my-1 bg-border" />
      
      {/* Actions */}
      <ToolButton 
        icon={<Copy size={20} />} 
        label="Duplicate" 
        shortcut="Ctrl+D"
        onClick={handleDuplicate}
      />
      <ToolButton 
        tool="delete"
        icon={<Trash2 size={20} />} 
        label="Delete" 
        shortcut="Del"
        variant="destructive"
      />
      
      <Separator className="my-1 bg-border" />
      
      {/* View options */}
      <ToolButton 
        icon={<Grid3X3 size={20} />} 
        label="Snap to Grid" 
        shortcut="Ctrl+G"
        onClick={toggleSnapToGrid}
        active={snapToGrid}
      />
      <ToolButton 
        icon={<Eye size={20} />} 
        label="Show Dimensions" 
        shortcut="D"
        onClick={toggleShowDimensions}
        active={showDimensions}
      />
    </div>
  );
};
