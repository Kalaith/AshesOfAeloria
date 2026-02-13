// Performance and async operation hooks
import { useState, useCallback, useRef, useEffect } from "react";
import type { AsyncOperationState, GameError } from "../types/improved";

interface UseAsyncOperationOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: GameError) => void;
  retryAttempts?: number;
  retryDelay?: number;
}

export const useAsyncOperation = <T>(
  operation: () => Promise<T>,
  options: UseAsyncOperationOptions<T> = {},
) => {
  const {
    initialData = null,
    onSuccess,
    onError,
    retryAttempts = 0,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<AsyncOperationState<T>>({
    data: initialData,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const createGameError = (error: unknown, context?: string): GameError => {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      code: "ASYNC_OPERATION_ERROR",
      message,
      details: { originalError: error },
      timestamp: Date.now(),
      severity: "medium",
      context,
    };
  };

  const executeWithRetry = useCallback(
    async (
      operationFn: () => Promise<T>,
      attempt: number = 0,
    ): Promise<void> => {
      try {
        const result = await operationFn();

        if (!mountedRef.current) return;

        setState({
          data: result,
          loading: false,
          error: null,
          lastUpdated: Date.now(),
        });

        retryCountRef.current = 0;
        onSuccess?.(result);
      } catch (error) {
        if (!mountedRef.current) return;

        const gameError = createGameError(error, `Attempt ${attempt + 1}`);

        if (attempt < retryAttempts) {
          // Retry after delay
          setTimeout(
            () => {
              if (mountedRef.current) {
                executeWithRetry(operationFn, attempt + 1);
              }
            },
            retryDelay * Math.pow(2, attempt),
          ); // Exponential backoff
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: gameError,
        }));

        onError?.(gameError);
      }
    },
    [retryAttempts, retryDelay, onSuccess, onError],
  );

  const execute = useCallback(
    async (customOperation?: () => Promise<T>) => {
      if (!mountedRef.current) return;

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      retryCountRef.current = 0;
      await executeWithRetry(customOperation || operation);
    },
    [operation, executeWithRetry],
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      lastUpdated: null,
    });
    retryCountRef.current = 0;
  }, [initialData]);

  const retry = useCallback(() => {
    if (state.error) {
      execute();
    }
  }, [state.error, execute]);

  return {
    ...state,
    execute,
    reset,
    retry,
    isStale: state.lastUpdated
      ? Date.now() - state.lastUpdated > 300000
      : false, // 5 minutes
  };
};

// Hook for debounced async operations
export const useDebouncedAsyncOperation = <T>(
  operation: () => Promise<T>,
  delay: number = 300,
  options: UseAsyncOperationOptions<T> = {},
) => {
  const asyncOp = useAsyncOperation(operation, options);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedExecute = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      asyncOp.execute();
    }, delay);
  }, [asyncOp, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...asyncOp,
    execute: debouncedExecute,
    executeImmediately: asyncOp.execute,
  };
};

// Hook for managing loading states with minimum duration
export const useLoadingState = (minimumDuration: number = 500) => {
  const [loading, setLoading] = useState(false);
  const [actuallyLoading, setActuallyLoading] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const startLoading = useCallback(() => {
    startTimeRef.current = Date.now();
    setLoading(true);
    setActuallyLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    if (!startTimeRef.current) {
      setLoading(false);
      setActuallyLoading(false);
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remainingTime = Math.max(0, minimumDuration - elapsed);

    setActuallyLoading(false);

    if (remainingTime > 0) {
      setTimeout(() => {
        setLoading(false);
        startTimeRef.current = null;
      }, remainingTime);
    } else {
      setLoading(false);
      startTimeRef.current = null;
    }
  }, [minimumDuration]);

  return {
    loading,
    actuallyLoading,
    startLoading,
    stopLoading,
  };
};

// Hook for optimistic updates
export const useOptimisticUpdate = <T>(
  currentValue: T,
  updateOperation: (newValue: T) => Promise<T>,
) => {
  const [optimisticValue, setOptimisticValue] = useState(currentValue);
  const [isReverting, setIsReverting] = useState(false);

  const update = useCallback(
    async (newValue: T) => {
      const previousValue = optimisticValue;
      setOptimisticValue(newValue);
      setIsReverting(false);

      try {
        const result = await updateOperation(newValue);
        setOptimisticValue(result);
        return result;
      } catch (error) {
        // Revert to previous value on error
        setOptimisticValue(previousValue);
        setIsReverting(true);
        throw error;
      }
    },
    [optimisticValue, updateOperation],
  );

  // Update optimistic value when current value changes externally
  useEffect(() => {
    if (!isReverting) {
      setOptimisticValue(currentValue);
    }
  }, [currentValue, isReverting]);

  return {
    value: optimisticValue,
    update,
    isReverting,
  };
};
