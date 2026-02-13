/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
import type {
  Commander,
  GameNode,
  CommanderClass,
  Race,
  NodeType,
  Owner,
  Resources,
  BattleResult,
  Army,
  WorldState,
  FactionData,
  DiplomaticRelations,
  Market,
  Calendar,
  WeatherSystem,
  ResearchSystem,
  ExplorationData,
  CorruptionData,
  CulturalRenaissance,
  EnvironmentalRestoration,
  GameStatistics,
  VictoryProgress,
  LegacyData,
  NarrativeState,
  PopulationCenter,
  TradeNetwork,
  PoliticalSituation,
  MilitaryIntelligence,
  Season,
  Weather,
  Faction,
  Technology,
  VictoryType,
  Alignment,
  PersonalityTrait,
  Equipment,
  Quest
} from '../types/game';
import { gameData, gameConstants } from '../data/gameData';

// Pure functions for game logic - no state management

export const createCommander = (
  id: number,
  className: CommanderClass,
  race: Race,
  owner: Owner = 'player'
): Commander => {
  const commanderClass = gameData.commanderClasses[className];
  const raceData = gameData.races[race];

  // Generate random personality traits
  const personalityTraits: PersonalityTrait[] = generateRandomPersonalityTraits();

  // Generate random backstory
  const backstory = generateCommanderBackstory(className, race);

  // Create basic equipment
  const equipment: Equipment = {
    weapon: null,
    armor: null,
    accessories: [],
    artifacts: []
  };

  return {
    id,
    name: generateCommanderName(race, className),
    class: className,
    race: race,
    level: 1,
    experience: 0,
    health: commanderClass.baseHealth,
    maxHealth: commanderClass.baseHealth,
    attack: commanderClass.baseAttack,
    defense: commanderClass.baseDefense,
    assignedNode: null,
    owner,
    alignment: generateRandomAlignment(),
    generation: 1,
    traits: [],
    backstory,
    relationships: {},
    skills: generateInitialSkills(className),
    specializations: [],
    loyaltyToPlayer: owner === 'player' ? 85 : 0,
    loyaltyToFaction: null,
    morale: 80,
    fatigue: 0,
    injuries: [],
    equipment,
    quests: [],
    achievements: [],
    personalityTraits,
    army: {
      soldiers: 20,
      archers: 10,
      cavalry: 5,
      mages: 2,
      engineers: 0,
      scouts: 5,
      healers: 2,
      specialists: 0
    }
  };
};

export const canAffordCommander = (
  resources: Resources, 
  className: CommanderClass
): boolean => {
  return resources.gold >= gameData.commanderClasses[className].cost;
};

export const calculateIncome = (nodes: GameNode[]): Resources => {
  let income: Resources = { gold: 0, supplies: 0, mana: 0 };
  
  nodes
    .filter(node => node.owner === 'player')
    .forEach(node => {
      const nodeType = gameData.nodeTypes[node.type];
      income.gold += nodeType.goldGeneration;
      income.supplies += nodeType.suppliesGeneration;
      income.mana += nodeType.manaGeneration;
    });

  return income;
};

export const canAttackNode = (
  nodes: GameNode[], 
  attackerNodeId: number, 
  defenderNodeId: number
): boolean => {
  const attackerNode = nodes.find(n => n.id === attackerNodeId);
  const defenderNode = nodes.find(n => n.id === defenderNodeId);
  
  if (!attackerNode || !defenderNode) return false;
  if (attackerNode.owner !== 'player') return false;
  if (defenderNode.owner === 'player') return false;
  
  return attackerNode.connections.includes(defenderNodeId);
};

export const calculateEffectiveGarrison = (
  node: GameNode, 
  commanders: any[] = []
): { baseGarrison: number; commanderBonus: number; totalPower: number } => {
  const baseGarrison = node.garrison;
  const commanderBonus = calculateCommanderBonus(commanders);
  const totalPower = baseGarrison + commanderBonus.powerLevel;
  
  return {
    baseGarrison,
    commanderBonus: commanderBonus.powerLevel,
    totalPower
  };
};

export const calculateCommanderBonus = (commanders: any[]): { defenseBonus: number; attackBonus: number; powerLevel: number } => {
  let defenseBonus = 0;
  let attackBonus = 0;
  let powerLevel = 0;
  
  commanders.forEach(commander => {
    const commanderPower = commander.attack + commander.defense + (commander.level * 15);
    powerLevel += commanderPower;
    
    // Different commander classes provide different bonuses
    switch (commander.class) {
      case 'knight':
        defenseBonus += commander.defense * 1.5 + (commander.level * 10);
        attackBonus += commander.attack * 1.2 + (commander.level * 8);
        break;
      case 'mage':
        defenseBonus += commander.defense * 1.0 + (commander.level * 6);
        attackBonus += commander.attack * 1.8 + (commander.level * 12);
        break;
      case 'ranger':
        defenseBonus += commander.defense * 1.1 + (commander.level * 7);
        attackBonus += commander.attack * 1.4 + (commander.level * 10);
        break;
      case 'warlord':
        defenseBonus += commander.defense * 1.3 + (commander.level * 12);
        attackBonus += commander.attack * 1.3 + (commander.level * 12);
        break;
      default:
        defenseBonus += commander.defense + (commander.level * 5);
        attackBonus += commander.attack + (commander.level * 5);
    }
  });
  
  return { defenseBonus, attackBonus, powerLevel };
};

