/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Console Testing Setup
 * Exposes gameplay testing functions to the browser console
 */

import { runQuickBalanceTest } from '../ai/GameplayTester';
import { aiStrategies } from '../ai/AIPlayer';

// Simple verbose test function
async function runVerboseTest() {
  console.log('🚀 Running single verbose test...');

  try {
    // Import the tester directly
    const { GameplayTester } = await import('../ai/GameplayTester');
    const tester = new GameplayTester();

    const config = {
      maxTurns: 100,
      iterations: 1,
      playerStrategy: aiStrategies.aggressive,
      logLevel: 'verbose' as const,
    };

    const result = await tester.runTests(config);
    const gameResult = result.detailedResults[0];

    console.log('\n📊 VERBOSE TEST RESULTS:');
    console.log('========================');
    console.log(`Winner: ${gameResult.winner}`);
    console.log(`Turns: ${gameResult.turns}`);
    console.log(`Final State:`, gameResult.finalState);
    console.log(`Total Decisions: ${gameResult.decisions.length}`);

    if (gameResult.decisions.length > 0) {
      console.log('\nKey Decisions Made:');
      gameResult.decisions.slice(0, 10).forEach((decision, i) => {
        console.log(`${i + 1}. Turn ?: ${decision.type} - ${decision.reasoning}`);
      });
    }

    if (gameResult.balanceIssues.length > 0) {
      console.log('\nBalance Issues Detected:');
      gameResult.balanceIssues.forEach(issue => {
        console.log(`⚠️ ${issue}`);
      });
    }

    return result;
  } catch (error) {
    console.error('❌ Verbose test failed:', error);
    throw error;
  }
}

// Setup console testing functions
export function setupConsoleTesting() {
  if (typeof window === 'undefined') return;

  (window as any).gameplayTesting = {
    runTest: async (strategy: string = 'balanced', iterations: number = 25) => {
      console.log(`🚀 Running ${iterations} games with ${strategy} strategy...`);

      try {
        const result = await runQuickBalanceTest(strategy, iterations);
        console.log(
          `✅ Results: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D (${((result.playerWins / result.totalGames) * 100).toFixed(1)}% win rate)`
        );
        console.log(`⏱️ Average game length: ${result.averageTurns.toFixed(1)} turns`);

        if (result.commonBalanceIssues.length > 0) {
          console.log('⚠️ Balance issues:', result.commonBalanceIssues);
        }

        return result;
      } catch (error) {
        console.error('❌ Test failed:', error);
        throw error;
      }
    },

    runQuick: async () => {
      console.log(`🚀 Running quick 10-game test...`);

      try {
        const result = await runQuickBalanceTest('balanced', 10);
        console.log(
          `✅ Results: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D (${((result.playerWins / result.totalGames) * 100).toFixed(1)}% win rate)`
        );
        return result;
      } catch (error) {
        console.error('❌ Quick test failed:', error);
        throw error;
      }
    },

    runVerbose: runVerboseTest,

    runAll: async (iterations: number = 5) => {
      console.log(`🤖 Testing all strategies with ${iterations} iterations each...`);

      const results: Record<string, any> = {};

      for (const [key, strategy] of Object.entries(aiStrategies)) {
        try {
          console.log(`Testing ${strategy.name}...`);
          const result = await runQuickBalanceTest(key, iterations);
          const winRate = result.playerWins / result.totalGames;

          results[key] = {
            winRate: winRate,
            avgTurns: result.averageTurns,
            wins: result.playerWins,
            losses: result.enemyWins,
            draws: result.draws,
          };

          console.log(`${strategy.name}: ${(winRate * 100).toFixed(1)}% win rate`);
        } catch (error: unknown) {
          console.error(`Failed to test ${strategy.name}:`, error);
          results[key] = {
            error: error instanceof Error ? error.message : String(error),
          };
        }
      }

      console.log('\n📈 COMPREHENSIVE RESULTS:');
      console.log('=========================');
      Object.entries(results).forEach(([key, data]) => {
        if (data.error) {
          console.log(`${key}: ERROR - ${data.error}`);
        } else {
          console.log(
            `${key}: ${(data.winRate * 100).toFixed(1)}% win rate, ${data.avgTurns.toFixed(1)} avg turns (${data.wins}W-${data.losses}L-${data.draws}D)`
          );
        }
      });

      return results;
    },

    strategies: Object.keys(aiStrategies),

    help: () => {
      console.log(`
🤖 Gameplay Testing Console Commands:
=====================================

gameplayTesting.runQuick()                    - Quick 10-game balanced test
gameplayTesting.runTest('strategy', 25)       - Test specific strategy
gameplayTesting.runVerbose()                  - Single detailed test with logging
gameplayTesting.runAll(5)                     - Test all strategies
gameplayTesting.strategies                    - List available strategies
gameplayTesting.help()                        - Show this help

Available strategies: ${Object.keys(aiStrategies).join(', ')}

Examples:
> gameplayTesting.runQuick()                  // Quick test
> gameplayTesting.runVerbose()                // See detailed AI behavior
> gameplayTesting.runTest('aggressive', 10)   // Test aggressive strategy
> gameplayTesting.runAll(3)                   // Test all strategies (3 games each)
      `);
    },
  };

  console.log('🤖 Gameplay testing functions loaded! Type gameplayTesting.help() for commands.');
}

// Auto-setup in development
if (import.meta.env.DEV) {
  // Delay to ensure everything is loaded
  setTimeout(() => {
    setupConsoleTesting();
  }, 2000);
}
