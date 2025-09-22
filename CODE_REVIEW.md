# Code Review: Ashes of Aeloria

## Executive Summary

This code review analyzes the Ashes of Aeloria TypeScript/React frontend project, focusing on clean code practices, type safety, separation of concerns, and maintainability. The project shows good overall structure but has several areas for improvement in terms of magic numbers, type definitions, error handling, and component organization.

## Reviewed Files

- `frontend/src/types/game.d.ts` - Type definitions
- `frontend/src/stores/useGameStore.ts` - Zustand store
- `frontend/src/utils/gameLogic.ts` - Game logic utilities
- `frontend/src/data/gameData.ts` - Game data constants
- `frontend/src/components/game/CampaignPage.tsx` - Campaign UI component
- `frontend/src/data/campaignData.ts` - Campaign data and types
- `frontend/package.json` - Dependencies and scripts

---

## Critical Improvements Required

### 1. Magic Numbers and Constants Extraction

**Issue:** Multiple hardcoded values throughout the codebase without clear meaning or centralized configuration.

**Examples Found:**
```typescript
// In CampaignPage.tsx - Magic array index
{[...Array(5)].map((_, i) => (
  <span className={`text-sm ${i < chapter.starRating ? 'text-yellow-400' : 'text-gray-300'}`}>
    ★
  </span>
))}

// In gameData.ts - Magic numbers without context
baseHealth: 120,
baseAttack: 80,
cost: 200,
defensiveBonus: 2.0
```

**Why it Matters:** Magic numbers make code harder to maintain, understand, and modify. When game balance changes are needed, developers must hunt through the codebase for scattered values.

**Recommended Solution:**
```typescript
// Create constants/gameBalance.ts
export const GAME_BALANCE = {
  COMMANDER_STATS: {
    KNIGHT: { health: 120, attack: 80, defense: 100, cost: 200 },
    MAGE: { health: 80, attack: 120, defense: 60, cost: 250 }
  },
  UI: {
    MAX_STAR_RATING: 5,
    CHAPTER_GRID_COLUMNS: 2
  },
  BATTLE: {
    FORTRESS_DEFENSE_MULTIPLIER: 2.0,
    STRONGHOLD_DEFENSE_MULTIPLIER: 2.5
  }
} as const;
```

### 2. Inconsistent Error Handling and Null Safety

**Issue:** Inconsistent handling of potentially undefined values and lack of proper error boundaries.

**Examples Found:**
```typescript
// In CampaignPage.tsx - Unsafe array access
gameState.completedResearch || []
gameState.completedChapters || []

// In utils - No error handling for data access
const commanderClass = GAME_DATA.commanderClasses[className]; // Could be undefined
```

**Why it Matters:** Runtime errors from null/undefined access can crash the application and provide poor user experience.

**Recommended Solution:**
```typescript
// Create utils/guards.ts
export const safeArrayAccess = <T>(arr: T[] | undefined | null): T[] => arr ?? [];

export const safeObjectAccess = <T, K extends keyof T>(
  obj: T,
  key: K,
  fallback: T[K]
): T[K] => obj?.[key] ?? fallback;

// Usage
const completedResearch = safeArrayAccess(gameState.completedResearch);
const commanderClass = safeObjectAccess(
  GAME_DATA.commanderClasses,
  className,
  DEFAULT_COMMANDER_CLASS
);
```

### 3. Poor Separation of Concerns in Components

**Issue:** Components mixing UI rendering, business logic, and data fetching responsibilities.

**Examples Found:**
```typescript
// CampaignPage.tsx mixing concerns
export const CampaignPage: React.FC = () => {
  // UI state
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  // Business logic
  const isUnlocked = chapter.prerequisites.every(prereq =>
    gameState.completedChapters?.includes(prereq)
  ) || chapter.prerequisites.length === 0;

  // Complex rendering logic
  const renderChapterCard = (chapter: CampaignChapter) => {
    // 50+ lines of JSX
  };
```

**Why it Matters:** Mixed concerns make components harder to test, reuse, and maintain. Business logic should be separated from presentation.

**Recommended Solution:**
```typescript
// hooks/useCampaignLogic.ts
export const useCampaignLogic = () => {
  const gameState = useGameStore();

  const isChapterUnlocked = useCallback((chapter: CampaignChapter): boolean => {
    return chapter.prerequisites.every(prereq =>
      safeArrayAccess(gameState.completedChapters).includes(prereq)
    ) || chapter.prerequisites.length === 0;
  }, [gameState.completedChapters]);

  return { isChapterUnlocked, /* other logic */ };
};

// components/ChapterCard.tsx - Separate component
export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onClick, isUnlocked, isCompleted, isActive }) => {
  // Pure presentation component
};
```

