/**
 * Manual Test Setup
 * Simple functions that can be copy-pasted into console
 */

// Simple function that can be called directly from console
export const setupTestingManually = `
// Copy and paste this entire block into the console:

window.gameplayTesting = {
  runQuick: async () => {
    console.log('🚀 Running quick test...');

    try {
      // Dynamic import to avoid module loading issues
      const { runQuickBalanceTest } = await import('/src/ai/GameplayTester.ts');
      const result = await runQuickBalanceTest('balanced', 10);

      console.log('✅ Results:');
      console.log(\`Win Rate: \${(result.playerWins/result.totalGames*100).toFixed(1)}%\`);
      console.log(\`Games: \${result.playerWins}W-\${result.enemyWins}L-\${result.draws}D\`);
      console.log(\`Average Turns: \${result.averageTurns.toFixed(1)}\`);

      return result;
    } catch (error) {
      console.error('❌ Test failed:', error);
      console.log('Try refreshing the page and running this again.');
    }
  },

  runVerbose: async () => {
    console.log('🚀 Running verbose test...');

    try {
      const { GameplayTester } = await import('/src/ai/GameplayTester.ts');
      const { aiStrategies } = await import('/src/ai/AIPlayer.ts');

      const tester = new GameplayTester();
      const config = {
        maxTurns: 50,
        iterations: 1,
        playerStrategy: aiStrategies.aggressive,
        logLevel: 'verbose'
      };

      const result = await tester.runTests(config);
      const game = result.detailedResults[0];

      console.log('✅ Verbose Test Results:');
      console.log(\`Winner: \${game.winner}\`);
      console.log(\`Turns: \${game.turns}\`);
      console.log(\`Decisions: \${game.decisions.length}\`);
      console.log('Final State:', game.finalState);

      return result;
    } catch (error) {
      console.error('❌ Verbose test failed:', error);
    }
  },

  help: () => {
    console.log(\`
🤖 Manual Testing Commands:
===========================

gameplayTesting.runQuick()    - Quick 10-game test
gameplayTesting.runVerbose()  - Single detailed test
gameplayTesting.help()        - Show this help

If tests fail, try refreshing the page first.
    \`);
  }
};

console.log('🤖 Manual testing setup complete! Try gameplayTesting.runQuick()');
`;

// Alternative: Direct test functions that don't rely on imports
export const directTestCode = `
// Alternative: Direct test execution (copy/paste this):

(async () => {
  console.log('🚀 Running direct AI test...');

  try {
    // Simple test that creates a mock game state and tests basic AI
    const mockGameState = {
      turn: 1,
      phase: 'player',
      nodes: [
        { id: 1, owner: 'player', garrison: 100, starLevel: 1, type: 'city', connections: [2, 3] },
        { id: 2, owner: 'neutral', garrison: 50, starLevel: 1, type: 'resource', connections: [1] },
        { id: 3, owner: 'enemy', garrison: 75, starLevel: 1, type: 'fortress', connections: [1] }
      ],
      commanders: [],
      resources: { gold: 500, supplies: 100, mana: 50 }
    };

    console.log('✅ Mock test setup complete');
    console.log('Initial state:', mockGameState.nodes.map(n => \`\${n.id}:\${n.owner}\`));

    // This would test basic AI logic without full simulation
    console.log('🎯 AI would analyze this state and make decisions');
    console.log('Player has 1 node, Enemy has 1 node, Neutral has 1 node');

    return mockGameState;
  } catch (error) {
    console.error('❌ Direct test failed:', error);
  }
})();
`;

console.log('Manual test setup code available. Check the console for copy-paste instructions.');
