import React from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { View, Text, Pressable, Platform } from 'react-native';
import { Difficulty } from '../core/gameLogic';
import { useGame } from '../core/GameContext';
import { t, SupportedLanguage } from '../core/i18n';
import { AdsUnitIds } from '../core/adsUnitIds';

interface StartScreenProps {
  theme: any;
  themeMode: 'light' | 'dark';
  setThemeMode: (t: 'light' | 'dark') => void;
  lang: SupportedLanguage;
  setLang: (l: SupportedLanguage) => void;
  navigation: any;
}

const StartScreen: React.FC<StartScreenProps> = ({
  theme,
  themeMode,
  setThemeMode,
  lang,
  setLang,
  navigation,
}) => {
  const { mode, setMode, difficulty, setDifficulty } = useGame();
  return (
  <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 64, paddingHorizontal: 20, paddingBottom: 64, backgroundColor: theme.container }}>
        {/* Top bar: idioma + config */}
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 }}>
         
          <Pressable onPress={() => navigation.navigate('Settings')} style={{ padding: 8, borderRadius: 999, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.textSecondary, fontWeight: '600', fontSize: 16 }}>⚙️</Text>
          </Pressable>
        </View>
  <Text style={{ fontSize: 32, fontWeight: '800', color: theme.text, textAlign: 'center', marginBottom: 8, letterSpacing: 1 }}>{t('title', lang)}</Text>
  <Text style={{ fontSize: 17, color: theme.textSecondary, textAlign: 'center', marginBottom: 24 }}>{t('chooseMode', lang)}</Text>


  <View style={{ flexDirection: 'row', gap: 16, marginBottom: 12 }}>
          <Pressable
            onPress={() => setMode('PVP')}
            style={({ pressed }) => [
              { flex: 1, minHeight: 110, padding: 16, borderRadius: 18, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 6, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
              mode === 'PVP' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive, shadowOpacity: 0.18 },
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 18, marginBottom: 2 }, mode === 'PVP' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>{t('twoPlayers', lang)}</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 13 }]}>{t('twoPlayersDesc', lang)}</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('CPU')}
            style={({ pressed }) => [
              { flex: 1, minHeight: 110, padding: 16, borderRadius: 18, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, gap: 6, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
              mode === 'CPU' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive, shadowOpacity: 0.18 },
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={[{ color: theme.text, fontWeight: '700', fontSize: 18, marginBottom: 2 }, mode === 'CPU' && { color: themeMode === 'dark' ? '#fff' : '#2563eb' }]}>{t('vsCpu', lang)}</Text>
            <Text style={[{ color: theme.textMuted, fontSize: 13 }]}>{t('vsCpuDesc', lang)}</Text>
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
          style={({ pressed }) => [
            { marginTop: 32, backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 999, borderWidth: 1, alignSelf: 'center', shadowColor: '#000', shadowOpacity: 0.10, shadowRadius: 8, elevation: 2 },
            pressed && { opacity: 0.7 }
          ]}
        >
          <Text style={[{ color: theme.text, fontSize: 18, fontWeight: '700', letterSpacing: 1 }]}>{t('start', lang)}</Text>
        </Pressable>

        <View style={{ marginTop: 24 }}>
          <Text style={{ color: theme.textMuted, fontSize: 13, textAlign: 'center' }}>{t('rule', lang)}</Text>
        </View>
        {/* Banner AdMob fixo na parte inferior usando react-native-google-mobile-ads */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <BannerAd
              unitId={AdsUnitIds.banner}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      </View>
    );
  };

  export default StartScreen;
