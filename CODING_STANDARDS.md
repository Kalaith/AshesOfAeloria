# Coding Standards for Ashes of Aeloria

## Overview

This document establishes coding standards and best practices for the Ashes of Aeloria project. These standards ensure consistency, maintainability, and quality across the codebase.

## File Organization

### Directory Structure
```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── features/        # Feature-specific components
│   ├── layout/          # Layout components
│   └── campaign/        # Campaign-specific components
├── hooks/               # Custom React hooks
├── services/            # Business logic and external service abstractions
├── stores/              # State management (Zustand)
├── types/               # TypeScript definitions
├── utils/               # Pure utility functions
├── constants/           # Application constants
├── data/                # Static data and configurations
├── validators/          # Input validation functions
└── styles/              # CSS and styling
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `ChapterCard.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useCampaignLogic.ts`)
- **Utilities**: camelCase (e.g., `gameLogic.ts`)
- **Constants**: camelCase (e.g., `gameBalance.ts`)
- **Types**: camelCase (e.g., `improved.d.ts`)

## Naming Conventions

### Variables and Functions
- **Format**: camelCase
- **Examples**: `currentChapter`, `handleChapterSelection`, `isChapterUnlocked`

### Constants
- **Application constants**: SCREAMING_SNAKE_CASE
- **Component-level constants**: camelCase
```typescript
// Application level
export const MAX_COMMANDERS_PER_PLAYER = 10;

// Component level
const defaultChapterState = { ... };
```

### Types and Interfaces
- **Format**: PascalCase
- **Interfaces**: Descriptive names ending with purpose if needed
- **Types**: Descriptive names
```typescript
interface CampaignChapter { }
type CommanderState = 'idle' | 'moving' | 'battling';
type ChapterId = string & { __brand: 'ChapterId' };
```

### Functions
- **Pure functions**: Verb or verb phrase describing action
- **Predicates**: Start with 'is', 'has', 'can', 'should'
- **Event handlers**: Start with 'handle'
```typescript
const calculateProgress = (chapter: CampaignChapter) => { };
const isChapterUnlocked = (chapter: CampaignChapter) => { };
const handleChapterClick = (id: string) => { };
```

## TypeScript Standards

### Type Safety
- Use strict TypeScript configuration
- Prefer `unknown` over `any`
- Use type guards for runtime type checking
- Employ branded types for domain-specific IDs

```typescript
// Good - Branded types
type ChapterId = string & { __brand: 'ChapterId' };

// Good - Type guards
const isStoryEvent = (event: GameEvent): event is StoryEvent =>
  event.type === 'story';

// Good - Discriminated unions
type GameEvent = StoryEvent | RandomEvent | FactionEvent;
```

### Interface Design
- Keep interfaces focused and cohesive
- Use composition over large interfaces
- Prefer readonly properties when appropriate

```typescript
// Good - Focused interface
interface ChapterProgress {
  readonly completed: boolean;
  readonly progress: number;
  readonly victoryConditions: readonly VictoryCondition[];
}

// Good - Composition
interface CampaignState extends ChapterProgress {
  readonly currentChapter: ChapterId | null;
}
```

### Generic Types
- Use descriptive generic parameter names
- Constrain generics appropriately
- Provide default generic parameters when sensible

```typescript
// Good
interface AsyncOperationState<TData = unknown> {
  data: TData | null;
  loading: boolean;
  error: GameError | null;
}

// Good - Constrained generics
interface Repository<TEntity extends { id: string }> {
  findById(id: string): TEntity | null;
}
```

## React Component Standards

### Component Structure
```typescript
// 1. Imports (external libraries first, then internal)
import React, { useState, useCallback, memo } from 'react';
import { GAME_BALANCE } from '../../constants/gameBalance';

// 2. Types and interfaces
interface ComponentProps {
  // ...
}

// 3. Component implementation
export const ComponentName = memo<ComponentProps>(({ prop1, prop2 }) => {
  // 4. Hooks (useState, useEffect, custom hooks)
  const [state, setState] = useState(initial);
  const customHook = useCustomHook();

  // 5. Event handlers
  const handleEvent = useCallback(() => {
    // ...
  }, [dependencies]);

  // 6. Render helpers (if needed)
  const renderHelper = () => {
    // ...
  };

  // 7. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
});

// 8. Display name for debugging
ComponentName.displayName = 'ComponentName';
```

### Props Design
- Use descriptive prop names
- Prefer specific types over generic ones
- Group related props into objects when appropriate
- Use callback props for events

```typescript
// Good - Specific and descriptive
interface ChapterCardProps {
  chapter: CampaignChapter;
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  onSelect: (chapterId: ChapterId) => void;
}

// Good - Grouped related props
interface ChapterState {
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  progress: number;
}

interface ChapterCardProps {
  chapter: CampaignChapter;
  state: ChapterState;
  onSelect: (chapterId: ChapterId) => void;
}
```

### Performance Considerations
- Use `React.memo` for expensive components
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive calculations
- Avoid creating objects/functions in render

```typescript
// Good - Memoized component
export const ExpensiveComponent = memo<Props>(({ data }) => {
  const expensiveValue = useMemo(() =>
    expensiveCalculation(data), [data]
  );

  const handleClick = useCallback((id: string) => {
    // handle click
  }, []);

  return <div>{/* render */}</div>;
});
```

## State Management

### Zustand Store Structure
```typescript
interface GameStore {
  // State
  readonly state: GameState;

