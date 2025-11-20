import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddItemScreen } from '../screens/AddItemScreen';
import { BagDetailScreen } from '../screens/BagDetailScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { LocationPickerScreen } from '../screens/LocationPickerScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { MainTabs } from './MainTabs';

export type BagData = {
  id: string;
  title: string;
  subtitle: string;
  collectWindow: string;
  distance: string;
  currentPrice: string;
  originalPrice?: string;
  imageUri: string;
  rating?: string;
  reviewCount?: number;
  badge?: string;
  availabilityLabel?: string;
  description?: string;
  category?: string;
  address?: string;
  collectionExperience?: number;
  foodQuality?: number;
  variety?: number;
  quantity?: number;
  isSellingFast?: boolean;
  collectionDay?: string;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Onboarding: { step?: number };
  MainTabs: undefined;
  BagDetail: { bag?: BagData };
  Settings: undefined;
  AddItem: undefined;
  LocationPicker: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="BagDetail" component={BagDetailScreen} />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddItem"
      component={AddItemScreen}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="LocationPicker"
      component={LocationPickerScreen}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