### 4. Weak Type Definitions and Missing Discriminated Unions

**Issue:** Type definitions lack precision and don't leverage TypeScript's advanced features for better type safety.

**Examples Found:**
```typescript
// game.d.ts - Too loose
export type Owner = 'player' | 'enemy' | 'neutral' | 'faction';
export type NodeType = 'city' | 'resource' | 'fortress' | 'shrine' | 'stronghold' | 'settlement' | 'ruins' | 'laboratory' | 'sanctuary' | 'mine' | 'farm' | 'workshop' | 'library' | 'monument';

// Missing discriminated unions for events
export interface ChapterEvent {
  id: string;
  title: string;
  // ... no discrimination
}
```

**Why it Matters:** Loose types reduce IDE support, catch fewer errors at compile time, and make refactoring dangerous.

**Recommended Solution:**
```typescript
// Discriminated unions for better type safety
export type GameEvent =
  | { type: 'story'; data: StoryEventData }
  | { type: 'random'; data: RandomEventData }
  | { type: 'faction'; data: FactionEventData };

// More specific owner types
export type PlayerOwner = 'player';
export type AIOwner = 'enemy' | 'neutral';
export type FactionOwner = `faction_${string}`;
export type Owner = PlayerOwner | AIOwner | FactionOwner;

// Branded types for IDs
export type CommanderId = string & { __brand: 'CommanderId' };
export type ChapterId = string & { __brand: 'ChapterId' };
```

### 5. Inadequate Input Validation and Sanitization

**Issue:** No validation of user inputs or external data, potential for runtime errors.

**Examples Found:**
```typescript
// No validation in store actions
const setSelectedChapter = (chapterId: string) => {
  // Directly sets without validation
  setSelectedChapter(chapterId);
};
```

**Why it Matters:** Invalid data can cause crashes, inconsistent state, and poor user experience.

**Recommended Solution:**
```typescript
// utils/validation.ts
export const validateChapterId = (id: string): ChapterId | null => {
  const validChapter = CAMPAIGN_CHAPTERS.find(chapter => chapter.id === id);
  return validChapter ? (id as ChapterId) : null;
};

// In component
const handleChapterSelection = (chapterId: string) => {
  const validId = validateChapterId(chapterId);
  if (validId) {
    setSelectedChapter(validId);
  } else {
    console.error(`Invalid chapter ID: ${chapterId}`);
  }
};
```

### 6. Missing Performance Optimizations

**Issue:** No memoization of expensive calculations or component optimizations.

**Examples Found:**
```typescript
// CampaignPage.tsx - Recalculated on every render
const availableResearch = getAvailableResearchNodes(
  gameState.completedResearch || [],
  gameState.completedChapters || []
);
```

**Why it Matters:** Unnecessary recalculations can cause performance issues and poor user experience.

**Recommended Solution:**
```typescript
// Use useMemo for expensive calculations
const availableResearch = useMemo(() =>
  getAvailableResearchNodes(
    safeArrayAccess(gameState.completedResearch),
    safeArrayAccess(gameState.completedChapters)
  ),
  [gameState.completedResearch, gameState.completedChapters]
);

// Use React.memo for expensive components
export const ChapterCard = React.memo<ChapterCardProps>(({ chapter, ...props }) => {
  // Component implementation
});
```

### 7. Inconsistent Naming Conventions

**Issue:** Mixing of naming patterns and inconsistent terminology across the codebase.

**Examples Found:**
```typescript
// Inconsistent naming
const gameState = useGameStore(); // camelCase
const CAMPAIGN_CHAPTERS = [...]; // SCREAMING_SNAKE_CASE
const chapter_id = '...'; // snake_case (in some places)

// Inconsistent terminology
'completedChapters' vs 'finished_chapters' vs 'chapterProgress'
```

**Why it Matters:** Inconsistent naming reduces code readability and makes it harder for team members to understand and maintain code.

**Recommended Solution:**
```typescript
// Establish clear conventions in docs/CODING_STANDARDS.md
// Constants: SCREAMING_SNAKE_CASE
export const MAX_COMMANDERS_PER_PLAYER = 10;

// Variables, functions, properties: camelCase
const currentChapter = getCurrentChapter();

// Types, interfaces, classes: PascalCase
interface CampaignState {}

// File names: kebab-case
// campaign-page.tsx, game-logic.ts
```

### 8. Large Interface Definitions Without Composition

**Issue:** Massive interfaces that violate single responsibility principle and are hard to maintain.

**Examples Found:**
```typescript
// game.d.ts - Huge Resources interface
export interface Resources {
  gold: number;
  supplies: number;
  mana: number;
  knowledge: number;
  culture: number;
  influence: number;
  materials: number;
  food: number;
  energy: number;
  artifacts: number;
}
```