export const resolveBattle = (
  attackerNode: GameNode, 
  defenderNode: GameNode,
  attackerCommanders: any[] = [],
  defenderCommanders: any[] = []
): BattleResult => {
  // Calculate base strength
  let attackerStrength = attackerNode.garrison + (attackerNode.starLevel * 20);
  let defenderStrength = defenderNode.garrison + (defenderNode.starLevel * 15);
  
  // Add commander bonuses
  const attackerBonus = calculateCommanderBonus(attackerCommanders);
  const defenderBonus = calculateCommanderBonus(defenderCommanders);
  
  attackerStrength += attackerBonus.attackBonus;
  defenderStrength += defenderBonus.defenseBonus;
  
  // Defender gets defensive bonus
  defenderStrength *= 1.2;
  
  const victory = attackerStrength > defenderStrength;
  const strengthRatio = attackerStrength / Math.max(defenderStrength, 1);

  return {
    victory,
    attackerLosses: { soldiers: 5, archers: 2, cavalry: 1, mages: 0 },
    defenderLosses: { soldiers: 8, archers: 4, cavalry: 2, mages: 1 },
    nodeConquered: victory,
    experienceGained: victory ? Math.floor(50 * strengthRatio) : 25
  };
};

export const updateNodeAfterBattle = (
  node: GameNode, 
  result: BattleResult
): GameNode => {
  if (result.nodeConquered) {
    return {
      ...node,
      owner: 'player',
      garrison: Math.floor(node.garrison * 0.5)
    };
  }
  return node;
};

export const checkVictoryCondition = (nodes: GameNode[]): boolean => {
  const totalNodes = nodes.length;
  const playerNodes = nodes.filter(node => node.owner === 'player').length;
  const playerControlPercentage = playerNodes / totalNodes;
  
  return playerControlPercentage >= gameConstants.VICTORY_CONTROL_PERCENTAGE;
};

export const getNodeById = (nodes: GameNode[], id: number): GameNode | undefined => {
  return nodes.find(node => node.id === id);
};

export const getCommanderById = (commanders: Commander[], id: number): Commander | undefined => {
  return commanders.find(commander => commander.id === id);
};

// Grid-based map constants - optimized for 800x600 canvas with node-sized cells
export const gridSize = 50; // Size of each grid cell (large enough for nodes)
export const gridOffsetX = 25; // Starting X offset (reduced to center grid better)
export const gridOffsetY = 25; // Starting Y offset (reduced to center grid better)
export const gridCols = 15; // Number of grid columns (15 * 50 = 750px + 50px margins = 800px)
export const gridRows = 11; // Number of grid rows (11 * 50 = 550px + 50px margins = 600px)

// Helper function to convert grid coordinates to canvas coordinates (center of cell)
const gridToCanvas = (gridX: number, gridY: number): { x: number, y: number } => {
  return {
    x: gridOffsetX + (gridX * gridSize) + (gridSize / 2), // Center in cell
    y: gridOffsetY + (gridY * gridSize) + (gridSize / 2)  // Center in cell
  };
};

