/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * Automated Gameplay Testing Framework
 * Tests game balance by running AI vs AI simulations
 */

import {
  AIPlayer,
  aiStrategies,
  type AIStrategy,
  type GameTestResult,
  type AIDecision,
} from "./AIPlayer";
import type { GameState, Resources } from "../types/game.d";
import {
  generateInitialMap,
  createCommander,
  calculateIncome,
  resolveBattle,
  calculateEffectiveGarrison,
} from "../utils/gameLogic";
import { gameData } from "../data/gameData";

export interface TestConfiguration {
  maxTurns: number;
  iterations: number;
  playerStrategy: AIStrategy;
  enemyStrategy?: AIStrategy; // If not provided, uses existing enemy AI
  campaignId?: string;
  logLevel: "minimal" | "detailed" | "verbose";
}

export interface BalanceReport {
  totalGames: number;
  playerWins: number;
  enemyWins: number;
  draws: number;
  averageTurns: number;
  winRateByStrategy: Record<string, number>;
  commonBalanceIssues: string[];
  recommendations: string[];
  detailedResults: GameTestResult[];
}

export class GameplayTester {
  private results: GameTestResult[] = [];
  private balanceIssues: Set<string> = new Set();

  constructor() {}

  /**
   * Run automated gameplay tests
   */
  async runTests(config: TestConfiguration): Promise<BalanceReport> {
    console.log(
      `🤖 Starting gameplay tests: ${config.iterations} iterations with ${config.playerStrategy.name} strategy`,
    );

    this.results = [];
    this.balanceIssues.clear();

    const promises = [];
    for (let i = 0; i < config.iterations; i++) {
      promises.push(this.runSingleGame(config, i));
    }

    // Run tests in batches to avoid overwhelming the browser
    const batchSize = 10;
    for (let i = 0; i < promises.length; i += batchSize) {
      const batch = promises.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch);
      this.results.push(...batchResults);

      // Progress update
      console.log(
        `📊 Completed ${Math.min(i + batchSize, promises.length)}/${promises.length} tests`,
      );

      // Small delay to prevent UI blocking
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    return this.generateBalanceReport(config);
  }

  /**
   * Run a single game simulation
   */
  private async runSingleGame(
    config: TestConfiguration,
    gameIndex: number,
  ): Promise<GameTestResult> {
    // Initialize game state
    let gameState = this.initializeGameState(config.campaignId);

    // Create AI players
    const playerAI = new AIPlayer(config.playerStrategy);

    const decisions: AIDecision[] = [];
    let turn = 0;
    let winner: "player" | "enemy" | "draw" = "draw";

    if (config.logLevel === "verbose") {
      console.log(
        `🎮 Starting game ${gameIndex + 1} - Player: ${config.playerStrategy.name}`,
      );

      // Log initial state
      const playerNodes = gameState.nodes.filter(
        (n) => n.owner === "player",
      ).length;
      const enemyNodes = gameState.nodes.filter(
        (n) => n.owner === "enemy",
      ).length;
      const neutralNodes = gameState.nodes.filter(
        (n) => n.owner === "neutral",
      ).length;
      console.log(
        `Initial state: Player: ${playerNodes}, Enemy: ${enemyNodes}, Neutral: ${neutralNodes}`,
      );
    }

    // Game loop
    while (turn < config.maxTurns) {
      turn++;
      gameState.turn = turn;

      // Player turn (AI)
      if (gameState.phase === "player") {
        gameState = await this.executePlayerTurn(
          gameState,
          playerAI,
          decisions,
          config.logLevel,
        );
      }

      // Enemy turn (existing AI)
      if (gameState.phase === "enemy") {
        gameState = await this.executeEnemyTurn(gameState, config.logLevel);
      }

      // Check victory conditions
      const victoryCheck = this.checkVictoryConditions(gameState);
      if (victoryCheck !== "ongoing") {
        winner = victoryCheck;
        break;
      }

      // Resource collection and turn progression
      gameState = this.progressTurn(gameState);

      // Early exit if game becomes unwinnable
      if (this.isGameStalemate(gameState, turn)) {
        winner = "draw";
        break;
      }
    }

    // Analyze final state for balance issues
    const balanceIssues = this.analyzeForBalanceIssues(
      gameState,
      turn,
      decisions,
    );

    const result: GameTestResult = {
      winner,
      turns: turn,
      finalState: {
        playerNodes: gameState.nodes.filter((n) => n.owner === "player").length,
        enemyNodes: gameState.nodes.filter((n) => n.owner === "enemy").length,
        playerResources: { ...gameState.resources },
        enemyResources: this.estimateEnemyResources(gameState),
        playerCommanders: gameState.commanders.filter(
          (c) => c.owner === "player",
        ).length,
        enemyCommanders: gameState.commanders.filter((c) => c.owner === "enemy")
          .length,
      },
      strategy: config.playerStrategy,
      decisions,
      balanceIssues,
    };

    if (config.logLevel !== "minimal") {
      console.log(
        `🏁 Game ${gameIndex + 1} finished: ${winner} wins in ${turn} turns`,
      );
    }

    return result;
  }

