/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * Story Event System for Ashes of Aeloria
 * Manages narrative events, choices, and consequences throughout the game
 */

import type {
  GameState,
  GameEvent,
  EventTemplate,
  EventCondition,
  EventChoice,
  EventConsequence,
  EventEffect,
  Faction,
} from "../types/game.d.js";
import {
  allStoryEvents,
  eventPhaseWeights,
  validateEventTemplate,
} from "../data/storyEvents.js";

export class StoryEventSystem {
  private gameState: GameState;
  private seenEvents: Set<string> = new Set();
  private eventCooldowns: Map<string, number> = new Map();
  private narrativeFlags: Map<string, number> = new Map();

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.loadNarrativeState();
  }

  /**
   * Main update method called each turn to potentially trigger events
   */
  public processTurnEvents(): GameEvent[] {
    const triggeredEvents: GameEvent[] = [];

    try {
      // Update cooldowns
      this.updateCooldowns();

      // Check for scripted events first (highest priority)
      const scriptedEvent = this.checkScriptedEvents();
      if (scriptedEvent) {
        triggeredEvents.push(scriptedEvent);
        return triggeredEvents; // Only one major event per turn
      }

      // Check for consequence events
      const consequenceEvent = this.checkConsequenceEvents();
      if (consequenceEvent) {
        triggeredEvents.push(consequenceEvent);
        return triggeredEvents;
      }

      // Roll for random events (lower priority)
      if (Math.random() < this.getRandomEventChance()) {
        const randomEvent = this.selectRandomEvent();
        if (randomEvent) {
          triggeredEvents.push(randomEvent);
        }
      }

      return triggeredEvents;
    } catch (error) {
      console.error("Error processing turn events:", error);
      return []; // Return empty array on error to prevent game breaking
    }
  }

  /**
   * Check for scripted events that should trigger this turn
   */
  private checkScriptedEvents(): GameEvent | null {
    const currentPhase = this.getCurrentGamePhase();
    const phaseEvents = eventPhaseWeights[currentPhase];

    if (!phaseEvents) return null;

    // Sort by weight (priority) and check conditions
    const sortedEvents = Object.entries(phaseEvents)
      .sort(([, a], [, b]) => b - a)
      .map(([eventId]) => eventId);

    for (const eventId of sortedEvents) {
      const template = allStoryEvents[eventId];
      if (!template || template.type !== "scripted") continue;

      // Skip if already seen and not repeatable
      if (this.seenEvents.has(eventId) && !template.repeatable) continue;

      // Check cooldown
      if (this.isOnCooldown(eventId)) continue;

      // Check conditions
      if (this.checkEventConditions(template.conditions)) {
        return this.createGameEventFromTemplate(eventId, template);
      }
    }

    return null;
  }

  /**
   * Check for events triggered by previous choices or consequences
   */
  private checkConsequenceEvents(): GameEvent | null {
    for (const [eventId, template] of Object.entries(allStoryEvents)) {
      if (template.type !== "consequence") continue;

      // Skip if already seen and not repeatable
      if (this.seenEvents.has(eventId) && !template.repeatable) continue;

      // Check cooldown
      if (this.isOnCooldown(eventId)) continue;

      // Check if consequence conditions are met
      if (this.checkEventConditions(template.conditions)) {
        return this.createGameEventFromTemplate(eventId, template);
      }
    }

    return null;
  }

  /**
   * Select a random event based on current game state
   */
  private selectRandomEvent(): GameEvent | null {
    const availableEvents = Object.entries(allStoryEvents).filter(
      ([eventId, template]) => {
        return (
          template.type === "random" &&
          (!this.seenEvents.has(eventId) || template.repeatable) &&
          !this.isOnCooldown(eventId) &&
          this.checkEventConditions(template.conditions)
        );
      },
    );

    if (availableEvents.length === 0) return null;

    // Weight by template weight
    const weightedEvents = availableEvents.map(([eventId, template]) => ({
      eventId,
      template,
      weight: template.weight,
    }));

    const totalWeight = weightedEvents.reduce(
      (sum, event) => sum + event.weight,
      0,
    );
    let random = Math.random() * totalWeight;

    for (const event of weightedEvents) {
      random -= event.weight;
      if (random <= 0) {
        return this.createGameEventFromTemplate(event.eventId, event.template);
      }
    }

    return null;
  }

  /**
   * Process player's choice in an event
   */
  public processEventChoice(eventId: string, choiceId: string): void {
    const event = this.gameState.events.find((e) => e.id === eventId);
    if (!event) return;

    const choice = event.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    // Apply consequences
    this.applyConsequences(choice.consequences);

    // Mark event as completed
    this.seenEvents.add(eventId);

    // Set cooldown if repeatable
    const template = allStoryEvents[eventId];
    if (template?.repeatable && template.cooldown) {
      this.eventCooldowns.set(eventId, this.gameState.turn + template.cooldown);
    }

    // Remove event from active events
    this.gameState.events = this.gameState.events.filter(
      (e) => e.id !== eventId,
    );

    // Record player choice for narrative tracking
    this.gameState.narrativeState.playerChoices.push({
      eventId,
      choiceId,
      turn: this.gameState.turn,
      consequences: choice.consequences.map((c) => c.description),
      impact: this.calculateChoiceImpact(choice.consequences),
    });
  }

  /**
   * Check if event conditions are met
   */
  private checkEventConditions(conditions: EventCondition[]): boolean {
    return conditions.every((condition) => {
      switch (condition.type) {
        case "turn":
          return this.evaluateNumericCondition(
            this.gameState.turn,
            condition.operator,
            condition.value,
          );

        case "nodes_controlled": {
          const playerNodes =
            this.gameState.nodes?.filter((n) => n.owner === "player").length ||
            0;
          return this.evaluateNumericCondition(
            playerNodes,
            condition.operator,
            condition.value,
          );
        }

        case "resources_gold":
          return this.evaluateNumericCondition(
            this.gameState.resources?.gold || 0,
            condition.operator,
            condition.value,
          );

        case "corruption_level": {
          return this.evaluateNumericCondition(
            this.gameState.worldState?.corruptionLevel || 0,
            condition.operator,
            condition.value,
          );
        }

        case "reputation": {
          const [, faction] = condition.target?.split(":") || [];
          if (!faction || !this.gameState.diplomacy?.playerFactionRelations)
            return false;
          const reputation =
            this.gameState.diplomacy.playerFactionRelations[
              faction as Faction
            ] || 0;
          return this.evaluateNumericCondition(
            reputation,
            condition.operator,
            condition.value,
          );
        }

        case "technology":
          return (
            this.gameState.globalTechnologies?.includes(condition.value) ||
            false
          );

        case "flag":
          return (
            this.narrativeFlags.get(condition.target || "") === condition.value
          );

        case "event_not_seen":
          return !this.seenEvents.has(condition.value);

        case "trade_routes": {
          const tradeRoutes = this.gameState.market?.tradeRoutes?.length || 0;
          return this.evaluateNumericCondition(
            tradeRoutes,
            condition.operator,
            condition.value,
          );
        }

        case "population": {
          const totalPop =
            this.gameState.nodes
              ?.filter((n) => n.owner === "player")
              ?.reduce((sum, n) => sum + (n.population?.total || 0), 0) || 0;
          return this.evaluateNumericCondition(
            totalPop,
            condition.operator,
            condition.value,
          );
        }

        default:
          console.warn(`Unknown event condition type: ${condition.type}`);
          return false;
      }
    });
  }

  /**
   * Apply consequences of player choices
   */
  private applyConsequences(consequences: EventConsequence[]): void {
    for (const consequence of consequences) {
      switch (consequence.type) {
        case "reputation":
          this.applyReputationChange(consequence);
          break;

        case "resources":
          this.applyResourceChange(consequence);
          break;

        case "flag":
          this.narrativeFlags.set(consequence.target || "", consequence.value);
          break;

        case "corruption":
          this.applyCorruptionChange(consequence);
          break;

        case "population":
          this.applyPopulationChange(consequence);
          break;

        case "unlock_technology":
          if (
            consequence.target &&
            !this.gameState.globalTechnologies.includes(
              consequence.target as any,
            )
          ) {
            this.gameState.globalTechnologies.push(consequence.target as any);
          }
          break;

        case "unlock_faction":
          this.addFactionToGame(consequence.target || "");
          break;

        case "victory_progress":
          this.updateVictoryProgress(consequence);
          break;

        default:
          console.log(
            `Applied consequence: ${consequence.type} - ${consequence.description}`,
          );
      }
    }
  }

  /**
   * Apply reputation changes to factions
   */
  private applyReputationChange(consequence: EventConsequence): void {
    const target = consequence.target;
    if (!target) return;

    if (target === "all_factions") {
      // Apply to all known factions
      Object.keys(this.gameState.diplomacy.playerFactionRelations).forEach(
        (faction) => {
          const currentRep =
            this.gameState.diplomacy.playerFactionRelations[
              faction as Faction
            ] || 0;
          this.gameState.diplomacy.playerFactionRelations[faction as Faction] =
            Math.max(-100, Math.min(100, currentRep + consequence.value));
        },
      );
    } else {
      // Apply to specific faction
      const currentRep =
        this.gameState.diplomacy.playerFactionRelations[target as Faction] || 0;
      this.gameState.diplomacy.playerFactionRelations[target as Faction] =
        Math.max(-100, Math.min(100, currentRep + consequence.value));
    }
  }

  /**
   * Apply resource changes with bounds checking
   */
  private applyResourceChange(consequence: EventConsequence): void {
    const target = consequence.target as keyof typeof this.gameState.resources;
    if (target && target in this.gameState.resources) {
      const currentValue = this.gameState.resources[target];
      const newValue = currentValue + consequence.value;

      // Apply reasonable bounds to prevent exploits
      const maxResourceValue = 999999;
      this.gameState.resources[target] = Math.max(
        0,
        Math.min(maxResourceValue, newValue),
      );

      // Log significant changes for debugging
      if (Math.abs(consequence.value) > 100) {
        console.log(
          `Event consequence: ${target} changed by ${consequence.value} (${currentValue} -> ${this.gameState.resources[target]})`,
        );
      }
    }
  }

  /**
   * Helper methods
   */
  private getCurrentGamePhase(): "early" | "mid" | "late" {
    const turn = this.gameState.turn;
    if (turn <= 20) return "early";
    if (turn <= 50) return "mid";
    return "late";
  }

  private getRandomEventChance(): number {
    const basechance = 0.15; // 15% base chance
    const turnModifier = Math.min(0.1, this.gameState.turn * 0.001); // Increases slightly over time
    return basechance + turnModifier;
  }

  private evaluateNumericCondition(
    value: number,
    operator: string,
    target: number,
  ): boolean {
    switch (operator) {
      case "==":
        return value === target;
      case "!=":
        return value !== target;
      case ">=":
        return value >= target;
      case "<=":
        return value <= target;
      case ">":
        return value > target;
      case "<":
        return value < target;
      default:
        return false;
    }
  }

  private isOnCooldown(eventId: string): boolean {
    const cooldownTurn = this.eventCooldowns.get(eventId);
    return cooldownTurn !== undefined && this.gameState.turn < cooldownTurn;
  }

  private updateCooldowns(): void {
    for (const [eventId, cooldownTurn] of this.eventCooldowns.entries()) {
      if (this.gameState.turn >= cooldownTurn) {
        this.eventCooldowns.delete(eventId);
      }
    }
  }

  private createGameEventFromTemplate(
    eventId: string,
    template: EventTemplate,
  ): GameEvent {
    // Validate event template before creating
    if (!validateEventTemplate(eventId, template)) {
      throw new Error(`Invalid event template: ${eventId}`);
    }

    return {
      id: eventId,
      title: template.title,
      description: template.description,
      type: template.type,
      probability: 1.0, // Already selected
      conditions: template.conditions,
      choices: template.choices,
      effects: template.effects,
      consequences: [],
      turn: this.gameState.turn,
      global: false,
      affectedNodes: [],
      participants: [],
      importance: this.getEventImportance(template),
      category: "story",
      tags: [template.type, this.getCurrentGamePhase()],
    };
  }

  private getEventImportance(template: EventTemplate): number {
    // Calculate importance based on weight and type
    if (template.type === "scripted") return Math.min(100, template.weight);
    if (template.type === "consequence") return 75;
    return Math.min(50, template.weight);
  }

  private calculateChoiceImpact(
    consequences: EventConsequence[],
  ): Record<string, number> {
    const impact: Record<string, number> = {};

    consequences.forEach((consequence) => {
      if (consequence.target) {
        impact[consequence.target] =
          (impact[consequence.target] || 0) + consequence.value;
      }
    });

    return impact;
  }

  private applyCorruptionChange(consequence: EventConsequence): void {
    if (consequence.target === "global") {
      this.gameState.worldState.corruptionLevel = Math.max(
        0,
        Math.min(
          100,
          this.gameState.worldState.corruptionLevel + consequence.value,
        ),
      );
    }
  }

  private applyPopulationChange(consequence: EventConsequence): void {
    // Apply to largest player-controlled node
    const playerNodes = this.gameState.nodes.filter(
      (n) => n.owner === "player",
    );
    if (playerNodes.length > 0) {
      const largestNode = playerNodes.reduce((largest, node) =>
        node.population.total > largest.population.total ? node : largest,
      );

      const target = consequence.target as keyof typeof largestNode.population;
      if (target && target in largestNode.population) {
        (largestNode.population as any)[target] = Math.max(
          0,
          (largestNode.population as any)[target] + consequence.value,
        );
      }
    }
  }

  private addFactionToGame(factionName: string): void {
    // Add faction to diplomatic relations if not already present
    if (!(factionName in this.gameState.diplomacy.playerFactionRelations)) {
      this.gameState.diplomacy.playerFactionRelations[factionName as Faction] =
        0;
    }
  }

  private updateVictoryProgress(consequence: EventConsequence): void {
    const target =
      consequence.target as keyof typeof this.gameState.victoryProgress;
    if (target && target in this.gameState.victoryProgress) {
      this.gameState.victoryProgress[target].progress += consequence.value;
    }
  }

  private loadNarrativeState(): void {
    // Load narrative flags from game state
    Object.entries(this.gameState.narrativeState.narrativeFlags).forEach(
      ([key, value]) => {
        this.narrativeFlags.set(key, value ? 1 : 0);
      },
    );
  }

  private saveNarrativeState(): void {
    // Save narrative flags to game state
    this.narrativeFlags.forEach((value, key) => {
      this.gameState.narrativeState.narrativeFlags[key] = value > 0;
    });
  }

  /**
   * Public interface for getting active events
   */
  public getActiveEvents(): GameEvent[] {
    return this.gameState.events;
  }

  /**
   * Public interface for checking if specific narrative flags are set
   */
  public hasNarrativeFlag(flag: string): boolean {
    return this.narrativeFlags.get(flag) === 1;
  }

  /**
   * Get event history for narrative review
   */
  public getEventHistory(): Array<{
    eventId: string;
    choiceId: string;
    turn: number;
    description: string;
  }> {
    return this.gameState.narrativeState.playerChoices.map((choice) => ({
      eventId: choice.eventId,
      choiceId: choice.choiceId,
      turn: choice.turn,
      description: choice.consequences.join("; "),
    }));
  }
}