export const generateInitialMap = (): GameNode[] => {
  // Define nodes using grid coordinates (gridX, gridY) which are then converted to canvas coordinates
  const gridNodes = [
    // Player starting area - Left side (columns 1-4)
    { id: 1, type: 'city', gridX: 2, gridY: 5, owner: 'player', starLevel: 1, garrison: 100 },
    { id: 2, type: 'resource', gridX: 1, gridY: 3, owner: 'neutral', starLevel: 1, garrison: 50 },
    { id: 3, type: 'resource', gridX: 3, gridY: 7, owner: 'neutral', starLevel: 1, garrison: 50 },

    // Central contested area (columns 6-9)
    { id: 4, type: 'fortress', gridX: 7, gridY: 2, owner: 'neutral', starLevel: 2, garrison: 150 },
    { id: 5, type: 'shrine', gridX: 7, gridY: 5, owner: 'neutral', starLevel: 1, garrison: 75 },
    { id: 6, type: 'resource', gridX: 6, gridY: 8, owner: 'neutral', starLevel: 1, garrison: 50 },
    { id: 11, type: 'resource', gridX: 8, gridY: 7, owner: 'neutral', starLevel: 1, garrison: 50 },

    // Enemy territory - Right side (columns 11-14)
    { id: 7, type: 'city', gridX: 12, gridY: 5, owner: 'enemy', starLevel: 2, garrison: 120 },
    { id: 8, type: 'fortress', gridX: 11, gridY: 3, owner: 'enemy', starLevel: 2, garrison: 180 },
    { id: 9, type: 'resource', gridX: 13, gridY: 7, owner: 'enemy', starLevel: 1, garrison: 60 },
    { id: 10, type: 'stronghold', gridX: 13, gridY: 3, owner: 'enemy', starLevel: 3, garrison: 250 }
  ];

  // Convert grid coordinates to canvas coordinates and add connections
  const nodes: GameNode[] = gridNodes.map(gridNode => {
    const canvasPos = gridToCanvas(gridNode.gridX, gridNode.gridY);
    console.log(`Node ${gridNode.id}: grid(${gridNode.gridX},${gridNode.gridY}) -> canvas(${canvasPos.x},${canvasPos.y})`);
    return {
      id: gridNode.id,
      type: gridNode.type as NodeType,
      x: canvasPos.x,
      y: canvasPos.y,
      owner: gridNode.owner as Owner,
      starLevel: gridNode.starLevel,
      garrison: gridNode.garrison,
      connections: [] // Will be set below
    };
  });

  // Define connections based on grid adjacency (horizontal, vertical, and strategic diagonals)
  // Grid layout: Player area (left), Central (middle), Enemy area (right)
  const connections: Record<number, number[]> = {
    1: [2, 3, 5], // Player city (1,2) connects to nearby resources
    2: [1, 4], // Resource (0,1) connects to player city and northern fortress
    3: [1, 6], // Resource (2,3) connects to player city and central resource
    4: [2, 5], // Fortress (4,0) connects to resource and central shrine
    5: [1, 4, 6, 7, 8], // Central shrine (4,2) - strategic hub
    6: [3, 5, 11], // Resource (3,4) connects through central area
    7: [5, 8, 10], // Enemy city (7,2) connects to central and enemy areas
    8: [5, 7, 9], // Enemy fortress (6,1) controls enemy approach
    9: [8, 11], // Enemy resource (8,3) connects to fortress and central resource
    10: [7], // Enemy stronghold (8,1) - isolated stronghold
    11: [6, 9] // Central resource (5,3) connects both sides
  };

  // Apply connections to nodes
  nodes.forEach(node => {
    node.connections = connections[node.id] || [];
  });

  // Add enhanced node properties for the new system
  return nodes.map(node => ({
    ...node,
    name: generateNodeName(node.type, node.id),
    description: generateNodeDescription(node.type),
    population: generateInitialPopulation(node.type, node.owner),
    buildings: [],
    technologies: [],
    environmentState: 'stable' as const,
    corruption: node.owner === 'enemy' ? Math.random() * 30 : Math.random() * 5,
    culturalInfluence: {},
    tradeRoutes: [],
    defenses: [],
    projects: [],
    resources: generateNodeResources(node.type),
    history: [],
    artifacts: [],
    specialFeatures: generateSpecialFeatures(node.type),
    climate: generateClimateData(),
    faction: node.owner === 'enemy' ? 'ironborn' as Faction : null,
    politicalInfluence: {},
    economicValue: calculateEconomicValue(node.type, node.starLevel),
    strategicValue: calculateStrategicValue(node.type, node.connections.length),
    lastUpgraded: 0,
    constructionQueue: [],
    researchQueue: []
  }));
};

// Helper functions for commander generation
const generateCommanderName = (race: Race, className: CommanderClass): string => {
  const raceNames = {
    human: ['Aiden', 'Elena', 'Marcus', 'Lyra', 'Gareth', 'Sera'],
    elf: ['Thalorin', 'Elysia', 'Silvain', 'Arwyn', 'Celeborn', 'Galadriel'],
    orc: ['Groshk', 'Urska', 'Thokk', 'Morghul', 'Brakkus', 'Urthak'],
    undead: ['Mortis', 'Necira', 'Thanatos', 'Lichelle', 'Shadowmere', 'Vex'],
    dwarf: ['Thorin', 'Dain', 'Balin', 'Dora', 'Gimli', 'Dwalin'],
    dragonkin: ['Pyrothane', 'Azureth', 'Verdania', 'Obsidian', 'Crimson', 'Frost'],
    elementals: ['Ignis', 'Aqua', 'Terra', 'Ventus', 'Lux', 'Umbra'],
    beastkin: ['Fenris', 'Luna', 'Claw', 'Fang', 'Storm', 'Wild']
  };

  const names = raceNames[race];
  const randomName = names[Math.floor(Math.random() * names.length)];
  return `${randomName} the ${gameData.commanderClasses[className].name}`;
};

