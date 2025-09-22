// Core game types for Ashes of Aeloria - Comprehensive World Rebuilding System
export type Owner = 'player' | 'enemy' | 'neutral' | 'faction';
export type Phase = 'player' | 'enemy' | 'upkeep' | 'events' | 'diplomacy';
export type NodeType = 'city' | 'resource' | 'fortress' | 'shrine' | 'stronghold' | 'settlement' | 'ruins' | 'laboratory' | 'sanctuary' | 'mine' | 'farm' | 'workshop' | 'library' | 'monument';
export type CommanderClass = 'knight' | 'mage' | 'ranger' | 'warlord' | 'scholar' | 'engineer' | 'diplomat' | 'explorer' | 'architect' | 'healer';
export type Race = 'human' | 'elf' | 'orc' | 'undead' | 'dwarf' | 'dragonkin' | 'elementals' | 'beastkin';
export type TroopType = 'soldiers' | 'archers' | 'cavalry' | 'mages' | 'engineers' | 'scouts' | 'healers' | 'specialists';
export type Faction = 'ironborn' | 'mystics' | 'merchants' | 'nomads' | 'scholars' | 'rebels' | 'guardians' | 'survivors';
export type Alignment = 'lawful_good' | 'neutral_good' | 'chaotic_good' | 'lawful_neutral' | 'neutral' | 'chaotic_neutral' | 'lawful_evil' | 'neutral_evil' | 'chaotic_evil';
export type Technology = 'agriculture' | 'metalworking' | 'magic' | 'engineering' | 'medicine' | 'architecture' | 'warfare' | 'trade' | 'navigation' | 'scholarship';
export type EnvironmentState = 'pristine' | 'stable' | 'degraded' | 'corrupted' | 'hostile' | 'recovering';
export type Weather = 'clear' | 'rain' | 'storm' | 'fog' | 'snow' | 'heat_wave' | 'ash_fall' | 'magical_storm';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type VictoryType = 'territorial' | 'technological' | 'cultural' | 'diplomatic' | 'economic' | 'population' | 'magical';

export interface NodeTypeData {
  name: string;
  color: string;
  icon: string;
  goldGeneration: number;
  suppliesGeneration: number;
  manaGeneration: number;
  defensiveBonus: number;
  description: string;
}

export interface CommanderClassData {
  name: string;
  icon: string;
  description: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  specialAbility: string;
  cost: number;
}

export interface RaceData {
  name: string;
  icon: string;
  bonus: string;
  color: string;
}

export interface TroopTypeData {
  name: string;
  icon: string;
  attack: number;
  defense: number;
  cost: number;
  strongAgainst: TroopType[];
  weakAgainst: TroopType[];
  description: string;
}

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

export interface Army {
  soldiers: number;
  archers: number;
  cavalry: number;
  mages: number;
  engineers: number;
  scouts: number;
  healers: number;
  specialists: number;
}

export interface Commander {
  id: number;
  name: string;
  class: CommanderClass;
  race: Race;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  assignedNode: number | null;
  army: Army;
  owner: Owner;
  alignment: Alignment;
  generation: number;
  traits: string[];
  backstory: string;
  relationships: Record<number, number>; // commander_id -> relationship_value (-100 to 100)
  skills: Record<string, number>;
  specializations: string[];
  loyaltyToPlayer: number;
  loyaltyToFaction: string | null;
  morale: number;
  fatigue: number;
  injuries: string[];
  equipment: Equipment;
  quests: Quest[];
  achievements: string[];
  personalityTraits: PersonalityTrait[];
}

export interface GameNode {
  id: number;
  type: NodeType;
  x: number;
  y: number;
  owner: Owner;
  starLevel: number;
  garrison: number;
  connections: number[];
  name: string;
  description: string;
  population: Population;
  buildings: Building[];
  technologies: Technology[];
  environmentState: EnvironmentState;
  corruption: number;
  culturalInfluence: Record<Faction, number>;
  tradeRoutes: TradeRoute[];
  defenses: Defense[];
  projects: ConstructionProject[];
  resources: NodeResources;
  history: HistoricalEvent[];
  artifacts: Artifact[];
  specialFeatures: string[];
  climate: ClimateData;
  faction: Faction | null;
  politicalInfluence: Record<Faction, number>;
  economicValue: number;
  strategicValue: number;
  lastUpgraded: number;
  constructionQueue: ConstructionProject[];
  researchQueue: ResearchProject[];
}

export interface BattleResult {
  victory: boolean;
  attackerLosses: Army;
  defenderLosses: Army;
  nodeConquered: boolean;
  experienceGained: number;
}

export interface BattleLogEntry {
  timestamp: number;
  type: 'info' | 'combat' | 'victory' | 'defeat' | 'recruitment';
  message: string;
}

