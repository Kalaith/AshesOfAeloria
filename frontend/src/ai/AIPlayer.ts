/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * AI Player System for Ashes of Aeloria
 * Provides automated gameplay testing and balance validation
 */

import type {
  GameState,
  GameNode,
  Commander,
  Resources,
  NodeType,
} from "../types/game.d";
import { gameData, gameConstants } from "../data/gameData";
import {
  calculateIncome,
  resolveBattle,
  calculateEffectiveGarrison,
  canAffordCommander,
  createCommander,
} from "../utils/gameLogic";

export interface AIStrategy {
  name: string;
  description: string;
  aggressiveness: number; // 0-1, how likely to attack vs defend
  economicFocus: number; // 0-1, how much to prioritize economy
  expansionRate: number; // 0-1, how quickly to expand
  riskTolerance: number; // 0-1, willingness to take risky moves
}

export interface AIDecision {
  type: "recruit" | "attack" | "upgrade" | "assign" | "defend" | "wait";
  target?: number; // node ID
  commanderClass?: string;
  commanderId?: number;
  priority: number; // 0-1, higher = more important
  reasoning: string;
}

export interface GameTestResult {
  winner: "player" | "enemy" | "draw";
  turns: number;
  finalState: {
    playerNodes: number;
    enemyNodes: number;
    playerResources: Resources;
    enemyResources: Resources;
    playerCommanders: number;
    enemyCommanders: number;
  };
  strategy: AIStrategy;
  decisions: AIDecision[];
  balanceIssues: string[];
}

export class AIPlayer {
  private strategy: AIStrategy;
  private decisions: AIDecision[] = [];
  private turnAnalysis: any[] = [];

  constructor(strategy: AIStrategy) {
    this.strategy = strategy;
  }

  /**
   * Analyze the current game state and make strategic decisions
   */
  analyzeGameState(gameState: GameState): AIDecision[] {
    const decisions: AIDecision[] = [];

    // Get current player situation
    const playerNodes = gameState.nodes.filter((n) => n.owner === "player");
    const enemyNodes = gameState.nodes.filter((n) => n.owner === "enemy");
    const neutralNodes = gameState.nodes.filter((n) => n.owner === "neutral");
    const playerCommanders = gameState.commanders.filter(
      (c) => c.owner === "player",
    );
    const enemyCommanders = gameState.commanders.filter(
      (c) => c.owner === "enemy",
    );

    // Calculate resource income and military strength
    const income = calculateIncome(playerNodes);
    const militaryStrength = this.calculateMilitaryStrength(
      playerNodes,
      playerCommanders,
    );
    const enemyStrength = this.calculateMilitaryStrength(
      enemyNodes,
      enemyCommanders,
    );

    // Store turn analysis
    this.turnAnalysis.push({
      turn: gameState.turn,
      playerNodes: playerNodes.length,
      enemyNodes: enemyNodes.length,
      neutralNodes: neutralNodes.length,
      playerGold: gameState.resources.gold,
      income: income.gold,
      militaryStrength,
      enemyStrength,
      strengthRatio: militaryStrength / Math.max(enemyStrength, 1),
    });

    // Priority 1: Emergency defense if under attack
    const defensiveDecisions = this.analyzeDefensiveNeeds(
      gameState,
      playerNodes,
      enemyNodes,
    );
    decisions.push(...defensiveDecisions);

    // Priority 2: Economic development if safe
    if (militaryStrength >= enemyStrength * 0.8) {
      const economicDecisions = this.analyzeEconomicOpportunities(
        gameState,
        playerNodes,
      );
      decisions.push(...economicDecisions);
    }

    // Priority 3: Military expansion opportunities
    const expansionDecisions = this.analyzeExpansionOpportunities(
      gameState,
      playerNodes,
      neutralNodes,
      enemyNodes,
    );
    decisions.push(...expansionDecisions);

    // Priority 4: Commander management
    const commanderDecisions = this.analyzeCommanderNeeds(
      gameState,
      playerNodes,
      playerCommanders,
    );
    decisions.push(...commanderDecisions);

    // Sort decisions by priority and strategy alignment
    decisions.sort((a, b) => {
      const aPriority = a.priority * this.getStrategyWeight(a);
      const bPriority = b.priority * this.getStrategyWeight(b);
      return bPriority - aPriority;
    });

    this.decisions.push(...decisions);
    return decisions;
  }

