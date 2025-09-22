import React from 'react';
import { GameProvider } from './providers/GameProvider';
import { GamePage } from './pages/GamePage';
import './styles/globals.css';

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
