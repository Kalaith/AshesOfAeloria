// Game Balance Constants
// Centralized configuration for all game balance values

export const gameBalance = {
  // Commander Base Stats
  COMMANDER_STATS: {
    KNIGHT: {
      baseHealth: 120,
      baseAttack: 80,
      baseDefense: 100,
      cost: 200,
    },
    MAGE: {
      baseHealth: 80,
      baseAttack: 120,
      baseDefense: 60,
      cost: 250,
    },
    RANGER: {
      baseHealth: 100,
      baseAttack: 100,
      baseDefense: 80,
      cost: 180,
    },
    WARLORD: {
      baseHealth: 110,
      baseAttack: 90,
      baseDefense: 90,
      cost: 300,
    },
    SCHOLAR: {
      baseHealth: 70,
      baseAttack: 60,
      baseDefense: 70,
      cost: 220,
    },
    ENGINEER: {
      baseHealth: 90,
      baseAttack: 70,
      baseDefense: 85,
      cost: 240,
    },
    DIPLOMAT: {
      baseHealth: 85,
      baseAttack: 65,
      baseDefense: 75,
      cost: 200,
    },
    EXPLORER: {
      baseHealth: 95,
      baseAttack: 85,
      baseDefense: 70,
      cost: 190,
    },
    ARCHITECT: {
      baseHealth: 100,
      baseAttack: 75,
      baseDefense: 90,
      cost: 280,
    },
    HEALER: {
      baseHealth: 75,
      baseAttack: 50,
      baseDefense: 80,
      cost: 210,
    },
  },

  // Node Generation Values
  NODE_GENERATION: {
    CITY: {
      gold: 100,
      supplies: 50,
      mana: 0,
      defensiveBonus: 1.0,
    },
    RESOURCE: {
      gold: 50,
      supplies: 100,
      mana: 25,
      defensiveBonus: 0.8,
    },
    FORTRESS: {
      gold: 25,
      supplies: 25,
      mana: 0,
      defensiveBonus: 2.0,
    },
    SHRINE: {
      gold: 0,
      supplies: 0,
      mana: 100,
      defensiveBonus: 1.2,
    },
    STRONGHOLD: {
      gold: 150,
      supplies: 75,
      mana: 50,
      defensiveBonus: 2.5,
    },
  },

  // UI Constants
  UI: {
    MAX_STAR_RATING: 5,
    CHAPTER_GRID_COLUMNS_LG: 2,
    CHAPTER_GRID_COLUMNS_MD: 1,
    MODAL_Z_INDEX: 50,
    TOOLTIP_DELAY_MS: 500,
    ANIMATION_DURATION_MS: 300,
  },

  // Battle System
  BATTLE: {
    BASE_ATTACK_MULTIPLIER: 1.0,
    LEVEL_ATTACK_BONUS: 0.1,
    EXPERIENCE_PER_LEVEL: 100,
    MAX_COMMANDER_LEVEL: 20,
    CRITICAL_HIT_CHANCE: 0.1,
    CRITICAL_HIT_MULTIPLIER: 2.0,
  },

  // Resource System
  RESOURCES: {
    STARTING_GOLD: 1000,
    STARTING_SUPPLIES: 500,
    STARTING_MANA: 100,
    STARTING_KNOWLEDGE: 50,
    MAX_RESOURCE_STORAGE: 99999,
    INCOME_CALCULATION_TURN_INTERVAL: 1,
  },

  // Research System
  RESEARCH: {
    BASE_RESEARCH_COST_MULTIPLIER: 1.0,
    TIER_COST_MULTIPLIER: 2.0,
    MAX_RESEARCH_TIER: 4,
    RESEARCH_SPEED_BONUS_CAP: 5.0,
  },

  // Campaign System
  CAMPAIGN: {
    MIN_TURNS_PER_CHAPTER: 15,
    MAX_TURNS_PER_CHAPTER: 100,
    victoryConditionTypes: [
      "territory",
      "population",
      "research",
      "alliances",
      "buildings",
      "resources",
      "special",
    ] as const,
  },

  // Faction System
  FACTIONS: {
    RELATIONSHIP_MIN: -100,
    RELATIONSHIP_MAX: 100,
    NEUTRAL_RELATIONSHIP: 0,
    ALLIANCE_THRESHOLD: 75,
    HOSTILE_THRESHOLD: -50,
    RELATIONSHIP_DECAY_RATE: 0.1,
  },
} as const;

// Derived constants
export const commanderClasses = Object.keys(
  gameBalance.COMMANDER_STATS,
) as const;
export const nodeTypes = Object.keys(gameBalance.NODE_GENERATION) as const;
export const victoryConditionTypes = gameBalance.CAMPAIGN.victoryConditionTypes;

export type CommanderClassName = keyof typeof gameBalance.COMMANDER_STATS;
export type NodeTypeName = keyof typeof gameBalance.NODE_GENERATION;