export interface GameState {
  turn: number;
  phase: Phase;
  resources: Resources;
  commanders: Commander[];
  nodes: GameNode[];
  selectedNode: number | null;
  selectedCommander: number | null;
  gameOver: boolean;
  winner: Owner | null;
  battleLog: BattleLogEntry[];
  currentMission: string | null;
  missionStarted: boolean;
  globalTechnologies: Technology[];
  worldState: WorldState;
  factions: FactionData[];
  diplomacy: DiplomaticRelations;
  market: Market;
  calendar: Calendar;
  weather: WeatherSystem;
  events: GameEvent[];
  eventQueue: GameEvent[];
  narrativeState: NarrativeState;
  achievements: Achievement[];
  statistics: GameStatistics;
  victoryProgress: VictoryProgress;
  legacyData: LegacyData;
  historicalRecords: HistoricalRecord[];
  culturalMovements: CulturalMovement[];
  economicCycles: EconomicCycle[];
  research: ResearchSystem;
  exploration: ExplorationData;
  magicalCorruption: CorruptionData;
  populationCenters: PopulationCenter[];
  tradeNetworks: TradeNetwork[];
  politicalSituation: PoliticalSituation;
  militaryIntelligence: MilitaryIntelligence;
  culturalRenaissance: CulturalRenaissance;
  environmentalRestoration: EnvironmentalRestoration;
}

export interface GameData {
  nodeTypes: Record<NodeType, NodeTypeData>;
  commanderClasses: Record<CommanderClass, CommanderClassData>;
  races: Record<Race, RaceData>;
  troopTypes: Record<TroopType, TroopTypeData>;
  factions: Record<Faction, FactionInfo>;
  technologies: Record<Technology, TechnologyInfo>;
  buildings: Record<string, BuildingInfo>;
  artifacts: Record<string, ArtifactInfo>;
  events: Record<string, EventTemplate>;
  quests: Record<string, QuestTemplate>;
  achievements: Record<string, AchievementInfo>;
  culturalElements: Record<string, CulturalElement>;
  weatherPatterns: Record<Weather, WeatherPattern>;
  equipmentTypes: Record<string, EquipmentInfo>;
  magicalSchools: Record<string, MagicalSchool>;
  historicalFigures: Record<string, HistoricalFigure>;
}

// Population and Settlement Systems
export interface Population {
  total: number;
  workers: number;
  soldiers: number;
  scholars: number;
  artisans: number;
  nobles: number;
  refugees: number;
  children: number;
  elderly: number;
  unemployed: number;
  happiness: number;
  health: number;
  education: number;
  loyalty: number;
  birthRate: number;
  deathRate: number;
  migrationRate: number;
  culturalDiversity: Record<string, number>;
  skillDistribution: Record<string, number>;
  classStructure: SocialClass[];
}

export interface SocialClass {
  name: string;
  percentage: number;
  wealth: number;
  influence: number;
  satisfaction: number;
  demands: string[];
}

export interface Building {
  id: string;
  type: string;
  name: string;
  level: number;
  condition: number;
  efficiency: number;
  workers: number;
  maxWorkers: number;
  productionBonus: Record<string, number>;
  maintenanceCost: number;
  constructionTime: number;
  prerequisites: string[];
  effects: BuildingEffect[];
}

export interface BuildingEffect {
  type: 'resource_production' | 'population_bonus' | 'military_bonus' | 'cultural_bonus' | 'research_bonus' | 'trade_bonus';
  value: number;
  target?: string;
}

// Technology and Research Systems
export interface TechnologyInfo {
  name: string;
  description: string;
  category: string;
  researchCost: number;
  prerequisites: Technology[];
  unlocks: string[];
  effects: TechnologyEffect[];
  discoveredBy: string[];
  lostKnowledge: boolean;
}

export interface TechnologyEffect {
  type: 'resource_bonus' | 'building_unlock' | 'unit_bonus' | 'population_bonus' | 'trade_bonus' | 'exploration_bonus';
  value: number;
  target?: string;
}

export interface ResearchProject {
  id: string;
  technology: Technology;
  progress: number;
  totalRequired: number;
  researchers: number;
  priority: number;
  startedTurn: number;
}

export interface ResearchSystem {
  activeProjects: ResearchProject[];
  completedTechnologies: Technology[];
  availableTechnologies: Technology[];
  researchPoints: number;
  researchPointsPerTurn: number;
  knowledgePreservation: number;
  ancientKnowledgeRecovered: string[];
  researchFacilities: string[];
  scholarNetwork: ScholarNetwork;
}

export interface ScholarNetwork {
  scholars: Scholar[];
  libraries: Library[];
  universities: University[];
  knowledgeExchange: number;
  collaborativeProjects: string[];
}

export interface Scholar {
  id: string;
  name: string;
  expertise: Technology[];
  reputation: number;
  productivity: number;
  loyalty: number;
}

export interface Library {
  id: string;
  nodeId: number;
  books: number;
  knowledge: Technology[];
  condition: number;
  accessibility: number;
}

export interface University {
  id: string;
  nodeId: number;
  faculties: string[];
  students: number;
  research: number;
  reputation: number;
}

// Exploration and Discovery Systems
export interface ExplorationData {
  exploredNodes: number[];
  ruins: Ruin[];
  discoveredSecrets: Secret[];
  expeditions: Expedition[];
  mapKnowledge: number;
  hiddenSocieties: HiddenSociety[];
  ancientMysteries: AncientMystery[];
  explorationEfficiency: number;
  scoutingReports: ScoutingReport[];
}

