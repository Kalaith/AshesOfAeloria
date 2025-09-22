// Type Guards and Safety Utilities
// Provides safe access to potentially undefined/null values

/**
 * Safely access array properties, returning empty array if null/undefined
 */
export const safeArrayAccess = <T>(arr: T[] | undefined | null): T[] => {
  return arr ?? [];
};

/**
 * Safely access object properties with fallback
 */
export const safeObjectAccess = <T, K extends keyof T>(
  obj: T | undefined | null,
  key: K,
  fallback: T[K]
): T[K] => {
  return obj?.[key] ?? fallback;
};

/**
 * Type guard to check if value is not null or undefined
 */
export const isNotNullish = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Type guard to check if string is not empty
 */
export const isNonEmptyString = (value: string | null | undefined): value is string => {
  return typeof value === 'string' && value.length > 0;
};

/**
 * Type guard to check if number is valid (not NaN, finite)
 */
export const isValidNumber = (value: number | null | undefined): value is number => {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
};

/**
 * Type guard to check if array has items
 */
export const hasItems = <T>(arr: T[] | null | undefined): arr is [T, ...T[]] => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Safely convert unknown value to string
 */
export const safeStringify = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '[Object]';
    }
  }
  return String(value);
};

/**
 * Safely parse number from string
 */
export const safeParseNumber = (value: string | null | undefined, fallback = 0): number => {
  if (!isNonEmptyString(value)) return fallback;
  const parsed = Number(value);
  return isValidNumber(parsed) ? parsed : fallback;
};

/**
 * Safely access nested object properties
 */
export const safeNestedAccess = <T>(
  obj: unknown,
  path: string[],
  fallback: T
): T => {
  let current = obj;

  for (const key of path) {
    if (current == null || typeof current !== 'object') {
      return fallback;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as T ?? fallback;
};

/**
 * Assert that value is defined, throw error if not
 */
export const assertDefined = <T>(
  value: T | null | undefined,
  message = 'Value must be defined'
): T => {
  if (value == null) {
    throw new Error(message);
  }
  return value;
};

/**
 * Create a safe function wrapper that catches errors
 */
export const safeFunction = <TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  fallback: TReturn,
  onError?: (error: Error) => void
) => {
  return (...args: TArgs): TReturn => {
    try {
      return fn(...args);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      }
      return fallback;
    }
  };
};