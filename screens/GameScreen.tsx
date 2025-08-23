import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Difficulty, Player, Cell } from '../core/gameLogic';

interface GameScreenProps {
  theme: any;
  board: Cell[];
  current: Player;
  result: any;
  isDraw: boolean;
  handlePress: (idx: number) => void;
  reset: () => void;
  mode: 'PVP' | 'CPU';
  difficulty: Difficulty;
  ai: Player;
  setScreen: (s: 'START' | 'GAME') => void;
  statusText: string;
}

  const GameScreen: React.FC<GameScreenProps> = ({
    theme,
    board,
    current,
    result,
    isDraw,
    handlePress,
    reset,
    mode,
    difficulty,
    ai,
    setScreen,
    statusText,
  }) => {
    return (
      <View style={[{ flex: 1, backgroundColor: theme.container, paddingHorizontal: 16, paddingBottom: 16 }] }>
        <View style={{ position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => { setScreen('START'); }} style={[{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }] }>
            <Text style={[{ color: theme.text, fontWeight: '600' }]}>Voltar</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={[{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: theme.badge, borderWidth: 1, borderColor: theme.border }]}><Text style={[{ color: theme.textMuted, fontSize: 12, fontWeight: '600' }]}>{mode === 'CPU' ? 'Máquina' : '2 Jogadores'}</Text></View>
            {mode === 'CPU' && (
              <View style={[{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: theme.badge, borderWidth: 1, borderColor: theme.border }]}><Text style={[{ color: theme.textMuted, fontSize: 12, fontWeight: '600' }]}>{difficulty === 'EASY' ? 'Fácil' : difficulty === 'MEDIUM' ? 'Médio' : 'Difícil'}</Text></View>
            )}
          </View>
        </View>
        <Text style={[{ fontSize: 28, fontWeight: '700', color: theme.text, marginTop: 48, textAlign: 'center' }]}>Jogo da Velha</Text>
        <Text style={[{ fontSize: 18, color: result ? '#22c55e' : isDraw ? '#f59e0b' : theme.text, textAlign: 'center' }]}>{statusText}</Text>

        <View style={{ width: 300, aspectRatio: 1, backgroundColor: theme.card, borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: theme.border, alignSelf: 'center', marginTop: 16 }}>
          {[0,1,2].map(row => (
            <View key={row} style={{ flex: 1, flexDirection: 'row' }}>
              {[0,1,2].map(col => {
                const idx = row * 3 + col;
                const value = board[idx];
                const isWinningCell = !!result && result.line.includes(idx);
                return (
                  <Pressable
                    key={idx}
                    onPress={() => handlePress(idx)}
                    style={({ pressed }: { pressed: boolean }) => [
                      { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.card },
                      (row < 2) && { borderBottomWidth: 2, borderBottomColor: theme.border },
                      (col < 2) && { borderRightWidth: 2, borderRightColor: theme.border },
                      isWinningCell && { backgroundColor: theme.cellWin },
                      pressed && !value && !result && !isDraw && !(mode === 'CPU' && current === ai) && { backgroundColor: theme.cardActive },
                    ]}
                  >
                    <Text style={[{ fontSize: 52, fontWeight: '800', letterSpacing: 2 }, value === 'X' ? { color: '#38bdf8' } : value === 'O' ? { color: '#f472b6' } : { color: theme.text } ]}>
                      {value ?? ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <Pressable accessibilityRole="button" onPress={reset} style={[{ marginTop: 24, backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1, alignSelf: 'center' }] }>
          <Text style={[{ color: theme.text, fontSize: 16, fontWeight: '600' }]}>{result || isDraw ? 'Jogar novamente' : 'Reiniciar'}</Text>
        </Pressable>

        <View style={{ position: 'absolute', bottom: 24, alignSelf: 'center' }}>
          <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>Dois jogadores no mesmo dispositivo</Text>
        </View>
      </View>
    );
  };

  export default GameScreen;