export interface Ruin {
  id: string;
  nodeId: number;
  type: 'temple' | 'fortress' | 'city' | 'laboratory' | 'tomb' | 'shrine' | 'library' | 'workshop';
  size: 'small' | 'medium' | 'large' | 'massive';
  danger: number;
  explorationProgress: number;
  totalExploration: number;
  artifacts: Artifact[];
  knowledge: Technology[];
  history: string;
  guardians: string[];
  traps: Trap[];
  treasures: Treasure[];
}

export interface Secret {
  id: string;
  type: 'historical' | 'technological' | 'magical' | 'political' | 'cultural';
  importance: number;
  discoveredBy: string;
  discoveryTurn: number;
  information: string;
  consequences: string[];
}

export interface Expedition {
  id: string;
  target: string;
  leader: number; // commander id
  members: number[]; // commander ids
  objective: string;
  progress: number;
  duration: number;
  status: 'preparing' | 'active' | 'returning' | 'completed' | 'failed';
  supplies: number;
  discoveries: string[];
  risks: string[];
}

export interface HiddenSociety {
  id: string;
  name: string;
  location: number; // node id
  population: number;
  culture: string;
  technology: Technology[];
  disposition: number; // -100 to 100
  discovered: boolean;
  contacted: boolean;
  tradingWith: boolean;
  knowledge: string[];
  specialties: string[];
  needs: string[];
  offers: string[];
}

export interface AncientMystery {
  id: string;
  name: string;
  description: string;
  clues: Clue[];
  progress: number;
  totalClues: number;
  solution: string;
  rewards: string[];
  consequences: string[];
  difficulty: number;
}

export interface Clue {
  id: string;
  description: string;
  location: string;
  discovered: boolean;
  discoveryMethod: string;
}

export interface ScoutingReport {
  id: string;
  nodeId: number;
  scoutId: number;
  turn: number;
  visibility: number;
  information: {
    garrison: number;
    defenses: string[];
    resources: string[];
    weaknesses: string[];
    opportunities: string[];
  };
}

// Faction and Diplomacy Systems
export interface FactionInfo {
  name: string;
  description: string;
  color: string;
  icon: string;
  ideology: string;
  strengths: string[];
  weaknesses: string[];
  preferredDiplomacy: string[];
  territorialAmbitions: number;
  militaryFocus: number;
  economicFocus: number;
  culturalFocus: number;
  technologicalFocus: number;
  initialDisposition: number;
}

export interface FactionData {
  faction: Faction;
  strength: number;
  influence: number;
  territory: number[];
  resources: Resources;
  commanders: number[];
  disposition: number;
  activeAgreements: Agreement[];
  militaryPower: number;
  economicPower: number;
  culturalPower: number;
  technologicalLevel: number;
  population: number;
  stability: number;
  aggressiveness: number;
  expansionDesire: number;
  tradeDesire: number;
  culturalOpenness: number;
  diplomaticGoals: string[];
  currentActions: FactionAction[];
}

export interface FactionAction {
  type: 'expand' | 'trade' | 'research' | 'diplomacy' | 'military' | 'cultural';
  target?: string;
  progress: number;
  duration: number;
  priority: number;
}

export interface DiplomaticRelations {
  playerFactionRelations: Record<Faction, number>;
  factionRelations: Record<string, number>; // faction1_faction2 -> relation
  activeNegotiations: Negotiation[];
  treaties: Treaty[];
  tradeAgreements: TradeAgreement[];
  militaryAlliances: MilitaryAlliance[];
  nonAggressionPacts: NonAggressionPact[];
  diplomaticHistory: DiplomaticEvent[];
}

export interface Negotiation {
  id: string;
  participants: string[];
  topic: string;
  proposals: Proposal[];
  status: 'active' | 'completed' | 'failed' | 'suspended';
  timeRemaining: number;
  successChance: number;
}

export interface Proposal {
  id: string;
  proposer: string;
  type: string;
  terms: string[];
  conditions: string[];
  benefits: string[];
  costs: string[];
  accepted: boolean;
}

export interface Treaty {
  id: string;
  type: string;
  participants: string[];
  terms: string[];
  duration: number;
  remainingTurns: number;
  compliance: Record<string, number>;
  violations: TreatyViolation[];
}

export interface TreatyViolation {
  violator: string;
  type: string;
  severity: number;
  turn: number;
  consequences: string[];
}

export interface Agreement {
  id: string;
  type: 'trade' | 'military' | 'research' | 'cultural' | 'territorial';
  partner: string;
  terms: string[];
  benefits: string[];
  duration: number;
  turnsRemaining: number;
}

export interface TradeAgreement extends Agreement {
  tradeVolume: number;
  tradeGoods: string[];
  tradeRoutes: string[];
  tariffs: number;
  exclusivity: boolean;
}

export interface MilitaryAlliance extends Agreement {
  mutualDefense: boolean;
  jointOperations: boolean;
  sharedIntelligence: boolean;
  militarySupport: number;
}

export interface NonAggressionPact extends Agreement {
  guaranteedTerritories: string[];
  neutralityClause: boolean;
  thirdPartyConflicts: string;
}

