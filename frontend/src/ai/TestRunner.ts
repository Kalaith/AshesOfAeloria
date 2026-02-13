/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Simple Test Runner for Quick AI Validation
 * Use this to test the AI functionality without the full UI
 */

import { GameplayTester } from "./GameplayTester";
import { aiStrategies } from "./AIPlayer";

/**
 * Run a single quick test with verbose logging
 */
export async function runSingleDebugTest(): Promise<void> {
  console.log("🚀 Running single debug test...");

  const tester = new GameplayTester();

  const config = {
    maxTurns: 50, // Shorter for debugging
    iterations: 1,
    playerStrategy: aiStrategies.aggressive,
    logLevel: "verbose" as const,
  };

  try {
    const result = await tester.runTests(config);

    console.log("\n📊 DEBUG TEST RESULTS:");
    console.log("====================");
    console.log(`Winner: ${result.detailedResults[0].winner}`);
    console.log(`Turns: ${result.detailedResults[0].turns}`);
    console.log(`Final State:`, result.detailedResults[0].finalState);
    console.log(
      `Decisions Made: ${result.detailedResults[0].decisions.length}`,
    );

    if (result.detailedResults[0].decisions.length > 0) {
      console.log("\nKey Decisions:");
      result.detailedResults[0].decisions.slice(0, 5).forEach((decision, i) => {
        console.log(`${i + 1}. ${decision.type}: ${decision.reasoning}`);
      });
    }

    if (result.detailedResults[0].balanceIssues.length > 0) {
      console.log("\nBalance Issues:");
      result.detailedResults[0].balanceIssues.forEach((issue) => {
        console.log(`⚠️ ${issue}`);
      });
    }
  } catch (error) {
    console.error("❌ Debug test failed:", error);
  }
}

/**
 * Run quick tests for all strategies
 */
export async function runAllStrategiesDebug(): Promise<void> {
  console.log("🤖 Testing all strategies...");

  const results: Record<string, any> = {};

  for (const [key, strategy] of Object.entries(aiStrategies)) {
    console.log(`\n🎯 Testing ${strategy.name}...`);

    const tester = new GameplayTester();
    const config = {
      maxTurns: 100,
      iterations: 3, // Quick test
      playerStrategy: strategy,
      logLevel: "minimal" as const,
    };

    try {
      const result = await tester.runTests(config);
      const winRate = result.playerWins / result.totalGames;

      results[key] = {
        winRate,
        avgTurns: result.averageTurns,
        rating:
          winRate >= 0.45 && winRate <= 0.55
            ? "Excellent"
            : winRate >= 0.4 && winRate <= 0.6
              ? "Good"
              : winRate >= 0.3 && winRate <= 0.7
                ? "Fair"
                : "Poor",
      };

      console.log(
        `${strategy.name}: ${(winRate * 100).toFixed(1)}% win rate, ${result.averageTurns.toFixed(1)} avg turns`,
      );
    } catch (error: unknown) {
      console.error(`❌ Failed to test ${strategy.name}:`, error);
      results[key] = {
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  console.log("\n📈 SUMMARY:");
  console.log("============");
  Object.entries(results).forEach(([key, data]) => {
    if (data.error) {
      console.log(`${key}: ERROR - ${data.error}`);
    } else {
      console.log(
        `${key}: ${(data.winRate * 100).toFixed(1)}% (${data.rating})`,
      );
    }
  });
}

/**
 * Test basic AI decision making without full simulation
 */
export function testAIDecisionMaking(): void {
  console.log("🧠 Testing AI decision making...");

  // This would test the AI logic in isolation
  // For now, just confirm the AI classes are working
  console.log("Available strategies:", Object.keys(aiStrategies));

  Object.entries(aiStrategies).forEach(([key, strategy]) => {
    console.log(
      `${key}: Aggression ${strategy.aggressiveness}, Economy ${strategy.economicFocus}`,
    );
  });
}

// Make functions available globally for console testing
if (typeof window !== "undefined") {
  (window as any).aiDebug = {
    runSingleTest: runSingleDebugTest,
    runAllStrategies: runAllStrategiesDebug,
    testDecisions: testAIDecisionMaking,
    help: () => {
      console.log(`
🧪 AI Debug Console Commands:
============================

aiDebug.runSingleTest()     - Run one detailed test with logging
aiDebug.runAllStrategies()  - Quick test of all AI strategies
aiDebug.testDecisions()     - Test AI decision making logic
aiDebug.help()              - Show this help

Example:
> aiDebug.runSingleTest()   // See detailed AI behavior
> aiDebug.runAllStrategies() // Compare all strategies
      `);
    },
  };

  console.log("🧪 AI Debug tools available! Type aiDebug.help() for commands.");
}
