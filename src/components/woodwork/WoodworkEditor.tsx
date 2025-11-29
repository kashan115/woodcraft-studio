import { LUMBER_TYPES, useProjectStore } from '@/store/projectStore';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { ToolBar } from './ToolBar';
import { LumberLibrary } from './LumberLibrary';
import { PropertiesPanel } from './PropertiesPanel';
import { CutListPanel } from './CutListPanel';
import { ViewControls } from './ViewControls';
import { WorkshopCanvas } from './WorkshopCanvas';
import { TemplatesPanel } from './TemplatesPanel';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const WoodworkEditor = () => {
  const { addPiece } = useProjectStore();

  // Handle drag and drop from lumber library
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const lumberId = e.dataTransfer.getData('lumberId');
    if (lumberId) {
      const lumber = LUMBER_TYPES.find((l) => l.id === lumberId);
      if (lumber) {
        addPiece(lumber);
        toast.success(`Added ${lumber.name} to workspace`);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      const { setActiveTool, selectedPieceId, removePiece, duplicatePiece, toggleSnapToGrid, toggleShowDimensions } = useProjectStore.getState();

      switch (e.key.toLowerCase()) {
        case 'v':
          setActiveTool('select');
          break;
        case 'g':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleSnapToGrid();
          } else {
            setActiveTool('move');
          }
          break;
        case 'r':
          setActiveTool('rotate');
          break;
        case 's':
          if (!e.ctrlKey && !e.metaKey) {
            setActiveTool('scale');
          }
          break;
        case 'm':
          setActiveTool('measure');
          break;
        case 'd':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            if (selectedPieceId) {
              duplicatePiece(selectedPieceId);
              toast.success('Piece duplicated');
            }
          } else {
            toggleShowDimensions();
          }
          break;
        case 'delete':
        case 'backspace':
          if (selectedPieceId) {
            removePiece(selectedPieceId);
            toast.success('Piece deleted');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-auto p-3 flex gap-3">
          <ToolBar />
          <div className="flex flex-col gap-3">
            <LumberLibrary />
            <TemplatesPanel />
          </div>
        </div>

        {/* Main Canvas */}
        <div 
          className="flex-1 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* View Controls */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <ViewControls />
          </div>

          {/* Canvas */}
          <WorkshopCanvas />

          {/* Quick tips overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="panel px-4 py-2 text-xs text-muted-foreground space-y-1">
              <p><kbd className="px-1 bg-muted rounded">Click</kbd> lumber to add • <kbd className="px-1 bg-muted rounded">Drag</kbd> to orbit</p>
              <p><kbd className="px-1 bg-muted rounded">Scroll</kbd> to zoom • <kbd className="px-1 bg-muted rounded">Del</kbd> to delete</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-auto p-3 flex flex-col gap-3">
          <PropertiesPanel />
          <CutListPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
};