const generateRandomAlignment = (): Alignment => {
  const alignments: Alignment[] = [
    'lawful_good', 'neutral_good', 'chaotic_good',
    'lawful_neutral', 'neutral', 'chaotic_neutral',
    'lawful_evil', 'neutral_evil', 'chaotic_evil'
  ];
  return alignments[Math.floor(Math.random() * alignments.length)];
};

const generateRandomPersonalityTraits = (): PersonalityTrait[] => {
  const traits: PersonalityTrait[] = [
    {
      name: 'Brave',
      type: 'positive',
      strength: Math.random() * 50 + 50,
      effects: [{ type: 'combat', value: 10, stackable: false }],
      conflicts: ['Cowardly'],
      synergies: ['Leadership']
    },
    {
      name: 'Intelligent',
      type: 'positive',
      strength: Math.random() * 50 + 50,
      effects: [{ type: 'research', value: 15, stackable: false }],
      conflicts: ['Foolish'],
      synergies: ['Wise']
    }
  ];

  // Return 1-3 random traits
  const numTraits = Math.floor(Math.random() * 3) + 1;
  return traits.slice(0, numTraits);
};

const generateCommanderBackstory = (className: CommanderClass, race: Race): string => {
  const backstories = {
    knight: `A noble warrior from the ${gameData.races[race].name} people, trained in the ancient arts of combat and honor.`,
    mage: `A scholar of the arcane arts, seeking to understand the magical forces that shaped the world's destiny.`,
    ranger: `A wanderer of the wilderness, intimately familiar with the changed landscape of the post-apocalyptic world.`,
    warlord: `A proven leader who has rallied survivors and led them through the darkest times.`,
    scholar: `A keeper of knowledge, dedicated to preserving and recovering the wisdom of the old world.`,
    engineer: `A master craftsperson with the technical skills needed to rebuild civilization.`,
    diplomat: `A skilled negotiator who believes that cooperation is the key to survival.`,
    explorer: `An adventurous soul driven to discover what lies beyond the known world.`,
    architect: `A visionary designer capable of creating the great works needed for a new age.`,
    healer: `A compassionate soul dedicated to mending both bodies and spirits.`
  };

  return backstories[className] || 'A mysterious figure whose past remains shrouded in mystery.';
};

const generateInitialSkills = (className: CommanderClass): Record<string, number> => {
  const baseSkills = {
    combat: 10,
    leadership: 10,
    diplomacy: 10,
    research: 10,
    exploration: 10,
    construction: 10,
    trade: 10,
    magic: 10
  };

  // Modify based on class
  const classModifiers = {
    knight: { combat: 20, leadership: 15 },
    mage: { magic: 25, research: 15 },
    ranger: { exploration: 20, combat: 10 },
    warlord: { leadership: 25, combat: 15 },
    scholar: { research: 25, magic: 10 },
    engineer: { construction: 25, research: 10 },
    diplomat: { diplomacy: 25, trade: 15 },
    explorer: { exploration: 25, combat: 10 },
    architect: { construction: 20, research: 15 },
    healer: { magic: 15, diplomacy: 15 }
  };

  const modifiers = classModifiers[className];
  Object.keys(modifiers).forEach(skill => {
    baseSkills[skill as keyof typeof baseSkills] += modifiers[skill as keyof typeof modifiers] || 0;
  });

  return baseSkills;
};

// Node generation helpers
const generateNodeName = (type: NodeType, id: number): string => {
  const typeNames = {
    city: ['Haven', 'Sanctuary', 'Bastion', 'Citadel', 'Metropolis'],
    settlement: ['Hamlet', 'Village', 'Township', 'Outpost', 'Camp'],
    fortress: ['Stronghold', 'Keep', 'Bulwark', 'Rampart', 'Fortification'],
    resource: ['Quarry', 'Mine', 'Depot', 'Source', 'Reserve'],
    shrine: ['Temple', 'Sanctum', 'Grove', 'Altar', 'Monument'],
    stronghold: ['Citadel', 'Fortress', 'Bastion', 'Keep', 'Hold'],
    ruins: ['Ruins', 'Remnants', 'Wasteland', 'Desolation', 'Wreckage'],
    laboratory: ['Lab', 'Research Center', 'Institute', 'Facility', 'Complex'],
    sanctuary: ['Reserve', 'Preserve', 'Haven', 'Refuge', 'Sanctuary'],
    mine: ['Mine', 'Excavation', 'Pit', 'Shaft', 'Quarry'],
    farm: ['Farm', 'Fields', 'Plantation', 'Ranch', 'Homestead'],
    workshop: ['Workshop', 'Forge', 'Mill', 'Factory', 'Smithy'],
    library: ['Library', 'Archive', 'Repository', 'Collection', 'Scriptorium'],
    monument: ['Monument', 'Memorial', 'Statue', 'Obelisk', 'Pillar']
  };

  const names = typeNames[type];
  const baseName = names[Math.floor(Math.random() * names.length)];
  return `${baseName} ${id}`;
};