export interface DiplomaticEvent {
  turn: number;
  type: string;
  participants: string[];
  description: string;
  impact: Record<string, number>;
  consequences: string[];
}

// Economic Systems
export interface Market {
  prices: Record<string, number>;
  supply: Record<string, number>;
  demand: Record<string, number>;
  trends: MarketTrend[];
  tradeRoutes: TradeRoute[];
  merchants: Merchant[];
  marketEvents: MarketEvent[];
  economicIndicators: EconomicIndicators;
}

export interface MarketTrend {
  resource: string;
  direction: 'rising' | 'falling' | 'stable' | 'volatile';
  strength: number;
  duration: number;
  causes: string[];
}

export interface TradeRoute {
  id: string;
  from: number;
  to: number;
  goods: string[];
  volume: number;
  profit: number;
  safety: number;
  established: number;
  merchant: string;
  caravans: Caravan[];
  protection: number;
}

export interface Caravan {
  id: string;
  route: string;
  cargo: Record<string, number>;
  value: number;
  guards: number;
  position: number; // 0-100% along route
  status: 'traveling' | 'trading' | 'resting' | 'attacked' | 'lost';
}

export interface Merchant {
  id: string;
  name: string;
  reputation: number;
  wealth: number;
  specialization: string[];
  routes: string[];
  loyalty: number;
  influence: number;
  network: string[];
}

export interface MarketEvent {
  id: string;
  type: string;
  description: string;
  effects: Record<string, number>;
  duration: number;
  severity: number;
}

export interface EconomicIndicators {
  inflation: number;
  tradeBalance: number;
  economicGrowth: number;
  unemployment: number;
  productivityIndex: number;
  wealthDistribution: number;
  marketStability: number;
}

export interface EconomicCycle {
  phase: 'growth' | 'peak' | 'recession' | 'recovery';
  duration: number;
  intensity: number;
  effects: Record<string, number>;
  causes: string[];
}

export interface TradeNetwork {
  id: string;
  name: string;
  members: string[];
  routes: TradeRoute[];
  influence: number;
  monopolies: string[];
  regulations: string[];
}

// Environmental and Climate Systems
export interface WorldState {
  overallStability: number;
  corruptionLevel: number;
  naturalDisasters: NaturalDisaster[];
  climateChange: ClimateChange;
  biodiversity: number;
  magicalBalance: number;
  ancientWards: AncientWard[];
  worldEvents: WorldEvent[];
}

export interface ClimateData {
  temperature: number;
  rainfall: number;
  humidity: number;
  windPatterns: string[];
  seasonality: number;
  extremeWeatherFrequency: number;
  climateStability: number;
}

export interface WeatherSystem {
  currentWeather: Weather;
  forecast: WeatherForecast[];
  seasonalPatterns: SeasonalPattern[];
  extremeEvents: ExtremeWeatherEvent[];
  magicalInfluences: MagicalWeatherInfluence[];
}

export interface WeatherForecast {
  turn: number;
  weather: Weather;
  intensity: number;
  duration: number;
  effects: string[];
}

export interface WeatherPattern {
  name: string;
  description: string;
  effects: WeatherEffect[];
  frequency: number;
  seasonality: Season[];
  magicalInfluence: boolean;
}

export interface WeatherEffect {
  type: 'travel' | 'combat' | 'production' | 'health' | 'morale' | 'trade';
  modifier: number;
  description: string;
}

export interface SeasonalPattern {
  season: Season;
  weatherDistribution: Record<Weather, number>;
  temperatureRange: [number, number];
  effects: SeasonalEffect[];
}

export interface SeasonalEffect {
  type: string;
  modifier: number;
  affectedActivities: string[];
}

export interface ExtremeWeatherEvent {
  id: string;
  type: Weather;
  intensity: number;
  location: number[];
  duration: number;
  effects: string[];
  warnings: number;
}

export interface MagicalWeatherInfluence {
  source: string;
  type: string;
  strength: number;
  radius: number;
  duration: number;
  effects: string[];
}

export interface NaturalDisaster {
  id: string;
  type: 'earthquake' | 'flood' | 'drought' | 'plague' | 'famine' | 'volcanic' | 'storm' | 'wildfire';
  severity: number;
  location: number[];
  duration: number;
  warning: number;
  effects: DisasterEffect[];
  recoveryTime: number;
  preventable: boolean;
}

export interface DisasterEffect {
  type: 'population' | 'infrastructure' | 'resources' | 'morale' | 'environment';
  impact: number;
  permanent: boolean;
}

export interface ClimateChange {
  trend: 'warming' | 'cooling' | 'stabilizing' | 'fluctuating';
  rate: number;
  causes: string[];
  effects: ClimateEffect[];
  mitigation: ClimateMitigation[];
}

export interface ClimateEffect {
  type: string;
  severity: number;
  timeline: number;
  regions: number[];
  irreversible: boolean;
}

export interface ClimateMitigation {
  action: string;
  effectiveness: number;
  cost: number;
  requirements: string[];
  sideEffects: string[];
}

export interface AncientWard {
  id: string;
  location: number;
  type: string;
  strength: number;
  stability: number;
  effects: string[];
  maintainer: string;
  requirements: string[];
}

