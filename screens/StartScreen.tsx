import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Difficulty } from '../core/gameLogic';

interface StartScreenProps {
  theme: any;
  mode: 'PVP' | 'CPU';
  setMode: (m: 'PVP' | 'CPU') => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  onStart: () => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (t: 'light' | 'dark') => void;
}

  const StartScreen: React.FC<StartScreenProps> = ({
    theme,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    onStart,
    themeMode,
    setThemeMode,
  }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 48, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: theme.container }}>
        <Text style={[{ fontSize: 28, fontWeight: '700', color: theme.text }]}>Jogo da Velha</Text>
        <Text style={[{ fontSize: 16, color: theme.textSecondary }]}>Escolha o modo de jogo</Text>

        {/* Seletor de tema */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <Pressable
            onPress={() => setThemeMode('light')}
            style={[{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }, themeMode === 'light' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.textSecondary, fontWeight: '600' }, themeMode === 'light' && { color: '#2563eb' }]}>Claro</Text>
          </Pressable>
          <Pressable
            onPress={() => setThemeMode('dark')}
            style={[{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }, themeMode === 'dark' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.textSecondary, fontWeight: '600' }, themeMode === 'dark' && { color: '#fff' }]}>Escuro</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
          <Pressable
            onPress={() => setMode('PVP')}
            style={[{ flex: 1, minHeight: 96, padding: 12, borderRadius: 12, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 4 }, mode === 'PVP' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 16 }, mode === 'PVP' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>2 Jogadores</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>Jogue localmente, alternando entre X e O.</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('CPU')}
            style={[{ flex: 1, minHeight: 96, padding: 12, borderRadius: 12, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 4 }, mode === 'CPU' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 16 }, mode === 'CPU' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>Contra a Máquina</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>Desafie a IA com 3 dificuldades.</Text>
          </Pressable>
        </View>

        {mode === 'CPU' && (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {(['EASY','MEDIUM','HARD'] as Difficulty[]).map(level => (
              <Pressable
                key={level}
                onPress={() => setDifficulty(level)}
                style={[{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }, difficulty === level && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
              >
                <Text style={[{ color: theme.textSecondary, fontWeight: '600' }, difficulty === level && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}> 
                  {level === 'EASY' ? 'Fácil' : level === 'MEDIUM' ? 'Médio' : 'Difícil'}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={[{ marginTop: 24, backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1 }]}
        >
          <Text style={[{ color: theme.text, fontSize: 16, fontWeight: '600' }]}>Começar</Text>
        </Pressable>

        <View style={{ marginTop: 16 }}>
          <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>Regra: cada jogador pode ter no máximo 3 peças; a mais antiga some ao jogar a 4ª.</Text>
        </View>
      </View>
    );
  };

  export default StartScreen;
