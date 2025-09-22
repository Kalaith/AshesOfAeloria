// Input Validation and Data Sanitization
// Provides validation functions for user inputs and external data

import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { GAME_BALANCE } from '../constants/gameBalance';
import { isNonEmptyString, isValidNumber } from '../utils/guards';

// Branded types for better type safety
export type ChapterId = string & { __brand: 'ChapterId' };
export type CommanderId = string & { __brand: 'CommanderId' };
export type NodeId = number & { __brand: 'NodeId' };
export type ResearchId = string & { __brand: 'ResearchId' };

/**
 * Validation result type
 */
export type ValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

/**
 * Validate chapter ID
 */
export const validateChapterId = (id: unknown): ValidationResult<ChapterId> => {
  if (!isNonEmptyString(id)) {
    return { success: false, error: 'Chapter ID must be a non-empty string' };
  }

  const validChapter = CAMPAIGN_CHAPTERS.find(chapter => chapter.id === id);
  if (!validChapter) {
    return { success: false, error: `Invalid chapter ID: ${id}` };
  }

  return { success: true, data: id as ChapterId };
};

/**
 * Validate commander ID
 */
export const validateCommanderId = (id: unknown): ValidationResult<CommanderId> => {
  if (!isNonEmptyString(id)) {
    return { success: false, error: 'Commander ID must be a non-empty string' };
  }

  // Simple format validation - should be alphanumeric with optional underscores/hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return { success: false, error: 'Commander ID contains invalid characters' };
  }

  return { success: true, data: id as CommanderId };
};

/**
 * Validate node ID
 */
export const validateNodeId = (id: unknown): ValidationResult<NodeId> => {
  if (!isValidNumber(id)) {
    return { success: false, error: 'Node ID must be a valid number' };
  }

  if (id < 0 || !Number.isInteger(id)) {
    return { success: false, error: 'Node ID must be a non-negative integer' };
  }

  return { success: true, data: id as NodeId };
};

/**
 * Validate resource amount
 */
export const validateResourceAmount = (amount: unknown): ValidationResult<number> => {
  if (!isValidNumber(amount)) {
    return { success: false, error: 'Resource amount must be a valid number' };
  }

  if (amount < 0) {
    return { success: false, error: 'Resource amount cannot be negative' };
  }

  if (amount > GAME_BALANCE.RESOURCES.MAX_RESOURCE_STORAGE) {
    return { success: false, error: `Resource amount exceeds maximum storage: ${GAME_BALANCE.RESOURCES.MAX_RESOURCE_STORAGE}` };
  }

  return { success: true, data: amount };
};

/**
 * Validate commander level
 */
export const validateCommanderLevel = (level: unknown): ValidationResult<number> => {
  if (!isValidNumber(level)) {
    return { success: false, error: 'Commander level must be a valid number' };
  }

  if (!Number.isInteger(level) || level < 1) {
    return { success: false, error: 'Commander level must be a positive integer' };
  }

  if (level > GAME_BALANCE.BATTLE.MAX_COMMANDER_LEVEL) {
    return { success: false, error: `Commander level exceeds maximum: ${GAME_BALANCE.BATTLE.MAX_COMMANDER_LEVEL}` };
  }

  return { success: true, data: level };
};

/**
 * Validate star rating
 */
export const validateStarRating = (rating: unknown): ValidationResult<number> => {
  if (!isValidNumber(rating)) {
    return { success: false, error: 'Star rating must be a valid number' };
  }

  if (!Number.isInteger(rating) || rating < 0 || rating > GAME_BALANCE.UI.MAX_STAR_RATING) {
    return { success: false, error: `Star rating must be between 0 and ${GAME_BALANCE.UI.MAX_STAR_RATING}` };
  }

  return { success: true, data: rating };
};

/**
 * Validate faction relationship value
 */
export const validateFactionRelationship = (value: unknown): ValidationResult<number> => {
  if (!isValidNumber(value)) {
    return { success: false, error: 'Faction relationship must be a valid number' };
  }

  if (value < GAME_BALANCE.FACTIONS.RELATIONSHIP_MIN || value > GAME_BALANCE.FACTIONS.RELATIONSHIP_MAX) {
    return {
      success: false,
      error: `Faction relationship must be between ${GAME_BALANCE.FACTIONS.RELATIONSHIP_MIN} and ${GAME_BALANCE.FACTIONS.RELATIONSHIP_MAX}`
    };
  }

  return { success: true, data: value };
};

/**
 * Sanitize user input string
 */
export const sanitizeUserInput = (input: unknown): string => {
  if (!isNonEmptyString(input)) {
    return '';
  }

  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

/**
 * Validate and sanitize search query
 */
export const validateSearchQuery = (query: unknown): ValidationResult<string> => {
  const sanitized = sanitizeUserInput(query);

  if (sanitized.length < 2) {
    return { success: false, error: 'Search query must be at least 2 characters long' };
  }

  if (sanitized.length > 100) {
    return { success: false, error: 'Search query is too long (max 100 characters)' };
  }

  return { success: true, data: sanitized };
};

/**
 * Safe validator wrapper that never throws
 */
export const safeValidate = <T>(
  validator: (input: unknown) => ValidationResult<T>,
  input: unknown,
  fallback: T
): T => {
  try {
    const result = validator(input);
    return result.success ? result.data : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Batch validation helper
 */
export const validateBatch = <T extends Record<string, unknown>>(
  validators: { [K in keyof T]: (input: unknown) => ValidationResult<T[K]> },
  inputs: Record<keyof T, unknown>
): ValidationResult<T> => {
  const result = {} as T;
  const errors: string[] = [];

  for (const [key, validator] of Object.entries(validators)) {
    const validation = validator(inputs[key]);
    if (validation.success) {
      (result as any)[key] = validation.data;
    } else {
      errors.push(`${key}: ${validation.error}`);
    }
  }

  if (errors.length > 0) {
    return { success: false, error: errors.join(', ') };
  }

  return { success: true, data: result };
};