  /**
   * Calculate military strength of nodes and commanders
   */
  private calculateMilitaryStrength(
    nodes: GameNode[],
    commanders: Commander[],
  ): number {
    let strength = 0;

    // Add garrison strength
    nodes.forEach((node) => {
      const nodeCommanders = commanders.filter(
        (c) => c.assignedNode === node.id,
      );
      const effectiveGarrison = calculateEffectiveGarrison(
        node,
        nodeCommanders,
      );
      strength += effectiveGarrison.totalPower;
    });

    // Add unassigned commander strength
    const unassignedCommanders = commanders.filter((c) => !c.assignedNode);
    unassignedCommanders.forEach((commander) => {
      strength += commander.attack + commander.defense;
    });

    return strength;
  }

  /**
   * Analyze defensive needs and threats
   */
  private analyzeDefensiveNeeds(
    gameState: GameState,
    playerNodes: GameNode[],
    enemyNodes: GameNode[],
  ): AIDecision[] {
    const decisions: AIDecision[] = [];

    playerNodes.forEach((playerNode) => {
      const threateningEnemies = enemyNodes.filter((enemyNode) =>
        enemyNode.connections.includes(playerNode.id),
      );

      threateningEnemies.forEach((enemy) => {
        const enemyCommanders = gameState.commanders.filter(
          (c) => c.owner === "enemy" && c.assignedNode === enemy.id,
        );
        const playerCommanders = gameState.commanders.filter(
          (c) => c.owner === "player" && c.assignedNode === playerNode.id,
        );

        const enemyStrength = calculateEffectiveGarrison(
          enemy,
          enemyCommanders,
        ).totalPower;
        const playerStrength = calculateEffectiveGarrison(
          playerNode,
          playerCommanders,
        ).totalPower;

        if (enemyStrength > playerStrength * 1.2) {
          // Threat detected
          // Check if we can reinforce this node
          const availableCommanders = gameState.commanders.filter(
            (c) => c.owner === "player" && !c.assignedNode,
          );

          if (availableCommanders.length > 0) {
            decisions.push({
              type: "assign",
              target: playerNode.id,
              commanderId: availableCommanders[0].id,
              priority: 0.9,
              reasoning: `Defend ${gameData.nodeTypes[playerNode.type].name} from enemy threat (${enemyStrength} vs ${playerStrength})`,
            });
          } else if (gameState.resources.gold >= 150) {
            // Recruit emergency defenders
            decisions.push({
              type: "recruit",
              commanderClass: "knight", // Balanced defender
              priority: 0.85,
              reasoning: `Recruit defender for threatened ${gameData.nodeTypes[playerNode.type].name}`,
            });
          }
        }
      });
    });

    return decisions;
  }

  /**
   * Analyze economic expansion opportunities
   */
  private analyzeEconomicOpportunities(
    gameState: GameState,
    playerNodes: GameNode[],
  ): AIDecision[] {
    const decisions: AIDecision[] = [];

    playerNodes.forEach((node) => {
      if (node.starLevel < 5) {
        const upgradeCost = this.calculateUpgradeCost(node);
        if (gameState.resources.gold >= upgradeCost) {
          const income = gameData.nodeTypes[node.type].goldGeneration;
          const paybackTurns = upgradeCost / (income * 0.2); // Rough estimate

          decisions.push({
            type: "upgrade",
            target: node.id,
            priority: Math.max(0.1, 0.7 - paybackTurns / 50), // Lower priority for long payback
            reasoning: `Upgrade ${gameData.nodeTypes[node.type].name} (${upgradeCost} gold, ${paybackTurns.toFixed(1)} turn payback)`,
          });
        }
      }
    });

    return decisions;
  }

