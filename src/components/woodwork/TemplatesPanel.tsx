import { Armchair, Table2, Bed, Archive, BookOpen, Frame } from 'lucide-react';
import { LUMBER_TYPES, useProjectStore } from '@/store/projectStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  pieces: Array<{
    lumberId: string;
    position: [number, number, number];
    rotation: [number, number, number];
    customLength?: number;
  }>;
}

const templates: Template[] = [
  {
    id: 'simple-table',
    name: 'Simple Table',
    description: '4 legs, 1 top frame',
    icon: <Table2 size={20} />,
    pieces: [
      // 4 legs (4x4)
      { lumberId: '4x4', position: [-2, 1.5, -1.5], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [2, 1.5, -1.5], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [-2, 1.5, 1.5], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [2, 1.5, 1.5], rotation: [0, 0, 0], customLength: 30 },
      // Top rails (2x4)
      { lumberId: '2x4', position: [0, 3.2, -1.5], rotation: [0, 0, Math.PI / 2], customLength: 48 },
      { lumberId: '2x4', position: [0, 3.2, 1.5], rotation: [0, 0, Math.PI / 2], customLength: 48 },
      { lumberId: '2x4', position: [-2, 3.2, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 30 },
      { lumberId: '2x4', position: [2, 3.2, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 30 },
    ],
  },
  {
    id: 'basic-shelf',
    name: 'Basic Shelf',
    description: '3-tier bookshelf',
    icon: <BookOpen size={20} />,
    pieces: [
      // Side panels (2x10)
      { lumberId: '2x10', position: [-2, 2, 0], rotation: [0, 0, 0], customLength: 48 },
      { lumberId: '2x10', position: [2, 2, 0], rotation: [0, 0, 0], customLength: 48 },
      // Shelves (1x6)
      { lumberId: '1x6', position: [0, 0.5, 0], rotation: [0, 0, Math.PI / 2], customLength: 36 },
      { lumberId: '1x6', position: [0, 2, 0], rotation: [0, 0, Math.PI / 2], customLength: 36 },
      { lumberId: '1x6', position: [0, 3.5, 0], rotation: [0, 0, Math.PI / 2], customLength: 36 },
    ],
  },
  {
    id: 'workbench',
    name: 'Workbench',
    description: 'Heavy duty bench',
    icon: <Frame size={20} />,
    pieces: [
      // Legs (4x4)
      { lumberId: '4x4', position: [-3, 1.5, -1], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [3, 1.5, -1], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [-3, 1.5, 1], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [3, 1.5, 1], rotation: [0, 0, 0], customLength: 36 },
      // Top (2x6 planks)
      { lumberId: '2x6', position: [0, 3.3, -0.5], rotation: [0, 0, Math.PI / 2], customLength: 72 },
      { lumberId: '2x6', position: [0, 3.3, 0.5], rotation: [0, 0, Math.PI / 2], customLength: 72 },
      // Stretchers (2x4)
      { lumberId: '2x4', position: [0, 0.5, -1], rotation: [0, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '2x4', position: [0, 0.5, 1], rotation: [0, 0, Math.PI / 2], customLength: 60 },
    ],
  },
];

export const TemplatesPanel = () => {
  const { addPiece, clearProject, pieces } = useProjectStore();

  const handleLoadTemplate = (template: Template) => {
    if (pieces.length > 0) {
      if (!confirm('Loading a template will clear your current project. Continue?')) {
        return;
      }
    }
    
    clearProject();
    
    template.pieces.forEach((pieceConfig) => {
      const lumberType = LUMBER_TYPES.find((l) => l.id === pieceConfig.lumberId);
      if (lumberType) {
        addPiece(lumberType, pieceConfig.position);
        // Note: Would need to update rotation and length after adding
      }
    });

    toast.success(`Loaded "${template.name}" template`);
  };

  return (
    <div className="panel animate-fade-in">
      <div className="panel-header">
        <Archive size={16} />
        <span>Templates</span>
      </div>
      <div className="p-3 space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleLoadTemplate(template)}
            className="w-full p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary hover:border-primary/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {template.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
