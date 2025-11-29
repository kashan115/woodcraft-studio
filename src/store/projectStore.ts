import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface LumberPiece {
  id: string;
  type: LumberType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  customLength?: number;
}

export interface LumberType {
  id: string;
  name: string;
  nominalWidth: number;
  nominalHeight: number;
  actualWidth: number;
  actualHeight: number;
  defaultLength: number;
  category: 'dimensional' | 'plywood' | 'hardwood';
  color: string;
}

export const LUMBER_TYPES: LumberType[] = [
  // Dimensional lumber (inches converted to scene units, 1 unit = 1 inch)
  { id: '2x4', name: '2×4', nominalWidth: 2, nominalHeight: 4, actualWidth: 1.5, actualHeight: 3.5, defaultLength: 96, category: 'dimensional', color: '#D4A574' },
  { id: '2x6', name: '2×6', nominalWidth: 2, nominalHeight: 6, actualWidth: 1.5, actualHeight: 5.5, defaultLength: 96, category: 'dimensional', color: '#C9956C' },
  { id: '2x8', name: '2×8', nominalWidth: 2, nominalHeight: 8, actualWidth: 1.5, actualHeight: 7.25, defaultLength: 96, category: 'dimensional', color: '#BE8664' },
  { id: '2x10', name: '2×10', nominalWidth: 2, nominalHeight: 10, actualWidth: 1.5, actualHeight: 9.25, defaultLength: 96, category: 'dimensional', color: '#B3775C' },
  { id: '2x12', name: '2×12', nominalWidth: 2, nominalHeight: 12, actualWidth: 1.5, actualHeight: 11.25, defaultLength: 96, category: 'dimensional', color: '#A86854' },
  { id: '4x4', name: '4×4', nominalWidth: 4, nominalHeight: 4, actualWidth: 3.5, actualHeight: 3.5, defaultLength: 96, category: 'dimensional', color: '#9D594C' },
  { id: '1x4', name: '1×4', nominalWidth: 1, nominalHeight: 4, actualWidth: 0.75, actualHeight: 3.5, defaultLength: 96, category: 'dimensional', color: '#DFB48C' },
  { id: '1x6', name: '1×6', nominalWidth: 1, nominalHeight: 6, actualWidth: 0.75, actualHeight: 5.5, defaultLength: 96, category: 'dimensional', color: '#D4A584' },
  
  // Plywood sheets (in inches, 4'x8' = 48"x96")
  { id: 'ply-1/4', name: '1/4" Plywood', nominalWidth: 48, nominalHeight: 96, actualWidth: 0.25, actualHeight: 48, defaultLength: 96, category: 'plywood', color: '#E8D4B8' },
  { id: 'ply-1/2', name: '1/2" Plywood', nominalWidth: 48, nominalHeight: 96, actualWidth: 0.5, actualHeight: 48, defaultLength: 96, category: 'plywood', color: '#DCC4A8' },
  { id: 'ply-3/4', name: '3/4" Plywood', nominalWidth: 48, nominalHeight: 96, actualWidth: 0.75, actualHeight: 48, defaultLength: 96, category: 'plywood', color: '#D0B498' },
  
  // Hardwood
  { id: 'oak', name: 'Oak Board', nominalWidth: 1, nominalHeight: 6, actualWidth: 0.75, actualHeight: 5.5, defaultLength: 72, category: 'hardwood', color: '#8B7355' },
  { id: 'walnut', name: 'Walnut Board', nominalWidth: 1, nominalHeight: 6, actualWidth: 0.75, actualHeight: 5.5, defaultLength: 72, category: 'hardwood', color: '#5D4E37' },
  { id: 'maple', name: 'Maple Board', nominalWidth: 1, nominalHeight: 6, actualWidth: 0.75, actualHeight: 5.5, defaultLength: 72, category: 'hardwood', color: '#F5DEB3' },
];

export type ToolType = 'select' | 'move' | 'rotate' | 'scale' | 'delete' | 'measure';
export type ViewMode = '3d' | 'top' | 'front' | 'side';

interface ProjectState {
  projectName: string;
  pieces: LumberPiece[];
  selectedPieceId: string | null;
  activeTool: ToolType;
  viewMode: ViewMode;
  gridSize: number;
  snapToGrid: boolean;
  showDimensions: boolean;
  unit: 'inches' | 'feet' | 'cm';
  
  // Actions
  setProjectName: (name: string) => void;
  addPiece: (type: LumberType, position?: [number, number, number]) => void;
  removePiece: (id: string) => void;
  updatePiece: (id: string, updates: Partial<LumberPiece>) => void;
  selectPiece: (id: string | null) => void;
  setActiveTool: (tool: ToolType) => void;
  setViewMode: (mode: ViewMode) => void;
  setGridSize: (size: number) => void;
  toggleSnapToGrid: () => void;
  toggleShowDimensions: () => void;
  setUnit: (unit: 'inches' | 'feet' | 'cm') => void;
  clearProject: () => void;
  duplicatePiece: (id: string) => void;
  getCutList: () => CutListItem[];
}

export interface CutListItem {
  lumberType: string;
  quantity: number;
  length: number;
  pieces: string[];
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectName: 'Untitled Project',
  pieces: [],
  selectedPieceId: null,
  activeTool: 'select',
  viewMode: '3d',
  gridSize: 1,
  snapToGrid: true,
  showDimensions: true,
  unit: 'inches',

  setProjectName: (name) => set({ projectName: name }),

  addPiece: (type, position = [0, type.actualHeight / 2, 0]) => {
    const newPiece: LumberPiece = {
      id: uuidv4(),
      type,
      position,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: type.color,
      customLength: type.defaultLength,
    };
    set((state) => ({ pieces: [...state.pieces, newPiece] }));
  },

  removePiece: (id) => set((state) => ({
    pieces: state.pieces.filter((p) => p.id !== id),
    selectedPieceId: state.selectedPieceId === id ? null : state.selectedPieceId,
  })),

  updatePiece: (id, updates) => set((state) => ({
    pieces: state.pieces.map((p) => (p.id === id ? { ...p, ...updates } : p)),
  })),

  selectPiece: (id) => set({ selectedPieceId: id }),

  setActiveTool: (tool) => set({ activeTool: tool }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setGridSize: (size) => set({ gridSize: size }),

  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),

  toggleShowDimensions: () => set((state) => ({ showDimensions: !state.showDimensions })),

  setUnit: (unit) => set({ unit }),

  clearProject: () => set({ pieces: [], selectedPieceId: null, projectName: 'Untitled Project' }),

  duplicatePiece: (id) => {
    const piece = get().pieces.find((p) => p.id === id);
    if (piece) {
      const newPiece: LumberPiece = {
        ...piece,
        id: uuidv4(),
        position: [piece.position[0] + 5, piece.position[1], piece.position[2] + 5],
      };
      set((state) => ({ pieces: [...state.pieces, newPiece] }));
    }
  },

  getCutList: () => {
    const pieces = get().pieces;
    const cutMap = new Map<string, CutListItem>();

    pieces.forEach((piece) => {
      const length = piece.customLength || piece.type.defaultLength;
      const key = `${piece.type.id}-${length}`;
      
      if (cutMap.has(key)) {
        const item = cutMap.get(key)!;
        item.quantity += 1;
        item.pieces.push(piece.id);
      } else {
        cutMap.set(key, {
          lumberType: piece.type.name,
          quantity: 1,
          length,
          pieces: [piece.id],
        });
      }
    });

    return Array.from(cutMap.values()).sort((a, b) => a.lumberType.localeCompare(b.lumberType));
  },
}));