  /**
   * Analyze expansion opportunities
   */
  private analyzeExpansionOpportunities(
    gameState: GameState,
    playerNodes: GameNode[],
    neutralNodes: GameNode[],
    enemyNodes: GameNode[],
  ): AIDecision[] {
    const decisions: AIDecision[] = [];

    // Find attackable neutral and enemy nodes
    const targets: Array<{
      node: GameNode;
      difficulty: number;
      value: number;
    }> = [];

    playerNodes.forEach((playerNode) => {
      const playerCommanders = gameState.commanders.filter(
        (c) => c.owner === "player" && c.assignedNode === playerNode.id,
      );
      const playerStrength = calculateEffectiveGarrison(
        playerNode,
        playerCommanders,
      ).totalPower;

      // Check connected neutral nodes
      playerNode.connections.forEach((connectionId) => {
        const targetNode = [...neutralNodes, ...enemyNodes].find(
          (n) => n.id === connectionId,
        );
        if (targetNode) {
          const targetCommanders = gameState.commanders.filter(
            (c) =>
              c.owner === targetNode.owner && c.assignedNode === targetNode.id,
          );
          const targetStrength = calculateEffectiveGarrison(
            targetNode,
            targetCommanders,
          ).totalPower;

          const winChance = this.calculateWinChance(
            playerStrength,
            targetStrength,
          );
          const nodeValue = this.calculateNodeValue(targetNode);

          if (winChance > 0.6) {
            // Only consider if decent chance of success
            targets.push({
              node: targetNode,
              difficulty: 1 - winChance,
              value: nodeValue,
            });
          }
        }
      });
    });

    // Sort targets by value/difficulty ratio
    targets.sort(
      (a, b) => b.value / (b.difficulty + 0.1) - a.value / (a.difficulty + 0.1),
    );

    // Add top targets as attack decisions
    targets.slice(0, 3).forEach((target) => {
      decisions.push({
        type: "attack",
        target: target.node.id,
        priority: (target.value / (target.difficulty + 0.1)) * 0.1, // Scale to 0-1 range
        reasoning: `Attack ${gameData.nodeTypes[target.node.type].name} (value: ${target.value.toFixed(1)}, difficulty: ${target.difficulty.toFixed(2)})`,
      });
    });

    return decisions;
  }

  /**
   * Analyze commander recruitment and assignment needs
   */
  private analyzeCommanderNeeds(
    gameState: GameState,
    playerNodes: GameNode[],
    playerCommanders: Commander[],
  ): AIDecision[] {
    const decisions: AIDecision[] = [];

    // Check if we need more commanders
    const undefendedNodes = playerNodes.filter((node) => {
      const defenders = playerCommanders.filter(
        (c) => c.assignedNode === node.id,
      );
      const capacity = gameConstants.COMMANDER_CAPACITIES[node.type];
      return defenders.length < capacity;
    });

    if (undefendedNodes.length > 0 && gameState.resources.gold >= 150) {
      // Determine best commander type to recruit
      const commanderClass = this.chooseBestCommanderClass(gameState);

      decisions.push({
        type: "recruit",
        commanderClass,
        priority: 0.6,
        reasoning: `Recruit ${commanderClass} to defend ${undefendedNodes.length} undefended nodes`,
      });
    }

    // Optimize commander assignments
    const unassignedCommanders = playerCommanders.filter(
      (c) => !c.assignedNode,
    );
    unassignedCommanders.forEach((commander) => {
      const bestNode = this.findBestNodeForCommander(
        commander,
        playerNodes,
        playerCommanders,
      );
      if (bestNode) {
        decisions.push({
          type: "assign",
          target: bestNode.id,
          commanderId: commander.id,
          priority: 0.4,
          reasoning: `Assign ${commander.name} to ${gameData.nodeTypes[bestNode.type].name} for optimal defense`,
        });
      }
    });

    return decisions;
  }