const generateNodeDescription = (type: NodeType): string => {
  const descriptions = {
    city: 'A thriving urban center with bustling markets and diverse population.',
    settlement: 'A small but growing community working to establish itself.',
    fortress: 'A heavily fortified military installation designed for defense.',
    resource: 'A valuable source of raw materials essential for development.',
    shrine: 'A sacred site imbued with mystical energy and ancient power.',
    stronghold: 'An imposing fortification representing military might.',
    ruins: 'Ancient remnants holding secrets and treasures of the past.',
    laboratory: 'An advanced research facility pushing the boundaries of knowledge.',
    sanctuary: 'A protected natural area teeming with life and beauty.',
    mine: 'A productive mining operation extracting valuable resources.',
    farm: 'Agricultural lands providing food and sustenance.',
    workshop: 'An industrial center for crafting and manufacturing.',
    library: 'A repository of knowledge and learning.',
    monument: 'An inspiring structure celebrating cultural achievements.'
  };

  return descriptions[type] || 'A mysterious location of unknown purpose.';
};

const generateInitialPopulation = (type: NodeType, owner: Owner) => {
  const basePopulations = {
    city: { total: 5000, workers: 2000, soldiers: 500, scholars: 200, artisans: 300 },
    settlement: { total: 1000, workers: 600, soldiers: 100, scholars: 50, artisans: 100 },
    fortress: { total: 800, workers: 200, soldiers: 500, scholars: 20, artisans: 50 },
    resource: { total: 500, workers: 350, soldiers: 50, scholars: 20, artisans: 30 },
    shrine: { total: 200, workers: 50, soldiers: 20, scholars: 100, artisans: 20 },
    stronghold: { total: 1200, workers: 300, soldiers: 700, scholars: 50, artisans: 100 },
    ruins: { total: 50, workers: 20, soldiers: 10, scholars: 10, artisans: 5 },
    laboratory: { total: 300, workers: 100, soldiers: 50, scholars: 120, artisans: 20 },
    sanctuary: { total: 150, workers: 80, soldiers: 20, scholars: 30, artisans: 15 },
    mine: { total: 600, workers: 450, soldiers: 50, scholars: 20, artisans: 50 },
    farm: { total: 800, workers: 600, soldiers: 50, scholars: 30, artisans: 80 },
    workshop: { total: 400, workers: 250, soldiers: 30, scholars: 40, artisans: 60 },
    library: { total: 250, workers: 50, soldiers: 30, scholars: 150, artisans: 15 },
    monument: { total: 100, workers: 40, soldiers: 20, scholars: 25, artisans: 10 }
  };

  const base = basePopulations[type];
  const ownerMultiplier = owner === 'player' ? 1.0 : owner === 'enemy' ? 0.8 : 0.6;

  return {
    total: Math.floor(base.total * ownerMultiplier),
    workers: Math.floor(base.workers * ownerMultiplier),
    soldiers: Math.floor(base.soldiers * ownerMultiplier),
    scholars: Math.floor(base.scholars * ownerMultiplier),
    artisans: Math.floor(base.artisans * ownerMultiplier),
    nobles: Math.floor(base.total * 0.05 * ownerMultiplier),
    refugees: Math.floor(base.total * 0.1 * ownerMultiplier),
    children: Math.floor(base.total * 0.2 * ownerMultiplier),
    elderly: Math.floor(base.total * 0.1 * ownerMultiplier),
    unemployed: Math.floor(base.total * 0.05 * ownerMultiplier),
    happiness: 70 + Math.random() * 20,
    health: 60 + Math.random() * 30,
    education: 50 + Math.random() * 30,
    loyalty: owner === 'player' ? 80 + Math.random() * 20 : 40 + Math.random() * 30,
    birthRate: 0.02 + Math.random() * 0.01,
    deathRate: 0.01 + Math.random() * 0.005,
    migrationRate: Math.random() * 0.01,
    culturalDiversity: {},
    skillDistribution: {},
    classStructure: []
  };
};

const generateNodeResources = (type: NodeType) => {
  return {
    production: {
      gold: gameData.nodeTypes[type].goldGeneration,
      supplies: gameData.nodeTypes[type].suppliesGeneration,
      mana: gameData.nodeTypes[type].manaGeneration,
      food: type === 'farm' ? 200 : 20,
      materials: type === 'mine' ? 150 : 30,
      energy: type === 'laboratory' ? 100 : 10,
      knowledge: type === 'library' ? 50 : 5
    },
    storage: {
      gold: 1000,
      supplies: 500,
      mana: 300,
      food: 800,
      materials: 600,
      energy: 400,
      knowledge: 200
    },
    capacity: {
      gold: 5000,
      supplies: 2000,
      mana: 1000,
      food: 3000,
      materials: 2500,
      energy: 1500,
      knowledge: 1000
    },
    efficiency: {
      production: 1.0,
      storage: 1.0,
      transport: 1.0
    },
    workers: {
      gold: 10,
      supplies: 15,
      mana: 5,
      food: type === 'farm' ? 50 : 5,
      materials: type === 'mine' ? 40 : 5,
      energy: 8,
      knowledge: type === 'library' ? 20 : 3
    },
    infrastructure: 50 + Math.random() * 30,
    development: 30 + Math.random() * 40
  };
};