  // Computed values (selectors)
  readonly computed: {
    availableChapters: CampaignChapter[];
    currentProgress: number;
  };

  // Actions
  readonly actions: {
    selectChapter: (id: ChapterId) => void;
    completeVictoryCondition: (conditionId: string) => void;
  };
}
```

### Action Design
- Actions should be pure functions where possible
- Use descriptive action names
- Validate inputs in actions
- Handle errors gracefully

```typescript
const gameStore = create<GameStore>((set, get) => ({
  // State
  state: initialState,

  // Actions
  actions: {
    selectChapter: (id: ChapterId) => {
      const validation = validateChapterId(id);
      if (!validation.success) {
        console.error('Invalid chapter ID:', validation.error);
        return;
      }

      set(state => ({
        ...state,
        currentChapter: id
      }));
    }
  }
}));
```

## Error Handling

### Error Types
```typescript
interface GameError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
```

### Error Boundaries
- Wrap major components in error boundaries
- Provide fallback UI for errors
- Log errors appropriately

```typescript
<ErrorBoundary
  fallback={<ChapterLoadError onRetry={handleRetry} />}
  onError={(error, errorInfo) => {
    logError('Chapter rendering failed', error, errorInfo);
  }}
>
  <CampaignPage />
</ErrorBoundary>
```

### Validation
- Validate all external inputs
- Use type-safe validation functions
- Provide meaningful error messages

```typescript
const validateChapterId = (id: unknown): ValidationResult<ChapterId> => {
  if (!isNonEmptyString(id)) {
    return { success: false, error: 'Chapter ID must be a non-empty string' };
  }

  // Additional validation...

  return { success: true, data: id as ChapterId };
};
```

## Constants and Configuration

### Organization
```typescript
// constants/gameBalance.ts
export const GAME_BALANCE = {
  COMMANDER_STATS: {
    KNIGHT: { health: 120, attack: 80, defense: 100 }
  },
  UI: {
    MAX_STAR_RATING: 5,
    ANIMATION_DURATION_MS: 300
  }
} as const;
```

### Usage
- Import only what you need
- Use descriptive constant names
- Group related constants

```typescript
// Good
import { GAME_BALANCE } from '../../constants/gameBalance';

const maxRating = GAME_BALANCE.UI.MAX_STAR_RATING;

// Avoid
const maxRating = 5; // Magic number
```

## Testing Standards

### Test Organization
```typescript
// ComponentName.test.tsx
describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render with required props', () => {
      // Test implementation
    });
  });

  describe('interactions', () => {
    it('should handle click events', () => {
      // Test implementation
    });
  });

  describe('edge cases', () => {
    it('should handle invalid data gracefully', () => {
      // Test implementation
    });
  });
});
```

### Test Naming
- Use descriptive test names
- Follow "should [expected behavior] when [condition]" pattern
- Group related tests with describe blocks

## Accessibility

### ARIA Labels
```typescript
<button
  aria-label={`Select chapter: ${chapter.title}`}
  aria-pressed={isSelected}
  aria-disabled={!isUnlocked}
>
  {chapter.title}
</button>
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Provide clear focus indicators
- Use appropriate ARIA attributes

### Screen Reader Support
- Use semantic HTML elements
- Provide alternative text for images
- Use ARIA landmarks appropriately

## Performance Guidelines

### Bundle Size
- Monitor bundle size regularly
- Use dynamic imports for large features
- Tree-shake unused code

### Runtime Performance
- Avoid expensive operations in render
- Use React DevTools Profiler
- Optimize re-renders with memoization

### Memory Management
- Clean up subscriptions in useEffect
- Avoid memory leaks in event handlers
- Use weak references when appropriate

## Code Review Checklist

### Before Submitting
- [ ] All magic numbers extracted to constants
- [ ] Types are properly defined and used
- [ ] Error handling is implemented
- [ ] Input validation is present
- [ ] Components are properly memoized if needed
- [ ] Accessibility attributes are included
- [ ] Tests are written and passing

### During Review
- [ ] Code follows naming conventions
- [ ] Separation of concerns is maintained
- [ ] Performance considerations are addressed
- [ ] Error scenarios are handled
- [ ] Documentation is clear and helpful

## Documentation Standards

### Code Comments
- Explain why, not what
- Document complex business logic
- Use JSDoc for public APIs

```typescript
/**
 * Calculates chapter progress based on completed victory conditions.
 * Progress is weighted by condition importance and difficulty.
 *
 * @param chapter - The chapter to calculate progress for
 * @returns Progress value between 0 and 1
 */
const calculateChapterProgress = (chapter: CampaignChapter): number => {
  // Implementation...
};
```

### README Files
- Keep README files up to date
- Include setup instructions
- Document key concepts and architecture decisions

This document should be reviewed and updated as the project evolves to ensure it remains relevant and helpful for all team members.