import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// importações removidas: lógica de jogo e anúncios agora nas telas
import { SupportedLanguage } from './core/i18n';
import AppNavigator from './navigation/AppNavigator';
import { GameProvider } from './core/GameContext';
import { AdsUnitIds } from './core/adsUnitIds';



export default function App() {
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>('dark');
  const [lang, setLangState] = useState<SupportedLanguage>('pt');
  const isDark = themeMode === 'dark';


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

  // Carregar tema e idioma salvos
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme === 'light' || savedTheme === 'dark') setThemeModeState(savedTheme);
        const savedLang = await AsyncStorage.getItem('lang');
        if (savedLang === 'pt' || savedLang === 'en' || savedLang === 'es') setLangState(savedLang as SupportedLanguage);
      } catch {}
    })();
  }, []);

  // Persistir tema
  const setThemeMode = (mode: 'light' | 'dark') => {
    setThemeModeState(mode);
    AsyncStorage.setItem('themeMode', mode);
  };

  // Persistir idioma
  const setLang = (l: SupportedLanguage) => {
    setLangState(l);
    AsyncStorage.setItem('lang', l);
  };

  // Usa o AppNavigator para navegação stack
  return (
    <GameProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator
          theme={theme}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          lang={lang}
          setLang={setLang}
        />
      </SafeAreaView>
    </GameProvider>
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