const generateSpecialFeatures = (type: NodeType): string[] => {
  const features: Record<NodeType, string[]> = {
    city: ['Market Square', 'Town Hall', 'Residential District'],
    settlement: ['Common House', 'Well', 'Stockade'],
    fortress: ['Armory', 'Barracks', 'Watchtowers'],
    resource: ['Rich Deposits', 'Mining Equipment', 'Storage Facilities'],
    shrine: ['Sacred Grove', 'Altar of Power', 'Mystical Aura'],
    stronghold: ['Great Hall', 'War Room', 'Training Grounds'],
    ruins: ['Ancient Architecture', 'Hidden Chambers', 'Mysterious Artifacts'],
    laboratory: ['Advanced Equipment', 'Research Libraries', 'Experimental Chambers'],
    sanctuary: ['Pristine Nature', 'Rare Species', 'Natural Springs'],
    mine: ['Deep Shafts', 'Ore Processing', 'Mining Rails'],
    farm: ['Fertile Soil', 'Irrigation System', 'Granaries'],
    workshop: ['Skilled Craftsmen', 'Advanced Tools', 'Production Lines'],
    library: ['Vast Collections', 'Study Halls', 'Archive Vaults'],
    monument: ['Inspiring Architecture', 'Historical Significance', 'Cultural Symbol']
  };

  return features[type] || [];
};

const generateClimateData = () => {
  return {
    temperature: 15 + Math.random() * 20,
    rainfall: 500 + Math.random() * 1000,
    humidity: 40 + Math.random() * 40,
    windPatterns: ['Westerly', 'Easterly', 'Variable'],
    seasonality: 0.5 + Math.random() * 0.5,
    extremeWeatherFrequency: Math.random() * 0.1,
    climateStability: 0.7 + Math.random() * 0.3
  };
};

const calculateEconomicValue = (type: NodeType, starLevel: number): number => {
  const baseValues = {
    city: 1000, settlement: 300, fortress: 400, resource: 600, shrine: 350,
    stronghold: 500, ruins: 100, laboratory: 800, sanctuary: 250, mine: 700,
    farm: 500, workshop: 600, library: 400, monument: 200
  };

  return (baseValues[type] || 300) * starLevel;
};

const calculateStrategicValue = (type: NodeType, connections: number): number => {
  const baseValues = {
    city: 80, settlement: 30, fortress: 90, resource: 60, shrine: 50,
    stronghold: 95, ruins: 20, laboratory: 70, sanctuary: 40, mine: 55,
    farm: 45, workshop: 65, library: 60, monument: 35
  };

  return (baseValues[type] || 50) + (connections * 10);
};

// System initialization functions
export const generateInitialWorldState = (): WorldState => {
  return {
    overallStability: 60 + Math.random() * 20,
    corruptionLevel: 15 + Math.random() * 10,
    naturalDisasters: [],
    climateChange: {
      trend: 'stabilizing',
      rate: 0.01,
      causes: ['Ancient Catastrophe', 'Magical Instability'],
      effects: [],
      mitigation: []
    },
    biodiversity: 40 + Math.random() * 30,
    magicalBalance: 50 + Math.random() * 30,
    ancientWards: [],
    worldEvents: []
  };
};

export const generateInitialFactions = (): FactionData[] => {
  const factionKeys = Object.keys(gameData.factions) as Faction[];

  return factionKeys.map(faction => ({
    faction,
    strength: 50 + Math.random() * 30,
    influence: 30 + Math.random() * 40,
    territory: [],
    resources: {
      gold: 1000 + Math.random() * 2000,
      supplies: 500 + Math.random() * 1000,
      mana: 200 + Math.random() * 500,
      knowledge: 100 + Math.random() * 300,
      culture: 50 + Math.random() * 150,
      influence: 25 + Math.random() * 75,
      materials: 300 + Math.random() * 700,
      food: 800 + Math.random() * 1200,
      energy: 400 + Math.random() * 600,
      artifacts: Math.floor(Math.random() * 3)
    },
    commanders: [],
    disposition: gameData.factions[faction].initialDisposition,
    activeAgreements: [],
    militaryPower: 40 + Math.random() * 40,
    economicPower: 30 + Math.random() * 50,
    culturalPower: 20 + Math.random() * 60,
    technologicalLevel: 25 + Math.random() * 50,
    population: 1000 + Math.random() * 5000,
    stability: 60 + Math.random() * 30,
    aggressiveness: gameData.factions[faction].militaryFocus * 10,
    expansionDesire: gameData.factions[faction].territorialAmbitions * 10,
    tradeDesire: gameData.factions[faction].economicFocus * 10,
    culturalOpenness: gameData.factions[faction].culturalFocus * 10,
    diplomaticGoals: ['Survival', 'Growth', 'Influence'],
    currentActions: []
  }));
};

