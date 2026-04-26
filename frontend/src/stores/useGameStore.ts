/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
import { create } from 'zustand';
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
} from '../types/game';
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
} from '../utils/gameLogic';
import { gameData, gameConstants } from '../data/gameData';
import { StoryEventSystem } from '../systems/StoryEventSystem';
import { gameApi, type GameActionType } from '../api/gameApi';

export const getInitialState = (): GameState => {
  // Create initial player and enemy commanders
  const initialCommanders = [
    // Player starts with one commander
    createCommander(1, 'knight', 'human', 'player'),
    // Enemy commanders
    createCommander(1000, 'knight', 'orc', 'enemy'),
    createCommander(1001, 'mage', 'orc', 'enemy'),
  ];

  // Assign commanders to their starting nodes
  initialCommanders[0].assignedNode = 1; // Player knight at starting city
  initialCommanders[1].assignedNode = 7; // Enemy city
  initialCommanders[2].assignedNode = 8; // Enemy fortress

  const initialNodes = generateInitialMap();

  return {
    turn: 1,
    phase: 'player',
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
        type: 'info',
        message:
          'Welcome to the world of Ashes of Aeloria! The great civilization has fallen, but from its ashes, you will rebuild. Your journey to restore the world begins now.',
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
  addCommander: (className: CommanderClass, race: Race) => Promise<boolean>;
  assignCommanderToNode: (commanderId: number, nodeId: number) => Promise<boolean>;
  unassignCommander: (commanderId: number) => Promise<void>;
  getNodeCommanderInfo: (nodeId: number) => {
    current: number;
    max: number;
    commanders: any[];
  };
  upgradeNode: (nodeId: number) => Promise<boolean>;
  getUpgradeCost: (nodeId: number) => number;
  canUpgradeNode: (nodeId: number) => boolean;
  updateResources: (resources: Partial<Resources>) => void;
  nextTurn: () => void;
  endTurn: () => Promise<void>;
  processEnemyTurn: () => void;
  collectResources: () => void;
  resetGame: () => Promise<void>;
  repairMapConnections: () => void;
  attackNode: (nodeId: number) => Promise<void>;
  canAttackNode: (nodeId: number) => boolean;
  addBattleLogEntry: (
    type: 'info' | 'combat' | 'victory' | 'defeat' | 'recruitment',
    message: string
  ) => void;
  initializeMission: (campaignId: string) => Promise<void>;
  endMission: () => Promise<void>;

  // World Rebuilding Actions
  constructBuilding: (nodeId: number, buildingType: string) => boolean;
  demolishBuilding: (nodeId: number, buildingId: string) => boolean;
  upgradeBuilding: (nodeId: number, buildingId: string) => boolean;
  managePopulation: (nodeId: number, action: string, amount?: number) => boolean;
  resettlePopulation: (fromNodeId: number, toNodeId: number, amount: number) => boolean;

  // Technology and Research Actions
  startResearch: (technology: Technology) => boolean;
  cancelResearch: (projectId: string) => boolean;
  prioritizeResearch: (projectId: string, priority: number) => void;
  assignResearchers: (projectId: string, researchers: number) => boolean;
  recoverAncientKnowledge: (artifactId: string) => boolean;
  shareKnowledge: (faction: Faction, technology: Technology) => boolean;

  // Exploration and Discovery Actions
  launchExpedition: (target: string, leaderId: number, members: number[]) => boolean;
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
  establishTradeRoute: (fromNodeId: number, toNodeId: number, goods: string[]) => boolean;
  cancelTradeRoute: (routeId: string) => boolean;
  adjustTariffs: (routeId: string, tariff: number) => void;
  investInMarket: (resource: string, amount: number) => boolean;
  buyFromMarket: (resource: string, amount: number) => boolean;
  sellToMarket: (resource: string, amount: number) => boolean;
  recruitMerchant: (nodeId: number, specialization: string[]) => boolean;

  // Environmental Actions
  startRestorationProject: (type: string, nodeId: number) => boolean;
  assignSpecialistsToRestoration: (projectId: string, specialists: number[]) => boolean;
  cleanCorruption: (nodeId: number, method: string) => boolean;
  plantForests: (nodeId: number, area: number) => boolean;
  purifyWater: (nodeId: number) => boolean;
  reintroduceSpecies: (nodeId: number, species: string) => boolean;

  // Cultural Actions
  commissionArtwork: (nodeId: number, artistId: string, type: string) => boolean;
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
  respondToEvent: (eventId: string, choiceId: string) => Promise<void>;
  triggerEvent: (eventType: string, conditions?: any) => boolean;
  processRandomEvents: () => void;
  processSeasonalEvents: () => void;
  processStoryEvents: () => void;

  // Quest Actions
  acceptQuest: (questId: string) => boolean;
  completeQuest: (questId: string) => boolean;
  abandonQuest: (questId: string) => boolean;
  updateQuestProgress: (questId: string, objectiveId: string, progress: number) => void;

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
  generateHistoricalRecord: (type: string, description: string, participants: string[]) => void;
  saveGameState: () => void;
  loadGameState: (saveData: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>()(
    (set, get) => {
      const applyServerAction = async (
        type: GameActionType,
        payload: Record<string, unknown> = {}
      ): Promise<boolean> => {
        try {
          const result = await gameApi.runAction(type, payload);
          set(state => ({ ...state, ...(result.game_state ?? {}) }));
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Backend action failed';
          set(state => ({
            battleLog: [
              ...state.battleLog,
              {
                timestamp: Date.now(),
                type: 'defeat' as const,
                message,
              },
            ].slice(-100),
          }));
          return false;
        }
      };
      const unsupportedAction = (label: string): false => {
        set(state => ({
          battleLog: [
            ...state.battleLog,
            {
              timestamp: Date.now(),
              type: 'defeat' as const,
              message: `${label} is not available until its backend action is implemented.`,
            },
          ].slice(-100),
        }));
        return false;
      };

      return ({
      // Initial state - will be overridden by persisted data if available
      ...getInitialState(),

      // Actions
      selectCommander: id => set({ selectedCommander: id }),
      selectNode: id => set({ selectedNode: id }),

      // World Rebuilding Implementation
      constructBuilding: (nodeId, buildingType) => {
        return unsupportedAction('Building construction');
      },

      demolishBuilding: (nodeId, buildingId) => {
        return unsupportedAction('Building demolition');
      },

      upgradeBuilding: (nodeId, buildingId) => {
        return unsupportedAction('Building upgrades');
      },

      managePopulation: (nodeId, action, amount = 0) => {
        return unsupportedAction('Population management');
      },

      resettlePopulation: (fromNodeId, toNodeId, amount) => {
        return unsupportedAction('Population resettlement');
      },

      // Technology and Research Implementation
      startResearch: technology => {
        void applyServerAction('start_research', { technology });
        return true;
      },

      cancelResearch: projectId => {
        void applyServerAction('cancel_research', { project_id: projectId });
        return true;
      },

      prioritizeResearch: (projectId, priority) => {
        set(state => ({
          research: {
            ...state.research,
            activeProjects: state.research.activeProjects.map(p =>
              p.id === projectId ? { ...p, priority } : p
            ),
          },
        }));
      },

      assignResearchers: (projectId, researchers) => {
        const state = get();
        const project = state.research.activeProjects.find(p => p.id === projectId);
        if (!project) return false;

        // Check if we have enough available researchers
        const totalResearchers = state.research.scholarNetwork.scholars.length;
        const usedResearchers = state.research.activeProjects.reduce(
          (sum, p) => sum + p.researchers,
          0
        );
        const availableResearchers = totalResearchers - usedResearchers + project.researchers;

        if (researchers > availableResearchers) return false;

        set(state => ({
          research: {
            ...state.research,
            activeProjects: state.research.activeProjects.map(p =>
              p.id === projectId ? { ...p, researchers } : p
            ),
          },
        }));

        return true;
      },

      recoverAncientKnowledge: artifactId => unsupportedAction('Ancient knowledge recovery'),

      shareKnowledge: (faction, technology) => unsupportedAction('Knowledge sharing'),

      // Exploration Implementation (placeholder methods)
      launchExpedition: (target, leaderId, members) => unsupportedAction('Expeditions'),
      exploreRuin: (ruinId, explorerId) => unsupportedAction('Ruin exploration'),
      studyArtifact: (artifactId, scholarId) => unsupportedAction('Artifact study'),
      contactHiddenSociety: (societyId, diplomatId) => unsupportedAction('Hidden society contact'),
      investigateMystery: (mysteryId, investigatorId) => unsupportedAction('Mystery investigation'),
      scoutNode: (nodeId, scoutId) => unsupportedAction('Scouting'),

      // Diplomatic Implementation (placeholder methods)
      initiateDiplomacy: (faction, type) => unsupportedAction('Diplomacy'),
      acceptProposal: (negotiationId, proposalId) => unsupportedAction('Proposal acceptance'),
      rejectProposal: (negotiationId, proposalId) => unsupportedAction('Proposal rejection'),
      makeDiplomaticOffer: (faction, terms) => unsupportedAction('Diplomatic offers'),
      declareWar: faction => unsupportedAction('War declarations'),
      seekPeace: faction => unsupportedAction('Peace negotiations'),
      formAlliance: faction => unsupportedAction('Alliances'),
      breakAlliance: faction => unsupportedAction('Alliance breaks'),

      // Economic Implementation (placeholder methods)
      establishTradeRoute: (fromNodeId, toNodeId, goods) => unsupportedAction('Trade routes'),
      cancelTradeRoute: routeId => unsupportedAction('Trade route cancellation'),
      adjustTariffs: (routeId, tariff) => {
        unsupportedAction('Tariff adjustment');
      },
      investInMarket: (resource, amount) => unsupportedAction('Market investment'),
      buyFromMarket: (resource, amount) => unsupportedAction('Market buying'),
      sellToMarket: (resource, amount) => unsupportedAction('Market selling'),
      recruitMerchant: (nodeId, specialization) => unsupportedAction('Merchant recruitment'),

      // Environmental Implementation (placeholder methods)
      startRestorationProject: (type, nodeId) => unsupportedAction('Restoration projects'),
      assignSpecialistsToRestoration: (projectId, specialists) => unsupportedAction('Restoration staffing'),
      cleanCorruption: (nodeId, method) => unsupportedAction('Corruption cleansing'),
      plantForests: (nodeId, area) => unsupportedAction('Forest planting'),
      purifyWater: nodeId => unsupportedAction('Water purification'),
      reintroduceSpecies: (nodeId, species) => unsupportedAction('Species reintroduction'),

      // Cultural Implementation (placeholder methods)
      commissionArtwork: (nodeId, artistId, type) => unsupportedAction('Artwork commissions'),
      organizeFestival: (nodeId, festivalType) => unsupportedAction('Festivals'),
      preserveTradition: traditionId => unsupportedAction('Tradition preservation'),
      promotePhilosophy: (schoolId, nodeId) => unsupportedAction('Philosophy promotion'),
      buildMonument: (nodeId, type) => unsupportedAction('Monument construction'),
      establishLibrary: nodeId => unsupportedAction('Library establishment'),

      // Military Implementation (placeholder methods)
      recruitTroops: (nodeId, type, amount) => unsupportedAction('Troop recruitment'),
      disbandTroops: (commanderId, type, amount) => unsupportedAction('Troop disbanding'),
      trainTroops: (commanderId, trainingType) => unsupportedAction('Troop training'),
      deploySpies: (targetFaction, spyId) => unsupportedAction('Spy deployment'),
      gatherIntelligence: (targetNodeId, agentId) => unsupportedAction('Intelligence gathering'),
      sabotage: (targetNodeId, agentId, target) => unsupportedAction('Sabotage'),

      // Event Implementation (placeholder methods)
      respondToEvent: async (eventId, choiceId) => {
        await applyServerAction('respond_to_event', { event_id: eventId, choice_id: choiceId });
      },
      triggerEvent: (eventType, conditions) => unsupportedAction('Manual event triggering'),
      processRandomEvents: () => {
        unsupportedAction('Random event processing');
      },
      processSeasonalEvents: () => {
        unsupportedAction('Seasonal event processing');
      },
      processStoryEvents: () => {
        unsupportedAction('Story event processing');
      },

      // Quest Implementation (placeholder methods)
      acceptQuest: questId => unsupportedAction('Quest acceptance'),
      completeQuest: questId => unsupportedAction('Quest completion'),
      abandonQuest: questId => unsupportedAction('Quest abandonment'),
      updateQuestProgress: (questId, objectiveId, progress) => {
        unsupportedAction('Quest progress updates');
      },

      // Achievement Implementation
      checkAchievements: () => {
        // Implementation for checking and unlocking achievements
      },

      unlockAchievement: achievementId => unsupportedAction('Achievement unlocking'),

      // Victory Implementation
      checkVictoryConditions: () => {
        // Implementation for checking victory conditions
        return false;
      },

      declareVictory: victoryType => {
        unsupportedAction('Victory declaration');
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
          weatherPattern.effects.forEach(effect => {
            // Process each weather effect
          });
        }
      },

      advanceCalendar: () => {
        unsupportedAction('Calendar advancement');
      },

      updateStatistics: () => {
        // Implementation for updating game statistics
      },

      generateHistoricalRecord: (type, description, participants) => {
        unsupportedAction('Historical record generation');
      },

      saveGameState: () => {
        // Implementation for manual save
      },

      loadGameState: saveData => {
        set(state => ({ ...state, ...saveData }));
      },
      addCommander: (className, race) =>
        applyServerAction('recruit_commander', { class: className, race }),
      assignCommanderToNode: (commanderId, nodeId) =>
        applyServerAction('assign_commander', { commander_id: commanderId, node_id: nodeId }),
      unassignCommander: async commanderId => {
        await applyServerAction('unassign_commander', { commander_id: commanderId });
      },
      getNodeCommanderInfo: nodeId => {
        const state = get();
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return { current: 0, max: 0, commanders: [] };

        const assignedCommanders = state.commanders.filter(c => c.assignedNode === nodeId);
        const maxCapacity = gameConstants.COMMANDER_CAPACITIES[node.type];

        return {
          current: assignedCommanders.length,
          max: maxCapacity,
          commanders: assignedCommanders,
        };
      },
      getUpgradeCost: nodeId => {
        const state = get();
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return 0;

        // Base cost formula: 200 * starLevel * multiplier based on node type
        const baseMultiplier: Partial<Record<NodeType, number>> = {
          city: 1.5,
          fortress: 2.0,
          stronghold: 2.5,
          resource: 1.0,
          shrine: 1.8,
        };

        return Math.floor(200 * node.starLevel * (baseMultiplier[node.type] ?? 1.0));
      },
      canUpgradeNode: nodeId => {
        const state = get();
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return false;
        if (node.owner !== 'player') return false;
        if (node.starLevel >= 5) return false; // Max star level

        const upgradeCost = get().getUpgradeCost(nodeId);
        return state.resources.gold >= upgradeCost;
      },
      upgradeNode: nodeId => applyServerAction('upgrade_node', { node_id: nodeId }),
      updateResources: newResources => {
        unsupportedAction('Direct resource updates');
      },
      nextTurn: () => {
        unsupportedAction('Direct turn advancement');
      },
      endTurn: async () => {
        set({ phase: 'enemy' as const });
        await applyServerAction('end_turn');
      },
      processEnemyTurn: () => {
        unsupportedAction('Direct enemy turn processing');
        return;
        const state = get();

        // 1. Enemy resource collection
        const enemyNodes = state.nodes.filter(n => n.owner === 'enemy');
        let enemyResources = { gold: 0, supplies: 0, mana: 0 };

        enemyNodes.forEach(node => {
          const nodeType = gameData.nodeTypes[node.type];
          enemyResources.gold += nodeType.goldGeneration;
          enemyResources.supplies += nodeType.suppliesGeneration;
          enemyResources.mana += nodeType.manaGeneration;
        });

        get().addBattleLogEntry(
          'info',
          `Enemy collected ${enemyResources.gold} gold, ${enemyResources.supplies} supplies, ${enemyResources.mana} mana`
        );

        // 2. Enemy commander recruitment (if they have few commanders)
        const enemyCommanders = state.commanders.filter(c => c.owner === 'enemy'); // Filter by owner, not race
        if (enemyCommanders.length < 3 && enemyResources.gold >= 150) {
          const commanderClasses: CommanderClass[] = ['knight', 'mage', 'ranger', 'warlord'];
          const randomClass = commanderClasses[Math.floor(Math.random() * commanderClasses.length)];

          const newId = Math.max(0, ...state.commanders.map(c => c.id)) + 1;
          const enemyCommander = createCommander(newId, randomClass, 'orc', 'enemy'); // Specify enemy ownership

          set(state => ({
            commanders: [...state.commanders, enemyCommander],
          }));

          get().addBattleLogEntry('recruitment', `Enemy recruited ${enemyCommander.name}`);
        }

        // 3. Enemy attacks - find potential targets
        const playerNodes = state.nodes.filter(n => n.owner === 'player');
        const attackableTargets = [];

        for (const enemyNode of enemyNodes) {
          for (const connectionId of enemyNode.connections) {
            const targetNode = state.nodes.find(n => n.id === connectionId);
            if (!targetNode) continue;
            const target = targetNode!;
            if (target.owner === 'player' || target.owner === 'neutral') {
              attackableTargets.push({
                attacker: enemyNode,
                target,
                priority: target.owner === 'player' ? 2 : 1, // Prefer player nodes
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
            c => c.assignedNode === attack.attacker.id
          );
          const defenderCommanders = state.commanders.filter(
            c => c.assignedNode === attack.target.id
          );

          // Use the enhanced battle resolution
          const battleResult = resolveBattle(
            attack.attacker,
            attack.target,
            attackerCommanders,
            defenderCommanders
          );

          if (battleResult.victory) {
            // Enemy wins - capture the node
            set(state => ({
              nodes: state.nodes.map(n =>
                n.id === attack.target.id
                  ? {
                      ...n,
                      owner: 'enemy',
                      garrison: Math.floor(attack.attacker.garrison * 0.7), // Reduced garrison after attack
                    }
                  : n.id === attack.attacker.id
                    ? {
                        ...n,
                        garrison: Math.floor(n.garrison * 0.8), // Attacker also loses some garrison
                      }
                    : n
              ),
            }));

            get().addBattleLogEntry(
              'defeat',
              `Enemy captured ${gameData.nodeTypes[attack.target.type].name} from ${attack.target.owner === 'player' ? 'player' : 'neutral'} forces!`
            );
          } else {
            // Enemy loses - reduce both garrisons
            set(state => ({
              nodes: state.nodes.map(n =>
                n.id === attack.target.id
                  ? { ...n, garrison: Math.floor(n.garrison * 0.9) }
                  : n.id === attack.attacker.id
                    ? { ...n, garrison: Math.floor(n.garrison * 0.7) }
                    : n
              ),
            }));

            get().addBattleLogEntry(
              'victory',
              `Player forces successfully defended ${gameData.nodeTypes[attack.target.type].name} from enemy attack!`
            );
          }

          attacksExecuted++;
        }

        if (attacksExecuted === 0) {
          get().addBattleLogEntry('info', 'Enemy consolidated their forces this turn');
        }

        // 5. Enemy garrison reinforcement
        set(state => ({
          nodes: state.nodes.map(node => {
            if (node.owner === 'enemy') {
              // Enemy gets slightly less reinforcement than player
              const reinforcementsByType: Partial<Record<NodeType, number>> = {
                city: 12,
                fortress: 8,
                stronghold: 16,
                resource: 6,
                shrine: 4,
              };
              const baseReinforcement = reinforcementsByType[node.type] ?? 4;

              const reinforcement = Math.floor(baseReinforcement * node.starLevel);
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
        const upgradeableEnemyNodes = enemyNodes.filter(n => n.starLevel < 5);
        if (upgradeableEnemyNodes.length > 0 && enemyResources.gold >= 400) {
          const nodeToUpgrade = upgradeableEnemyNodes[0]; // Upgrade first available
          set(state => ({
            nodes: state.nodes.map(n =>
              n.id === nodeToUpgrade.id
                ? {
                    ...n,
                    starLevel: n.starLevel + 1,
                    garrison: n.garrison + 30,
                  }
                : n
            ),
          }));

          get().addBattleLogEntry(
            'info',
            `Enemy upgraded their ${gameData.nodeTypes[nodeToUpgrade.type].name} to ${nodeToUpgrade.starLevel + 1} stars`
          );
        }

        // 7. End enemy turn and start player turn
        setTimeout(() => {
          get().collectResources();
          get().nextTurn();
        }, 1000);
      },
      collectResources: () => {
        unsupportedAction('Direct resource collection');
        return;
        const state = get();
        const income = calculateIncome(state.nodes);

        set(state => ({
          resources: {
            ...state.resources,
            gold: state.resources.gold + income.gold,
            supplies: state.resources.supplies + income.supplies,
            mana: state.resources.mana + income.mana,
          },
          // Reinforce player garrisons each turn
          nodes: state.nodes.map(node => {
            if (node.owner === 'player') {
              // Add garrison reinforcement based on node type and star level
              const reinforcementsByType: Partial<Record<NodeType, number>> = {
                city: 15,
                fortress: 10,
                stronghold: 20,
                resource: 8,
                shrine: 5,
              };
              const baseReinforcement = reinforcementsByType[node.type] ?? 5;

              const reinforcement = Math.floor(baseReinforcement * node.starLevel);
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
          'info',
          `Turn ${state.turn + 1}: Collected ${income.gold} gold, ${income.supplies} supplies, ${income.mana} mana. Garrisons reinforced!`
        );
      },
      attackNode: async nodeId => {
        await applyServerAction('attack_node', {
          node_id: nodeId,
          attacker_node_id: get().selectedNode,
        });
      },
      canAttackNode: nodeId => {
        const state = get();
        if (state.selectedNode === null) return false;

        return gameLogicCanAttackNode(state.nodes, state.selectedNode, nodeId);
      },
      addBattleLogEntry: (type, message) => {
        set(state => ({
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
      resetGame: async () => {
        localStorage.removeItem('ashes-of-aeloria-game-state');
        await applyServerAction('reset_game');
      },
      repairMapConnections: () => {
        const state = get();
        const originalMap = generateInitialMap();

        set(state => ({
          nodes: state.nodes.map(node => {
            const originalNode = originalMap.find(n => n.id === node.id);
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
              type: 'info',
              message: 'Map connections repaired!',
            },
          ],
        }));
      },
      initializeMission: async (campaignId: string) => {
        await applyServerAction('start_mission', { mission_id: campaignId });
      },
      endMission: async () => {
        await applyServerAction('return_to_mission_select');
      },
    });
  }
);
