import { useState } from 'react';
import { 
  Hammer, 
  Save, 
  FolderOpen, 
  Plus, 
  FileJson,
  Download,
  Upload,
  Github,
  HelpCircle,
  Settings
} from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export const Header = () => {
  const { projectName, setProjectName, clearProject, pieces } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(projectName);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setProjectName(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleNewProject = () => {
    if (pieces.length > 0) {
      if (confirm('Create a new project? Unsaved changes will be lost.')) {
        clearProject();
        toast.success('New project created');
      }
    } else {
      clearProject();
      toast.success('New project created');
    }
  };

  const handleExportProject = () => {
    const projectData = {
      name: projectName,
      pieces: pieces,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}.woodcraft`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Project exported successfully!');
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Logo & Project Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Hammer className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">WoodCraft</span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">Studio</span>
        </div>

        <div className="h-6 w-px bg-border" />

        {isEditing ? (
          <Input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            className="w-48 h-8"
            autoFocus
          />
        ) : (
          <button
            onClick={() => {
              setTempName(projectName);
              setIsEditing(true);
            }}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {projectName}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <FolderOpen size={16} className="mr-2" />
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleNewProject}>
              <Plus size={16} className="mr-2" />
              New Project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleExportProject}>
              <Download size={16} className="mr-2" />
              Export Project
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Upload size={16} className="mr-2" />
              Import Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" disabled>
          <Settings size={16} className="mr-2" />
          Settings
        </Button>

        <div className="h-6 w-px bg-border" />

        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
          >
            <Github size={18} />
          </a>
        </Button>

        <Button variant="ghost" size="icon" title="Help">
          <HelpCircle size={18} />
        </Button>
      </div>
    </header>
  );
};
