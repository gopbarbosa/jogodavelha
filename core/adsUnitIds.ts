// Centraliza os Unit IDs do AdMob para fácil manutenção

import { Platform } from "react-native";
import { RewardedInterstitialAd } from "react-native-google-mobile-ads";

export const AdsUnitIds = {
    ...Platform.select({
        android: {
            banner: 'ca-app-pub-3605996966316417/5374381412',
            interstitial: 'ca-app-pub-3605996966316417/9697572136',
            native: 'ca-app-pub-3605996966316417/xxxxxxxxxx',
            appOpen: 'ca-app-pub-3605996966316417/xxxxxxxxxx',
            rewardedInterstitialAd: 'ca-app-pub-3605996966316417/5346461257'
            
        },
        ios: {
            banner: 'ca-app-pub-3605996966316417/6732497444',
            interstitial: 'ca-app-pub-3605996966316417/6851114616',
            rewardedInterstitialAd:'ca-app-pub-3605996966316417/3539357890',
            native: 'ca-app-pub-xxxxxxxxxxxxxxxx/ios-native-id',
            appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/ios-appopen-id',
        },
        default: {
            banner: 'ca-app-pub-3940256099942544/6300978111',
            interstitial: 'ca-app-pub-3940256099942544/1033173712',
            native: 'ca-app-pub-3940256099942544/2247696110',
            appOpen: 'ca-app-pub-3940256099942544/3419835294',
            rewardedInterstitialAd:'ca-app-pub-3940256099942544/6978759866',
             
        },
    }),
};
