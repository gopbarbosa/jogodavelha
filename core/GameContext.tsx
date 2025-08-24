import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Difficulty, Player } from './gameLogic';

interface GameContextProps {
  mode: 'PVP' | 'CPU';
  setMode: (m: 'PVP' | 'CPU') => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  ai: Player;
  infiniteMode: boolean;
  setInfiniteMode: (v: boolean) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'PVP' | 'CPU'>('PVP');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [infiniteMode, setInfiniteMode] = useState<boolean>(false);
  const ai: Player = 'O';

  return (
    <GameContext.Provider value={{ mode, setMode, difficulty, setDifficulty, ai, infiniteMode, setInfiniteMode }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
