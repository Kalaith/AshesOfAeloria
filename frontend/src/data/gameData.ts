import type { GameData } from '../types/game';

export const GAME_DATA: GameData = {
  nodeTypes: {
    city: {
      name: "City",
      color: "#4CAF50",
      icon: "🏰",
      goldGeneration: 100,
      suppliesGeneration: 50,
      manaGeneration: 0,
      defensiveBonus: 1.0,
      description: "Generates gold and supplies, enables troop recruitment"
    },
    resource: {
      name: "Resource Node",
      color: "#FF9800",
      icon: "⛏️",
      goldGeneration: 50,
      suppliesGeneration: 100,
      manaGeneration: 25,
      defensiveBonus: 0.8,
      description: "Provides valuable resources for your empire"
    },
    fortress: {
      name: "Fortress",
      color: "#9E9E9E",
      icon: "🛡️",
      goldGeneration: 25,
      suppliesGeneration: 25,
      manaGeneration: 0,
      defensiveBonus: 2.0,
      description: "Defensive stronghold with high garrison value"
    },
    shrine: {
      name: "Shrine",
      color: "#9C27B0",
      icon: "✨",
      goldGeneration: 0,
      suppliesGeneration: 0,
      manaGeneration: 100,
      defensiveBonus: 1.2,
      description: "Ancient site that provides magical power"
    },
    stronghold: {
      name: "Enemy Stronghold",
      color: "#F44336",
      icon: "💀",
      goldGeneration: 150,
      suppliesGeneration: 75,
      manaGeneration: 50,
      defensiveBonus: 2.5,
      description: "Heavily fortified enemy position"
    }
  },
  commanderClasses: {
    knight: {
      name: "Knight",
      icon: "⚔️",
      description: "Heavily armored tank unit with high defense",
      baseHealth: 120,
      baseAttack: 80,
      baseDefense: 100,
      specialAbility: "Shield Wall - Increases army defense by 50%",
      cost: 200
    },
    mage: {
      name: "Mage",
      icon: "🔮",
      description: "Magical supporter with area-of-effect abilities",
      baseHealth: 80,
      baseAttack: 120,
      baseDefense: 60,
      specialAbility: "Fireball - Deals AOE damage to enemy army",
      cost: 250
    },
    ranger: {
      name: "Ranger",
      icon: "🏹",
      description: "Scout and skirmisher with mobility bonuses",
      baseHealth: 100,
      baseAttack: 100,
      baseDefense: 80,
      specialAbility: "Stealth - Can scout enemy nodes without detection",
      cost: 180
    },
    warlord: {
      name: "Warlord",
      icon: "👑",
      description: "Leader that provides army-wide bonuses",
      baseHealth: 110,
      baseAttack: 90,
      baseDefense: 90,
      specialAbility: "Rally - Increases entire army combat effectiveness",
      cost: 300
    }
  },
  races: {
    human: {
      name: "Human",
      icon: "👤",
      bonus: "Versatile - 10% bonus to all resources",
      color: "#2196F3"
    },
    elf: {
      name: "Elf",
      icon: "🧝",
      bonus: "Magical Affinity - 20% bonus to mana generation",
      color: "#4CAF50"
    },
    orc: {
      name: "Orc",
      icon: "👹",
      bonus: "Brutal Strength - 15% bonus to combat damage",
      color: "#FF5722"
    },
    undead: {
      name: "Undead",
      icon: "💀",
      bonus: "Undying - Commanders revive with 50% health after defeat",
      color: "#9C27B0"
    }
  },
  troopTypes: {
    soldiers: {
      name: "Soldiers",
      icon: "🛡️",
      attack: 10,
      defense: 10,
      cost: 20,
      strongAgainst: ["cavalry"],
      weakAgainst: ["archers"],
      description: "Balanced infantry units"
    },
    archers: {
      name: "Archers",
      icon: "🏹",
      attack: 12,
      defense: 6,
      cost: 25,
      strongAgainst: ["soldiers"],
      weakAgainst: ["cavalry"],
      description: "Ranged units effective against infantry"
    },
    cavalry: {
      name: "Cavalry",
      icon: "🐎",
      attack: 15,
      defense: 8,
      cost: 40,
      strongAgainst: ["archers"],
      weakAgainst: ["soldiers"],
      description: "Fast mounted units"
    },
    mages: {
      name: "Mages",
      icon: "🔥",
      attack: 20,
      defense: 4,
      cost: 60,
      strongAgainst: [],
      weakAgainst: [],
      description: "Magical support units that disrupt enemy formations"
    },
    engineers: {
      name: "Engineers",
      icon: "🔧",
      attack: 8,
      defense: 12,
      cost: 45,
      strongAgainst: [],
      weakAgainst: ["cavalry"],
      description: "Technical specialists for siege warfare and construction"
    },
    scouts: {
      name: "Scouts",
      icon: "👁️",
      attack: 6,
      defense: 8,
      cost: 30,
      strongAgainst: [],
      weakAgainst: ["soldiers"],
      description: "Fast reconnaissance units for gathering intelligence"
    },
    healers: {
      name: "Healers",
      icon: "⚕️",
      attack: 3,
      defense: 15,
      cost: 35,
      strongAgainst: [],
      weakAgainst: [],
      description: "Medical support units that can restore army health"
    },
    specialists: {
      name: "Specialists",
      icon: "⭐",
      attack: 18,
      defense: 12,
      cost: 80,
      strongAgainst: [],
      weakAgainst: [],
      description: "Elite units with specialized equipment and training"
    }
  },
  factions: {
    ironborn: {
      name: "The Ironborn Clans",
      description: "Hardy survivors who adapted to harsh conditions through strength and unity",
      color: "#607D8B",
      icon: "⚒️",
      ideology: "Strength through adversity, honor in struggle",
      strengths: ["Military prowess", "Resource extraction", "Harsh environment adaptation"],
      weaknesses: ["Cultural inflexibility", "Limited magic use", "Diplomatic stubbornness"],
      preferredDiplomacy: ["Military alliance", "Trade agreement", "Non-aggression pact"],
      territorialAmbitions: 7,
      militaryFocus: 9,
      economicFocus: 6,
      culturalFocus: 4,
      technologicalFocus: 5,
      initialDisposition: -20
    },
    mystics: {
      name: "The Mystic Circle",
      description: "Keepers of ancient magical knowledge seeking to restore the balance",
      color: "#9C27B0",
      icon: "🔮",
      ideology: "Magic as the path to restoration, wisdom over might",
      strengths: ["Magical mastery", "Ancient knowledge", "Corruption resistance"],
      weaknesses: ["Physical frailty", "Resource dependence", "Isolation tendencies"],
      preferredDiplomacy: ["Research agreement", "Cultural exchange", "Magical alliance"],
      territorialAmbitions: 3,
      militaryFocus: 4,
      economicFocus: 5,
      culturalFocus: 9,
      technologicalFocus: 8,
      initialDisposition: 10
    },
    merchants: {
      name: "The Merchant Federation",
      description: "Pragmatic traders focused on rebuilding through commerce and cooperation",
      color: "#FF9800",
      icon: "💰",
      ideology: "Prosperity through trade, cooperation over conflict",
      strengths: ["Economic efficiency", "Trade networks", "Diplomatic flexibility"],
      weaknesses: ["Military weakness", "Corruption vulnerability", "Wealth inequality"],
      preferredDiplomacy: ["Trade agreement", "Economic alliance", "Mutual defense"],
      territorialAmbitions: 5,
      militaryFocus: 3,
      economicFocus: 9,
      culturalFocus: 6,
      technologicalFocus: 7,
      initialDisposition: 30
    },
    nomads: {
      name: "The Wandering Tribes",
      description: "Mobile communities that have mastered survival in the changed world",
      color: "#795548",
      icon: "🐎",
      ideology: "Freedom through mobility, adaptation over resistance",
      strengths: ["Mobility", "Survival skills", "Environmental knowledge"],
      weaknesses: ["Infrastructure limitations", "Technology lag", "Settlement vulnerability"],
      preferredDiplomacy: ["Safe passage", "Resource exchange", "Temporary alliance"],
      territorialAmbitions: 2,
      militaryFocus: 6,
      economicFocus: 5,
      culturalFocus: 7,
      technologicalFocus: 4,
      initialDisposition: 0
    },
    scholars: {
      name: "The Academy of Restoration",
      description: "Dedicated researchers working to recover lost knowledge and technology",
      color: "#2196F3",
      icon: "📚",
      ideology: "Knowledge is power, research leads to salvation",
      strengths: ["Research speed", "Technology recovery", "Knowledge preservation"],
      weaknesses: ["Military inexperience", "Practical application gaps", "Resource inefficiency"],
      preferredDiplomacy: ["Research sharing", "Academic alliance", "Knowledge exchange"],
      territorialAmbitions: 4,
      militaryFocus: 2,
      economicFocus: 6,
      culturalFocus: 8,
      technologicalFocus: 10,
      initialDisposition: 20
    },
    rebels: {
      name: "The Liberation Front",
      description: "Revolutionary faction seeking to overthrow old power structures",
      color: "#F44336",
      icon: "✊",
      ideology: "Freedom from oppression, power to the people",
      strengths: ["Guerrilla tactics", "Popular support", "Rapid mobilization"],
      weaknesses: ["Internal divisions", "Resource scarcity", "Diplomatic isolation"],
      preferredDiplomacy: ["Revolutionary alliance", "Popular uprising support", "Anti-establishment pact"],
      territorialAmbitions: 6,
      militaryFocus: 8,
      economicFocus: 4,
      culturalFocus: 7,
      technologicalFocus: 5,
      initialDisposition: -40
    },
    guardians: {
      name: "The Guardian Order",
      description: "Protectors dedicated to preserving what remains and preventing further catastrophe",
      color: "#4CAF50",
      icon: "🛡️",
      ideology: "Protection above expansion, preservation over progress",
      strengths: ["Defensive expertise", "Environmental protection", "Moral authority"],
      weaknesses: ["Expansion reluctance", "Technological conservatism", "Resource limitations"],
      preferredDiplomacy: ["Mutual protection", "Environmental accord", "Defensive alliance"],
      territorialAmbitions: 3,
      militaryFocus: 7,
      economicFocus: 5,
      culturalFocus: 6,
      technologicalFocus: 6,
      initialDisposition: 15
    },
    survivors: {
      name: "The Survivor Coalition",
      description: "Diverse group of settlements united by necessity and mutual aid",
      color: "#9E9E9E",
      icon: "🤝",
      ideology: "Unity in diversity, survival through cooperation",
      strengths: ["Adaptability", "Resource sharing", "Crisis management"],
      weaknesses: ["Leadership conflicts", "Strategic inconsistency", "Limited specialization"],
      preferredDiplomacy: ["Mutual aid", "Resource sharing", "Crisis alliance"],
      territorialAmbitions: 5,
      militaryFocus: 5,
      economicFocus: 7,
      culturalFocus: 5,
      technologicalFocus: 6,
      initialDisposition: 25
    }
  },
  technologies: {
    agriculture: {
      name: "Advanced Agriculture",
      description: "Improved farming techniques for higher yields and crop diversity",
      category: "Survival",
      researchCost: 100,
      prerequisites: [],
      unlocks: ["Granary", "Irrigation", "Crop Rotation"],
      effects: [
        { type: "resource_bonus", value: 25, target: "food" },
        { type: "population_bonus", value: 10, target: "growth" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    metalworking: {
      name: "Advanced Metalworking",
      description: "Sophisticated techniques for forging stronger metals and alloys",
      category: "Crafting",
      researchCost: 150,
      prerequisites: [],
      unlocks: ["Forge", "Advanced Weapons", "Metal Armor"],
      effects: [
        { type: "unit_bonus", value: 15, target: "attack" },
        { type: "building_unlock", value: 1, target: "workshop" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    magic: {
      name: "Arcane Studies",
      description: "Understanding and harnessing magical energies safely",
      category: "Magic",
      researchCost: 200,
      prerequisites: [],
      unlocks: ["Mage Tower", "Enchantments", "Magical Wards"],
      effects: [
        { type: "resource_bonus", value: 30, target: "mana" },
        { type: "unit_bonus", value: 20, target: "magical_damage" }
      ],
      discoveredBy: [],
      lostKnowledge: true
    },
    engineering: {
      name: "Engineering",
      description: "Mechanical principles for construction and siege warfare",
      category: "Technology",
      researchCost: 180,
      prerequisites: [],
      unlocks: ["Siege Engines", "Advanced Construction", "Mechanical Devices"],
      effects: [
        { type: "building_unlock", value: 1, target: "laboratory" },
        { type: "resource_bonus", value: 20, target: "construction_speed" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    medicine: {
      name: "Medical Knowledge",
      description: "Understanding of healing, disease prevention, and surgery",
      category: "Knowledge",
      researchCost: 120,
      prerequisites: [],
      unlocks: ["Hospital", "Disease Resistance", "Surgery"],
      effects: [
        { type: "population_bonus", value: 15, target: "health" },
        { type: "unit_bonus", value: 25, target: "healing" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    architecture: {
      name: "Advanced Architecture",
      description: "Sophisticated building techniques for grand structures",
      category: "Construction",
      researchCost: 160,
      prerequisites: [],
      unlocks: ["Monument", "Advanced Fortifications", "City Planning"],
      effects: [
        { type: "building_unlock", value: 1, target: "monument" },
        { type: "resource_bonus", value: 30, target: "cultural_influence" }
      ],
      discoveredBy: [],
      lostKnowledge: true
    },
    warfare: {
      name: "Military Tactics",
      description: "Advanced strategies and formations for warfare",
      category: "Military",
      researchCost: 140,
      prerequisites: [],
      unlocks: ["Elite Units", "Battle Formations", "Siege Tactics"],
      effects: [
        { type: "unit_bonus", value: 20, target: "combat_effectiveness" },
        { type: "unit_bonus", value: 15, target: "coordination" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    trade: {
      name: "Commerce and Trade",
      description: "Systems for efficient resource exchange and economic growth",
      category: "Economics",
      researchCost: 110,
      prerequisites: [],
      unlocks: ["Market", "Trade Routes", "Currency System"],
      effects: [
        { type: "trade_bonus", value: 25, target: "profit" },
        { type: "resource_bonus", value: 15, target: "gold" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    navigation: {
      name: "Navigation and Cartography",
      description: "Skills for exploration and accurate mapmaking",
      category: "Exploration",
      researchCost: 130,
      prerequisites: [],
      unlocks: ["Exploration Expeditions", "Accurate Maps", "Safe Travel"],
      effects: [
        { type: "exploration_bonus", value: 30, target: "discovery_chance" },
        { type: "exploration_bonus", value: 20, target: "travel_safety" }
      ],
      discoveredBy: [],
      lostKnowledge: false
    },
    scholarship: {
      name: "Advanced Scholarship",
      description: "Methods for preserving and advancing knowledge",
      category: "Knowledge",
      researchCost: 170,
      prerequisites: [],
      unlocks: ["University", "Research Networks", "Knowledge Preservation"],
      effects: [
        { type: "resource_bonus", value: 40, target: "research_speed" },
        { type: "building_unlock", value: 1, target: "library" }
      ],
      discoveredBy: [],
      lostKnowledge: true
    }
  },
  buildings: {},
  artifacts: {},
  events: {},
  quests: {},
  achievements: {},
  culturalElements: {},
  weatherPatterns: {
    clear: {
      name: "Clear Weather",
      description: "Bright, sunny conditions ideal for most activities",
      effects: [
        { type: "production", modifier: 10, description: "Increased outdoor work efficiency" },
        { type: "morale", modifier: 5, description: "Population feels optimistic" }
      ],
      frequency: 30,
      seasonality: ["spring", "summer"],
      magicalInfluence: false
    },
    rain: {
      name: "Rainfall",
      description: "Steady rain that nourishes crops but hampers travel",
      effects: [
        { type: "production", modifier: -10, description: "Outdoor work slowed" },
        { type: "travel", modifier: -15, description: "Muddy roads slow movement" }
      ],
      frequency: 25,
      seasonality: ["spring", "autumn"],
      magicalInfluence: false
    },
    storm: {
      name: "Thunderstorm",
      description: "Violent storms with lightning and strong winds",
      effects: [
        { type: "travel", modifier: -30, description: "Dangerous travel conditions" },
        { type: "combat", modifier: -20, description: "Poor visibility affects battles" },
        { type: "production", modifier: -25, description: "Work halted for safety" }
      ],
      frequency: 10,
      seasonality: ["summer", "autumn"],
      magicalInfluence: false
    },
    fog: {
      name: "Dense Fog",
      description: "Thick fog that reduces visibility significantly",
      effects: [
        { type: "travel", modifier: -20, description: "Navigation becomes difficult" },
        { type: "combat", modifier: -15, description: "Reduced battlefield awareness" }
      ],
      frequency: 15,
      seasonality: ["autumn", "winter"],
      magicalInfluence: false
    },
    snow: {
      name: "Snowfall",
      description: "Heavy snow that covers the landscape",
      effects: [
        { type: "travel", modifier: -25, description: "Snow blocks roads" },
        { type: "production", modifier: -15, description: "Cold slows work" },
        { type: "health", modifier: -10, description: "Risk of cold-related illness" }
      ],
      frequency: 20,
      seasonality: ["winter"],
      magicalInfluence: false
    },
    heat_wave: {
      name: "Heat Wave",
      description: "Extreme heat that stresses people and animals",
      effects: [
        { type: "health", modifier: -15, description: "Heat exhaustion risk" },
        { type: "production", modifier: -20, description: "Work slowed by extreme heat" },
        { type: "morale", modifier: -10, description: "Population discomfort" }
      ],
      frequency: 8,
      seasonality: ["summer"],
      magicalInfluence: false
    },
    ash_fall: {
      name: "Ash Fall",
      description: "Residual ash from ancient disasters still occasionally falls",
      effects: [
        { type: "health", modifier: -20, description: "Respiratory problems" },
        { type: "production", modifier: -30, description: "Ash clogs machinery" },
        { type: "morale", modifier: -15, description: "Reminder of past catastrophe" }
      ],
      frequency: 5,
      seasonality: ["spring", "summer", "autumn", "winter"],
      magicalInfluence: true
    },
    magical_storm: {
      name: "Magical Storm",
      description: "Chaotic magical energies manifest as a supernatural storm",
      effects: [
        { type: "travel", modifier: -40, description: "Magical interference with navigation" },
        { type: "production", modifier: 15, description: "Magical boost to certain activities" },
        { type: "combat", modifier: -25, description: "Unpredictable magical effects" }
      ],
      frequency: 3,
      seasonality: ["spring", "summer", "autumn", "winter"],
      magicalInfluence: true
    }
  },
  equipmentTypes: {},
  magicalSchools: {},
  historicalFigures: {}
} as const;

export const GAME_CONSTANTS = {
  VICTORY_CONTROL_PERCENTAGE: 0.7,
  CONNECTION_DISTANCE: 150,
  STAR_LEVEL_BONUS: 20,
  ENEMY_GARRISON_MULTIPLIER: 1.5,
  PLAYER_GARRISON_MULTIPLIER: 0.8,
  BASE_GARRISON_MULTIPLIER: 50,
  MAX_BATTLE_LOG_ENTRIES: 20,
  COMMANDER_CAPACITIES: {
    city: 8,
    fortress: 6,
    stronghold: 7,
    resource: 3,
    shrine: 4,
    settlement: 4,
    ruins: 2,
    laboratory: 5,
    sanctuary: 3,
    mine: 3,
    farm: 2,
    workshop: 4,
    library: 6,
    monument: 2
  },
  POPULATION_GROWTH_RATE: 0.02,
  CULTURAL_INFLUENCE_RADIUS: 200,
  TRADE_ROUTE_MAX_DISTANCE: 500,
  CORRUPTION_SPREAD_RATE: 0.01,
  ENVIRONMENTAL_RESTORATION_RATE: 0.005,
  RESEARCH_BASE_COST: 100,
  DIPLOMACY_RELATION_DECAY: -1,
  FACTION_AGGRESSION_THRESHOLD: -50,
  EXPEDITION_BASE_DURATION: 5,
  ARTIFACT_DISCOVERY_CHANCE: 0.1,
  WEATHER_CHANGE_FREQUENCY: 3,
  SEASON_LENGTH: 10,
  LEGACY_BONUS_MULTIPLIER: 1.1,
  MAX_SIMULTANEOUS_EVENTS: 3,
  QUEST_GENERATION_RATE: 0.15,
  ACHIEVEMENT_POINT_VALUE: 100,
  VICTORY_CONDITION_SCALING: 1.2
} as const;