  /**
   * Calculate upgrade cost for a node
   */
  private calculateUpgradeCost(node: GameNode): number {
    const baseMultiplier: Partial<Record<NodeType, number>> = {
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
   * Calculate win chance for battle
   */
  private calculateWinChance(
    attackerStrength: number,
    defenderStrength: number,
  ): number {
    const ratio = attackerStrength / Math.max(defenderStrength, 1);
    // Sigmoid function to convert ratio to probability
    return 1 / (1 + Math.exp(-2 * (ratio - 1.2))); // Adjusted for game balance
  }

  /**
   * Calculate strategic value of a node
   */
  private calculateNodeValue(node: GameNode): number {
    const nodeData = gameData.nodeTypes[node.type];
    let value = 0;

    // Economic value
    value += nodeData.goldGeneration * 10;
    value += nodeData.suppliesGeneration * 5;
    value += nodeData.manaGeneration * 8;

    // Strategic value
    value += node.connections.length * 5; // Connectivity bonus
    value += nodeData.defensiveBonus * 2; // Defensive value

    // Star level multiplier
    value *= 1 + node.starLevel * 0.3;

    return value;
  }

  /**
   * Choose best commander class based on current needs
   */
  private chooseBestCommanderClass(gameState: GameState): string {
    const playerNodes = gameState.nodes.filter((n) => n.owner === "player");
    const enemyNodes = gameState.nodes.filter((n) => n.owner === "enemy");

    // If outnumbered, prefer balanced units
    if (enemyNodes.length > playerNodes.length) {
      return "knight";
    }

    // If ahead, prefer economic units
    if (gameState.resources.gold > 1000) {
      return "engineer";
    }

    // Default to balanced
    return "knight";
  }

  /**
   * Find best node for commander assignment
   */
  private findBestNodeForCommander(
    commander: Commander,
    playerNodes: GameNode[],
    allCommanders: Commander[],
  ): GameNode | null {
    let bestNode: GameNode | null = null;
    let bestScore = 0;

    playerNodes.forEach((node) => {
      const currentDefenders = allCommanders.filter(
        (c) => c.assignedNode === node.id,
      );
      const capacity = gameConstants.COMMANDER_CAPACITIES[node.type];

      if (currentDefenders.length < capacity) {
        const threatLevel = this.calculateNodeThreatLevel(node);
        const nodeValue = this.calculateNodeValue(node);
        const score = threatLevel * nodeValue;

        if (score > bestScore) {
          bestScore = score;
          bestNode = node;
        }
      }
    });

    return bestNode;
  }

  /**
   * Calculate threat level for a node
   */
  private calculateNodeThreatLevel(node: GameNode): number {
    // This would be more sophisticated in a real implementation
    return node.connections.length * 0.2 + (5 - node.starLevel) * 0.1;
  }

  /**
   * Get strategy weight for decision type
   */
  private getStrategyWeight(decision: AIDecision): number {
    switch (decision.type) {
      case "attack":
        return this.strategy.aggressiveness;
      case "defend":
      case "assign":
        return 1 - this.strategy.aggressiveness;
      case "upgrade":
        return this.strategy.economicFocus;
      case "recruit":
        return this.strategy.expansionRate;
      default:
        return 1;
    }
  }

  /**
   * Get AI analysis summary
   */
  getAnalysisSummary(): any {
    return {
      strategy: this.strategy,
      totalDecisions: this.decisions.length,
      decisionTypes: this.decisions.reduce(
        (acc, d) => {
          acc[d.type] = (acc[d.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      turnAnalysis: this.turnAnalysis,
    };
  }

  /**
   * Reset AI state for new game
   */
  reset(): void {
    this.decisions = [];
    this.turnAnalysis = [];
  }
}

// Predefined AI strategies for testing different scenarios
export const aiStrategies: Record<string, AIStrategy> = {
  aggressive: {
    name: "Aggressive Expansion",
    description: "Focuses on rapid territorial expansion and early attacks",
    aggressiveness: 0.8,
    economicFocus: 0.3,
    expansionRate: 0.9,
    riskTolerance: 0.7,
  },

  defensive: {
    name: "Defensive Economy",
    description: "Focuses on economic growth and defensive positioning",
    aggressiveness: 0.2,
    economicFocus: 0.9,
    expansionRate: 0.4,
    riskTolerance: 0.3,
  },

  balanced: {
    name: "Balanced Strategy",
    description: "Balanced approach between economy, defense, and expansion",
    aggressiveness: 0.5,
    economicFocus: 0.6,
    expansionRate: 0.6,
    riskTolerance: 0.5,
  },

  rushdown: {
    name: "Early Rush",
    description: "All-in early game aggression",
    aggressiveness: 1.0,
    economicFocus: 0.1,
    expansionRate: 1.0,
    riskTolerance: 0.9,
  },

  turtle: {
    name: "Turtle Strategy",
    description: "Maximum defense, minimal expansion until strong",
    aggressiveness: 0.1,
    economicFocus: 0.8,
    expansionRate: 0.2,
    riskTolerance: 0.1,
  },
};
