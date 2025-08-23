import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Difficulty } from '../core/gameLogic';
import { t, SupportedLanguage } from '../core/i18n';

interface StartScreenProps {
  theme: any;
  mode: 'PVP' | 'CPU';
  setMode: (m: 'PVP' | 'CPU') => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (t: 'light' | 'dark') => void;
  lang: SupportedLanguage;
  setLang: (l: SupportedLanguage) => void;
  navigation: any;
}

const StartScreen: React.FC<StartScreenProps> = ({
  theme,
  mode,
  setMode,
  difficulty,
  setDifficulty,
  themeMode,
  setThemeMode,
  lang,
  setLang,
  navigation,
}) => {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 48, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: theme.container }}>
        {/* Top bar: idioma + config */}
        <View style={{ flexDirection: 'row',  justifyContent: 'flex-end' }}>
         
          <Pressable onPress={() => navigation.navigate('Settings')} style={{ padding: 8, borderRadius: 999, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.textSecondary, fontWeight: '600', fontSize: 16 }}>⚙️</Text>
          </Pressable>
        </View>
        <Text style={[{ fontSize: 28, fontWeight: '700', color: theme.text }]}>{t('title', lang)}</Text>
        <Text style={[{ fontSize: 16, color: theme.textSecondary }]}>{t('chooseMode', lang)}</Text>


        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
          <Pressable
            onPress={() => setMode('PVP')}
            style={[{ flex: 1, minHeight: 96, padding: 12, borderRadius: 12, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 4 }, mode === 'PVP' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 16 }, mode === 'PVP' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>{t('twoPlayers', lang)}</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>{t('twoPlayersDesc', lang)}</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('CPU')}
            style={[{ flex: 1, minHeight: 96, padding: 12, borderRadius: 12, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 4 }, mode === 'CPU' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 16 }, mode === 'CPU' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>{t('vsCpu', lang)}</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>{t('vsCpuDesc', lang)}</Text>
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
                  {level === 'EASY' ? t('easy', lang) : level === 'MEDIUM' ? t('medium', lang) : t('hard', lang)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={() => { navigation.navigate('Game'); }}
          style={[{ marginTop: 24, backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1 }]}
        >
          <Text style={[{ color: theme.text, fontSize: 16, fontWeight: '600' }]}>{t('start', lang)}</Text>
        </Pressable>

        <View style={{ marginTop: 16 }}>
          <Text style={[{ color: theme.textMuted, fontSize: 12 }]}>{t('rule', lang)}</Text>
        </View>
      </View>
    );
  };

  export default StartScreen;
