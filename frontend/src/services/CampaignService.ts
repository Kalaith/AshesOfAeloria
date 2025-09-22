// Campaign Service - Abstraction layer for campaign data access
import { CAMPAIGN_CHAPTERS, RESEARCH_TREE, getChapterById, getAvailableResearchNodes } from '../data/campaignData';
import type { CampaignChapter, ResearchNode } from '../data/campaignData';
import type { ChapterId, ResearchId } from '../types/improved';
import { validateChapterId } from '../validators/gameValidators';
import { safeArrayAccess } from '../utils/guards';

export interface CampaignServiceInterface {
  getAllChapters(): CampaignChapter[];
  getChapter(id: string): CampaignChapter | null;
  getAvailableChapters(completedChapters: string[]): CampaignChapter[];
  getAllResearchNodes(): ResearchNode[];
  getAvailableResearch(completedResearch: string[], completedChapters: string[]): ResearchNode[];
  getResearchNode(id: string): ResearchNode | null;
  calculateChapterProgress(chapter: CampaignChapter): number;
  isChapterUnlocked(chapter: CampaignChapter, completedChapters: string[]): boolean;
}

export class StaticCampaignService implements CampaignServiceInterface {
  private readonly chapters: ReadonlyArray<CampaignChapter>;
  private readonly researchNodes: ReadonlyArray<ResearchNode>;

  constructor() {
    this.chapters = CAMPAIGN_CHAPTERS;
    this.researchNodes = RESEARCH_TREE;
  }

  getAllChapters(): CampaignChapter[] {
    return [...this.chapters];
  }

  getChapter(id: string): CampaignChapter | null {
    const validation = validateChapterId(id);
    if (!validation.success) {
      console.warn(`Invalid chapter ID: ${id}`, validation.error);
      return null;
    }

    return getChapterById(id) || null;
  }

  getAvailableChapters(completedChapters: string[]): CampaignChapter[] {
    const completed = safeArrayAccess(completedChapters);

    return this.chapters.filter(chapter =>
      this.isChapterUnlocked(chapter, completed)
    );
  }

  getAllResearchNodes(): ResearchNode[] {
    return [...this.researchNodes];
  }

  getAvailableResearch(completedResearch: string[], completedChapters: string[]): ResearchNode[] {
    const safeCompletedResearch = safeArrayAccess(completedResearch);
    const safeCompletedChapters = safeArrayAccess(completedChapters);

    return getAvailableResearchNodes(safeCompletedResearch, safeCompletedChapters);
  }

  getResearchNode(id: string): ResearchNode | null {
    if (!id || typeof id !== 'string') {
      return null;
    }

    return this.researchNodes.find(node => node.id === id) || null;
  }

  calculateChapterProgress(chapter: CampaignChapter): number {
    if (!chapter.victoryConditions || chapter.victoryConditions.length === 0) {
      return 0;
    }

    const totalConditions = chapter.victoryConditions.length;
    const completedConditions = chapter.victoryConditions.filter(
      condition => condition.completed
    ).length;

    return completedConditions / totalConditions;
  }

  isChapterUnlocked(chapter: CampaignChapter, completedChapters: string[]): boolean {
    const completed = safeArrayAccess(completedChapters);

    // First chapter is always unlocked
    if (chapter.prerequisites.length === 0) {
      return true;
    }

    // All prerequisites must be completed
    return chapter.prerequisites.every(prereq => completed.includes(prereq));
  }
}

// Singleton instance
let campaignServiceInstance: CampaignServiceInterface | null = null;

export const getCampaignService = (): CampaignServiceInterface => {
  if (!campaignServiceInstance) {
    campaignServiceInstance = new StaticCampaignService();
  }
  return campaignServiceInstance;
};

// For testing - allows injection of mock service
export const setCampaignService = (service: CampaignServiceInterface): void => {
  campaignServiceInstance = service;
};

// Hook for React components
export const useCampaignService = (): CampaignServiceInterface => {
  return getCampaignService();
};