  /**
   * Generate a balanced test map with equal starting positions
   */
  private generateBalancedTestMap(): any[] {
    return [
      // Player starting territory
      {
        id: 1,
        type: "city",
        x: 200,
        y: 300,
        owner: "player",
        starLevel: 1,
        garrison: 100,
        connections: [2, 3, 5],
      },
      {
        id: 2,
        type: "resource",
        x: 300,
        y: 200,
        owner: "player",
        starLevel: 1,
        garrison: 75,
        connections: [1, 4, 5],
      },

      // Neutral territory (contested)
      {
        id: 3,
        type: "resource",
        x: 200,
        y: 400,
        owner: "neutral",
        starLevel: 1,
        garrison: 60,
        connections: [1, 6],
      },
      {
        id: 4,
        type: "fortress",
        x: 400,
        y: 150,
        owner: "neutral",
        starLevel: 2,
        garrison: 120,
        connections: [2, 5, 7],
      },
      {
        id: 5,
        type: "shrine",
        x: 400,
        y: 300,
        owner: "neutral",
        starLevel: 1,
        garrison: 80,
        connections: [1, 2, 4, 6, 7, 8],
      },
      {
        id: 6,
        type: "resource",
        x: 200,
        y: 500,
        owner: "neutral",
        starLevel: 1,
        garrison: 60,
        connections: [3, 5, 8],
      },

      // Enemy starting territory (equal to player)
      {
        id: 7,
        type: "city",
        x: 600,
        y: 300,
        owner: "enemy",
        starLevel: 1,
        garrison: 100,
        connections: [4, 5, 8],
      },
      {
        id: 8,
        type: "resource",
        x: 500,
        y: 400,
        owner: "enemy",
        starLevel: 1,
        garrison: 75,
        connections: [5, 6, 7],
      },
    ].map((node) => ({
      ...node,
      name: `${node.type} ${node.id}`,
      description: `A ${node.type} in the realm`,
      population: node.type === "city" ? 1000 : 500,
      buildings: [],
      technologies: [],
      environmentState: "stable" as const,
      corruption: 0,
      culturalInfluence: {},
      economicData: {
        tradeRoutes: [],
        marketPrices: {},
        resourceStorage: {},
      },
      buildQueue: [],
      events: [],
      specialProperties: {},
    }));
  }

