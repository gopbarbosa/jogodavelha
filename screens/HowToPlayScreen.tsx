
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { t, SupportedLanguage } from '../core/i18n';

const BOARD_SIZE = 240;
const CELL_SIZE = BOARD_SIZE / 3;

const boardExamples = [
  {
    title: 'Vitória na horizontal',
    board: [
      'X', 'X', 'X',
      '',  'O', '',
      '',  '',  'O',
    ],
    win: [0,1,2],
  },
  {
    title: 'Vitória na vertical',
    board: [
      'O', 'X', '',
      'O', 'X', '',
      'O', '',  'X',
    ],
    win: [0,3,6],
  },
  {
    title: 'Vitória na diagonal',
    board: [
      'X', '',  'O',
      '',  'X', '',
      'O', '',  'X',
    ],
    win: [0,4,8],
  },
  {
    title: 'Empate',
    board: [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X',
    ],
    win: [],
  },
];

interface HowToPlayScreenProps {
  navigation: any;
  theme: any;
  lang: SupportedLanguage;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ navigation, theme, lang }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.container, padding: 20 }}>
      <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 24, alignSelf: 'flex-start', padding: 8, borderRadius: 999, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
        <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16 }}>{t('back', lang)}</Text>
      </Pressable>
      <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, marginBottom: 16, fontFamily: 'System' }}>{t('howToPlay', lang)}</Text>
      <Text style={{ fontSize: 17, color: theme.text, marginBottom: 12, fontFamily: 'System' }}>{t('howToPlayDesc', lang)}</Text>
      <Text style={{ fontSize: 16, color: theme.text, marginBottom: 8, fontWeight: '600', fontFamily: 'System' }}>{t('basicRules', lang)}</Text>
      <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('ruleBoard', lang)}</Text>
      <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('ruleTurn', lang)}</Text>
      <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('ruleEmpty', lang)}</Text>
      <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('ruleWin', lang)}</Text>
      <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('ruleDraw', lang)}</Text>
      <Text style={{ fontSize: 16, color: theme.text, marginTop: 16, fontWeight: '600', fontFamily: 'System' }}>{t('winExamples', lang)}</Text>
      {boardExamples.map((ex, i) => (
        <View key={i} style={{ alignItems: 'center', marginVertical: 18 }}>
          <Text style={{ color: theme.textSecondary, fontWeight: '700', fontSize: 16, marginBottom: 8 }}>{ex.title}</Text>
          <View style={{ width: BOARD_SIZE, aspectRatio: 1, backgroundColor: theme.card, borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: theme.border, flexDirection: 'column' }}>
            {[0,1,2].map(row => (
              <View key={row} style={{ flex: 1, flexDirection: 'row' }}>
                {[0,1,2].map(col => {
                  const idx = row * 3 + col;
                  const value = ex.board[idx];
                  const isWin = ex.win.includes(idx);
                  return (
                    <View
                      key={idx}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isWin ? theme.cellWin : theme.card,
                        borderRightWidth: col < 2 ? 2 : 0,
                        borderRightColor: theme.border,
                        borderBottomWidth: row < 2 ? 2 : 0,
                        borderBottomColor: theme.border,
                      }}
                    >
                      <Text style={{ fontSize: 44, fontWeight: '800', letterSpacing: 2, color: value === 'X' ? '#38bdf8' : value === 'O' ? '#f472b6' : theme.text, fontFamily: 'System' }}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      ))}
  <Text style={{ fontSize: 16, color: theme.text, marginTop: 16, fontWeight: '600', fontFamily: 'System' }}>{t('tipTitle', lang)}</Text>
  <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('tipCenter', lang)}</Text>
  <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('tipBlock', lang)}</Text>
  <Text style={{ fontSize: 15, color: theme.text, marginBottom: 4, fontFamily: 'System' }}>{t('tipDouble', lang)}</Text>
  <Text style={{ fontSize: 15, color: theme.text, marginTop: 16, marginBottom: 24, fontFamily: 'System' }}>{t('enjoy', lang)}</Text>
    </ScrollView>
  );
};

export default HowToPlayScreen;