export interface WorldEvent {
  id: string;
  type: string;
  description: string;
  global: boolean;
  affectedRegions: number[];
  duration: number;
  effects: Record<string, number>;
  triggers: string[];
  consequences: string[];
}

// Magic and Corruption Systems
export interface CorruptionData {
  globalLevel: number;
  sources: CorruptionSource[];
  effects: CorruptionEffect[];
  cleansingEfforts: CleansingEffort[];
  resistantAreas: number[];
  corruptedAreas: number[];
  spreadRate: number;
  purificationMethods: string[];
}

export interface CorruptionSource {
  id: string;
  location: number;
  type: string;
  strength: number;
  radius: number;
  growth: number;
  countermeasures: string[];
}

export interface CorruptionEffect {
  type: string;
  severity: number;
  affectedArea: number[];
  symptoms: string[];
  consequences: string[];
}

export interface CleansingEffort {
  id: string;
  location: number;
  method: string;
  progress: number;
  required: number;
  resources: Record<string, number>;
  specialists: number[];
}

export interface MagicalSchool {
  name: string;
  description: string;
  specialization: string[];
  practitioners: number;
  knowledge: number;
  influence: number;
  reputation: number;
  forbidden: boolean;
  corruption: number;
}

// Cultural and Renaissance Systems
export interface CulturalRenaissance {
  overall: number;
  arts: ArtMovement[];
  literature: LiteraryWork[];
  music: MusicalTradition[];
  philosophy: PhilosophicalSchool[];
  architecture: ArchitecturalStyle[];
  festivals: Festival[];
  traditions: Tradition[];
  culturalExchange: number;
  innovation: number;
  preservation: number;
}

export interface ArtMovement {
  id: string;
  name: string;
  style: string;
  popularity: number;
  influence: number;
  artists: Artist[];
  works: ArtWork[];
  patron: string;
}

export interface Artist {
  id: string;
  name: string;
  medium: string;
  skill: number;
  reputation: number;
  works: string[];
  patron: string;
  school: string;
}

export interface ArtWork {
  id: string;
  title: string;
  artist: string;
  type: string;
  quality: number;
  fame: number;
  location: number;
  value: number;
}

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  genre: string;
  quality: number;
  popularity: number;
  influence: number;
  preservation: number;
}

export interface MusicalTradition {
  id: string;
  name: string;
  origin: string;
  popularity: number;
  instruments: string[];
  styles: string[];
  practitioners: number;
}

export interface PhilosophicalSchool {
  id: string;
  name: string;
  tenets: string[];
  followers: number;
  influence: number;
  compatibility: Record<string, number>;
  texts: string[];
}

export interface ArchitecturalStyle {
  id: string;
  name: string;
  characteristics: string[];
  examples: string[];
  popularity: number;
  practicality: number;
  aesthetics: number;
}

export interface Festival {
  id: string;
  name: string;
  type: string;
  season: Season;
  popularity: number;
  tradition: number;
  effects: FestivalEffect[];
  requirements: string[];
}

export interface FestivalEffect {
  type: 'morale' | 'culture' | 'economy' | 'diplomacy' | 'research';
  value: number;
  duration: number;
}

export interface Tradition {
  id: string;
  name: string;
  type: string;
  strength: number;
  age: number;
  effects: string[];
  requirements: string[];
  decline: number;
}

export interface CulturalMovement {
  id: string;
  name: string;
  type: string;
  strength: number;
  spread: number[];
  effects: CulturalEffect[];
  leaders: string[];
  opposition: number;
}

export interface CulturalEffect {
  type: string;
  value: number;
  target: string;
  duration: number;
}

export interface CulturalElement {
  name: string;
  description: string;
  influence: number;
  preservation: number;
  adaptation: number;
  conflicts: string[];
  synergies: string[];
}

// Environmental Restoration
export interface EnvironmentalRestoration {
  projects: RestorationProject[];
  globalHealth: number;
  biodiversityIndex: number;
  forestCoverage: number;
  waterQuality: number;
  soilHealth: number;
  airQuality: number;
  ecosystemBalance: number;
  speciesRecovery: SpeciesRecovery[];
}

export interface RestorationProject {
  id: string;
  name: string;
  type: 'reforestation' | 'soil_healing' | 'water_purification' | 'species_reintroduction' | 'habitat_restoration';
  location: number;
  progress: number;
  required: number;
  benefits: EnvironmentalBenefit[];
  requirements: string[];
  specialists: number[];
}

export interface EnvironmentalBenefit {
  type: string;
  value: number;
  radius: number;
  duration: number;
  cumulative: boolean;
}

export interface SpeciesRecovery {
  species: string;
  population: number;
  habitat: string[];
  threat: number;
  conservation: number;
  importance: string[];
}

// Equipment and Items
export interface Equipment {
  weapon: Item | null;
  armor: Item | null;
  accessories: Item[];
  artifacts: Artifact[];
}

export interface Item {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact';
  stats: Record<string, number>;
  effects: ItemEffect[];
  durability: number;
  maxDurability: number;
  value: number;
  description: string;
  requirements: string[];
  origin: string;
}

