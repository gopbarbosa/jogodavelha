import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Difficulty, Player, Cell } from '../core/gameLogic';
import { t, SupportedLanguage } from '../core/i18n';

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
  statusText: string;
  lang: SupportedLanguage;
  navigation: any;
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
    statusText,
    lang,
    navigation,
  }) => {
    return (
      <View style={[{ flex: 1, backgroundColor: theme.container, paddingHorizontal: 16, paddingBottom: 16 }] }>
        <View style={{ position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => { navigation.goBack(); }} style={[{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }] }>
            <Text style={[{ color: theme.text, fontWeight: '600' }]}>{t('back', lang)}</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={[{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: theme.badge, borderWidth: 1, borderColor: theme.border }]}><Text style={[{ color: theme.textMuted, fontSize: 12, fontWeight: '600' }]}>{mode === 'CPU' ? t('machine', lang) : t('twoPlayers', lang)}</Text></View>
            {mode === 'CPU' && (
              <View style={[{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: theme.badge, borderWidth: 1, borderColor: theme.border }]}><Text style={[{ color: theme.textMuted, fontSize: 12, fontWeight: '600' }]}>{difficulty === 'EASY' ? t('easy', lang) : difficulty === 'MEDIUM' ? t('medium', lang) : t('hard', lang)}</Text></View>
            )}
          </View>
        </View>
        <Text style={[{ fontSize: 28, fontWeight: '700', color: theme.text, marginTop: 48, textAlign: 'center' }]}>{t('title', lang)}</Text>
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
          <Text style={[{ color: theme.text, fontSize: 16, fontWeight: '600' }]}>{result || isDraw ? t('playAgain', lang) : t('restart', lang)}</Text>
        </Pressable>

        <View style={{ position: 'absolute', bottom: 24, alignSelf: 'center' }}>
          <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>{t('localInfo', lang)}</Text>
        </View>
      </View>
    );
  };

  export default GameScreen;
