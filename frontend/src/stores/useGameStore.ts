/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  GameState,
  Resources,
  CommanderClass,
  Race,
  Technology,
  Faction,
  Season,
  Weather,
  VictoryType,
  NodeType,
  WorldState,
  WeatherSystem,
  Calendar,
  FactionData,
  DiplomaticRelations,
  Market,
  ResearchSystem,
  ExplorationData,
  CorruptionData,
  CulturalRenaissance,
  EnvironmentalRestoration,
  GameStatistics,
  VictoryProgress,
  LegacyData,
  Achievement,
  GameEvent,
  NarrativeState,
  PopulationCenter,
  TradeNetwork,
  PoliticalSituation,
  MilitaryIntelligence,
  HistoricalRecord,
} from "../types/game";
import {
  createCommander,
  canAffordCommander,
  generateInitialMap,
  calculateIncome,
  canAttackNode as gameLogicCanAttackNode,
  resolveBattle,
  updateNodeAfterBattle,
  calculateEffectiveGarrison,
  calculateCommanderBonus,
  generateInitialWorldState,
  generateInitialFactions,
  generateInitialResearchSystem,
  generateInitialMarket,
  generateInitialWeatherSystem,
  generateInitialCalendar,
  generateInitialDiplomacy,
  generateInitialExploration,
  generateInitialCorruption,
  generateInitialCulturalRenaissance,
  generateInitialEnvironmentalRestoration,
  generateInitialStatistics,
  generateInitialVictoryProgress,
  generateInitialLegacyData,
  generateInitialNarrativeState,
  generateInitialPopulationCenters,
  generateInitialTradeNetworks,
  generateInitialPoliticalSituation,
  generateInitialMilitaryIntelligence,
} from "../utils/gameLogic";
import { gameData, gameConstants } from "../data/gameData";
import { StoryEventSystem } from "../systems/StoryEventSystem";

// Initial game state with comprehensive world rebuilding systems
const getInitialState = (): GameState => {
  // Create initial player and enemy commanders
  const initialCommanders = [
    // Player starts with one commander
    createCommander(1, "knight", "human", "player"),
    // Enemy commanders
    createCommander(1000, "knight", "orc", "enemy"),
    createCommander(1001, "mage", "orc", "enemy"),
  ];

  // Assign commanders to their starting nodes
  initialCommanders[0].assignedNode = 1; // Player knight at starting city
  initialCommanders[1].assignedNode = 7; // Enemy city
  initialCommanders[2].assignedNode = 8; // Enemy fortress

  const initialNodes = generateInitialMap();

  return {
    turn: 1,
    phase: "player",
    resources: {
      gold: 500,
      supplies: 100,
      mana: 50,
      knowledge: 25,
      culture: 10,
      influence: 5,
      materials: 75,
      food: 200,
      energy: 100,
      artifacts: 0,
    },
    commanders: initialCommanders,
    nodes: initialNodes,
    selectedNode: null,
    selectedCommander: null,
    gameOver: false,
    winner: null,
    currentMission: null,
    missionStarted: false,
    battleLog: [
      {
        timestamp: Date.now(),
        type: "info",
        message:
          "Welcome to the world of Ashes of Aeloria! The great civilization has fallen, but from its ashes, you will rebuild. Your journey to restore the world begins now.",
      },
    ],
    globalTechnologies: [],
    worldState: generateInitialWorldState(),
    factions: generateInitialFactions(),
    diplomacy: generateInitialDiplomacy(),
    market: generateInitialMarket(),
    calendar: generateInitialCalendar(),
    weather: generateInitialWeatherSystem(),
    events: [],
    eventQueue: [],
    narrativeState: generateInitialNarrativeState(),
    achievements: [],
    statistics: generateInitialStatistics(),
    victoryProgress: generateInitialVictoryProgress(),
    legacyData: generateInitialLegacyData(),
    historicalRecords: [],
    culturalMovements: [],
    economicCycles: [],
    research: generateInitialResearchSystem(),
    exploration: generateInitialExploration(),
    magicalCorruption: generateInitialCorruption(),
    populationCenters: generateInitialPopulationCenters(initialNodes),
    tradeNetworks: generateInitialTradeNetworks(),
    politicalSituation: generateInitialPoliticalSituation(),
    militaryIntelligence: generateInitialMilitaryIntelligence(),
    culturalRenaissance: generateInitialCulturalRenaissance(),
    environmentalRestoration: generateInitialEnvironmentalRestoration(),
  };
};

interface GameStore extends GameState {
  // Core Game Actions
  selectCommander: (id: number | null) => void;
  selectNode: (id: number | null) => void;
  addCommander: (className: CommanderClass, race: Race) => boolean;
  assignCommanderToNode: (commanderId: number, nodeId: number) => boolean;
  unassignCommander: (commanderId: number) => void;
  getNodeCommanderInfo: (nodeId: number) => {
    current: number;
    max: number;
    commanders: any[];
  };
  upgradeNode: (nodeId: number) => boolean;
  getUpgradeCost: (nodeId: number) => number;
  canUpgradeNode: (nodeId: number) => boolean;
  updateResources: (resources: Partial<Resources>) => void;
  nextTurn: () => void;
  endTurn: () => void;
  processEnemyTurn: () => void;
  collectResources: () => void;
  resetGame: () => void;
  repairMapConnections: () => void;
  attackNode: (nodeId: number) => void;
  canAttackNode: (nodeId: number) => boolean;
  addBattleLogEntry: (
    type: "info" | "combat" | "victory" | "defeat" | "recruitment",
    message: string,
  ) => void;
  initializeMission: (campaignId: string) => void;
  endMission: () => void;