export interface ItemEffect {
  type: string;
  value: number;
  condition?: string;
  duration?: number;
}

export interface Artifact {
  id: string;
  name: string;
  type: string;
  power: number;
  corruption: number;
  effects: ArtifactEffect[];
  history: string;
  location: string;
  discovered: boolean;
  authenticated: boolean;
  study: ArtifactStudy;
}

export interface ArtifactEffect {
  type: string;
  value: number;
  scope: 'personal' | 'local' | 'regional' | 'global';
  permanent: boolean;
  cost?: string;
}

export interface ArtifactStudy {
  progress: number;
  required: number;
  specialists: number[];
  discoveries: string[];
  risks: string[];
}

export interface ArtifactInfo {
  name: string;
  description: string;
  power: number;
  corruption: number;
  rarity: string;
  effects: ArtifactEffect[];
  discoveryMethod: string[];
  studyRequirements: string[];
}

export interface Treasure {
  id: string;
  type: 'gold' | 'artifact' | 'knowledge' | 'resource' | 'equipment';
  value: number;
  rarity: string;
  description: string;
  curse?: Curse;
}

export interface Curse {
  name: string;
  effects: string[];
  removal: string[];
  severity: number;
}

export interface Trap {
  id: string;
  type: string;
  danger: number;
  detection: number;
  disarmament: number;
  effects: string[];
  triggered: boolean;
}

// Character Development
export interface PersonalityTrait {
  name: string;
  type: 'positive' | 'negative' | 'neutral';
  strength: number;
  effects: TraitEffect[];
  conflicts: string[];
  synergies: string[];
}

export interface TraitEffect {
  type: string;
  value: number;
  condition?: string;
  stackable: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'side' | 'personal' | 'faction' | 'exploration' | 'combat' | 'diplomacy';
  status: 'available' | 'active' | 'completed' | 'failed' | 'abandoned';
  objectives: Objective[];
  rewards: QuestReward[];
  consequences: string[];
  timeLimit?: number;
  difficulty: number;
  prerequisites: string[];
  giver: string;
  location?: number;
}

export interface Objective {
  id: string;
  description: string;
  type: string;
  target?: string;
  progress: number;
  required: number;
  completed: boolean;
  optional: boolean;
}

export interface QuestReward {
  type: 'experience' | 'resources' | 'item' | 'relationship' | 'knowledge' | 'reputation' | 'territory';
  value: number;
  item?: string;
  target?: string;
}

export interface QuestTemplate {
  title: string;
  description: string;
  type: string;
  objectives: string[];
  rewards: QuestReward[];
  prerequisites: string[];
  difficulty: number;
  variants: QuestVariant[];
}

export interface QuestVariant {
  condition: string;
  modifications: Record<string, any>;
}

// Events and Storytelling
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'random' | 'scripted' | 'consequence' | 'seasonal' | 'diplomatic' | 'technological' | 'cultural';
  probability: number;
  conditions: EventCondition[];
  choices: EventChoice[];
  effects: EventEffect[];
  consequences: string[];
  turn: number;
  global: boolean;
  affectedNodes: number[];
  participants: string[];
  importance: number;
  category: string;
  tags: string[];
}

export interface EventCondition {
  type: string;
  target?: string;
  operator: string;
  value: any;
  description: string;
}

export interface EventChoice {
  id: string;
  text: string;
  description: string;
  requirements: string[];
  consequences: EventConsequence[];
  cost?: Record<string, number>;
  reputation?: Record<string, number>;
  probability?: number;
}

export interface EventConsequence {
  type: string;
  target?: string;
  value: number;
  description: string;
  permanent: boolean;
  delay?: number;
}

export interface EventEffect {
  type: string;
  target?: string;
  value: number;
  duration?: number;
  probability?: number;
  conditions?: string[];
}

export interface EventTemplate {
  title: string;
  description: string;
  type: string;
  conditions: EventCondition[];
  choices: EventChoice[];
  effects: EventEffect[];
  weight: number;
  repeatable: boolean;
  cooldown?: number;
}

export interface NarrativeState {
  currentStoryline: string;
  completedStorylines: string[];
  activeNarratives: ActiveNarrative[];
  historicalNarratives: string[];
  characterArcs: CharacterArc[];
  worldNarratives: WorldNarrative[];
  playerChoices: PlayerChoice[];
  narrativeFlags: Record<string, boolean>;
  reputationTracks: Record<string, number>;
}

export interface ActiveNarrative {
  id: string;
  title: string;
  type: string;
  progress: number;
  stages: NarrativeStage[];
  participants: string[];
  choices: string[];
  outcomes: string[];
}

export interface NarrativeStage {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  completion: string[];
  choices: string[];
  consequences: string[];
}

export interface CharacterArc {
  characterId: number;
  arc: string;
  stage: number;
  development: number;
  relationships: Record<number, number>;
  personalGoals: string[];
  conflicts: string[];
  resolution: string;
}

export interface WorldNarrative {
  id: string;
  theme: string;
  progress: number;
  events: string[];
  consequences: string[];
  resolution: string[];
}