export const generateInitialResearchSystem = (): ResearchSystem => {
  return {
    activeProjects: [],
    completedTechnologies: [],
    availableTechnologies: Object.keys(gameData.technologies) as Technology[],
    researchPoints: 50,
    researchPointsPerTurn: 10,
    knowledgePreservation: 70,
    ancientKnowledgeRecovered: [],
    researchFacilities: [],
    scholarNetwork: {
      scholars: [],
      libraries: [],
      universities: [],
      knowledgeExchange: 50,
      collaborativeProjects: []
    }
  };
};

export const generateInitialMarket = (): Market => {
  return {
    prices: {
      gold: 1.0,
      supplies: 0.8,
      mana: 1.2,
      knowledge: 2.0,
      culture: 1.5,
      materials: 0.9,
      food: 0.6,
      energy: 1.1,
      artifacts: 10.0
    },
    supply: {
      gold: 1000,
      supplies: 2000,
      mana: 500,
      knowledge: 200,
      culture: 100,
      materials: 1500,
      food: 3000,
      energy: 800,
      artifacts: 10
    },
    demand: {
      gold: 800,
      supplies: 1800,
      mana: 600,
      knowledge: 300,
      culture: 150,
      materials: 1200,
      food: 2500,
      energy: 700,
      artifacts: 50
    },
    trends: [],
    tradeRoutes: [],
    merchants: [],
    marketEvents: [],
    economicIndicators: {
      inflation: 0.02,
      tradeBalance: 0,
      economicGrowth: 0.03,
      unemployment: 0.05,
      productivityIndex: 1.0,
      wealthDistribution: 0.6,
      marketStability: 0.8
    }
  };
};

export const generateInitialWeatherSystem = (): WeatherSystem => {
  return {
    currentWeather: 'clear',
    forecast: [],
    seasonalPatterns: [],
    extremeEvents: [],
    magicalInfluences: []
  };
};

export const generateInitialCalendar = (): Calendar => {
  return {
    currentSeason: 'spring',
    currentMonth: 1,
    currentDay: 1,
    currentYear: 1,
    daysSinceStart: 0,
    seasonalEvents: [],
    holidays: [],
    astronomicalEvents: [],
    culturalCalendars: []
  };
};

export const generateInitialDiplomacy = (): DiplomaticRelations => {
  const factionKeys = Object.keys(gameData.factions) as Faction[];
  const playerFactionRelations: Record<Faction, number> = {} as Record<Faction, number>;

  factionKeys.forEach(faction => {
    playerFactionRelations[faction] = gameData.factions[faction].initialDisposition;
  });

  return {
    playerFactionRelations,
    factionRelations: {},
    activeNegotiations: [],
    treaties: [],
    tradeAgreements: [],
    militaryAlliances: [],
    nonAggressionPacts: [],
    diplomaticHistory: []
  };
};

export const generateInitialExploration = (): ExplorationData => {
  return {
    exploredNodes: [1, 2, 3], // Player starts with some explored nodes
    ruins: [],
    discoveredSecrets: [],
    expeditions: [],
    mapKnowledge: 25,
    hiddenSocieties: [],
    ancientMysteries: [],
    explorationEfficiency: 50,
    scoutingReports: []
  };
};

export const generateInitialCorruption = (): CorruptionData => {
  return {
    globalLevel: 15,
    sources: [],
    effects: [],
    cleansingEfforts: [],
    resistantAreas: [1, 2, 3], // Player starting area is resistant
    corruptedAreas: [8, 9, 10], // Enemy territory is corrupted
    spreadRate: 0.01,
    purificationMethods: ['Holy Magic', 'Ancient Rituals', 'Technology']
  };
};

export const generateInitialCulturalRenaissance = (): CulturalRenaissance => {
  return {
    overall: 30,
    arts: [],
    literature: [],
    music: [],
    philosophy: [],
    architecture: [],
    festivals: [],
    traditions: [],
    culturalExchange: 20,
    innovation: 15,
    preservation: 40
  };
};

export const generateInitialEnvironmentalRestoration = (): EnvironmentalRestoration => {
  return {
    projects: [],
    globalHealth: 45,
    biodiversityIndex: 40,
    forestCoverage: 35,
    waterQuality: 50,
    soilHealth: 40,
    airQuality: 60,
    ecosystemBalance: 45,
    speciesRecovery: []
  };
};

