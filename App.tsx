
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { calculateWinner, Player, Cell, Positions, Difficulty, pickMoveByDifficulty } from './core/gameLogic';
import { SupportedLanguage } from './core/i18n';
import AppNavigator from './navigation/AppNavigator';

type Screen = 'START' | 'GAME' | 'SETTINGS';

export default function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const isDark = themeMode === 'dark';
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>('X');
  const [positions, setPositions] = useState<Positions>({ X: [], O: [] });
  const [mode, setMode] = useState<'PVP' | 'CPU'>('PVP');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const ai: Player = 'O';
  const [lang, setLang] = useState<SupportedLanguage>('pt');

  const result = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(
    () => board.every(Boolean) && !result,
    [board, result]
  );

  function handlePress(index: number) {
    if (board[index] || result) return;
    if (mode === 'CPU' && current === ai) return;
    const currList = positions[current];
    const willRemove = currList.length >= 3 ? currList[0] : undefined;
    setBoard((prev: Cell[]) => {
      const next = [...prev];
      if (willRemove !== undefined) next[willRemove] = null;
      next[index] = current;
      return next;
    });
    setPositions((prev: Positions) => {
      const list = prev[current as Player];
      const updated = (list.length >= 3 ? list.slice(1) : list).concat(index);
      return { ...prev, [current as Player]: updated };
    });
    setCurrent((prev: Player) => (prev === 'X' ? 'O' : 'X'));
  }

  // Efeito para a jogada automática da máquina
  useEffect(() => {
    if (mode === 'CPU' && current === ai && !result && !isDraw) {
      // Pequeno delay para parecer "humano"
      const timeout = setTimeout(() => {
        const idx = pickMoveByDifficulty(board, positions, ai, difficulty);
        if (typeof idx === 'number') {
          // Repete a lógica do handlePress, mas para o AI
          const currList = positions[ai];
          const willRemove = currList.length >= 3 ? currList[0] : undefined;
          setBoard(prev => {
            const next = [...prev];
            if (willRemove !== undefined) next[willRemove] = null;
            next[idx] = ai;
            return next;
          });
          setPositions(prev => {
            const list = prev[ai];
            const updated = (list.length >= 3 ? list.slice(1) : list).concat(idx);
            return { ...prev, [ai]: updated };
          });
          setCurrent(prev => (prev === 'X' ? 'O' : 'X'));
        }
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [mode, current, ai, result, isDraw, board, positions, difficulty]);

  function reset() {
    setBoard(Array(9).fill(null));
    setPositions({ X: [], O: [] });
    setCurrent('X');
  }

  const statusText = result
    ? `Vitória de ${result.winner}!`
    : isDraw
    ? 'Empate!'
    : `Vez de ${current}`;

  const theme = isDark
    ? {
        background: '#0f172a',
        container: '#0b1021',
        card: '#0b1229',
        cardActive: '#0f1b3f',
        border: '#334155',
        borderActive: '#475569',
        text: '#e2e8f0',
        textSecondary: '#cbd5e1',
        textMuted: '#94a3b8',
        badge: '#1e293b',
        cellWin: '#064e3b',
      }
    : {
        background: '#f1f5f9',
        container: '#fff',
        card: '#f1f5f9',
        cardActive: '#dbeafe',
        border: '#cbd5e1',
        borderActive: '#60a5fa',
        text: '#0f172a',
        textSecondary: '#334155',
        textMuted: '#64748b',
        badge: '#e0e7ef',
        cellWin: '#bbf7d0',
      };

  // Usa o AppNavigator para navegação stack
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator
        theme={theme}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        board={board}
        setBoard={setBoard}
        current={current}
        setCurrent={setCurrent}
        positions={positions}
        setPositions={setPositions}
        mode={mode}
        setMode={setMode}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        ai={ai}
        lang={lang}
        setLang={setLang}
        result={result}
        isDraw={isDraw}
        handlePress={handlePress}
        reset={reset}
        statusText={statusText}
      />
    </SafeAreaView>
  );
}

const GRID_SIZE = 300;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  topBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0b1229',
  },
  backText: { color: '#e2e8f0', fontWeight: '600' },
  badges: { flexDirection: 'row', gap: 8 },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeText: { color: '#cbd5e1', fontSize: 12, fontWeight: '600' },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  modeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0b1229',
  },
  modeBtnActive: {
    backgroundColor: '#1e293b',
    borderColor: '#475569',
  },
  modeBtnCard: {
    flex: 1,
    minHeight: 96,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0b1229',
    gap: 4,
  },
  modeBtnCardActive: {
    backgroundColor: '#0f1b3f',
    borderColor: '#475569',
  },
  modeCardTitle: { color: '#e2e8f0', fontWeight: '700', fontSize: 16 },
  modeCardTitleActive: { color: '#ffffff' },
  modeCardText: { color: '#94a3b8', fontSize: 12 },
  modeText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  status: {
    fontSize: 18,
    color: '#e2e8f0',
  },
  statusWin: { color: '#22c55e' },
  statusDraw: { color: '#f59e0b' },
  board: {
    width: GRID_SIZE,
    aspectRatio: 1,
    backgroundColor: '#0b1021',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#334155',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b1229',
  },
  cellPressed: {
    backgroundColor: '#0f1b3f',
  },
  cellBorderRight: {
    borderRightWidth: 2,
    borderRightColor: '#334155',
  },
  cellBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#334155',
  },
  cellWin: {
    backgroundColor: '#064e3b',
  },
  cellText: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: 2,
  },
  x: { color: '#38bdf8' },
  o: { color: '#f472b6' },
  resetBtn: {
    marginTop: 12,
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resetText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