  /**
   * Initialize game state for testing
   */
  private initializeGameState(campaignId?: string): GameState {
    // Create more balanced initial map for testing
    const initialNodes = this.generateBalancedTestMap();

    // Create initial commanders
    const initialCommanders = [
      createCommander(1, "knight", "human", "player"),
      createCommander(1000, "knight", "orc", "enemy"),
    ];

    // Assign commanders to starting positions
    initialCommanders[0].assignedNode = 1; // Player starts at city
    initialCommanders[1].assignedNode = 7; // Enemy city

    // Set campaign-specific resources if specified
    let resources: Resources = {
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
    };

    if (campaignId) {
      // Apply campaign-specific starting conditions
      switch (campaignId) {
        case "chapter_1_awakening":
          resources = { ...resources, gold: 300, supplies: 75, mana: 25 };
          break;
        case "chapter_2_reclamation":
          resources = {
            ...resources,
            gold: 500,
            supplies: 150,
            mana: 75,
            knowledge: 50,
          };
          break;
        // Add other campaigns as needed
      }
    }

    return {
      turn: 1,
      phase: "player",
      resources,
      commanders: initialCommanders,
      nodes: initialNodes,
      selectedNode: null,
      selectedCommander: null,
      gameOver: false,
      winner: null,
      currentMission: campaignId || null,
      missionStarted: !!campaignId,
      battleLog: [],
      globalTechnologies: [],
      // Add other required state properties with default values
      worldState: {} as any,
      factions: [],
      diplomacy: {} as any,
      market: {} as any,
      calendar: {} as any,
      weather: {} as any,
      events: [],
      eventQueue: [],
      narrativeState: {} as any,
      achievements: [],
      statistics: {} as any,
      victoryProgress: {} as any,
      legacyData: {} as any,
      historicalRecords: [],
      culturalMovements: [],
      economicCycles: [],
      research: {} as any,
      exploration: {} as any,
      magicalCorruption: {} as any,
      populationCenters: [],
      tradeNetworks: {} as any,
      politicalSituation: {} as any,
      militaryIntelligence: {} as any,
      culturalRenaissance: {} as any,
      environmentalRestoration: {} as any,
    };
  }

  /**
   * Execute AI player turn
   */
  private async executePlayerTurn(
    gameState: GameState,
    playerAI: AIPlayer,
    decisions: AIDecision[],
    logLevel: string,
  ): Promise<GameState> {
    const aiDecisions = playerAI.analyzeGameState(gameState);

    // Execute top decisions (more aggressive execution)
    let actionsThisTurn = 0;
    const maxActions = Math.min(5, aiDecisions.length); // Up to 5 actions per turn

    for (const decision of aiDecisions) {
      if (actionsThisTurn >= maxActions) break;

      const previousState = JSON.stringify(
        gameState.nodes.map((n) => ({ id: n.id, owner: n.owner })),
      );
      gameState = this.executeDecision(gameState, decision, logLevel);
      const newState = JSON.stringify(
        gameState.nodes.map((n) => ({ id: n.id, owner: n.owner })),
      );

      decisions.push(decision);
      actionsThisTurn++;

      // If the decision actually changed the game state, log it
      if (previousState !== newState && logLevel === "verbose") {
        console.log(`🎯 Executed: ${decision.type} - ${decision.reasoning}`);
      }
    }

    gameState.phase = "enemy";
    return gameState;
  }

