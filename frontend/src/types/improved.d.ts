// Improved Type Definitions with better discriminated unions and type safety

// Branded types for better type safety
export type CommanderId = string & { readonly __brand: 'CommanderId' };
export type ChapterId = string & { readonly __brand: 'ChapterId' };
export type NodeId = number & { readonly __brand: 'NodeId' };
export type ResearchId = string & { readonly __brand: 'ResearchId' };
export type PlayerId = string & { readonly __brand: 'PlayerId' };
export type FactionId = string & { readonly __brand: 'FactionId' };

// More specific owner types
export type PlayerOwner = 'player';
export type AIOwner = 'enemy' | 'neutral';
export type FactionOwner = `faction_${string}`;
export type Owner = PlayerOwner | AIOwner | FactionOwner;

// Game event discriminated unions
export type GameEventType = 'story' | 'random' | 'faction' | 'discovery' | 'battle';

export interface BaseGameEvent {
  id: string;
  timestamp: number;
  processed: boolean;
}

export interface StoryEvent extends BaseGameEvent {
  type: 'story';
  chapterId: ChapterId;
  storyData: {
    title: string;
    description: string;
    choices: StoryChoice[];
    importance: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface RandomEvent extends BaseGameEvent {
  type: 'random';
  randomData: {
    eventType: string;
    description: string;
    effects: GameEffect[];
  };
}

export interface FactionEvent extends BaseGameEvent {
  type: 'faction';
  factionData: {
    factionId: FactionId;
    relationshipChange: number;
    message: string;
  };
}

export interface DiscoveryEvent extends BaseGameEvent {
  type: 'discovery';
  discoveryData: {
    nodeId: NodeId;
    discoveryType: 'ruins' | 'resource' | 'artifact' | 'settlement';
    description: string;
    rewards: GameEffect[];
  };
}

export interface BattleEvent extends BaseGameEvent {
  type: 'battle';
  battleData: {
    attackerId: CommanderId;
    defenderId: CommanderId | null;
    nodeId: NodeId;
    result: BattleResult;
  };
}

export type GameEvent = StoryEvent | RandomEvent | FactionEvent | DiscoveryEvent | BattleEvent;

// Choice system with better typing
export interface StoryChoice {
  id: string;
  text: string;
  description: string;
  requirements: ChoiceRequirement[];
  consequences: GameEffect[];
  morality: 'good' | 'neutral' | 'evil';
  difficulty: 1 | 2 | 3 | 4 | 5;
}

// Choice requirements discriminated union
export type ChoiceRequirement =
  | { type: 'resource'; resource: ResourceType; amount: number }
  | { type: 'research'; researchId: ResearchId }
  | { type: 'commander'; commanderClass: CommanderClass }
  | { type: 'faction'; factionId: FactionId; relationship: number }
  | { type: 'level'; minimumLevel: number };

// Game effects discriminated union
export type GameEffect =
  | { type: 'resource'; resource: ResourceType; amount: number; permanent: boolean }
  | { type: 'research'; researchId: ResearchId; unlock: boolean }
  | { type: 'faction'; factionId: FactionId; relationshipChange: number }
  | { type: 'commander'; effect: 'create' | 'heal' | 'levelup'; commanderId?: CommanderId }
  | { type: 'node'; nodeId: NodeId; effect: 'capture' | 'upgrade' | 'destroy' }
  | { type: 'story'; flag: string; value: boolean };

// Resource types with better organization
export type BasicResourceType = 'gold' | 'supplies' | 'food';
export type AdvancedResourceType = 'mana' | 'knowledge' | 'energy' | 'artifacts';
export type SocialResourceType = 'culture' | 'influence';
export type ResourceType = BasicResourceType | AdvancedResourceType | SocialResourceType | 'materials';

// Commander state discriminated union
export type CommanderState =
  | { status: 'idle'; location: NodeId | null }
  | { status: 'moving'; from: NodeId; to: NodeId; turnsRemaining: number }
  | { status: 'battling'; targetNodeId: NodeId; battleId: string }
  | { status: 'exploring'; targetNodeId: NodeId; progressPercent: number }
  | { status: 'recovering'; turnsRemaining: number; location: NodeId };

// Battle result with detailed information
export interface DetailedBattleResult {
  victory: boolean;
  casualties: {
    attacker: Partial<Army>;
    defender: Partial<Army>;
  };
  experience: {
    attackerExp: number;
    defenderExp: number;
  };
  loot: GameEffect[];
  duration: number;
  criticalHits: number;
}

// Research node with proper dependency tracking
export interface ResearchNode {
  id: ResearchId;
  name: string;
  description: string;
  branch: ResearchBranch;
  tier: 1 | 2 | 3 | 4;
  prerequisites: ResearchId[];
  exclusions: ResearchId[]; // Mutually exclusive research
  cost: ResourceCost;
  effects: ResearchEffect[];
  unlocks: string[];
  chapterRequirement?: ChapterId;
  timeToComplete: number;
  special: boolean;
}

export type ResearchBranch = 'infrastructure' | 'military' | 'magic' | 'corruption' | 'environment' | 'culture' | 'transcendence';

export interface ResearchEffect {
  type: 'production' | 'military' | 'population' | 'culture' | 'unlock' | 'special';
  target: string;
  value: number;
  description: string;
  stackable: boolean;
}

// Victory condition with detailed tracking
export interface VictoryCondition {
  id: string;
  type: 'territory' | 'population' | 'research' | 'alliances' | 'buildings' | 'resources' | 'special';
  name: string;
  description: string;
  target: number;
  current: number;
  progress: number; // 0-1
  completed: boolean;
  optional: boolean;
  hidden: boolean; // Some conditions might be secret
}

// Campaign chapter with improved structure
export interface CampaignChapter {
  id: ChapterId;
  title: string;
  subtitle: string;
  description: string;
  loreText: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  estimatedTurns: {
    minimum: number;
    maximum: number;
    average: number;
  };
  theme: string;
  coreChallenge: string;
  prerequisites: ChapterId[];
  victoryConditions: VictoryCondition[];
  storyEvents: StoryEvent[];
  unlockedTechnologies: ResearchId[];
  specialRules: ChapterRule[];
  rewards: ChapterReward[];
  backgroundMusic?: string;
  ambientSounds?: string[];
}

export interface ChapterRule {
  id: string;
  name: string;
  description: string;
  effects: RuleEffect[];
  duration: 'chapter' | 'permanent' | 'conditional';
  condition?: string;
}

export interface RuleEffect {
  type: string;
  modifier: number;
  target: string;
  operation: 'add' | 'multiply' | 'set' | 'min' | 'max';
}

export interface ChapterReward {
  type: 'research' | 'resources' | 'commanders' | 'buildings' | 'legacy' | 'unlock';
  name: string;
  description: string;
  value: number | string;
  permanent: boolean;
}

// Improved error handling types
export interface GameError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: string;
}

export type AsyncOperationState<T> = {
  data: T | null;
  loading: boolean;
  error: GameError | null;
  lastUpdated: number | null;
};

// Type guards for discriminated unions
export const isStoryEvent = (event: GameEvent): event is StoryEvent => event.type === 'story';
export const isRandomEvent = (event: GameEvent): event is RandomEvent => event.type === 'random';
export const isFactionEvent = (event: GameEvent): event is FactionEvent => event.type === 'faction';
export const isDiscoveryEvent = (event: GameEvent): event is DiscoveryEvent => event.type === 'discovery';
export const isBattleEvent = (event: GameEvent): event is BattleEvent => event.type === 'battle';

export const isResourceEffect = (effect: GameEffect): effect is Extract<GameEffect, { type: 'resource' }> =>
  effect.type === 'resource';

export const isCommanderIdle = (state: CommanderState): state is Extract<CommanderState, { status: 'idle' }> =>
  state.status === 'idle';

export const isCommanderMoving = (state: CommanderState): state is Extract<CommanderState, { status: 'moving' }> =>
  state.status === 'moving';

// Utility types for better API design
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Configuration types
export interface GameConfig {
  balance: typeof import('../constants/gameBalance').gameBalance;
  ui: {
    animationDuration: number;
    autoSaveInterval: number;
    tooltipDelay: number;
  };
  debug: {
    enabled: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
    showPerformanceMetrics: boolean;
  };
}