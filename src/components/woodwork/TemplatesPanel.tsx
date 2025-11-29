import { Armchair, Table2, Bed, Archive, BookOpen, Frame, DoorOpen, Sofa, RockingChair } from 'lucide-react';
import { LUMBER_TYPES, useProjectStore } from '@/store/projectStore';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplatePiece {
  lumberId: string;
  position: [number, number, number];
  rotation: [number, number, number];
  customLength: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'tables' | 'seating' | 'storage' | 'bedroom' | 'workbench';
  pieces: TemplatePiece[];
}

const templates: Template[] = [
  // TABLES
  {
    id: 'simple-table',
    name: 'Simple Table',
    description: '4 legs with top frame',
    icon: <Table2 size={20} />,
    category: 'tables',
    pieces: [
      // 4 legs (4x4)
      { lumberId: '4x4', position: [-18, 15, -12], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [18, 15, -12], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [-18, 15, 12], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [18, 15, 12], rotation: [0, 0, 0], customLength: 30 },
      // Top rails (2x4)
      { lumberId: '2x4', position: [0, 31, -12], rotation: [0, 0, Math.PI / 2], customLength: 40 },
      { lumberId: '2x4', position: [0, 31, 12], rotation: [0, 0, Math.PI / 2], customLength: 40 },
      { lumberId: '2x4', position: [-18, 31, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 28 },
      { lumberId: '2x4', position: [18, 31, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 28 },
      // Table top planks (1x6)
      { lumberId: '1x6', position: [0, 33, -8], rotation: [0, 0, Math.PI / 2], customLength: 44 },
      { lumberId: '1x6', position: [0, 33, 0], rotation: [0, 0, Math.PI / 2], customLength: 44 },
      { lumberId: '1x6', position: [0, 33, 8], rotation: [0, 0, Math.PI / 2], customLength: 44 },
    ],
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    description: '6-person farmhouse style',
    icon: <Table2 size={20} />,
    category: 'tables',
    pieces: [
      // 4 legs (4x4)
      { lumberId: '4x4', position: [-30, 15, -15], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [30, 15, -15], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [-30, 15, 15], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '4x4', position: [30, 15, 15], rotation: [0, 0, 0], customLength: 30 },
      // Aprons (2x6)
      { lumberId: '2x6', position: [0, 26, -15], rotation: [0, 0, Math.PI / 2], customLength: 56 },
      { lumberId: '2x6', position: [0, 26, 15], rotation: [0, 0, Math.PI / 2], customLength: 56 },
      { lumberId: '2x6', position: [-30, 26, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 26 },
      { lumberId: '2x6', position: [30, 26, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 26 },
      // Table top (2x10 planks)
      { lumberId: '2x10', position: [0, 31, -12], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      { lumberId: '2x10', position: [0, 31, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      { lumberId: '2x10', position: [0, 31, 12], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      // Stretcher
      { lumberId: '2x4', position: [0, 8, 0], rotation: [0, 0, Math.PI / 2], customLength: 56 },
    ],
  },
  // SEATING
  {
    id: 'basic-chair',
    name: 'Basic Chair',
    description: 'Simple dining chair',
    icon: <Armchair size={20} />,
    category: 'seating',
    pieces: [
      // Front legs (2x2 using 2x4 scaled)
      { lumberId: '2x4', position: [-8, 9, 8], rotation: [0, 0, 0], customLength: 18 },
      { lumberId: '2x4', position: [8, 9, 8], rotation: [0, 0, 0], customLength: 18 },
      // Back legs (2x4 - taller for backrest)
      { lumberId: '2x4', position: [-8, 20, -8], rotation: [0, 0, 0], customLength: 40 },
      { lumberId: '2x4', position: [8, 20, -8], rotation: [0, 0, 0], customLength: 40 },
      // Seat rails
      { lumberId: '1x4', position: [0, 18, 8], rotation: [0, 0, Math.PI / 2], customLength: 18 },
      { lumberId: '1x4', position: [0, 18, -8], rotation: [0, 0, Math.PI / 2], customLength: 18 },
      { lumberId: '1x4', position: [-8, 18, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 18 },
      { lumberId: '1x4', position: [8, 18, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 18 },
      // Seat slats (1x4)
      { lumberId: '1x4', position: [0, 19, -4], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 18 },
      { lumberId: '1x4', position: [0, 19, 4], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 18 },
      // Backrest slats
      { lumberId: '1x4', position: [-4, 32, -8], rotation: [0, 0, 0], customLength: 14 },
      { lumberId: '1x4', position: [4, 32, -8], rotation: [0, 0, 0], customLength: 14 },
      // Top rail
      { lumberId: '1x4', position: [0, 38, -8], rotation: [0, 0, Math.PI / 2], customLength: 18 },
    ],
  },
  {
    id: 'adirondack-chair',
    name: 'Adirondack Chair',
    description: 'Classic outdoor lounger',
    icon: <RockingChair size={20} />,
    category: 'seating',
    pieces: [
      // Back legs/supports (2x6 angled)
      { lumberId: '2x6', position: [-12, 12, -5], rotation: [0.3, 0, 0], customLength: 36 },
      { lumberId: '2x6', position: [12, 12, -5], rotation: [0.3, 0, 0], customLength: 36 },
      // Front legs
      { lumberId: '2x4', position: [-12, 10, 12], rotation: [0, 0, 0], customLength: 20 },
      { lumberId: '2x4', position: [12, 10, 12], rotation: [0, 0, 0], customLength: 20 },
      // Seat slats (1x4)
      { lumberId: '1x4', position: [0, 14, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 26 },
      { lumberId: '1x4', position: [0, 14, 5], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 26 },
      { lumberId: '1x4', position: [0, 14, 10], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 26 },
      { lumberId: '1x4', position: [0, 13, -5], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 26 },
      // Back slats
      { lumberId: '1x4', position: [-8, 28, -12], rotation: [0.3, 0, 0], customLength: 28 },
      { lumberId: '1x4', position: [0, 30, -12], rotation: [0.3, 0, 0], customLength: 32 },
      { lumberId: '1x4', position: [8, 28, -12], rotation: [0.3, 0, 0], customLength: 28 },
      // Arm rests (1x6)
      { lumberId: '1x6', position: [-14, 22, 2], rotation: [Math.PI / 2, 0, 0], customLength: 28 },
      { lumberId: '1x6', position: [14, 22, 2], rotation: [Math.PI / 2, 0, 0], customLength: 28 },
    ],
  },
  {
    id: 'bench',
    name: 'Garden Bench',
    description: '2-person outdoor bench',
    icon: <Sofa size={20} />,
    category: 'seating',
    pieces: [
      // Legs (4x4)
      { lumberId: '4x4', position: [-20, 9, -6], rotation: [0, 0, 0], customLength: 18 },
      { lumberId: '4x4', position: [20, 9, -6], rotation: [0, 0, 0], customLength: 18 },
      { lumberId: '4x4', position: [-20, 9, 6], rotation: [0, 0, 0], customLength: 18 },
      { lumberId: '4x4', position: [20, 9, 6], rotation: [0, 0, 0], customLength: 18 },
      // Seat support rails (2x4)
      { lumberId: '2x4', position: [0, 16, -6], rotation: [0, 0, Math.PI / 2], customLength: 44 },
      { lumberId: '2x4', position: [0, 16, 6], rotation: [0, 0, Math.PI / 2], customLength: 44 },
      // Seat slats (2x4)
      { lumberId: '2x4', position: [0, 18, -4], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 48 },
      { lumberId: '2x4', position: [0, 18, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 48 },
      { lumberId: '2x4', position: [0, 18, 4], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 48 },
      // Stretchers
      { lumberId: '2x4', position: [0, 6, 0], rotation: [0, 0, Math.PI / 2], customLength: 36 },
    ],
  },
  // STORAGE
  {
    id: 'basic-shelf',
    name: 'Basic Bookshelf',
    description: '4-tier bookshelf',
    icon: <BookOpen size={20} />,
    category: 'storage',
    pieces: [
      // Side panels (3/4" plywood)
      { lumberId: 'ply-3/4', position: [-15, 36, 0], rotation: [0, Math.PI / 2, 0], customLength: 72 },
      { lumberId: 'ply-3/4', position: [15, 36, 0], rotation: [0, Math.PI / 2, 0], customLength: 72 },
      // Shelves (3/4" plywood)
      { lumberId: 'ply-3/4', position: [0, 1, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 30 },
      { lumberId: 'ply-3/4', position: [0, 24, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 30 },
      { lumberId: 'ply-3/4', position: [0, 48, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 30 },
      { lumberId: 'ply-3/4', position: [0, 72, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 30 },
      // Back panel (1/4" plywood)
      { lumberId: 'ply-1/4', position: [0, 36, -6], rotation: [0, 0, 0], customLength: 72 },
    ],
  },
  {
    id: 'cabinet',
    name: 'Base Cabinet',
    description: 'Kitchen base cabinet 24"',
    icon: <DoorOpen size={20} />,
    category: 'storage',
    pieces: [
      // Side panels
      { lumberId: 'ply-3/4', position: [-12, 17, 0], rotation: [0, Math.PI / 2, 0], customLength: 34 },
      { lumberId: 'ply-3/4', position: [12, 17, 0], rotation: [0, Math.PI / 2, 0], customLength: 34 },
      // Bottom
      { lumberId: 'ply-3/4', position: [0, 4, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 24 },
      // Top frame rails (2x4)
      { lumberId: '2x4', position: [0, 34, 10], rotation: [0, 0, Math.PI / 2], customLength: 24 },
      { lumberId: '2x4', position: [0, 34, -10], rotation: [0, 0, Math.PI / 2], customLength: 24 },
      // Back panel
      { lumberId: 'ply-1/4', position: [0, 19, -11], rotation: [0, 0, 0], customLength: 30 },
      // Face frame (1x4)
      { lumberId: '1x4', position: [-12, 17, 12], rotation: [0, 0, 0], customLength: 34 },
      { lumberId: '1x4', position: [12, 17, 12], rotation: [0, 0, 0], customLength: 34 },
      { lumberId: '1x4', position: [0, 33, 12], rotation: [0, 0, Math.PI / 2], customLength: 24 },
      // Shelf
      { lumberId: 'ply-3/4', position: [0, 18, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 22 },
    ],
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe',
    description: 'Freestanding closet',
    icon: <DoorOpen size={20} />,
    category: 'storage',
    pieces: [
      // Side panels (3/4" plywood)
      { lumberId: 'ply-3/4', position: [-18, 36, 0], rotation: [0, Math.PI / 2, 0], customLength: 72 },
      { lumberId: 'ply-3/4', position: [18, 36, 0], rotation: [0, Math.PI / 2, 0], customLength: 72 },
      // Top and bottom
      { lumberId: 'ply-3/4', position: [0, 1, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 36 },
      { lumberId: 'ply-3/4', position: [0, 72, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 36 },
      // Back panel
      { lumberId: 'ply-1/4', position: [0, 36, -11], rotation: [0, 0, 0], customLength: 70 },
      // Hanging rail support
      { lumberId: '2x4', position: [0, 60, 0], rotation: [0, 0, Math.PI / 2], customLength: 34 },
      // Shelf above rail
      { lumberId: 'ply-3/4', position: [0, 64, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 34 },
      // Bottom shelf divider
      { lumberId: 'ply-3/4', position: [0, 18, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 34 },
    ],
  },
  // BEDROOM
  {
    id: 'platform-bed',
    name: 'Platform Bed',
    description: 'Queen size platform',
    icon: <Bed size={20} />,
    category: 'bedroom',
    pieces: [
      // Side rails (2x10)
      { lumberId: '2x10', position: [-30, 7, 0], rotation: [0, 0, 0], customLength: 80 },
      { lumberId: '2x10', position: [30, 7, 0], rotation: [0, 0, 0], customLength: 80 },
      // Head and foot rails (2x10)
      { lumberId: '2x10', position: [0, 7, -40], rotation: [0, Math.PI / 2, 0], customLength: 60 },
      { lumberId: '2x10', position: [0, 7, 40], rotation: [0, Math.PI / 2, 0], customLength: 60 },
      // Center support (2x6)
      { lumberId: '2x6', position: [0, 7, 0], rotation: [0, 0, 0], customLength: 76 },
      // Slats (1x4)
      { lumberId: '1x4', position: [0, 12, -35], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, -25], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, -15], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, -5], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, 5], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, 15], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, 25], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '1x4', position: [0, 12, 35], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 60 },
      // Legs (4x4)
      { lumberId: '4x4', position: [-28, 3, -38], rotation: [0, 0, 0], customLength: 6 },
      { lumberId: '4x4', position: [28, 3, -38], rotation: [0, 0, 0], customLength: 6 },
      { lumberId: '4x4', position: [-28, 3, 38], rotation: [0, 0, 0], customLength: 6 },
      { lumberId: '4x4', position: [28, 3, 38], rotation: [0, 0, 0], customLength: 6 },
    ],
  },
  {
    id: 'bed-frame-headboard',
    name: 'Bed with Headboard',
    description: 'Full bed with headboard',
    icon: <Bed size={20} />,
    category: 'bedroom',
    pieces: [
      // Headboard posts (4x4)
      { lumberId: '4x4', position: [-27, 24, -38], rotation: [0, 0, 0], customLength: 48 },
      { lumberId: '4x4', position: [27, 24, -38], rotation: [0, 0, 0], customLength: 48 },
      // Headboard panels (1x6)
      { lumberId: '1x6', position: [-18, 30, -38], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '1x6', position: [-9, 30, -38], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '1x6', position: [0, 30, -38], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '1x6', position: [9, 30, -38], rotation: [0, 0, 0], customLength: 30 },
      { lumberId: '1x6', position: [18, 30, -38], rotation: [0, 0, 0], customLength: 30 },
      // Headboard top rail (2x4)
      { lumberId: '2x4', position: [0, 46, -38], rotation: [0, 0, Math.PI / 2], customLength: 54 },
      // Side rails (2x8)
      { lumberId: '2x8', position: [-27, 8, 0], rotation: [0, 0, 0], customLength: 75 },
      { lumberId: '2x8', position: [27, 8, 0], rotation: [0, 0, 0], customLength: 75 },
      // Foot rail (2x8)
      { lumberId: '2x8', position: [0, 8, 37], rotation: [0, Math.PI / 2, 0], customLength: 54 },
      // Foot posts (4x4)
      { lumberId: '4x4', position: [-27, 10, 37], rotation: [0, 0, 0], customLength: 20 },
      { lumberId: '4x4', position: [27, 10, 37], rotation: [0, 0, 0], customLength: 20 },
      // Slats (1x4)
      { lumberId: '1x4', position: [0, 12, -30], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 54 },
      { lumberId: '1x4', position: [0, 12, -15], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 54 },
      { lumberId: '1x4', position: [0, 12, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 54 },
      { lumberId: '1x4', position: [0, 12, 15], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 54 },
      { lumberId: '1x4', position: [0, 12, 30], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 54 },
    ],
  },
  {
    id: 'nightstand',
    name: 'Nightstand',
    description: 'Bedside table with drawer',
    icon: <Archive size={20} />,
    category: 'bedroom',
    pieces: [
      // Legs (2x2 approximated with 2x4)
      { lumberId: '2x4', position: [-8, 12, -6], rotation: [0, 0, 0], customLength: 24 },
      { lumberId: '2x4', position: [8, 12, -6], rotation: [0, 0, 0], customLength: 24 },
      { lumberId: '2x4', position: [-8, 12, 6], rotation: [0, 0, 0], customLength: 24 },
      { lumberId: '2x4', position: [8, 12, 6], rotation: [0, 0, 0], customLength: 24 },
      // Top (1x12 approximated with 2x10)
      { lumberId: '2x10', position: [0, 25, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 20 },
      // Bottom shelf
      { lumberId: 'ply-3/4', position: [0, 6, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 16 },
      // Side aprons (1x4)
      { lumberId: '1x4', position: [0, 20, -6], rotation: [0, 0, Math.PI / 2], customLength: 16 },
      { lumberId: '1x4', position: [0, 20, 6], rotation: [0, 0, Math.PI / 2], customLength: 16 },
      { lumberId: '1x4', position: [-8, 20, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 12 },
      { lumberId: '1x4', position: [8, 20, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 12 },
    ],
  },
  // WORKBENCH
  {
    id: 'workbench',
    name: 'Heavy Workbench',
    description: 'Shop workbench with shelf',
    icon: <Frame size={20} />,
    category: 'workbench',
    pieces: [
      // Legs (4x4)
      { lumberId: '4x4', position: [-28, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [28, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [-28, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [28, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      // Top frame (2x6)
      { lumberId: '2x6', position: [0, 34, -10], rotation: [0, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '2x6', position: [0, 34, 10], rotation: [0, 0, Math.PI / 2], customLength: 60 },
      { lumberId: '2x6', position: [-28, 34, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 20 },
      { lumberId: '2x6', position: [28, 34, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 20 },
      // Work surface (2x6 planks)
      { lumberId: '2x6', position: [0, 37, -6], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      { lumberId: '2x6', position: [0, 37, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      { lumberId: '2x6', position: [0, 37, 6], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 72 },
      // Lower stretchers (2x4)
      { lumberId: '2x4', position: [0, 6, -10], rotation: [0, 0, Math.PI / 2], customLength: 52 },
      { lumberId: '2x4', position: [0, 6, 10], rotation: [0, 0, Math.PI / 2], customLength: 52 },
      { lumberId: '2x4', position: [-28, 6, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 16 },
      { lumberId: '2x4', position: [28, 6, 0], rotation: [0, Math.PI / 2, Math.PI / 2], customLength: 16 },
      // Lower shelf (3/4" plywood)
      { lumberId: 'ply-3/4', position: [0, 8, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 52 },
    ],
  },
  {
    id: 'miter-station',
    name: 'Miter Saw Station',
    description: 'Workstation with wings',
    icon: <Frame size={20} />,
    category: 'workbench',
    pieces: [
      // Main cabinet legs (4x4)
      { lumberId: '4x4', position: [-12, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [12, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [-12, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '4x4', position: [12, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      // Main top (3/4" plywood)
      { lumberId: 'ply-3/4', position: [0, 37, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 28 },
      // Wing supports (2x4)
      { lumberId: '2x4', position: [-36, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '2x4', position: [-36, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '2x4', position: [36, 18, -10], rotation: [0, 0, 0], customLength: 36 },
      { lumberId: '2x4', position: [36, 18, 10], rotation: [0, 0, 0], customLength: 36 },
      // Wing tops (3/4" plywood)
      { lumberId: 'ply-3/4', position: [-36, 37, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 24 },
      { lumberId: 'ply-3/4', position: [36, 37, 0], rotation: [Math.PI / 2, 0, Math.PI / 2], customLength: 24 },
      // Fence (2x4)
      { lumberId: '2x4', position: [0, 40, -8], rotation: [0, 0, Math.PI / 2], customLength: 96 },
    ],
  },
];

const categoryLabels = {
  tables: 'Tables',
  seating: 'Seating',
  storage: 'Storage',
  bedroom: 'Bedroom',
  workbench: 'Workbenches',
};

export const TemplatesPanel = () => {
  const { addPiece, clearProject, pieces, updatePiece } = useProjectStore();

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
        // Get the last added piece and update its rotation and length
        const state = useProjectStore.getState();
        const lastPiece = state.pieces[state.pieces.length - 1];
        if (lastPiece) {
          updatePiece(lastPiece.id, {
            rotation: pieceConfig.rotation,
            customLength: pieceConfig.customLength,
          });
        }
      }
    });

    toast.success(`Loaded "${template.name}" template with ${template.pieces.length} pieces`);
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <div className="panel animate-fade-in">
      <div className="panel-header">
        <Archive size={16} />
        <span>Templates</span>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-3 space-y-4">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h4>
              <div className="space-y-2">
                {categoryTemplates.map((template) => (
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
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
