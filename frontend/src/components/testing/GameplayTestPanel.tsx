/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/**
 * Gameplay Testing Panel Component
 * UI for running automated gameplay tests and viewing balance reports
 */

import React, { useState, useEffect } from "react";
import {
  GameplayTester,
  runQuickBalanceTest,
  type BalanceReport,
} from "../../ai/GameplayTester";
import { aiStrategies, type AIStrategy } from "../../ai/AIPlayer";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface TestRun {
  id: string;
  timestamp: Date;
  strategy: string;
  iterations: number;
  status: "running" | "completed" | "error";
  progress: number;
  result?: BalanceReport;
  error?: string;
}

export const GameplayTestPanel: React.FC = () => {
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("balanced");
  const [iterations, setIterations] = useState<number>(25);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "controls" | "results" | "analysis"
  >("controls");

  const handleRunTest = async () => {
    if (isRunning) return;

    const testId = `test_${Date.now()}`;
    const newTestRun: TestRun = {
      id: testId,
      timestamp: new Date(),
      strategy: selectedStrategy,
      iterations,
      status: "running",
      progress: 0,
    };

    setTestRuns((prev) => [newTestRun, ...prev]);
    setIsRunning(true);

    try {
      console.log(
        `🚀 Starting balance test: ${selectedStrategy} strategy, ${iterations} iterations`,
      );

      const result = await runQuickBalanceTest(selectedStrategy, iterations);

      setTestRuns((prev) =>
        prev.map((run) =>
          run.id === testId
            ? { ...run, status: "completed", progress: 100, result }
            : run,
        ),
      );

      console.log(`✅ Test completed:`, result);
    } catch (error) {
      console.error("❌ Test failed:", error);
      setTestRuns((prev) =>
        prev.map((run) =>
          run.id === testId
            ? {
                ...run,
                status: "error",
                error: error instanceof Error ? error.message : "Unknown error",
              }
            : run,
        ),
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunMultipleStrategies = async () => {
    if (isRunning) return;

    setIsRunning(true);

    const strategies = Object.keys(aiStrategies);
    for (const strategy of strategies) {
      setSelectedStrategy(strategy);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay
      await handleRunTest();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay between tests
    }

    setIsRunning(false);
  };

  const getWinRateColor = (winRate: number): string => {
    if (winRate > 0.7) return "text-forest";
    if (winRate > 0.5) return "text-amber";
    if (winRate > 0.3) return "text-ember";
    return "text-blood";
  };

  const getBalanceRating = (winRate: number): string => {
    if (winRate >= 0.45 && winRate <= 0.55) return "Excellent";
    if (winRate >= 0.4 && winRate <= 0.6) return "Good";
    if (winRate >= 0.3 && winRate <= 0.7) return "Fair";
    return "Poor";
  };

  // Expose testing functions to console when this component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).gameplayTesting = {
        runQuick: async () => {
          console.log("🚀 Running quick test...");
          try {
            const result = await runQuickBalanceTest("balanced", 10);
            console.log(
              `✅ Results: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D (${((result.playerWins / result.totalGames) * 100).toFixed(1)}% win rate)`,
            );
            return result;
          } catch (error) {
            console.error("❌ Test failed:", error);
          }
        },

        runTest: async (
          strategy: string = "balanced",
          iterations: number = 25,
        ) => {
          console.log(
            `🚀 Running ${iterations} games with ${strategy} strategy...`,
          );
          try {
            const result = await runQuickBalanceTest(strategy, iterations);
            console.log(
              `✅ Results: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D (${((result.playerWins / result.totalGames) * 100).toFixed(1)}% win rate)`,
            );
            return result;
          } catch (error) {
            console.error("❌ Test failed:", error);
          }
        },

        runVerbose: async () => {
          console.log("🚀 Running verbose test...");
          try {
            const tester = new GameplayTester();
            const config = {
              maxTurns: 100,
              iterations: 1,
              playerStrategy: aiStrategies.aggressive,
              logLevel: "verbose" as const,
            };

            const result = await tester.runTests(config);
            const game = result.detailedResults[0];

            console.log("✅ Verbose Test Results:");
            console.log(`Winner: ${game.winner}`);
            console.log(`Turns: ${game.turns}`);
            console.log(`Decisions: ${game.decisions.length}`);
            console.log("Final State:", game.finalState);

            if (game.decisions.length > 0) {
              console.log("Key Decisions:");
              game.decisions.slice(0, 10).forEach((decision, i) => {
                console.log(
                  `${i + 1}. ${decision.type}: ${decision.reasoning}`,
                );
              });
            }

            return result;
          } catch (error) {
            console.error("❌ Verbose test failed:", error);
          }
        },

        strategies: Object.keys(aiStrategies),

        help: () => {
          console.log(`
🤖 Gameplay Testing Console Commands:
=====================================

gameplayTesting.runQuick()                    - Quick 10-game test
gameplayTesting.runTest('strategy', 25)       - Test specific strategy
gameplayTesting.runVerbose()                  - Single detailed test with logging
gameplayTesting.strategies                    - List available strategies
gameplayTesting.help()                        - Show this help

Available strategies: ${Object.keys(aiStrategies).join(", ")}

Examples:
> gameplayTesting.runQuick()                  // Quick balanced test
> gameplayTesting.runVerbose()                // See detailed AI behavior
> gameplayTesting.runTest('aggressive', 10)   // Test aggressive strategy
          `);
        },
      };

      console.log(
        "🤖 Gameplay testing functions are now available! Type gameplayTesting.help() for commands.",
      );
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-stone-texture p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-frontier font-bold text-on-dark mb-2">
          🤖 Gameplay Balance Testing
        </h2>
        <p className="text-on-dark font-parchment">
          Run automated AI vs AI gameplay tests to validate game balance and
          identify potential issues
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {["controls", "results", "analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded font-frontier font-bold transition-all duration-300 border-2 ${
              activeTab === tab
                ? "bg-bronze-texture text-parchment-light border-ember animate-ember-glow"
                : "bg-metal-texture text-parchment border-iron-light hover:border-bronze hover:bg-bronze-texture"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "controls" && (
          <div className="space-y-6">
            {/* Test Configuration */}
            <Card className="p-6">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-4 text-battle-worn">
                Test Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-frontier font-bold text-bronze mb-2 block">
                    AI Strategy
                  </label>
                  <select
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value)}
                    className="w-full p-3 rounded border-2 border-bronze bg-parchment text-iron-dark font-parchment"
                    disabled={isRunning}
                  >
                    {Object.entries(aiStrategies).map(([key, strategy]) => (
                      <option key={key} value={key}>
                        {strategy.name} - {strategy.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-frontier font-bold text-bronze mb-2 block">
                    Test Iterations
                  </label>
                  <input
                    type="number"
                    value={iterations}
                    onChange={(e) =>
                      setIterations(
                        Math.max(
                          1,
                          Math.min(100, parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    min="1"
                    max="100"
                    className="w-full p-3 rounded border-2 border-bronze bg-parchment text-iron-dark font-parchment"
                    disabled={isRunning}
                  />
                  <p className="text-xs text-parchment-dark mt-1">
                    Higher iterations provide more accurate results but take
                    longer
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  onClick={handleRunTest}
                  disabled={isRunning}
                  className="font-frontier font-bold w-full md:w-auto"
                  leftIcon="🚀"
                >
                  {isRunning ? "Running Test..." : "Run Balance Test"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleRunMultipleStrategies}
                  disabled={isRunning}
                  className="font-frontier font-bold w-full md:w-auto"
                  leftIcon="🔄"
                >
                  Test All Strategies
                </Button>
              </div>
            </Card>

            {/* Strategy Details */}
            <Card className="p-6">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-4 text-battle-worn">
                Strategy Details: {aiStrategies[selectedStrategy].name}
              </h3>

              <p className="text-parchment-dark font-parchment mb-4">
                {aiStrategies[selectedStrategy].description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-frontier font-bold text-bronze">
                      Aggressiveness:
                    </span>
                    <span className="text-parchment-dark">
                      {(
                        aiStrategies[selectedStrategy].aggressiveness * 100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-frontier font-bold text-bronze">
                      Economic Focus:
                    </span>
                    <span className="text-parchment-dark">
                      {(
                        aiStrategies[selectedStrategy].economicFocus * 100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-frontier font-bold text-bronze">
                      Expansion Rate:
                    </span>
                    <span className="text-parchment-dark">
                      {(
                        aiStrategies[selectedStrategy].expansionRate * 100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-frontier font-bold text-bronze">
                      Risk Tolerance:
                    </span>
                    <span className="text-parchment-dark">
                      {(
                        aiStrategies[selectedStrategy].riskTolerance * 100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-4">
            {testRuns.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-parchment-dark font-parchment">
                  No test runs yet. Start a test to see results here.
                </p>
              </Card>
            ) : (
              testRuns.map((testRun) => (
                <Card key={testRun.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-frontier font-bold text-lg text-iron-dark">
                        {aiStrategies[testRun.strategy].name}
                      </h3>
                      <p className="text-sm text-parchment-dark">
                        {testRun.timestamp.toLocaleString()} •{" "}
                        {testRun.iterations} iterations
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded font-frontier font-bold text-xs border-2 ${
                        testRun.status === "completed"
                          ? "bg-forest/20 text-forest border-forest"
                          : testRun.status === "running"
                            ? "bg-ember/20 text-ember border-ember animate-ember-glow"
                            : "bg-blood/20 text-blood border-blood"
                      }`}
                    >
                      {testRun.status.toUpperCase()}
                    </div>
                  </div>

                  {testRun.status === "running" && (
                    <div className="mb-4">
                      <div className="w-full bg-iron-dark rounded-full h-2 border border-bronze">
                        <div
                          className="h-2 rounded-full bg-ember animate-ember-glow transition-all duration-500"
                          style={{ width: `${testRun.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {testRun.status === "completed" && testRun.result && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-frontier font-bold text-iron-dark">
                          {testRun.result.playerWins}
                        </div>
                        <div className="text-sm text-forest">Player Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-frontier font-bold text-iron-dark">
                          {testRun.result.enemyWins}
                        </div>
                        <div className="text-sm text-blood">Enemy Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-frontier font-bold text-iron-dark">
                          {testRun.result.draws}
                        </div>
                        <div className="text-sm text-iron-light">Draws</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-frontier font-bold text-iron-dark">
                          {testRun.result.averageTurns.toFixed(1)}
                        </div>
                        <div className="text-sm text-bronze">Avg Turns</div>
                      </div>
                    </div>
                  )}

                  {testRun.status === "error" && (
                    <div className="text-blood text-sm">
                      Error: {testRun.error}
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">
            {/* Win Rate Analysis */}
            <Card className="p-6">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-4 text-battle-worn">
                Win Rate Analysis
              </h3>

              {testRuns.filter((r) => r.status === "completed").length === 0 ? (
                <p className="text-parchment-dark font-parchment">
                  Complete some tests to see analysis here.
                </p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(aiStrategies).map(([key, strategy]) => {
                    const relevantTests = testRuns.filter(
                      (r) =>
                        r.status === "completed" &&
                        r.strategy === key &&
                        r.result,
                    );

                    if (relevantTests.length === 0) return null;

                    const avgWinRate =
                      relevantTests.reduce(
                        (sum, test) =>
                          sum +
                          test.result!.playerWins / test.result!.totalGames,
                        0,
                      ) / relevantTests.length;

                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3 bg-metal-texture rounded border border-bronze"
                      >
                        <div>
                          <span className="font-frontier font-bold text-parchment-light">
                            {strategy.name}
                          </span>
                          <span className="text-sm text-parchment-dark ml-2">
                            ({relevantTests.length} test
                            {relevantTests.length !== 1 ? "s" : ""})
                          </span>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-frontier font-bold ${getWinRateColor(avgWinRate)}`}
                          >
                            {(avgWinRate * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-parchment-dark">
                            {getBalanceRating(avgWinRate)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Balance Issues */}
            <Card className="p-6">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-4 text-battle-worn">
                Common Balance Issues
              </h3>

              {(() => {
                const completedTests = testRuns.filter(
                  (r) => r.status === "completed" && r.result,
                );
                if (completedTests.length === 0) {
                  return (
                    <p className="text-parchment-dark font-parchment">
                      No completed tests to analyze.
                    </p>
                  );
                }

                const allIssues = completedTests.flatMap(
                  (test) => test.result!.commonBalanceIssues,
                );
                if (allIssues.length === 0) {
                  return (
                    <p className="text-forest font-parchment">
                      No significant balance issues detected! 🎉
                    </p>
                  );
                }

                return (
                  <div className="space-y-2">
                    {allIssues.slice(0, 5).map((issue, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blood/10 border border-blood rounded"
                      >
                        <span className="text-blood font-parchment">
                          ⚠️ {issue}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-4 text-battle-worn">
                Balance Recommendations
              </h3>

              {(() => {
                const completedTests = testRuns.filter(
                  (r) => r.status === "completed" && r.result,
                );
                if (completedTests.length === 0) {
                  return (
                    <p className="text-parchment-dark font-parchment">
                      Complete tests to get recommendations.
                    </p>
                  );
                }

                const allRecommendations = completedTests.flatMap(
                  (test) => test.result!.recommendations,
                );
                const uniqueRecommendations = [...new Set(allRecommendations)];

                return (
                  <div className="space-y-2">
                    {uniqueRecommendations
                      .slice(0, 5)
                      .map((recommendation, index) => (
                        <div
                          key={index}
                          className="p-3 bg-crystal/10 border border-crystal rounded"
                        >
                          <span className="text-crystal font-parchment">
                            💡 {recommendation}
                          </span>
                        </div>
                      ))}
                  </div>
                );
              })()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
