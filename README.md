# 🪵 WoodCraft Studio

A powerful, open-source 3D woodworking project planner built with React, Three.js, and modern web technologies. Design furniture, generate cut lists, and visualize your projects before cutting a single board.

![WoodCraft Studio](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)

## ✨ Features

### 🏗️ 3D Design Environment
- Real-time 3D visualization with orbit controls
- Transform gizmos for intuitive manipulation (move, rotate, scale)
- Multiple view modes (3D, Top, Front, Side)
- Grid snapping for precise placement
- Snap indicators between pieces

### 🪵 Lumber Library
- **Dimensional Lumber**: 2×4, 2×6, 2×8, 2×10, 2×12, 4×4, 1×4, 1×6
- **Plywood**: 1/4", 1/2", 3/4" sheets
- **Hardwoods**: Oak, Walnut, Maple boards
- Accurate actual vs nominal dimensions

### 📋 Templates
Pre-built furniture templates to jumpstart your projects:
- **Tables**: Simple table, Dining table
- **Seating**: Basic chair, Adirondack chair, Garden bench
- **Storage**: Bookshelf, Base cabinet, Wardrobe
- **Bedroom**: Platform bed, Bed with headboard, Nightstand
- **Workbenches**: Heavy workbench, Miter saw station

### 📐 Cut List Generation
- Automatic cut list from your design
- Group by lumber type and length
- Export to CSV for shop use

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `V` | Select tool |
| `G` | Move tool |
| `R` | Rotate tool |
| `S` | Scale tool |
| `M` | Measure tool |
| `D` | Toggle dimensions |
| `Delete` | Delete selected |
| `Ctrl+D` | Duplicate |
| `Ctrl+G` | Toggle grid snap |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/kashan115/woodcraft-studio.git
cd woodcraft-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start designing!

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **State Management**: Zustand
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── woodwork/        # App-specific components
├── store/               # Zustand state management
├── hooks/               # Custom React hooks
├── pages/               # Route pages
└── lib/                 # Utility functions
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🪵 Add furniture templates

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Lucide](https://lucide.dev/) - Beautiful icons

## 🗺️ Roadmap

- [ ] Undo/Redo system
- [ ] Project save/load (local storage)
- [ ] PDF export with cut diagrams
- [ ] Joinery visualization (mortise & tenon, dovetails)
- [ ] Material cost calculator
- [ ] Wood grain textures
- [ ] Assembly instructions generator

---

Made with ❤️ for woodworkers everywhere