export interface PlayerChoice {
  eventId: string;
  choiceId: string;
  turn: number;
  consequences: string[];
  impact: Record<string, number>;
}

// Calendar and Time
export interface Calendar {
  currentSeason: Season;
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  daysSinceStart: number;
  seasonalEvents: SeasonalEvent[];
  holidays: Holiday[];
  astronomicalEvents: AstronomicalEvent[];
  culturalCalendars: CulturalCalendar[];
}

export interface SeasonalEvent {
  id: string;
  season: Season;
  name: string;
  effects: SeasonalEffect[];
  duration: number;
  frequency: number;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  culture: string;
  effects: HolidayEffect[];
  popularity: number;
  significance: number;
}

export interface HolidayEffect {
  type: string;
  value: number;
  target?: string;
  duration: number;
}

export interface AstronomicalEvent {
  id: string;
  type: string;
  date: string;
  effects: AstronomicalEffect[];
  rarity: number;
  magicalSignificance: boolean;
}

export interface AstronomicalEffect {
  type: string;
  value: number;
  duration: number;
  magical: boolean;
}

export interface CulturalCalendar {
  culture: string;
  months: string[];
  holidays: string[];
  significance: number;
  adoption: number;
}

// Statistics and Achievements
export interface GameStatistics {
  turnCount: number;
  totalCommanders: number;
  totalBuildings: number;
  totalPopulation: number;
  totalWealth: number;
  battlesWon: number;
  battlesLost: number;
  diplomaticAgreements: number;
  technologiesDiscovered: number;
  artifactsFound: number;
  nodesControlled: number;
  nodesLost: number;
  tradeProfits: number;
  culturalWorks: number;
  environmentalProjects: number;
  questsCompleted: number;
  expeditionsSent: number;
  alliancesFormed: number;
  warsStarted: number;
  peaceTreaties: number;
  resourcesGenerated: Record<string, number>;
  buildingConstructed: Record<string, number>;
  unitsRecruited: Record<string, number>;
  commanderPromotions: number;
  researchCompleted: number;
  corruptionCleansed: number;
  artifactsStudied: number;
  tradingPartners: number;
  culturalInfluence: number;
  environmentalHealth: number;
  factionReputation: Record<string, number>;
  personalAchievements: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  requirements: AchievementRequirement[];
  rewards: AchievementReward[];
  hidden: boolean;
  progress: number;
  completed: boolean;
  completionDate?: number;
  rarity: number;
}

export interface AchievementRequirement {
  type: string;
  target?: string;
  value: number;
  operator: string;
  description: string;
}

export interface AchievementReward {
  type: string;
  value: number;
  item?: string;
  description: string;
}

export interface AchievementInfo {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  requirements: AchievementRequirement[];
  rewards: AchievementReward[];
  hidden: boolean;
  rarity: number;
}

// Victory and Legacy
export interface VictoryProgress {
  territorial: VictoryCondition;
  technological: VictoryCondition;
  cultural: VictoryCondition;
  diplomatic: VictoryCondition;
  economic: VictoryCondition;
  population: VictoryCondition;
  magical: VictoryCondition;
}

export interface VictoryCondition {
  type: VictoryType;
  name: string;
  description: string;
  progress: number;
  required: number;
  milestones: VictoryMilestone[];
  achievable: boolean;
  timeEstimate: number;
}

export interface VictoryMilestone {
  name: string;
  description: string;
  progress: number;
  required: number;
  completed: boolean;
  rewards: string[];
}

export interface LegacyData {
  previousPlaythroughs: LegacyRun[];
  totalScore: number;
  bestVictory: string;
  favoriteStrategy: string;
  legacyBonuses: LegacyBonus[];
  hallOfFame: HallOfFameEntry[];
  unlocks: string[];
  achievements: string[];
  statistics: LegacyStatistics;
}

export interface LegacyRun {
  id: string;
  startDate: number;
  endDate: number;
  turns: number;
  victory: VictoryType | null;
  score: number;
  faction: string;
  difficulty: string;
  achievements: string[];
  statistics: GameStatistics;
  memorable: MemorableMoment[];
}

export interface LegacyBonus {
  id: string;
  name: string;
  description: string;
  type: string;
  value: number;
  requirement: string;
  unlocked: boolean;
}

export interface HallOfFameEntry {
  runId: string;
  playerName: string;
  achievement: string;
  score: number;
  date: number;
  details: string;
}

export interface LegacyStatistics {
  totalRuns: number;
  totalTurns: number;
  victories: Record<VictoryType, number>;
  averageScore: number;
  bestScore: number;
  favoriteVictory: VictoryType;
  playTime: number;
  achievements: number;
}

export interface MemorableMoment {
  turn: number;
  type: string;
  description: string;
  impact: number;
  screenshot?: string;
}

// Military and Combat
export interface Defense {
  id: string;
  type: string;
  strength: number;
  condition: number;
  coverage: string[];
  effectiveness: Record<string, number>;
  maintenance: number;
}

export interface PoliticalSituation {
  stability: number;
  legitimacy: number;
  support: Record<string, number>;
  opposition: Record<string, number>;
  policies: Policy[];
  laws: Law[];
  corruption: number;
  rebellions: Rebellion[];
  succession: SuccessionPlan;
}