  /**
   * Execute enemy turn (improved AI)
   */
  private async executeEnemyTurn(
    gameState: GameState,
    logLevel: string,
  ): Promise<GameState> {
    const enemyNodes = gameState.nodes.filter((n) => n.owner === "enemy");
    const playerNodes = gameState.nodes.filter((n) => n.owner === "player");
    const neutralNodes = gameState.nodes.filter((n) => n.owner === "neutral");

    // Enemy recruitment (limited and costly)
    const enemyCommanders = gameState.commanders.filter(
      (c) => c.owner === "enemy",
    );
    const maxEnemyCommanders = Math.floor(enemyNodes.length * 1.2); // Slightly fewer than player

    if (enemyCommanders.length < maxEnemyCommanders) {
      const commanderClasses = ["knight", "mage", "ranger", "warlord"] as const;
      const randomClass =
        commanderClasses[Math.floor(Math.random() * commanderClasses.length)];

      // Enemy has limited "budget" - gets harder to recruit as game goes on
      const recruitmentCost = gameData.commanderClasses[randomClass].cost;
      const enemyIncome = calculateIncome(enemyNodes);
      const canAfford = enemyIncome.gold * gameState.turn > recruitmentCost * 2; // Simplified budget check

      if (canAfford) {
        const newId = Math.max(0, ...gameState.commanders.map((c) => c.id)) + 1;
        const enemyCommander = createCommander(
          newId,
          randomClass,
          "orc",
          "enemy",
        );

        gameState.commanders.push(enemyCommander);

        if (logLevel === "verbose") {
          console.log(
            `👹 Enemy recruited ${enemyCommander.name} (${randomClass})`,
          );
        }
      } else if (logLevel === "verbose") {
        console.log(
          `👹 Enemy cannot afford to recruit ${randomClass} (${recruitmentCost} cost)`,
        );
      }
    }

    // Find all potential targets (player and neutral nodes)
    const allTargets = [...playerNodes, ...neutralNodes];
    const attackOpportunities: Array<{
      attacker: any;
      target: any;
      strength: number;
      defenderStrength: number;
      advantage: number;
    }> = [];

    // Evaluate all attack opportunities
    for (const enemyNode of enemyNodes) {
      const enemyCommanders = gameState.commanders.filter(
        (c) => c.owner === "enemy" && c.assignedNode === enemyNode.id,
      );

      const enemyStrength =
        enemyNode.garrison +
        enemyCommanders.reduce(
          (sum, cmd) => sum + (cmd.attack + cmd.defense) * 0.3,
          0,
        );

      for (const connectionId of enemyNode.connections) {
        const targetNode = allTargets.find((n) => n.id === connectionId);
        if (targetNode) {
          const targetCommanders = gameState.commanders.filter(
            (c) =>
              c.owner === targetNode.owner && c.assignedNode === targetNode.id,
          );

          const defenderStrength =
            targetNode.garrison +
            targetCommanders.reduce(
              (sum, cmd) => sum + (cmd.attack + cmd.defense) * 0.3,
              0,
            );

          const advantage = enemyStrength / Math.max(defenderStrength, 1);

          // Enemy requires advantage but not as much as player
          if (advantage > 1.3) {
            attackOpportunities.push({
              attacker: enemyNode,
              target: targetNode,
              strength: enemyStrength,
              defenderStrength,
              advantage,
            });
          }
        }
      }
    }

    // Sort by advantage and attack the best opportunity
    attackOpportunities.sort((a, b) => b.advantage - a.advantage);

    if (attackOpportunities.length > 0) {
      const bestAttack = attackOpportunities[0];
      const victory = bestAttack.strength > bestAttack.defenderStrength * 1.4; // Harder for enemy too

      if (victory) {
        // Enemy captures the node
        const nodeIndex = gameState.nodes.findIndex(
          (n) => n.id === bestAttack.target.id,
        );
        if (nodeIndex !== -1) {
          gameState.nodes[nodeIndex] = {
            ...bestAttack.target,
            owner: "enemy",
            garrison: Math.max(
              10,
              Math.floor(bestAttack.attacker.garrison * 0.6),
            ),
          };

          // Reduce attacker's garrison
          const attackerIndex = gameState.nodes.findIndex(
            (n) => n.id === bestAttack.attacker.id,
          );
          if (attackerIndex !== -1) {
            gameState.nodes[attackerIndex] = {
              ...bestAttack.attacker,
              garrison: Math.max(
                10,
                Math.floor(bestAttack.attacker.garrison * 0.8),
              ),
            };
          }
        }

        if (logLevel === "verbose") {
          console.log(
            `👹 Enemy captured ${gameData.nodeTypes[bestAttack.target.type].name} (${bestAttack.strength} vs ${bestAttack.defenderStrength})`,
          );
        }
      } else {
        // Failed attack, reduce garrisons
        const nodeIndex = gameState.nodes.findIndex(
          (n) => n.id === bestAttack.target.id,
        );
        const attackerIndex = gameState.nodes.findIndex(
          (n) => n.id === bestAttack.attacker.id,
        );

        if (nodeIndex !== -1) {
          gameState.nodes[nodeIndex] = {
            ...bestAttack.target,
            garrison: Math.max(5, Math.floor(bestAttack.target.garrison * 0.9)),
          };
        }

        if (attackerIndex !== -1) {
          gameState.nodes[attackerIndex] = {
            ...bestAttack.attacker,
            garrison: Math.max(
              5,
              Math.floor(bestAttack.attacker.garrison * 0.8),
            ),
          };
        }

        if (logLevel === "verbose") {
          console.log(
            `👹 Enemy failed to capture ${gameData.nodeTypes[bestAttack.target.type].name}`,
          );
        }
      }
    }

    gameState.phase = "player";
    return gameState;
  }

