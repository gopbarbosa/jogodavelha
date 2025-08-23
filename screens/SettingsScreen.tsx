import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SupportedLanguage, t } from '../core/i18n';

interface SettingsScreenProps {
  theme: any;
  themeMode: 'light' | 'dark';
  setThemeMode: (t: 'light' | 'dark') => void;
  lang: SupportedLanguage;
  setLang: (l: SupportedLanguage) => void;
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  theme,
  themeMode,
  setThemeMode,
  lang,
  setLang,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.container, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, marginBottom: 24 }}>{t('settings', lang) || 'Configurações'}</Text>

      <Text style={{ color: theme.textSecondary, fontWeight: '600', marginBottom: 8 }}>{t('theme', lang) || 'Tema'}</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
        <Pressable
          onPress={() => setThemeMode('light')}
          style={[{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }, themeMode === 'light' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
        >
          <Text style={[{ color: theme.textSecondary, fontWeight: '600' }, themeMode === 'light' && { color: '#2563eb' }]}>{lang === 'pt' ? 'Claro' : lang === 'es' ? 'Claro' : 'Light'}</Text>
        </Pressable>
        <Pressable
          onPress={() => setThemeMode('dark')}
          style={[{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border }, themeMode === 'dark' && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
        >
          <Text style={[{ color: theme.textSecondary, fontWeight: '600' }, themeMode === 'dark' && { color: '#fff' }]}>{lang === 'pt' ? 'Escuro' : lang === 'es' ? 'Oscuro' : 'Dark'}</Text>
        </Pressable>
      </View>

      <Text style={{ color: theme.textSecondary, fontWeight: '600', marginBottom: 8 }}>{t('language', lang) || 'Idioma'}</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 32 }}>
        {(['pt','en','es'] as SupportedLanguage[]).map(l => (
          <Pressable
            key={l}
            onPress={() => setLang(l)}
            style={[{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, backgroundColor: theme.card, borderColor: theme.border, marginLeft: 4 }, lang === l && { backgroundColor: theme.cardActive, borderColor: theme.borderActive }]}
          >
            <Text style={[{ color: theme.textSecondary, fontWeight: '600', textTransform: 'uppercase' }, lang === l && { color: '#2563eb' }]}>{l}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 24, alignSelf: 'flex-start', backgroundColor: theme.badge, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1 }}>
        <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>{t('back', lang)}</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
