import { useState } from 'react';
import { Package, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { LUMBER_TYPES, LumberType, useProjectStore } from '@/store/projectStore';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LumberItemProps {
  lumber: LumberType;
}

const LumberItem = ({ lumber }: LumberItemProps) => {
  const { addPiece } = useProjectStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('lumberId', lumber.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    // Add piece at origin when clicked
    addPiece(lumber);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={cn(
        'lumber-item group',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-1 opacity-50 group-hover:opacity-100 cursor-grab">
          <GripVertical size={14} />
        </div>
        <div
          className="w-8 h-8 rounded shadow-inner flex-shrink-0"
          style={{ backgroundColor: lumber.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{lumber.name}</p>
          <p className="text-xs text-muted-foreground">
            {lumber.actualWidth}" × {lumber.actualHeight}" × {lumber.defaultLength}"
          </p>
        </div>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  items: LumberType[];
  defaultOpen?: boolean;
}

const CategorySection = ({ title, items, defaultOpen = true }: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {title}
        <span className="text-xs opacity-60">({items.length})</span>
      </button>
      {isOpen && (
        <div className="space-y-2 pl-2">
          {items.map((lumber) => (
            <LumberItem key={lumber.id} lumber={lumber} />
          ))}
        </div>
      )}
    </div>
  );
};

export const LumberLibrary = () => {
  const dimensional = LUMBER_TYPES.filter((l) => l.category === 'dimensional');
  const plywood = LUMBER_TYPES.filter((l) => l.category === 'plywood');
  const hardwood = LUMBER_TYPES.filter((l) => l.category === 'hardwood');

  return (
    <div className="panel w-72 flex flex-col animate-slide-in-left">
      <div className="panel-header">
        <Package size={16} />
        <span>Lumber Library</span>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          <CategorySection title="Dimensional Lumber" items={dimensional} />
          <CategorySection title="Plywood Sheets" items={plywood} />
          <CategorySection title="Hardwood" items={hardwood} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Click or drag lumber to add to workspace
        </p>
      </div>
    </div>
  );
};