  // World Rebuilding Actions
  constructBuilding: (nodeId: number, buildingType: string) => boolean;
  demolishBuilding: (nodeId: number, buildingId: string) => boolean;
  upgradeBuilding: (nodeId: number, buildingId: string) => boolean;
  managePopulation: (
    nodeId: number,
    action: string,
    amount?: number,
  ) => boolean;
  resettlePopulation: (
    fromNodeId: number,
    toNodeId: number,
    amount: number,
  ) => boolean;

  // Technology and Research Actions
  startResearch: (technology: Technology) => boolean;
  cancelResearch: (projectId: string) => boolean;
  prioritizeResearch: (projectId: string, priority: number) => void;
  assignResearchers: (projectId: string, researchers: number) => boolean;
  recoverAncientKnowledge: (artifactId: string) => boolean;
  shareKnowledge: (faction: Faction, technology: Technology) => boolean;

  // Exploration and Discovery Actions
  launchExpedition: (
    target: string,
    leaderId: number,
    members: number[],
  ) => boolean;
  exploreRuin: (ruinId: string, explorerId: number) => boolean;
  studyArtifact: (artifactId: string, scholarId: number) => boolean;
  contactHiddenSociety: (societyId: string, diplomatId: number) => boolean;
  investigateMystery: (mysteryId: string, investigatorId: number) => boolean;
  scoutNode: (nodeId: number, scoutId: number) => boolean;

  // Diplomatic Actions
  initiateDiplomacy: (faction: Faction, type: string) => boolean;
  acceptProposal: (negotiationId: string, proposalId: string) => boolean;
  rejectProposal: (negotiationId: string, proposalId: string) => boolean;
  makeDiplomaticOffer: (faction: Faction, terms: string[]) => boolean;
  declareWar: (faction: Faction) => boolean;
  seekPeace: (faction: Faction) => boolean;
  formAlliance: (faction: Faction) => boolean;
  breakAlliance: (faction: Faction) => boolean;

  // Economic Actions
  establishTradeRoute: (
    fromNodeId: number,
    toNodeId: number,
    goods: string[],
  ) => boolean;
  cancelTradeRoute: (routeId: string) => boolean;
  adjustTariffs: (routeId: string, tariff: number) => void;
  investInMarket: (resource: string, amount: number) => boolean;
  buyFromMarket: (resource: string, amount: number) => boolean;
  sellToMarket: (resource: string, amount: number) => boolean;
  recruitMerchant: (nodeId: number, specialization: string[]) => boolean;

  // Environmental Actions
  startRestorationProject: (type: string, nodeId: number) => boolean;
  assignSpecialistsToRestoration: (
    projectId: string,
    specialists: number[],
  ) => boolean;
  cleanCorruption: (nodeId: number, method: string) => boolean;
  plantForests: (nodeId: number, area: number) => boolean;
  purifyWater: (nodeId: number) => boolean;
  reintroduceSpecies: (nodeId: number, species: string) => boolean;

  // Cultural Actions
  commissionArtwork: (
    nodeId: number,
    artistId: string,
    type: string,
  ) => boolean;
  organizeFestival: (nodeId: number, festivalType: string) => boolean;
  preserveTradition: (traditionId: string) => boolean;
  promotePhilosophy: (schoolId: string, nodeId: number) => boolean;
  buildMonument: (nodeId: number, type: string) => boolean;
  establishLibrary: (nodeId: number) => boolean;

  // Military Actions
  recruitTroops: (nodeId: number, type: string, amount: number) => boolean;
  disbandTroops: (commanderId: number, type: string, amount: number) => boolean;
  trainTroops: (commanderId: number, trainingType: string) => boolean;
  deploySpies: (targetFaction: Faction, spyId: number) => boolean;
  gatherIntelligence: (targetNodeId: number, agentId: number) => boolean;
  sabotage: (targetNodeId: number, agentId: number, target: string) => boolean;

  // Event Actions
  respondToEvent: (eventId: string, choiceId: string) => void;
  triggerEvent: (eventType: string, conditions?: any) => boolean;
  processRandomEvents: () => void;
  processSeasonalEvents: () => void;
  processStoryEvents: () => void;

  // Quest Actions
  acceptQuest: (questId: string) => boolean;
  completeQuest: (questId: string) => boolean;
  abandonQuest: (questId: string) => boolean;
  updateQuestProgress: (
    questId: string,
    objectiveId: string,
    progress: number,
  ) => void;

  // Achievement Actions
  checkAchievements: () => void;
  unlockAchievement: (achievementId: string) => boolean;

  // Victory Actions
  checkVictoryConditions: () => boolean;
  declareVictory: (victoryType: VictoryType) => void;

  // Legacy Actions
  saveRunToLegacy: () => void;
  applyLegacyBonuses: () => void;

  // Utility Actions
  processWeatherEffects: () => void;
  advanceCalendar: () => void;
  updateStatistics: () => void;
  generateHistoricalRecord: (
    type: string,
    description: string,
    participants: string[],
  ) => void;
  saveGameState: () => void;
  loadGameState: (saveData: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state - will be overridden by persisted data if available
      ...getInitialState(),

      // Actions
      selectCommander: (id) => set({ selectedCommander: id }),
      selectNode: (id) => set({ selectedNode: id }),

      // World Rebuilding Implementation
      constructBuilding: (nodeId, buildingType) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node || node.owner !== "player") return false;