export const generateInitialStatistics = (): GameStatistics => {
  return {
    turnCount: 0,
    totalCommanders: 1,
    totalBuildings: 0,
    totalPopulation: 5000,
    totalWealth: 500,
    battlesWon: 0,
    battlesLost: 0,
    diplomaticAgreements: 0,
    technologiesDiscovered: 0,
    artifactsFound: 0,
    nodesControlled: 3,
    nodesLost: 0,
    tradeProfits: 0,
    culturalWorks: 0,
    environmentalProjects: 0,
    questsCompleted: 0,
    expeditionsSent: 0,
    alliancesFormed: 0,
    warsStarted: 0,
    peaceTreaties: 0,
    resourcesGenerated: {},
    buildingConstructed: {},
    unitsRecruited: {},
    commanderPromotions: 0,
    researchCompleted: 0,
    corruptionCleansed: 0,
    artifactsStudied: 0,
    tradingPartners: 0,
    culturalInfluence: 10,
    environmentalHealth: 45,
    factionReputation: {},
    personalAchievements: []
  };
};

export const generateInitialVictoryProgress = (): VictoryProgress => {
  const createVictoryCondition = (type: VictoryType, name: string, description: string, required: number) => ({
    type,
    name,
    description,
    progress: 0,
    required,
    milestones: [],
    achievable: true,
    timeEstimate: 50
  });

  return {
    territorial: createVictoryCondition('territorial', 'Territorial Dominance', 'Control 70% of all territories', 7),
    technological: createVictoryCondition('technological', 'Technological Supremacy', 'Research all major technologies', 10),
    cultural: createVictoryCondition('cultural', 'Cultural Renaissance', 'Achieve cultural dominance and renaissance', 100),
    diplomatic: createVictoryCondition('diplomatic', 'Diplomatic Unity', 'Form alliances with all major factions', 8),
    economic: createVictoryCondition('economic', 'Economic Empire', 'Establish trading dominance', 50000),
    population: createVictoryCondition('population', 'Population Recovery', 'Rebuild civilization to 100,000 people', 100000),
    magical: createVictoryCondition('magical', 'Magical Restoration', 'Restore the world\'s magical balance', 100)
  };
};

export const generateInitialLegacyData = (): LegacyData => {
  return {
    previousPlaythroughs: [],
    totalScore: 0,
    bestVictory: '',
    favoriteStrategy: '',
    legacyBonuses: [],
    hallOfFame: [],
    unlocks: [],
    achievements: [],
    statistics: {
      totalRuns: 0,
      totalTurns: 0,
      victories: {} as Record<VictoryType, number>,
      averageScore: 0,
      bestScore: 0,
      favoriteVictory: 'territorial',
      playTime: 0,
      achievements: 0
    }
  };
};

export const generateInitialNarrativeState = (): NarrativeState => {
  return {
    currentStoryline: 'The Beginning',
    completedStorylines: [],
    activeNarratives: [],
    historicalNarratives: [],
    characterArcs: [],
    worldNarratives: [],
    playerChoices: [],
    narrativeFlags: {},
    reputationTracks: {}
  };
};

export const generateInitialPopulationCenters = (nodes: GameNode[]): PopulationCenter[] => {
  return nodes
    .filter(node => ['city', 'settlement'].includes(node.type))
    .map(node => ({
      id: `population_${node.id}`,
      nodeId: node.id,
      name: node.name || `Settlement ${node.id}`,
      type: node.type === 'city' ? 'city' as const : 'settlement' as const,
      population: node.population,
      infrastructure: {
        roads: 50,
        housing: 60,
        sanitation: 40,
        water: 70,
        power: 30,
        communication: 20,
        healthcare: 45,
        education: 35,
        defense: 55,
        storage: 50
      },
      services: [],
      economy: {
        gdp: 10000,
        employment: 0.85,
        wages: 50,
        businesses: [],
        industries: [],
        tradeVolume: 1000,
        prosperity: 60
      },
      culture: {
        identity: 70,
        diversity: 40,
        traditions: [],
        languages: ['Common'],
        arts: 30,
        education: 35,
        values: {}
      },
      problems: [],
      projects: []
    }));
};

export const generateInitialTradeNetworks = (): TradeNetwork[] => {
  return [];
};

export const generateInitialPoliticalSituation = (): PoliticalSituation => {
  return {
    stability: 70,
    legitimacy: 80,
    support: {},
    opposition: {},
    policies: [],
    laws: [],
    corruption: 15,
    rebellions: [],
    succession: {
      type: 'democratic',
      heirs: [],
      legitimacy: 80,
      support: {},
      challenges: []
    }
  };
};

export const generateInitialMilitaryIntelligence = (): MilitaryIntelligence => {
  return {
    enemyStrength: {},
    enemyMovements: [],
    spyNetworks: [],
    intelligence: [],
    counterintelligence: 50,
    secrecy: 60
  };
};

