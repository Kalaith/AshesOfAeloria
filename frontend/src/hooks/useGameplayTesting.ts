/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * React Hook for Gameplay Testing
 * Provides easy access to testing functions from components
 */

import { useState, useCallback } from 'react';
import { GameplayTester, runQuickBalanceTest, type BalanceReport } from '../ai/GameplayTester';
import { AI_STRATEGIES } from '../ai/AIPlayer';

export interface TestingState {
  isRunning: boolean;
  currentTest: string | null;
  results: BalanceReport[];
  error: string | null;
}

export const useGameplayTesting = () => {
  const [state, setState] = useState<TestingState>({
    isRunning: false,
    currentTest: null,
    results: [],
    error: null
  });

  const runTest = useCallback(async (strategy: string = 'balanced', iterations: number = 25) => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      currentTest: strategy,
      error: null
    }));

    try {
      console.log(`🚀 Starting gameplay test: ${strategy} strategy, ${iterations} iterations`);

      const result = await runQuickBalanceTest(strategy, iterations);

      setState(prev => ({
        ...prev,
        isRunning: false,
        currentTest: null,
        results: [result, ...prev.results]
      }));

      // Log summary to console for quick analysis
      console.log(`✅ Test completed!`);
      console.log(`📊 Results: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D (${(result.playerWins/result.totalGames*100).toFixed(1)}% win rate)`);
      console.log(`⏱️ Average game length: ${result.averageTurns.toFixed(1)} turns`);

      if (result.commonBalanceIssues.length > 0) {
        console.log(`⚠️ Balance issues detected:`);
        result.commonBalanceIssues.forEach(issue => console.log(`  - ${issue}`));
      }

      if (result.recommendations.length > 0) {
        console.log(`💡 Recommendations:`);
        result.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        isRunning: false,
        currentTest: null,
        error: errorMessage
      }));

      console.error('❌ Test failed:', errorMessage);
      throw error;
    }
  }, []);

  const runAllStrategies = useCallback(async (iterations: number = 10) => {
    const strategies = Object.keys(AI_STRATEGIES);
    const results: BalanceReport[] = [];

    console.log(`🤖 Running comprehensive balance test across ${strategies.length} strategies...`);

    for (const strategy of strategies) {
      try {
        const result = await runTest(strategy, iterations);
        results.push(result);
      } catch (error) {
        console.error(`Failed to test strategy ${strategy}:`, error);
      }
    }

    // Generate comprehensive analysis
    if (results.length > 0) {
      console.log(`\n📈 COMPREHENSIVE BALANCE ANALYSIS`);
      console.log(`=====================================`);

      results.forEach(result => {
        const strategy = result.detailedResults[0]?.strategy.name || 'Unknown';
        const winRate = result.playerWins / result.totalGames;
        const rating = getBalanceRating(winRate);

        console.log(`${strategy}: ${(winRate*100).toFixed(1)}% win rate (${rating})`);
      });

      // Overall balance assessment
      const avgWinRate = results.reduce((sum, r) => sum + r.playerWins/r.totalGames, 0) / results.length;
      console.log(`\nOverall Balance: ${(avgWinRate*100).toFixed(1)}% average win rate`);

      if (avgWinRate >= 0.45 && avgWinRate <= 0.55) {
        console.log(`✅ Game balance is excellent!`);
      } else if (avgWinRate >= 0.4 && avgWinRate <= 0.6) {
        console.log(`✅ Game balance is good.`);
      } else {
        console.log(`⚠️ Game balance needs attention.`);
      }
    }

    return results;
  }, [runTest]);

  const clearResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      results: [],
      error: null
    }));
  }, []);

  // Expose testing functions to global scope for console access
  const exposeToConsole = useCallback(() => {
    if (typeof window !== 'undefined') {
      (window as any).gameplayTesting = {
        runTest,
        runAllStrategies,
        strategies: Object.keys(AI_STRATEGIES),
        runQuick: () => runTest('balanced', 10),
        runComprehensive: () => runAllStrategies(25),
        help: () => {
          console.log(`
🤖 Gameplay Testing Console Commands:
=====================================

gameplayTesting.runQuick()                    - Quick 10-game test with balanced strategy
gameplayTesting.runTest('aggressive', 25)     - Test specific strategy with custom iterations
gameplayTesting.runAllStrategies(10)          - Test all strategies (10 games each)
gameplayTesting.runComprehensive()            - Full test suite (25 games per strategy)
gameplayTesting.strategies                    - List available strategies

Available strategies: ${Object.keys(AI_STRATEGIES).join(', ')}

Example usage:
> gameplayTesting.runTest('rushdown', 20)  // Test aggressive early-game strategy
> gameplayTesting.runAllStrategies(5)      // Quick test of all strategies
          `);
        }
      };

      console.log(`🤖 Gameplay testing functions exposed to console. Type 'gameplayTesting.help()' for commands.`);
    }
  }, [runTest, runAllStrategies]);

  return {
    ...state,
    runTest,
    runAllStrategies,
    clearResults,
    exposeToConsole
  };
};

function getBalanceRating(winRate: number): string {
  if (winRate >= 0.45 && winRate <= 0.55) return 'Excellent';
  if (winRate >= 0.4 && winRate <= 0.6) return 'Good';
  if (winRate >= 0.3 && winRate <= 0.7) return 'Fair';
  return 'Poor';
}

// Auto-expose to console in development (removed to fix import issues)
// We'll expose this differently