        // Implementation for building construction
        // This would check costs, prerequisites, etc.
        return true;
      },

      demolishBuilding: (nodeId, buildingId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node || node.owner !== "player") return false;

        // Implementation for building demolition
        return true;
      },

      upgradeBuilding: (nodeId, buildingId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node || node.owner !== "player") return false;

        // Implementation for building upgrades
        return true;
      },

      managePopulation: (nodeId, action, amount = 0) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node || node.owner !== "player") return false;

        // Implementation for population management
        return true;
      },

      resettlePopulation: (fromNodeId, toNodeId, amount) => {
        const state = get();
        const fromNode = state.nodes.find((n) => n.id === fromNodeId);
        const toNode = state.nodes.find((n) => n.id === toNodeId);
        if (
          !fromNode ||
          !toNode ||
          fromNode.owner !== "player" ||
          toNode.owner !== "player"
        )
          return false;

        // Implementation for population resettlement
        return true;
      },

      // Technology and Research Implementation
      startResearch: (technology) => {
        const state = get();
        if (state.research.completedTechnologies.includes(technology))
          return false;
        if (
          state.research.activeProjects.some((p) => p.technology === technology)
        )
          return false;

        const techInfo = gameData.technologies[technology];
        if (!techInfo) return false;

        // Check prerequisites
        const hasPrerequisites = techInfo.prerequisites.every((prereq) =>
          state.research.completedTechnologies.includes(prereq),
        );
        if (!hasPrerequisites) return false;

        // Check research cost
        if (state.resources.knowledge < techInfo.researchCost) return false;

        const newProject = {
          id: `research_${Date.now()}`,
          technology,
          progress: 0,
          totalRequired: techInfo.researchCost,
          researchers: 1,
          priority: 1,
          startedTurn: state.turn,
        };

        set((state) => ({
          research: {
            ...state.research,
            activeProjects: [...state.research.activeProjects, newProject],
          },
          resources: {
            ...state.resources,
            knowledge: state.resources.knowledge - techInfo.researchCost,
          },
        }));

        get().addBattleLogEntry("info", `Started research on ${techInfo.name}`);
        return true;
      },

      cancelResearch: (projectId) => {
        const state = get();
        const project = state.research.activeProjects.find(
          (p) => p.id === projectId,
        );
        if (!project) return false;

        const techInfo = gameData.technologies[project.technology];
        const refund = Math.floor(techInfo.researchCost * 0.5); // 50% refund

        set((state) => ({
          research: {
            ...state.research,
            activeProjects: state.research.activeProjects.filter(
              (p) => p.id !== projectId,
            ),
          },
          resources: {
            ...state.resources,
            knowledge: state.resources.knowledge + refund,
          },
        }));

        get().addBattleLogEntry(
          "info",
          `Cancelled research on ${techInfo.name} (${refund} knowledge refunded)`,
        );
        return true;
      },

      prioritizeResearch: (projectId, priority) => {
        set((state) => ({
          research: {
            ...state.research,
            activeProjects: state.research.activeProjects.map((p) =>
              p.id === projectId ? { ...p, priority } : p,
            ),
          },
        }));
      },

      assignResearchers: (projectId, researchers) => {
        const state = get();
        const project = state.research.activeProjects.find(
          (p) => p.id === projectId,
        );
        if (!project) return false;

        // Check if we have enough available researchers
        const totalResearchers = state.research.scholarNetwork.scholars.length;
        const usedResearchers = state.research.activeProjects.reduce(
          (sum, p) => sum + p.researchers,
          0,
        );
        const availableResearchers =
          totalResearchers - usedResearchers + project.researchers;

        if (researchers > availableResearchers) return false;

        set((state) => ({
          research: {
            ...state.research,
            activeProjects: state.research.activeProjects.map((p) =>
              p.id === projectId ? { ...p, researchers } : p,
            ),
          },
        }));

        return true;
      },

      recoverAncientKnowledge: (artifactId) => {
        // Implementation for recovering knowledge from artifacts
        return true;
      },

      shareKnowledge: (faction, technology) => {
        // Implementation for knowledge sharing with factions
        return true;
      },

      // Exploration Implementation (placeholder methods)
      launchExpedition: (target, leaderId, members) => true,
      exploreRuin: (ruinId, explorerId) => true,
      studyArtifact: (artifactId, scholarId) => true,
      contactHiddenSociety: (societyId, diplomatId) => true,
      investigateMystery: (mysteryId, investigatorId) => true,
      scoutNode: (nodeId, scoutId) => true,

      // Diplomatic Implementation (placeholder methods)
      initiateDiplomacy: (faction, type) => true,
      acceptProposal: (negotiationId, proposalId) => true,
      rejectProposal: (negotiationId, proposalId) => true,
      makeDiplomaticOffer: (faction, terms) => true,
      declareWar: (faction) => true,
      seekPeace: (faction) => true,
      formAlliance: (faction) => true,
      breakAlliance: (faction) => true,

      // Economic Implementation (placeholder methods)
      establishTradeRoute: (fromNodeId, toNodeId, goods) => true,
      cancelTradeRoute: (routeId) => true,
      adjustTariffs: (routeId, tariff) => {},
      investInMarket: (resource, amount) => true,
      buyFromMarket: (resource, amount) => true,
      sellToMarket: (resource, amount) => true,
      recruitMerchant: (nodeId, specialization) => true,

      // Environmental Implementation (placeholder methods)
      startRestorationProject: (type, nodeId) => true,
      assignSpecialistsToRestoration: (projectId, specialists) => true,
      cleanCorruption: (nodeId, method) => true,
      plantForests: (nodeId, area) => true,
      purifyWater: (nodeId) => true,
      reintroduceSpecies: (nodeId, species) => true,

      // Cultural Implementation (placeholder methods)
      commissionArtwork: (nodeId, artistId, type) => true,
      organizeFestival: (nodeId, festivalType) => true,
      preserveTradition: (traditionId) => true,
      promotePhilosophy: (schoolId, nodeId) => true,
      buildMonument: (nodeId, type) => true,
      establishLibrary: (nodeId) => true,

      // Military Implementation (placeholder methods)
      recruitTroops: (nodeId, type, amount) => true,
      disbandTroops: (commanderId, type, amount) => true,
      trainTroops: (commanderId, trainingType) => true,
      deploySpies: (targetFaction, spyId) => true,
      gatherIntelligence: (targetNodeId, agentId) => true,
      sabotage: (targetNodeId, agentId, target) => true,

      // Event Implementation (placeholder methods)
      respondToEvent: (eventId, choiceId) => {
        set((state) => {
          const storyEventSystem = new StoryEventSystem(state);
          storyEventSystem.processEventChoice(eventId, choiceId);

          // Return the modified state (the StoryEventSystem modifies state in-place)
          return { ...state };
        });
      },
      triggerEvent: (eventType, conditions) => true,
      processRandomEvents: () => {},
      processSeasonalEvents: () => {},
      processStoryEvents: () => {
        const state = get();
        const storyEventSystem = new StoryEventSystem(state);
        const newEvents = storyEventSystem.processTurnEvents();

        if (newEvents.length > 0) {
          set((state) => ({
            events: [...state.events, ...newEvents],
          }));
        }
      },

      // Quest Implementation (placeholder methods)
      acceptQuest: (questId) => true,
      completeQuest: (questId) => true,
      abandonQuest: (questId) => true,
      updateQuestProgress: (questId, objectiveId, progress) => {},

      // Achievement Implementation
      checkAchievements: () => {
        // Implementation for checking and unlocking achievements
      },

      unlockAchievement: (achievementId) => {
        const state = get();
        if (
          state.achievements.some((a) => a.id === achievementId && a.completed)
        )
          return false;

        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId
              ? { ...a, completed: true, completionDate: Date.now() }
              : a,
          ),
        }));

        get().addBattleLogEntry(
          "info",
          `Achievement unlocked: ${achievementId}`,
        );
        return true;
      },

      // Victory Implementation
      checkVictoryConditions: () => {
        // Implementation for checking victory conditions
        return false;
      },

      declareVictory: (victoryType) => {
        set((state) => ({
          gameOver: true,
          winner: "player",
        }));

        get().addBattleLogEntry(
          "victory",
          `Victory achieved through ${victoryType}!`,
        );
      },

      // Legacy Implementation
      saveRunToLegacy: () => {
        // Implementation for saving current run to legacy data
      },

      applyLegacyBonuses: () => {
        // Implementation for applying legacy bonuses
      },

      // Utility Implementation
      processWeatherEffects: () => {
        const state = get();
        const currentWeather = state.weather.currentWeather;
        const weatherPattern = gameData.weatherPatterns[currentWeather];

        if (weatherPattern) {
          // Apply weather effects to resources, movement, etc.
          weatherPattern.effects.forEach((effect) => {
            // Process each weather effect
          });
        }
      },

      advanceCalendar: () => {
        set((state) => {
          const newCalendar = { ...state.calendar };
          newCalendar.currentDay++;
          newCalendar.daysSinceStart++;

          // Advance month/season logic would go here

          return { calendar: newCalendar };
        });
      },

      updateStatistics: () => {
        // Implementation for updating game statistics
      },

      generateHistoricalRecord: (type, description, participants) => {
        const state = get();
        const record = {
          id: `record_${Date.now()}`,
          turn: state.turn,
          type,
          title: `${type} - Turn ${state.turn}`,
          description,
          participants,
          location: [],
          significance: 1,
          consequences: [],
          sources: ["Player Action"],
          accuracy: 100,
        };

        set((state) => ({
          historicalRecords: [...state.historicalRecords, record],
        }));
      },

      saveGameState: () => {
        // Implementation for manual save
      },

      loadGameState: (saveData) => {
        set((state) => ({ ...state, ...saveData }));
      },
      addCommander: (className, race) => {
        const state = get();
        if (canAffordCommander(state.resources, className)) {
          const newId = Math.max(0, ...state.commanders.map((c) => c.id)) + 1;
          const commander = createCommander(newId, className, race, "player"); // Specify player ownership
          const cost = gameData.commanderClasses[className].cost;

          set((state) => ({
            commanders: [...state.commanders, commander],
            resources: {
              ...state.resources,
              gold: state.resources.gold - cost,
            },
            battleLog: [
              ...state.battleLog,
              {
                timestamp: Date.now(),
                type: "recruitment",
                message: `Recruited ${commander.name} for ${cost} gold`,
              },
            ],
          }));

          return true;
        }
        return false;
      },
      assignCommanderToNode: (commanderId, nodeId) => {
        const state = get();
        const commander = state.commanders.find((c) => c.id === commanderId);
        const node = state.nodes.find((n) => n.id === nodeId);

        if (!commander || !node) return false;
        if (node.owner !== "player") return false;

        // Check commander capacity for this node type
        const maxCapacity = gameConstants.COMMANDER_CAPACITIES[node.type];
        const currentCommanders = state.commanders.filter(
          (c) => c.assignedNode === nodeId,
        ).length;

        if (currentCommanders >= maxCapacity) {
          // Add a message to battle log about capacity limit
          set((state) => ({
            battleLog: [
              ...state.battleLog,
              {
                timestamp: Date.now(),
                type: "info",
                message: `Cannot assign ${commander.name}: ${gameData.nodeTypes[node.type].name} is at capacity (${maxCapacity} commanders)`,
              },
            ],
          }));
          return false;
        }

        set((state) => ({
          commanders: state.commanders.map((c) =>
            c.id === commanderId ? { ...c, assignedNode: nodeId } : c,
          ),
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type: "info",
              message: `${commander.name} assigned to defend the ${gameData.nodeTypes[node.type].name}`,
            },
          ],
        }));

        return true;
      },
      unassignCommander: (commanderId) => {
        const state = get();
        const commander = state.commanders.find((c) => c.id === commanderId);

        if (!commander || !commander.assignedNode) return;

        set((state) => ({
          commanders: state.commanders.map((c) =>
            c.id === commanderId ? { ...c, assignedNode: null } : c,
          ),
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type: "info",
              message: `${commander.name} recalled from duty`,
            },
          ],
        }));
      },
      getNodeCommanderInfo: (nodeId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node) return { current: 0, max: 0, commanders: [] };

        const assignedCommanders = state.commanders.filter(
          (c) => c.assignedNode === nodeId,
        );
        const maxCapacity = gameConstants.COMMANDER_CAPACITIES[node.type];

        return {
          current: assignedCommanders.length,
          max: maxCapacity,
          commanders: assignedCommanders,
        };
      },
      getUpgradeCost: (nodeId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node) return 0;

        // Base cost formula: 200 * starLevel * multiplier based on node type
        const baseMultiplier: Partial<Record<NodeType, number>> = {
          city: 1.5,
          fortress: 2.0,
          stronghold: 2.5,
          resource: 1.0,
          shrine: 1.8,
        };

        return Math.floor(
          200 * node.starLevel * (baseMultiplier[node.type] ?? 1.0),
        );
      },
      canUpgradeNode: (nodeId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);
        if (!node) return false;
        if (node.owner !== "player") return false;
        if (node.starLevel >= 5) return false; // Max star level

        const upgradeCost = get().getUpgradeCost(nodeId);
        return state.resources.gold >= upgradeCost;
      },
      upgradeNode: (nodeId) => {
        const state = get();
        const node = state.nodes.find((n) => n.id === nodeId);

        if (!get().canUpgradeNode(nodeId) || !node) return false;

        const upgradeCost = get().getUpgradeCost(nodeId);

        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  starLevel: n.starLevel + 1,
                  garrison: n.garrison + 25, // Increase garrison with upgrade
                }
              : n,
          ),
          resources: {
            ...state.resources,
            gold: state.resources.gold - upgradeCost,
          },
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type: "info",
              message: `${gameData.nodeTypes[node.type].name} upgraded to ${node.starLevel + 1} stars for ${upgradeCost} gold!`,
            },
          ],
        }));

        return true;
      },
      updateResources: (newResources) =>
        set((state) => ({
          resources: { ...state.resources, ...newResources },
        })),
      nextTurn: () => {
        set((state) => ({
          turn: state.turn + 1,
          phase: "player" as const,
        }));

        // Process story events for the new turn
        get().processStoryEvents();
      },
      endTurn: () => {
        set({ phase: "enemy" as const });
        // Process enemy turn after a short delay for better UX
        setTimeout(() => {
          get().processEnemyTurn();
        }, 500);
      },
      processEnemyTurn: () => {
        const state = get();

        // 1. Enemy resource collection
        const enemyNodes = state.nodes.filter((n) => n.owner === "enemy");
        let enemyResources = { gold: 0, supplies: 0, mana: 0 };

        enemyNodes.forEach((node) => {
          const nodeType = gameData.nodeTypes[node.type];
          enemyResources.gold += nodeType.goldGeneration;
          enemyResources.supplies += nodeType.suppliesGeneration;
          enemyResources.mana += nodeType.manaGeneration;
        });

        get().addBattleLogEntry(
          "info",
          `Enemy collected ${enemyResources.gold} gold, ${enemyResources.supplies} supplies, ${enemyResources.mana} mana`,
        );

        // 2. Enemy commander recruitment (if they have few commanders)
        const enemyCommanders = state.commanders.filter(
          (c) => c.owner === "enemy",
        ); // Filter by owner, not race
        if (enemyCommanders.length < 3 && enemyResources.gold >= 150) {
          const commanderClasses: CommanderClass[] = [
            "knight",
            "mage",
            "ranger",
            "warlord",
          ];
          const randomClass =
            commanderClasses[
              Math.floor(Math.random() * commanderClasses.length)
            ];

          const newId = Math.max(0, ...state.commanders.map((c) => c.id)) + 1;
          const enemyCommander = createCommander(
            newId,
            randomClass,
            "orc",
            "enemy",
          ); // Specify enemy ownership

          set((state) => ({
            commanders: [...state.commanders, enemyCommander],
          }));

          get().addBattleLogEntry(
            "recruitment",
            `Enemy recruited ${enemyCommander.name}`,
          );
        }

        // 3. Enemy attacks - find potential targets
        const playerNodes = state.nodes.filter((n) => n.owner === "player");
        const attackableTargets = [];

        for (const enemyNode of enemyNodes) {
          for (const connectionId of enemyNode.connections) {
            const targetNode = state.nodes.find((n) => n.id === connectionId);
            if (
              targetNode &&
              (targetNode.owner === "player" || targetNode.owner === "neutral")
            ) {
              attackableTargets.push({
                attacker: enemyNode,
                target: targetNode,
                priority: targetNode.owner === "player" ? 2 : 1, // Prefer player nodes
              });
            }
          }
        }

        // Sort by priority and attack strength
        attackableTargets.sort((a, b) => {
          const priorityDiff = b.priority - a.priority;
          if (priorityDiff !== 0) return priorityDiff;
          return b.attacker.garrison - a.attacker.garrison;
        });

        // 4. Execute enemy attacks
        let attacksExecuted = 0;
        const maxAttacks = Math.min(2, attackableTargets.length); // Limit attacks per turn

        for (let i = 0; i < maxAttacks; i++) {
          const attack = attackableTargets[i];

          // Get commanders at each node for proper battle calculation
          const attackerCommanders = state.commanders.filter(
            (c) => c.assignedNode === attack.attacker.id,
          );
          const defenderCommanders = state.commanders.filter(
            (c) => c.assignedNode === attack.target.id,
          );

          // Use the enhanced battle resolution
          const battleResult = resolveBattle(
            attack.attacker,
            attack.target,
            attackerCommanders,
            defenderCommanders,
          );

          if (battleResult.victory) {
            // Enemy wins - capture the node
            set((state) => ({
              nodes: state.nodes.map((n) =>
                n.id === attack.target.id
                  ? {
                      ...n,
                      owner: "enemy",
                      garrison: Math.floor(attack.attacker.garrison * 0.7), // Reduced garrison after attack
                    }
                  : n.id === attack.attacker.id
                    ? {
                        ...n,
                        garrison: Math.floor(n.garrison * 0.8), // Attacker also loses some garrison
                      }
                    : n,
              ),
            }));

            get().addBattleLogEntry(
              "defeat",
              `Enemy captured ${gameData.nodeTypes[attack.target.type].name} from ${attack.target.owner === "player" ? "player" : "neutral"} forces!`,
            );
          } else {
            // Enemy loses - reduce both garrisons
            set((state) => ({
              nodes: state.nodes.map((n) =>
                n.id === attack.target.id
                  ? { ...n, garrison: Math.floor(n.garrison * 0.9) }
                  : n.id === attack.attacker.id
                    ? { ...n, garrison: Math.floor(n.garrison * 0.7) }
                    : n,
              ),
            }));

            get().addBattleLogEntry(
              "victory",
              `Player forces successfully defended ${gameData.nodeTypes[attack.target.type].name} from enemy attack!`,
            );
          }

          attacksExecuted++;
        }

        if (attacksExecuted === 0) {
          get().addBattleLogEntry(
            "info",
            "Enemy consolidated their forces this turn",
          );
        }

        // 5. Enemy garrison reinforcement
        set((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.owner === "enemy") {
              // Enemy gets slightly less reinforcement than player
              const reinforcementsByType: Partial<Record<NodeType, number>> = {
                city: 12,
                fortress: 8,
                stronghold: 16,
                resource: 6,
                shrine: 4,
              };
              const baseReinforcement = reinforcementsByType[node.type] ?? 4;

              const reinforcement = Math.floor(
                baseReinforcement * node.starLevel,
              );
              const maxGarrison = 180 + node.starLevel * 40; // Slightly lower max than player

              return {
                ...node,
                garrison: Math.min(node.garrison + reinforcement, maxGarrison),
              };
            }
            return node;
          }),
        }));

        // 6. Enemy upgrades (simple AI - upgrade if they have resources)
        const upgradeableEnemyNodes = enemyNodes.filter((n) => n.starLevel < 5);
        if (upgradeableEnemyNodes.length > 0 && enemyResources.gold >= 400) {
          const nodeToUpgrade = upgradeableEnemyNodes[0]; // Upgrade first available
          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nodeToUpgrade.id
                ? {
                    ...n,
                    starLevel: n.starLevel + 1,
                    garrison: n.garrison + 30,
                  }
                : n,
            ),
          }));

          get().addBattleLogEntry(
            "info",
            `Enemy upgraded their ${gameData.nodeTypes[nodeToUpgrade.type].name} to ${nodeToUpgrade.starLevel + 1} stars`,
          );
        }

        // 7. End enemy turn and start player turn
        setTimeout(() => {
          get().collectResources();
          get().nextTurn();
        }, 1000);
      },
      collectResources: () => {
        const state = get();
        const income = calculateIncome(state.nodes);

        set((state) => ({
          resources: {
            gold: state.resources.gold + income.gold,
            supplies: state.resources.supplies + income.supplies,
            mana: state.resources.mana + income.mana,
          },
          // Reinforce player garrisons each turn
          nodes: state.nodes.map((node) => {
            if (node.owner === "player") {
              // Add garrison reinforcement based on node type and star level
              const reinforcementsByType: Partial<Record<NodeType, number>> = {
                city: 15,
                fortress: 10,
                stronghold: 20,
                resource: 8,
                shrine: 5,
              };
              const baseReinforcement = reinforcementsByType[node.type] ?? 5;

              const reinforcement = Math.floor(
                baseReinforcement * node.starLevel,
              );
              const maxGarrison = 200 + node.starLevel * 50; // Max garrison scales with star level

              return {
                ...node,
                garrison: Math.min(node.garrison + reinforcement, maxGarrison),
              };
            }
            return node;
          }),
        }));

        get().addBattleLogEntry(
          "info",
          `Turn ${state.turn + 1}: Collected ${income.gold} gold, ${income.supplies} supplies, ${income.mana} mana. Garrisons reinforced!`,
        );
      },
      attackNode: (nodeId) => {
        const state = get();
        const attackerNode = state.nodes.find(
          (n) => n.id === state.selectedNode,
        );
        const defenderNode = state.nodes.find((n) => n.id === nodeId);

        if (!attackerNode || !defenderNode) {
          get().addBattleLogEntry(
            "defeat",
            "Invalid attack: Could not find nodes",
          );
          return;
        }

        if (
          !gameLogicCanAttackNode(state.nodes, attackerNode.id, defenderNode.id)
        ) {
          get().addBattleLogEntry(
            "defeat",
            "Invalid attack: Cannot attack this node",
          );
          return;
        }

        // Get commanders at each node
        const attackerCommanders = state.commanders.filter(
          (c) => c.assignedNode === attackerNode.id,
        );
        const defenderCommanders = state.commanders.filter(
          (c) => c.assignedNode === defenderNode.id,
        );

        // Calculate commander bonuses for battle log
        const attackerBonus = calculateCommanderBonus(attackerCommanders);
        const defenderBonus = calculateCommanderBonus(defenderCommanders);

        // Resolve the battle with commander bonuses
        const battleResult = resolveBattle(
          attackerNode,
          defenderNode,
          attackerCommanders,
          defenderCommanders,
        );

        if (battleResult.victory) {
          // Player wins - capture the node
          const updatedDefenderNode = updateNodeAfterBattle(
            defenderNode,
            battleResult,
          );

          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nodeId
                ? updatedDefenderNode
                : n.id === attackerNode.id
                  ? { ...n, garrison: Math.max(20, n.garrison - 10) } // Attacker loses some garrison
                  : n,
            ),
          }));

          const commanderBonusText =
            attackerBonus.attackBonus > 0
              ? ` (Commander bonus: +${Math.floor(attackerBonus.attackBonus)})`
              : "";

          get().addBattleLogEntry(
            "victory",
            `Successfully captured ${gameData.nodeTypes[defenderNode.type].name}!${commanderBonusText}`,
          );

          // Award experience to commanders at the attacking node
          const attackingCommanders = state.commanders.filter(
            (c) => c.assignedNode === attackerNode.id && c.owner === "player",
          );
          if (attackingCommanders.length > 0) {
            set((state) => ({
              commanders: state.commanders.map((c) =>
                attackingCommanders.some((ac) => ac.id === c.id)
                  ? {
                      ...c,
                      experience: c.experience + battleResult.experienceGained,
                    }
                  : c,
              ),
            }));

            get().addBattleLogEntry(
              "info",
              `Commanders gained ${battleResult.experienceGained} experience`,
            );
          }
        } else {
          // Player loses - reduce both garrisons
          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nodeId
                ? { ...n, garrison: Math.max(10, n.garrison - 5) }
                : n.id === attackerNode.id
                  ? { ...n, garrison: Math.max(10, n.garrison - 15) } // Attacker loses more on defeat
                  : n,
            ),
          }));

          const defenderBonusText =
            defenderBonus.defenseBonus > 0
              ? ` Enemy commanders provided +${Math.floor(defenderBonus.defenseBonus)} defense.`
              : "";

          get().addBattleLogEntry(
            "defeat",
            `Attack on ${gameData.nodeTypes[defenderNode.type].name} failed!${defenderBonusText}`,
          );
        }
      },
      canAttackNode: (nodeId) => {
        const state = get();
        if (state.selectedNode === null) return false;

        return gameLogicCanAttackNode(state.nodes, state.selectedNode, nodeId);
      },
      addBattleLogEntry: (type, message) => {
        set((state) => ({
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type,
              message,
            },
          ],
        }));
      },
      resetGame: () => {
        const initialState = getInitialState();

        // Clear localStorage to ensure a true reset
        localStorage.removeItem("ashes-of-aeloria-game-state");

        set(() => ({
          ...initialState,
          battleLog: [
            {
              timestamp: Date.now(),
              type: "info",
              message:
                "Game reset! Welcome to Ashes of Aeloria! Begin your conquest by recruiting commanders and expanding your territory.",
            },
          ],
        }));
      },
      repairMapConnections: () => {
        const state = get();
        const originalMap = generateInitialMap();

        set((state) => ({
          nodes: state.nodes.map((node) => {
            const originalNode = originalMap.find((n) => n.id === node.id);
            if (originalNode) {
              return {
                ...node,
                connections: originalNode.connections, // Restore original connections
              };
            }
            return node;
          }),
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type: "info",
              message: "Map connections repaired!",
            },
          ],
        }));
      },
      initializeMission: (campaignId: string) => {
        // Reset to initial state for new mission
        const initialState = getInitialState();

        // Set campaign-specific modifications based on campaignId
        let missionResources = { ...initialState.resources };
        let missionMessage = `Mission started: ${campaignId}`;

        // Apply campaign-specific starting conditions
        switch (campaignId) {
          case "chapter_1_awakening":
            missionResources = {
              ...missionResources,
              gold: 300,
              supplies: 75,
              mana: 25,
            };
            missionMessage =
              "The Awakening begins! Rally the survivors and reclaim your homeland.";
            break;
          case "chapter_2_reclamation":
            missionResources = {
              ...missionResources,
              gold: 500,
              supplies: 150,
              mana: 75,
              knowledge: 50,
            };
            missionMessage =
              "The Reclamation starts! Use your growing knowledge to expand your territory.";
            break;
          case "chapter_3_alliance":
            missionResources = {
              ...missionResources,
              gold: 750,
              supplies: 200,
              mana: 100,
              knowledge: 100,
              influence: 25,
            };
            missionMessage =
              "Forge alliances! Diplomacy and influence will be key to success.";
            break;
          case "chapter_4_purification":
            missionResources = {
              ...missionResources,
              gold: 1000,
              supplies: 250,
              mana: 150,
              knowledge: 150,
              culture: 50,
              materials: 150,
            };
            missionMessage =
              "The Purification begins! Cleanse the corruption and restore the land.";
            break;
          case "chapter_5_ascension":
            missionResources = {
              ...missionResources,
              gold: 1500,
              supplies: 300,
              mana: 200,
              knowledge: 200,
              culture: 100,
              influence: 75,
              materials: 200,
              artifacts: 5,
            };
            missionMessage =
              "The final Ascension! Use all your power to rebuild Aeloria completely.";
            break;
          default:
            missionMessage = `Started mission: ${campaignId}`;
        }

        set(() => ({
          ...initialState,
          resources: missionResources,
          currentMission: campaignId,
          missionStarted: true,
          battleLog: [
            {
              timestamp: Date.now(),
              type: "info",
              message: missionMessage,
            },
          ],
        }));

        get().addBattleLogEntry(
          "info",
          "Campaign mission initialized! Build your forces and begin your conquest!",
        );
      },
      endMission: () => {
        set((state) => ({
          currentMission: null,
          missionStarted: false,
        }));
      },
    }),
    {
      name: "ashes-of-aeloria-game-state",
      version: 1, // Increment this when making breaking changes to the state structure
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        turn: state.turn,
        phase: state.phase,
        resources: state.resources,
        commanders: state.commanders,
        nodes: state.nodes,
        gameOver: state.gameOver,
        winner: state.winner,
        currentMission: state.currentMission,
        missionStarted: state.missionStarted,
        battleLog: state.battleLog.slice(-20),
        globalTechnologies: state.globalTechnologies,
        worldState: state.worldState,
        factions: state.factions,
        diplomacy: state.diplomacy,
        market: state.market,
        calendar: state.calendar,
        weather: state.weather,
        research: state.research,
        exploration: state.exploration,
        magicalCorruption: state.magicalCorruption,
        populationCenters: state.populationCenters,
        culturalRenaissance: state.culturalRenaissance,
        environmentalRestoration: state.environmentalRestoration,
        achievements: state.achievements,
        statistics: state.statistics,
        victoryProgress: state.victoryProgress,
        legacyData: state.legacyData,
        historicalRecords: state.historicalRecords.slice(-50), // Keep last 50 historical records
      }),
      migrate: (persistedState: any, version: number) => {
        // Handle migration between versions if needed
        if (version === 0) {
          // Migrate from version 0 to 1 - regenerate map connections if corrupted
          if (persistedState.nodes && Array.isArray(persistedState.nodes)) {
            const validMap = generateInitialMap();
            // Preserve node ownership and garrison changes but restore connections
            persistedState.nodes = persistedState.nodes.map((node: any) => {
              const originalNode = validMap.find((n: any) => n.id === node.id);
              return originalNode
                ? {
                    ...originalNode,
                    owner: node.owner || originalNode.owner,
                    garrison: node.garrison || originalNode.garrison,
                    starLevel: node.starLevel || originalNode.starLevel,
                  }
                : node;
            });
          }
        }
        return persistedState;
      },
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && state) {
            // Check if connections are broken and auto-repair
            const originalMap = generateInitialMap();
            let needsRepair = false;

            if (state.nodes) {
              for (const node of state.nodes) {
                const originalNode = originalMap.find((n) => n.id === node.id);
                if (
                  originalNode &&
                  JSON.stringify(node.connections) !==
                    JSON.stringify(originalNode.connections)
                ) {
                  needsRepair = true;
                  break;
                }
              }

              if (needsRepair) {
                // Auto-repair connections
                state.nodes = state.nodes.map((node) => {
                  const originalNode = originalMap.find(
                    (n) => n.id === node.id,
                  );
                  return originalNode
                    ? {
                        ...node,
                        connections: originalNode.connections,
                      }
                    : node;
                });

                // Add a log entry about the repair
                state.battleLog = [
                  ...(state.battleLog || []),
                  {
                    timestamp: Date.now(),
                    type: "info" as const,
                    message:
                      "Map connections automatically repaired after loading saved game.",
                  },
                ];

                console.log(
                  "🔧 Auto-repaired map connections after loading from localStorage",
                );
              } else {
                console.log("✅ Map connections are valid");
              }
            }
          }
        };
      },
    },
  ),
);
