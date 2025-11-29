import { Box, Square, Layers, Grid2X2 } from 'lucide-react';
import { useProjectStore, ViewMode } from '@/store/projectStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: '3d', icon: <Box size={16} />, label: '3D View' },
  { mode: 'top', icon: <Square size={16} />, label: 'Top View' },
  { mode: 'front', icon: <Layers size={16} />, label: 'Front View' },
  { mode: 'side', icon: <Grid2X2 size={16} />, label: 'Side View' },
];

export const ViewControls = () => {
  const { viewMode, setViewMode } = useProjectStore();

  return (
    <div className="panel p-1 flex gap-1 animate-fade-in">
      {viewModes.map(({ mode, icon, label }) => (
        <Tooltip key={mode}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setViewMode(mode)}
              className={cn(
                'px-3 py-1.5 rounded text-sm transition-all duration-200',
                viewMode === mode
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
