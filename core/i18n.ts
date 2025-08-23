// i18n.ts
// Configuração simples de internacionalização para React Native/Expo
// Suporte a múltiplos idiomas, fácil de expandir

export type SupportedLanguage = 'pt' | 'en' | 'es';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  pt: {
    settings: 'Configurações',
    theme: 'Tema',
    language: 'Idioma',
    title: 'Jogo da Velha',
    chooseMode: 'Escolha o modo de jogo',
    twoPlayers: '2 Jogadores',
    twoPlayersDesc: 'Jogue localmente, alternando entre X e O.',
    vsCpu: 'Contra a Máquina',
    vsCpuDesc: 'Desafie a IA com 3 dificuldades.',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    start: 'Começar',
    rule: 'Regra: cada jogador pode ter no máximo 3 peças; a mais antiga some ao jogar a 4ª.',
    back: 'Voltar',
    machine: 'Máquina',
    playAgain: 'Jogar novamente',
    restart: 'Reiniciar',
    draw: 'Empate',
    localInfo: 'Dois jogadores no mesmo dispositivo',
  },
  en: {
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    title: 'Tic-Tac-Toe',
    chooseMode: 'Choose game mode',
    twoPlayers: '2 Players',
    twoPlayersDesc: 'Play locally, alternating X and O.',
    vsCpu: 'Vs Computer',
    vsCpuDesc: 'Challenge the AI with 3 difficulties.',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    start: 'Start',
    rule: 'Rule: each player can have up to 3 pieces; the oldest disappears when playing the 4th.',
    back: 'Back',
    machine: 'Machine',
    playAgain: 'Play again',
    restart: 'Restart',
    draw: 'Draw',
    localInfo: 'Two players on the same device',
  },
  es: {
    settings: 'Configuración',
    theme: 'Tema',
    language: 'Idioma',
    title: 'Tres en Raya',
    chooseMode: 'Elige el modo de juego',
    twoPlayers: '2 Jugadores',
    twoPlayersDesc: 'Juega localmente, alternando X y O.',
    vsCpu: 'Contra la Máquina',
    vsCpuDesc: 'Desafía a la IA con 3 dificultades.',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    start: 'Comenzar',
    rule: 'Regla: cada jugador puede tener hasta 3 piezas; la más antigua desaparece al jugar la 4ª.',
    back: 'Volver',
    machine: 'Máquina',
    playAgain: 'Jugar de nuevo',
    restart: 'Reiniciar',
    draw: 'Empate',
    localInfo: 'Dos jugadores en el mismo dispositivo',
  },
};

export function t(key: string, lang: SupportedLanguage = 'pt') {
  return translations[lang][key] || key;
}
