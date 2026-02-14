import React from 'react';
import { GameProvider } from './providers/GameProvider';
import { GamePage } from './pages/GamePage';
import './styles/globals.css';

// Setup console testing in development
if (import.meta.env.DEV) {
  import('./utils/consoleTestingSetup');
}

function App() {
  return (
    <GameProvider>
      <div className="h-screen bg-stone-texture text-parchment-light flex flex-col overflow-hidden font-parchment">
        <GamePage />
      </div>
    </GameProvider>
  );
}

export default App;
