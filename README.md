# Jogo da Velha (React Native + Expo)

App simples de jogo da velha local (2 jogadores) feito com React Native e Expo (TypeScript).

## Requisitos
- Node.js LTS
- Expo Go instalado no dispositivo móvel (Android/iOS)

## Instalação

Dentro desta pasta já estão as dependências instaladas. Se precisar reinstalar:

```
npm install
```

## Executar

Inicie o servidor de desenvolvimento do Expo:

```
npm run start
```

- Escaneie o QR Code com o app Expo Go no seu celular.
- Ou use:
  - `npm run ios` para abrir no simulador iOS (Xcode necessário)
  - `npm run android` para abrir no emulador Android (Android Studio necessário)
  - `npm run web` para rodar no navegador

## Funcionalidades
- Tabuleiro 3x3
- Alternância de jogadores (X e O)
- Detecção de vitória e empate
- Destaque da linha vencedora
- Botão de reiniciar partida

## Estrutura principal
- `App.tsx`: UI e lógica do jogo
- `package.json`: scripts de execução

## Licença
MIT