**Why it Matters:** Large interfaces become unwieldy and violate single responsibility principle. Changes require modifying multiple places.

**Recommended Solution:**
```typescript
// Break into logical groups
export interface BasicResources {
  gold: number;
  supplies: number;
  food: number;
}

export interface AdvancedResources {
  mana: number;
  knowledge: number;
  energy: number;
  artifacts: number;
}

export interface SocialResources {
  culture: number;
  influence: number;
}

export interface AllResources extends BasicResources, AdvancedResources, SocialResources {
  materials: number; // Special case
}
```

### 9. Missing Error Boundaries and Fallback UI

**Issue:** No error boundaries to catch and handle React component errors gracefully.

**Why it Matters:** Unhandled errors can crash the entire application, providing poor user experience.

**Recommended Solution:**
```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Could send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 10. Insufficient Abstraction of External Dependencies

**Issue:** Direct usage of external libraries throughout components without abstraction layers.

**Examples Found:**
```typescript
// Direct Zustand usage in components
const gameState = useGameStore();

// Direct usage without abstraction
import { CAMPAIGN_CHAPTERS, RESEARCH_TREE } from '../../data/campaignData';
```

**Why it Matters:** Direct dependencies make it hard to swap implementations, test components, and maintain loose coupling.

**Recommended Solution:**
```typescript
// services/CampaignService.ts
export interface CampaignService {
  getChapters(): CampaignChapter[];
  getChapter(id: ChapterId): CampaignChapter | null;
  getAvailableResearch(completed: string[], chapters: string[]): ResearchNode[];
}

export class StaticCampaignService implements CampaignService {
  getChapters() { return CAMPAIGN_CHAPTERS; }
  // ... other implementations
}

// hooks/useCampaignService.ts
const campaignService = new StaticCampaignService();
export const useCampaignService = () => campaignService;
```

### 11. Missing Loading States and Optimistic Updates

**Issue:** No loading states for asynchronous operations or user feedback during state changes.

**Why it Matters:** Users need feedback during operations to understand system state and maintain confidence in the application.

**Recommended Solution:**
```typescript
// hooks/useAsyncOperation.ts
export const useAsyncOperation = <T>(operation: () => Promise<T>) => {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: false, error: null });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await operation();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: error as Error }));
    }
  }, [operation]);

  return { ...state, execute };
};
```

### 12. Lack of Accessibility (a11y) Considerations

**Issue:** Missing ARIA labels, keyboard navigation, and screen reader support.

**Examples Found:**
```typescript
// CampaignPage.tsx - Missing accessibility
<div onClick={() => setSelectedChapter(chapter.id)} className="...">
  // No keyboard navigation, ARIA labels, or focus management
</div>
```

**Why it Matters:** Accessibility is a legal requirement in many jurisdictions and ensures the application is usable by people with disabilities.

**Recommended Solution:**
```typescript
// Add proper accessibility attributes
<button
  onClick={() => setSelectedChapter(chapter.id)}
  onKeyDown={(e) => e.key === 'Enter' && setSelectedChapter(chapter.id)}
  aria-label={`Select chapter: ${chapter.title}`}
  aria-pressed={selectedChapter === chapter.id}
  className="..."
>
```

---

## Implementation Priority

### High Priority (Immediate)
1. Extract magic numbers to constants
2. Add proper error handling and null safety
3. Implement input validation
4. Add TypeScript strict mode compliance

### Medium Priority (Next Sprint)
5. Refactor component separation of concerns
6. Improve type definitions with discriminated unions
7. Add performance optimizations
8. Standardize naming conventions

### Low Priority (Future Releases)
9. Add error boundaries
10. Abstract external dependencies
11. Implement loading states
12. Add accessibility features

---

## Recommended File Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── services/         # Business logic and external service abstractions
├── stores/           # State management
├── types/            # TypeScript definitions
├── utils/            # Pure utility functions
├── constants/        # Application constants
├── data/             # Static data and configurations
└── validators/       # Input validation functions
```

---

## Code Quality Metrics to Track

1. **TypeScript Coverage**: >95% strict type coverage
2. **Test Coverage**: >80% unit test coverage
3. **Bundle Size**: Monitor and optimize
4. **Performance**: Core Web Vitals compliance
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Code Complexity**: Cyclomatic complexity <10

---

## Conclusion

The Ashes of Aeloria codebase shows good overall architecture but needs improvements in type safety, error handling, and component organization. Implementing these recommendations will result in a more maintainable, reliable, and scalable application.

The most critical improvements are extracting magic numbers, adding proper error handling, and improving type safety. These changes will significantly reduce runtime errors and improve developer experience.