import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Difficulty, Player, Cell, Positions, calculateWinner, pickMoveByDifficulty } from '../core/gameLogic';
import { useGame } from '../core/GameContext';
import { RewardedInterstitialAd, RewardedAdEventType, AdEventType } from 'react-native-google-mobile-ads';
import { AdsUnitIds } from '../core/adsUnitIds';
import { t, SupportedLanguage } from '../core/i18n';


interface GameScreenProps {
  theme: any;
  lang: SupportedLanguage;
  navigation: any;
}

  const GameScreen: React.FC<GameScreenProps> = ({
    theme,
    lang,
    navigation,
  }) => {
  // Usa contexto global para modo, dificuldade e ai
  const { mode, difficulty, ai } = useGame();
    // Estado do jogo
    const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
    const [current, setCurrent] = useState<Player>('X');
    const [positions, setPositions] = useState<Positions>({ X: [], O: [] });
    const [gamesPlayed, setGamesPlayed] = useState(0);

    const result = useMemo(() => calculateWinner(board), [board]);
    const isDraw = useMemo(() => board.every(Boolean) && !result, [board, result]);

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

    // Jogada automática da máquina
    useEffect(() => {
      if (mode === 'CPU' && current === ai && !result && !isDraw) {
        const timeout = setTimeout(() => {
          const idx = pickMoveByDifficulty(board, positions, ai, difficulty);
          if (typeof idx === 'number') {
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

    // Função para mostrar rewarded interstitial
    function showRewardedInterstitialIfNeeded() {
      const nextCount = gamesPlayed + 1;
      setGamesPlayed(nextCount);
      if (nextCount % 5 === 0) {
        const unitId = AdsUnitIds.rewardedInterstitialAd || '';
        const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(unitId, {
          requestNonPersonalizedAdsOnly: false,
        });
        const unsubscribe = rewardedInterstitial.addAdEventListener(RewardedAdEventType.LOADED, () => {
          rewardedInterstitial.show();
        });
        const unsubClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
          unsubscribe();
          unsubClosed();
        });
        rewardedInterstitial.load();
      }
    }

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

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (result || isDraw) {
              showRewardedInterstitialIfNeeded();
            }
            reset();
          }}
          style={[{ marginTop: 24, backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1, alignSelf: 'center' }] }
        >
          <Text style={[{ color: theme.text, fontSize: 16, fontWeight: '600' }]}>{result || isDraw ? t('playAgain', lang) : t('restart', lang)}</Text>
        </Pressable>

        <View style={{ position: 'absolute', bottom: 24, alignSelf: 'center' }}>
          <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>{t('localInfo', lang)}</Text>
        </View>
      </View>
    );
  };

  export default GameScreen;