export interface Policy {
  id: string;
  name: string;
  type: string;
  effects: PolicyEffect[];
  support: number;
  cost: number;
  duration: number;
  requirements: string[];
}

export interface PolicyEffect {
  type: string;
  value: number;
  target?: string;
  duration: number;
}

export interface Law {
  id: string;
  name: string;
  type: string;
  effects: string[];
  enforcement: number;
  compliance: number;
  support: number;
}

export interface Rebellion {
  id: string;
  location: number[];
  cause: string;
  strength: number;
  support: number;
  leaders: string[];
  demands: string[];
  violence: number;
}

export interface SuccessionPlan {
  type: string;
  heirs: string[];
  legitimacy: number;
  support: Record<string, number>;
  challenges: string[];
}

export interface MilitaryIntelligence {
  enemyStrength: Record<string, number>;
  enemyMovements: MovementReport[];
  spyNetworks: SpyNetwork[];
  intelligence: IntelligenceReport[];
  counterintelligence: number;
  secrecy: number;
}

export interface MovementReport {
  faction: string;
  location: number;
  direction: string;
  strength: number;
  purpose: string;
  confidence: number;
  source: string;
}

export interface SpyNetwork {
  id: string;
  location: string;
  strength: number;
  coverage: string[];
  reliability: number;
  exposure: number;
  agents: Agent[];
}

export interface Agent {
  id: string;
  name: string;
  cover: string;
  skill: number;
  loyalty: number;
  exposure: number;
  location: string;
  missions: Mission[];
}

export interface Mission {
  id: string;
  type: string;
  target: string;
  objective: string;
  progress: number;
  risk: number;
  reward: string;
  deadline: number;
}

export interface IntelligenceReport {
  id: string;
  source: string;
  reliability: number;
  information: string;
  importance: number;
  actionable: boolean;
  verified: boolean;
}

// Construction and Infrastructure
export interface ConstructionProject {
  id: string;
  name: string;
  type: string;
  progress: number;
  totalRequired: number;
  workers: number;
  materials: Record<string, number>;
  cost: Record<string, number>;
  benefits: BuildingEffect[];
  prerequisites: string[];
  timeRemaining: number;
  priority: number;
  paused: boolean;
  completion: number;
}

export interface NodeResources {
  production: Record<string, number>;
  storage: Record<string, number>;
  capacity: Record<string, number>;
  efficiency: Record<string, number>;
  workers: Record<string, number>;
  infrastructure: number;
  development: number;
}

export interface PopulationCenter {
  id: string;
  nodeId: number;
  name: string;
  type: 'village' | 'town' | 'city' | 'metropolis' | 'settlement' | 'outpost';
  population: Population;
  infrastructure: Infrastructure;
  services: Service[];
  economy: LocalEconomy;
  culture: LocalCulture;
  problems: string[];
  projects: string[];
}

export interface Infrastructure {
  roads: number;
  housing: number;
  sanitation: number;
  water: number;
  power: number;
  communication: number;
  healthcare: number;
  education: number;
  defense: number;
  storage: number;
}

export interface Service {
  id: string;
  type: string;
  quality: number;
  coverage: number;
  efficiency: number;
  cost: number;
  satisfaction: number;
}

export interface LocalEconomy {
  gdp: number;
  employment: number;
  wages: number;
  businesses: Business[];
  industries: Industry[];
  tradeVolume: number;
  prosperity: number;
}

export interface Business {
  id: string;
  name: string;
  type: string;
  size: number;
  employees: number;
  revenue: number;
  reputation: number;
  owner: string;
}

export interface Industry {
  type: string;
  development: number;
  employment: number;
  productivity: number;
  competitiveness: number;
  environmental: number;
}

export interface LocalCulture {
  identity: number;
  diversity: number;
  traditions: string[];
  languages: string[];
  arts: number;
  education: number;
  values: Record<string, number>;
}

// Historical Systems
export interface HistoricalRecord {
  id: string;
  turn: number;
  type: string;
  title: string;
  description: string;
  participants: string[];
  location: number[];
  significance: number;
  consequences: string[];
  sources: string[];
  accuracy: number;
}

export interface HistoricalEvent {
  id: string;
  turn: number;
  type: string;
  description: string;
  participants: string[];
  consequences: string[];
  commemoration: string[];
}

export interface HistoricalFigure {
  name: string;
  title: string;
  period: string;
  achievements: string[];
  legacy: string;
  influence: number;
  reputation: number;
  controversies: string[];
}

// Equipment Information
export interface EquipmentInfo {
  name: string;
  type: string;
  rarity: string;
  stats: Record<string, number>;
  effects: ItemEffect[];
  requirements: string[];
  craftable: boolean;
  materials: Record<string, number>;
  value: number;
}

// Building Information
export interface BuildingInfo {
  name: string;
  description: string;
  type: string;
  cost: Record<string, number>;
  maintenance: Record<string, number>;
  effects: BuildingEffect[];
  prerequisites: string[];
  maxLevel: number;
  upgradeMultiplier: number;
  constructionTime: number;
  workerRequirement: number;
  specialRequirements: string[];
}
