// Quick balance test to verify fixes
console.log('🚀 Testing balance fixes...');

async function testBalance() {
  try {
    // Import the testing functions
    const { runQuickBalanceTest } = await import('./src/ai/GameplayTester.js');

    console.log('📊 Running 5 balanced strategy tests...');
    const result = await runQuickBalanceTest('balanced', 5);

    console.log('\n✅ BALANCE TEST RESULTS:');
    console.log('========================');
    console.log(`Win Rate: ${(result.playerWins/result.totalGames*100).toFixed(1)}%`);
    console.log(`Games: ${result.playerWins}W-${result.enemyWins}L-${result.draws}D`);
    console.log(`Average Turns: ${result.averageTurns.toFixed(1)}`);
    console.log(`Longest Game: ${Math.max(...result.gameLengths)} turns`);
    console.log(`Shortest Game: ${Math.min(...result.gameLengths)} turns`);

    if (result.commonBalanceIssues.length > 0) {
      console.log('\n⚠️ Balance Issues Found:');
      result.commonBalanceIssues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ No major balance issues detected!');
    }

    console.log('\n🎯 Balance Fix Status:');
    console.log(`  - Games lasting 15+ turns: ${result.gameLengths.filter(l => l >= 15).length}/${result.totalGames}`);
    console.log(`  - Win rate in balanced range (30-70%): ${result.playerWins/result.totalGames >= 0.3 && result.playerWins/result.totalGames <= 0.7 ? '✅ Yes' : '❌ No'}`);

  } catch (error) {
    console.error('❌ Balance test failed:', error);
  }
}

// Auto-run after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testBalance);
} else {
  setTimeout(testBalance, 2000);
}