import React from 'react';
import { GameProvider } from './providers/GameProvider';
import { GamePage } from './pages/GamePage';
import './styles/globals.css';

function App() {
  return (
    <GameProvider>
      <div className="h-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
        <GamePage />
      </div>
    </GameProvider>
  );
}

export default App;
