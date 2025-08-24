import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';

export type RootStackParamList = {
  Start: undefined;
  Game: undefined;
  Settings: undefined;
  HowToPlay: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = (props: any) => {
  // repassa props para as telas
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start">
          {screenProps => <StartScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {screenProps => <GameScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {screenProps => <SettingsScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="HowToPlay">
          {screenProps => <HowToPlayScreen {...props} {...screenProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
