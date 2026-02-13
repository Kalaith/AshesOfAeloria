/* eslint-disable @typescript-eslint/no-unused-vars */
// Custom hook for campaign logic separation
import { useCallback, useMemo } from "react";
import { useGameStore } from "../stores/useGameStore";
import {
  getChapterById,
  getAvailableResearchNodes,
} from "../data/campaignData";
import { safeArrayAccess } from "../utils/guards";
import {
  validateChapterId,
  type ChapterId,
} from "../validators/gameValidators";
import type { CampaignChapter, ResearchNode } from "../data/campaignData";

export interface CampaignLogicState {
  currentChapter: CampaignChapter | null;
  availableResearch: ResearchNode[];
  completedChapters: string[];
  completedResearch: string[];
}

export interface CampaignLogicActions {
  isChapterUnlocked: (chapter: CampaignChapter) => boolean;
  isChapterCompleted: (chapter: CampaignChapter) => boolean;
  isChapterActive: (chapter: CampaignChapter) => boolean;
  canAffordResearch: (node: ResearchNode) => boolean;
  getChapterProgress: (chapter: CampaignChapter) => number;
  selectChapter: (chapterId: string) => boolean;
}

export const useCampaignLogic = (selectedChapterId: string | null = null) => {
  const gameState = useGameStore();

  // Memoized state calculations
  const state: CampaignLogicState = useMemo(() => {
    const completedChapters = safeArrayAccess(gameState.completedChapters);
    const completedResearch = safeArrayAccess(gameState.completedResearch);

    return {
      currentChapter: selectedChapterId
        ? getChapterById(selectedChapterId)
        : null,
      availableResearch: getAvailableResearchNodes(
        completedResearch,
        completedChapters,
      ),
      completedChapters,
      completedResearch,
    };
  }, [
    selectedChapterId,
    gameState.completedChapters,
    gameState.completedResearch,
  ]);

  // Memoized resource state
  const resources = useMemo(
    () => ({
      knowledge: gameState.knowledge || 0,
      mana: gameState.mana || 0,
      materials: gameState.materials || 0,
      culture: gameState.culture || 0,
      energy: gameState.energy || 0,
      artifacts: gameState.artifacts || 0,
    }),
    [
      gameState.knowledge,
      gameState.mana,
      gameState.materials,
      gameState.culture,
      gameState.energy,
      gameState.artifacts,
    ],
  );

  // Action functions
  const actions: CampaignLogicActions = useMemo(
    () => ({
      isChapterUnlocked: (chapter: CampaignChapter): boolean => {
        return (
          chapter.prerequisites.every((prereq) =>
            state.completedChapters.includes(prereq),
          ) || chapter.prerequisites.length === 0
        );
      },

      isChapterCompleted: (chapter: CampaignChapter): boolean => {
        return state.completedChapters.includes(chapter.id);
      },

      isChapterActive: (chapter: CampaignChapter): boolean => {
        return gameState.currentChapter === chapter.id;
      },

      canAffordResearch: (node: ResearchNode): boolean => {
        return Object.entries(node.cost).every(([resource, amount]) => {
          const available = resources[resource as keyof typeof resources] || 0;
          return available >= amount;
        });
      },

      getChapterProgress: (chapter: CampaignChapter): number => {
        const totalConditions = chapter.victoryConditions.length;
        const completedConditions = chapter.victoryConditions.filter(
          (condition) => condition.completed,
        ).length;
        return totalConditions > 0 ? completedConditions / totalConditions : 0;
      },

      selectChapter: (chapterId: string): boolean => {
        const validation = validateChapterId(chapterId);
        return validation.success;
      },
    }),
    [state, resources, gameState.currentChapter],
  );

  return {
    ...state,
    resources,
    ...actions,
  };
};