  /**
   * Execute a specific AI decision
   */
  private executeDecision(
    gameState: GameState,
    decision: AIDecision,
    logLevel: string,
  ): GameState {
    try {
      switch (decision.type) {
        case "recruit":
          if (decision.commanderClass) {
            const commanderClasses = [
              "knight",
              "mage",
              "ranger",
              "warlord",
            ] as const;
            const validClass = commanderClasses.includes(
              decision.commanderClass as any,
            )
              ? (decision.commanderClass as any)
              : "knight";

            // Get actual cost from game data
            const commanderCost = gameData.commanderClasses[validClass].cost;
            const playerCommanders = gameState.commanders.filter(
              (c) => c.owner === "player",
            );
            const playerNodes = gameState.nodes.filter(
              (n) => n.owner === "player",
            );

            // Limit commanders to 1.5x number of nodes (prevents spam)
            const maxCommanders = Math.floor(playerNodes.length * 1.5);

            if (
              gameState.resources.gold >= commanderCost &&
              playerCommanders.length < maxCommanders
            ) {
              const newId =
                Math.max(0, ...gameState.commanders.map((c) => c.id)) + 1;
              const newCommander = createCommander(
                newId,
                validClass,
                "human",
                "player",
              );

              gameState.commanders.push(newCommander);
              gameState.resources.gold -= commanderCost;

              if (logLevel === "verbose") {
                console.log(
                  `🛡️ Recruited ${newCommander.name} (${validClass}) for ${commanderCost} gold`,
                );
              }
            } else if (logLevel === "verbose") {
              if (gameState.resources.gold < commanderCost) {
                console.log(
                  `❌ Cannot recruit ${validClass}: need ${commanderCost} gold, have ${gameState.resources.gold}`,
                );
              } else {
                console.log(
                  `❌ Cannot recruit ${validClass}: at commander limit ${playerCommanders.length}/${maxCommanders}`,
                );
              }
            }
          }
          break;

        case "attack":
          if (decision.target) {
            gameState = this.executeAttack(
              gameState,
              decision.target,
              logLevel,
            );
          }
          break;

        case "upgrade":
          if (decision.target) {
            const node = gameState.nodes.find((n) => n.id === decision.target);
            if (node && node.owner === "player" && node.starLevel < 5) {
              const cost = this.calculateUpgradeCost(node);
              if (gameState.resources.gold >= cost) {
                const nodeIndex = gameState.nodes.findIndex(
                  (n) => n.id === decision.target,
                );
                if (nodeIndex !== -1) {
                  gameState.nodes[nodeIndex] = {
                    ...node,
                    starLevel: node.starLevel + 1,
                    garrison: node.garrison + 25,
                  };
                  gameState.resources.gold -= cost;

                  if (logLevel === "verbose") {
                    console.log(
                      `⭐ Upgraded ${gameData.nodeTypes[node.type].name} to ${node.starLevel + 1} stars`,
                    );
                  }
                }
              }
            }
          }
          break;

        case "assign":
          if (decision.target && decision.commanderId) {
            const commander = gameState.commanders.find(
              (c) => c.id === decision.commanderId,
            );
            if (commander && !commander.assignedNode) {
              const commanderIndex = gameState.commanders.findIndex(
                (c) => c.id === decision.commanderId,
              );
              if (commanderIndex !== -1) {
                gameState.commanders[commanderIndex] = {
                  ...commander,
                  assignedNode: decision.target,
                };

                if (logLevel === "verbose") {
                  console.log(
                    `📍 Assigned ${commander.name} to node ${decision.target}`,
                  );
                }
              }
            }
          }
          break;
      }
    } catch (error) {
      console.error(`❌ Error executing decision:`, decision, error);
    }

    return gameState;
  }

