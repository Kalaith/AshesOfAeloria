# Ashes of Aeloria

A modern React TypeScript implementation of "Ashes of Aeloria," a strategy game featuring resource management, tactical battles, and immersive storytelling.

## Tech Stack

### Core Framework
- **React** - Modern React with hooks and functional components
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server

### State Management & Utilities
- **Zustand** - Lightweight state management with persistence
- **React Router DOM** - Client-side routing

### Styling & Animations
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **@vitejs/plugin-react** - React support for Vite

## Ashes of Aeloria Frontend

### Overview
The frontend for "Ashes of Aeloria" is built using modern React and TypeScript principles, ensuring maintainability, scalability, and performance. It implements strategy game mechanics with resource management, tactical battles, and dynamic storytelling.

### Features
- **Resource Management**: Manage resources like gold, food, and materials to build and sustain your kingdom.
- **Tactical Battles**: Engage in strategic battles with commanders and units.
- **Dynamic Storytelling**: Experience branching narratives with interactive story events and meaningful choices.
- **Commanders and Units**: Recruit and upgrade commanders and units to strengthen your army.
- **Game Statistics**: Visual charts and progress tracking.
- **Modern UI**: Beautiful animations with Framer Motion and Tailwind CSS.
- **Interactive Canvas**: Grid-based game world with node exploration and mission selection.
- **Story Event System**: Modal-based story events with consequence-driven choices.
- **Testing Framework**: Built-in gameplay testing and balance analysis tools.
- **Error Handling**: Comprehensive error boundaries for graceful failure recovery.

### Architecture Highlights

#### State Management
- **Zustand**: Utilized for global game state, including resources, commanders, and battle status. Zustand stores are defined in `src/stores/` and provide reactive access to data. Persistence is handled via Zustand's built-in middleware, saving critical game state to `localStorage`.

#### Data Flow & Storage
- **Game Data (`src/data/`)**: Static game configurations like unit stats, resource definitions, and story events are stored as immutable JavaScript objects/arrays.
- **Client-Side State (`src/stores/`)**: Dynamic game state (player progress, current resources, active battles, etc.) is managed by Zustand stores.
- **Local Storage**: Zustand stores are configured to persist key game state slices to `localStorage`.

#### Data Presentation
- **React Components (`src/components/`)**: Data from Zustand stores and static game data is consumed by React components. Components are designed to be modular and reusable, focusing on presenting specific pieces of information or interactive elements.
- **Tailwind CSS**: Used for styling all UI elements. Components are built with utility classes for responsive layouts, consistent theming, and rapid prototyping.
- **Framer Motion**: Applied to create smooth and engaging animations. Examples include:
    - Transition effects for opening/closing modals and menus.
    - Visual feedback for button clicks and upgrades.
    - Progress bar animations for resource generation.

#### Type Safety
- **TypeScript**: Enforced throughout the codebase. Comprehensive type definitions (`src/types/`) are used for:
    - **Game State**: Defining the structure of all Zustand stores.
    - **Component Props**: Clearly defining the expected inputs for each React component.
    - **Game Entities**: Strongly typing game objects like `Commander`, `Unit`, and `Resource`.

### Project Structure
```
src/
├── ai/                 # AI system components (GameplayTester, AIPlayer, strategy algorithms)
├── api/                # API service definitions and types for backend interaction (if applicable)
├── components/         # Reusable React components
│   ├── ui/             # Generic UI components (Button, Modal, Card, ErrorBoundary, Toast)
│   ├── game/           # Game-specific components (GameCanvas, StoryEventModal, ResourcePanel)
│   ├── features/       # Enhanced feature components (NodeInfo, CommanderInfo, GameStatus)
│   ├── layout/         # Layout components (GameHeader, GameLayout, panels)
│   ├── campaign/       # Campaign-specific components (ChapterCard, CampaignPage)
│   └── testing/        # Testing and debugging components (GameplayTestPanel)
├── hooks/              # Custom React hooks for encapsulating logic (e.g., useGameLogic, useModals)
├── stores/             # Zustand state management definitions (useGameStore with persistence)
├── types/              # TypeScript type definitions for all data structures and interfaces
├── data/               # Static game data (e.g., gameData.ts, commanders.ts, story events)
├── utils/              # Utility functions and core game logic (e.g., calculations, data transformations)
├── assets/             # Static assets like images, icons (if not in public/)
└── styles/             # Global CSS, Tailwind configuration, and any custom styles
```

### Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Deployment
The project includes a PowerShell publishing script (`publish.ps1`) that supports:
- **FTP Deployment**: Automatic production deployment to FTP servers
- **File System Deployment**: Local deployment for testing
- **Environment Configuration**: Separate preview and production settings
- **Build Optimization**: Production builds with proper base paths

Usage:
```powershell
# Deploy to FTP (production environment)
.\publish.ps1 -ftp

# Deploy to local file system (preview environment)
.\publish.ps1

# Clean deploy with verbose output
.\publish.ps1 -ftp -Clean -Verbose
```

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the individual component README files for details.

Part of the WebHatchery game collection.
