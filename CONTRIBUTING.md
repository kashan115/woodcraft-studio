# Contributing to WoodCraft Studio

Thank you for your interest in contributing to WoodCraft Studio! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager
- Git

### Local Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/woodcraft-studio.git
   cd woodcraft-studio
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser** to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   └── woodwork/        # Woodworking-specific components
│       ├── WorkshopCanvas.tsx    # Main 3D canvas
│       ├── LumberPiece3D.tsx     # Individual 3D lumber pieces
│       ├── LumberLibrary.tsx     # Lumber selection panel
│       ├── TemplatesPanel.tsx    # Furniture templates
│       ├── PropertiesPanel.tsx   # Selected piece properties
│       ├── CutListPanel.tsx      # Generated cut list
│       ├── ToolBar.tsx           # Tool selection
│       └── ...
├── store/
│   └── projectStore.ts  # Zustand state management
├── hooks/               # Custom React hooks
├── pages/               # Route pages
└── lib/                 # Utility functions
```

## 🎯 Areas for Contribution

### High Priority
- [ ] **More Furniture Templates** - Add templates for common furniture (tables, chairs, shelves, etc.)
- [ ] **Joinery Types** - Implement different wood joinery visualizations (mortise & tenon, dovetail, pocket holes)
- [ ] **Export Formats** - Add export to PDF, SVG cut diagrams, or CAD formats
- [ ] **Material Calculator** - Calculate board feet and costs

### Medium Priority
- [ ] **Undo/Redo System** - Implement history for actions
- [ ] **Project Save/Load** - Local storage or file-based project saving
- [ ] **Measurement Tools** - Distance and angle measurement tools
- [ ] **Wood Grain Textures** - Realistic wood textures for different species

### Nice to Have
- [ ] **Multi-select** - Select and manipulate multiple pieces
- [ ] **Assembly Instructions** - Generate step-by-step build guides
- [ ] **Cost Estimation** - Integrate lumber pricing
- [ ] **Mobile Support** - Touch-friendly controls

## 📝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features
1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case / why it would be useful
   - Any implementation ideas (optional)

### Submitting Code

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   - Ensure the app builds without errors
   - Test in multiple browsers if possible

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add mortise and tenon joinery visualization"
   # or
   git commit -m "fix: correct lumber dimension calculations"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Guidelines
- Reference any related issues
- Provide a clear description of changes
- Include screenshots for UI changes
- Keep PRs focused - one feature/fix per PR

## 🎨 Adding New Templates

Templates are defined in `src/components/woodwork/TemplatesPanel.tsx`. To add a new template:

```typescript
{
  id: 'my-furniture',
  name: 'My Furniture',
  description: 'Brief description',
  icon: <IconComponent size={20} />,
  category: 'tables' | 'seating' | 'storage' | 'bedroom' | 'workbench',
  pieces: [
    {
      lumberId: '2x4',  // Must match ID in LUMBER_TYPES
      position: [x, y, z],  // Position in inches
      rotation: [rx, ry, rz],  // Rotation in radians
      customLength: 48,  // Length in inches
    },
    // ... more pieces
  ],
}
```

### Tips for Template Design
- Use realistic dimensions (standard lumber sizes)
- Position pieces so they connect logically
- Include all structural elements
- Test by loading the template

## 🔧 Code Style

- Use TypeScript for type safety
- Follow React best practices (hooks, functional components)
- Use Tailwind CSS for styling with semantic tokens
- Keep components focused and reusable

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## 💬 Questions?

Feel free to open an issue for any questions about contributing!