  /**
   * Execute attack decision
   */
  private executeAttack(
    gameState: GameState,
    targetNodeId: number,
    logLevel: string,
  ): GameState {
    const targetNode = gameState.nodes.find((n) => n.id === targetNodeId);
    if (!targetNode) {
      console.log(`❌ Attack failed: Target node ${targetNodeId} not found`);
      return gameState;
    }

    // Find all possible attacking nodes
    const playerNodes = gameState.nodes.filter(
      (n) => n.owner === "player" && n.connections.includes(targetNodeId),
    );

    if (playerNodes.length === 0) {
      console.log(
        `❌ Attack failed: No adjacent player nodes to attack ${targetNodeId}`,
      );
      return gameState;
    }

    let bestAttacker: any = null;
    let bestStrength = 0;

    for (const attackerNode of playerNodes) {
      const attackerCommanders = gameState.commanders.filter(
        (c) => c.owner === "player" && c.assignedNode === attackerNode.id,
      );

      // Use base garrison + reduced commander bonuses (commanders are support, not overpowered)
      const baseStrength = attackerNode.garrison;
      const commanderBonus = attackerCommanders.reduce(
        (sum, cmd) => sum + (cmd.attack + cmd.defense) * 0.3,
        0,
      ); // 30% of full stats
      const totalStrength = baseStrength + commanderBonus;

      if (totalStrength > bestStrength) {
        bestStrength = totalStrength;
        bestAttacker = {
          node: attackerNode,
          commanders: attackerCommanders,
          strength: totalStrength,
        };
      }
    }

    if (bestAttacker) {
      const defenderCommanders = gameState.commanders.filter(
        (c) => c.owner === targetNode.owner && c.assignedNode === targetNode.id,
      );

      // Calculate defender strength (same 30% commander effectiveness as attackers)
      const defenderStrength =
        targetNode.garrison +
        defenderCommanders.reduce(
          (sum, cmd) => sum + (cmd.attack + cmd.defense) * 0.3,
          0,
        );

      // Require significant advantage to win: attacker needs 1.5x advantage
      const victory = bestAttacker.strength > defenderStrength * 1.5;

      if (victory) {
        // Player captures the node
        const nodeIndex = gameState.nodes.findIndex(
          (n) => n.id === targetNodeId,
        );
        if (nodeIndex !== -1) {
          gameState.nodes[nodeIndex] = {
            ...targetNode,
            owner: "player",
            garrison: Math.max(
              10,
              Math.floor(bestAttacker.node.garrison * 0.6),
            ), // Reduced garrison after attack
          };

          // Reduce attacker's garrison too
          const attackerIndex = gameState.nodes.findIndex(
            (n) => n.id === bestAttacker.node.id,
          );
          if (attackerIndex !== -1) {
            gameState.nodes[attackerIndex] = {
              ...bestAttacker.node,
              garrison: Math.max(
                10,
                Math.floor(bestAttacker.node.garrison * 0.8),
              ),
            };
          }
        }

        if (logLevel === "verbose") {
          console.log(
            `⚔️ Player captured ${gameData.nodeTypes[targetNode.type].name} (${bestAttacker.strength} vs ${defenderStrength})`,
          );
        }
      } else {
        // Attack failed, reduce both garrisons slightly
        const nodeIndex = gameState.nodes.findIndex(
          (n) => n.id === targetNodeId,
        );
        const attackerIndex = gameState.nodes.findIndex(
          (n) => n.id === bestAttacker.node.id,
        );

        if (nodeIndex !== -1) {
          gameState.nodes[nodeIndex] = {
            ...targetNode,
            garrison: Math.max(5, Math.floor(targetNode.garrison * 0.9)),
          };
        }

        if (attackerIndex !== -1) {
          gameState.nodes[attackerIndex] = {
            ...bestAttacker.node,
            garrison: Math.max(5, Math.floor(bestAttacker.node.garrison * 0.8)),
          };
        }

        if (logLevel === "verbose") {
          console.log(
            `❌ Failed to capture ${gameData.nodeTypes[targetNode.type].name} (${bestAttacker.strength} vs ${defenderStrength})`,
          );
        }
      }
    }

    return gameState;
  }

  /**
   * Calculate upgrade cost for a node
   */
  private calculateUpgradeCost(node: any): number {
    const baseMultiplier = {
      city: 1.5,
      fortress: 2.0,
      stronghold: 2.5,
      resource: 1.0,
      shrine: 1.8,
    };
    return Math.floor(
      200 * node.starLevel * (baseMultiplier[node.type] || 1.0),
    );
  }

