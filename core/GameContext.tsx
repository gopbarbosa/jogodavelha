import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Difficulty, Player } from './gameLogic';

interface GameContextProps {
  mode: 'PVP' | 'CPU';
  setMode: (m: 'PVP' | 'CPU') => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  ai: Player;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'PVP' | 'CPU'>('PVP');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const ai: Player = 'O';

  return (
    <GameContext.Provider value={{ mode, setMode, difficulty, setDifficulty, ai }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
