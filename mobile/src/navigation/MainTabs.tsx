import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DiscoverScreen } from '../screens/DiscoverScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { Colors } from '../theme/colors';

export type TabParamList = {
  Discover: undefined;
  Browse: undefined;
  Delivery: undefined;
  Favourites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon = (label: string) => ({
  color,
}: {
  color: string;
}) => <Text style={{ color, fontSize: 16 }}>{label}</Text>;

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primaryDark,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarStyle: {
        height: 70,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
    }}
  >
    <Tab.Screen
      name="Discover"
      component={DiscoverScreen}
      options={{ tabBarIcon: tabIcon('🧭'), tabBarLabel: 'Discover' }}
    />
    <Tab.Screen
      name="Browse"
      children={() => <PlaceholderScreen label="Browse" />}
      options={{ tabBarIcon: tabIcon('🔍'), tabBarLabel: 'Browse' }}
    />
    <Tab.Screen
      name="Delivery"
      children={() => <PlaceholderScreen label="Delivery" />}
      options={{ tabBarIcon: tabIcon('📦'), tabBarLabel: 'Delivery' }}
    />
    <Tab.Screen
      name="Favourites"
      children={() => <PlaceholderScreen label="Favourites" />}
      options={{ tabBarIcon: tabIcon('♡'), tabBarLabel: 'Favourites' }}
    />
    <Tab.Screen
      name="Profile"
      children={() => <PlaceholderScreen label="Profile" />}
      options={{ tabBarIcon: tabIcon('🙂'), tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