  /**
   * Progress to next turn
   */
  private progressTurn(gameState: GameState): GameState {
    // Collect resources
    const playerNodes = gameState.nodes.filter((n) => n.owner === "player");
    const income = calculateIncome(playerNodes);

    gameState.resources.gold += income.gold;
    gameState.resources.supplies += income.supplies;
    gameState.resources.mana += income.mana;

    // Reinforce garrisons (both player and enemy)
    gameState.nodes = gameState.nodes.map((node) => {
      if (node.owner === "player" || node.owner === "enemy") {
        const baseReinforcement =
          {
            city: 20,
            fortress: 15,
            stronghold: 25,
            resource: 12,
            shrine: 8,
          }[node.type] || 8;

        const reinforcement = Math.floor(baseReinforcement * node.starLevel);
        const maxGarrison = 300 + node.starLevel * 75; // Higher max garrison

        return {
          ...node,
          garrison: Math.min(node.garrison + reinforcement, maxGarrison),
        };
      }
      return node;
    });

    return gameState;
  }

  /**
   * Check victory conditions
   */
  private checkVictoryConditions(
    gameState: GameState,
  ): "player" | "enemy" | "draw" | "ongoing" {
    const playerNodes = gameState.nodes.filter(
      (n) => n.owner === "player",
    ).length;
    const enemyNodes = gameState.nodes.filter(
      (n) => n.owner === "enemy",
    ).length;
    const neutralNodes = gameState.nodes.filter(
      (n) => n.owner === "neutral",
    ).length;
    const totalNodes = gameState.nodes.length;

    // Debug logging
    if (gameState.turn % 10 === 0) {
      console.log(
        `Turn ${gameState.turn}: Player: ${playerNodes}, Enemy: ${enemyNodes}, Neutral: ${neutralNodes}`,
      );
    }

    // Elimination victory (more decisive)
    if (enemyNodes === 0 && playerNodes > 0) return "player";
    if (playerNodes === 0 && enemyNodes > 0) return "enemy";

    // Territorial victory (control 60% of map, lowered threshold)
    if (playerNodes >= totalNodes * 0.6) return "player";
    if (enemyNodes >= totalNodes * 0.6) return "enemy";

    // Significant advantage victory (control 2x more than opponent)
    if (playerNodes >= enemyNodes * 3 && playerNodes >= 5) return "player";
    if (enemyNodes >= playerNodes * 3 && enemyNodes >= 5) return "enemy";

    return "ongoing";
  }

  /**
   * Check if game is in stalemate
   */
  private isGameStalemate(gameState: GameState, turn: number): boolean {
    // Only consider stalemate after a significant number of turns
    if (turn < 150) return false;

    const playerNodes = gameState.nodes.filter(
      (n) => n.owner === "player",
    ).length;
    const enemyNodes = gameState.nodes.filter(
      (n) => n.owner === "enemy",
    ).length;

    // If both sides have similar territory and it's been a long game, it's likely a stalemate
    const territoryDifference = Math.abs(playerNodes - enemyNodes);
    const isBalanced = territoryDifference <= 2;
    const isLongGame = turn > 200;

    if (isLongGame && isBalanced) {
      console.log(
        `Stalemate detected at turn ${turn}: Player ${playerNodes} vs Enemy ${enemyNodes}`,
      );
      return true;
    }

    return false;
  }

  /**
   * Estimate enemy resources (since enemy AI doesn't track them explicitly)
   */
  private estimateEnemyResources(gameState: GameState): Resources {
    const enemyNodes = gameState.nodes.filter((n) => n.owner === "enemy");
    const income = calculateIncome(enemyNodes);

    // Rough estimate based on income and turns
    return {
      gold: income.gold * gameState.turn * 0.8,
      supplies: income.supplies * gameState.turn * 0.8,
      mana: income.mana * gameState.turn * 0.8,
      knowledge: 0,
      culture: 0,
      influence: 0,
      materials: 0,
      food: 0,
      energy: 0,
      artifacts: 0,
    };
  }

  /**
   * Analyze game for balance issues
   */
  private analyzeForBalanceIssues(
    gameState: GameState,
    turns: number,
    decisions: AIDecision[],
  ): string[] {
    const issues: string[] = [];

    const playerNodes = gameState.nodes.filter(
      (n) => n.owner === "player",
    ).length;
    const enemyNodes = gameState.nodes.filter(
      (n) => n.owner === "enemy",
    ).length;

    // Check for resource imbalances
    if (gameState.resources.gold > 10000) {
      issues.push("Excessive gold accumulation - economy may be too generous");
    }

    // Check for military imbalances
    const playerCommanders = gameState.commanders.filter(
      (c) => c.owner === "player",
    ).length;
    const enemyCommanders = gameState.commanders.filter(
      (c) => c.owner === "enemy",
    ).length;

    if (playerCommanders > enemyCommanders * 3) {
      issues.push(
        "Player military advantage too large - recruitment costs may be too low",
      );
    }

    // Check for territory stagnation
    if (turns > 50 && Math.abs(playerNodes - enemyNodes) < 2) {
      issues.push(
        "Territory stagnation - attack/defense balance may need adjustment",
      );
    }

    // Check for one-sided games
    if (playerNodes > enemyNodes * 3 || enemyNodes > playerNodes * 3) {
      issues.push("Highly unbalanced territorial control");
    }

    return issues;
  }

  /**
   * Generate comprehensive balance report
   */
  private generateBalanceReport(config: TestConfiguration): BalanceReport {
    const totalGames = this.results.length;
    const playerWins = this.results.filter((r) => r.winner === "player").length;
    const enemyWins = this.results.filter((r) => r.winner === "enemy").length;
    const draws = this.results.filter((r) => r.winner === "draw").length;

    const averageTurns =
      this.results.reduce((sum, r) => sum + r.turns, 0) / totalGames;

    // Collect all balance issues
    const allIssues = this.results.flatMap((r) => r.balanceIssues);
    const issueFrequency = allIssues.reduce(
      (acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const commonBalanceIssues = Object.entries(issueFrequency)
      .filter(([_, count]) => count >= totalGames * 0.2) // Issues in 20%+ of games
      .map(([issue, count]) => `${issue} (${count}/${totalGames} games)`)
      .sort((a, b) => b.localeCompare(a));

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      playerWins,
      enemyWins,
      totalGames,
      commonBalanceIssues,
    );

    return {
      totalGames,
      playerWins,
      enemyWins,
      draws,
      averageTurns,
      winRateByStrategy: {
        [config.playerStrategy.name]: playerWins / totalGames,
      },
      commonBalanceIssues,
      recommendations,
      detailedResults: this.results,
    };
  }

  /**
   * Generate balance recommendations
   */
  private generateRecommendations(
    playerWins: number,
    enemyWins: number,
    totalGames: number,
    issues: string[],
  ): string[] {
    const recommendations: string[] = [];
    const playerWinRate = playerWins / totalGames;

    if (playerWinRate > 0.7) {
      recommendations.push(
        "Consider strengthening enemy AI or increasing enemy starting resources",
      );
      recommendations.push(
        "Review attack/defense balance - player may have too much advantage",
      );
    } else if (playerWinRate < 0.3) {
      recommendations.push(
        "Consider weakening enemy AI or increasing player starting resources",
      );
      recommendations.push(
        "Review early game balance - player may be at disadvantage",
      );
    }

    if (issues.some((issue) => issue.includes("gold accumulation"))) {
      recommendations.push(
        "Reduce resource generation rates or increase upgrade costs",
      );
    }

    if (issues.some((issue) => issue.includes("stagnation"))) {
      recommendations.push(
        "Increase attack success rates or reduce defensive bonuses",
      );
      recommendations.push("Add more dynamic events to break stalemates");
    }

    if (recommendations.length === 0) {
      recommendations.push("Game balance appears to be in good shape!");
    }

    return recommendations;
  }

  /**
   * Export test results for external analysis
   */
  exportResults(): string {
    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        results: this.results,
        summary: {
          totalGames: this.results.length,
          winRates: this.results.reduce(
            (acc, r) => {
              acc[r.winner] = (acc[r.winner] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
        },
      },
      null,
      2,
    );
  }
}

// Convenience function to run quick balance tests
export async function runQuickBalanceTest(
  strategy: string = "balanced",
  iterations: number = 10,
): Promise<BalanceReport> {
  const tester = new GameplayTester();
  const selectedStrategy = aiStrategies[strategy] || aiStrategies.balanced;

  const config: TestConfiguration = {
    maxTurns: 100,
    iterations,
    playerStrategy: selectedStrategy,
    logLevel: "minimal",
  };

  return await tester.runTests(config);
}
