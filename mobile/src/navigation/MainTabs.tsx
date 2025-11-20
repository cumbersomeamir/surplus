import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BrowseScreen } from '../screens/BrowseScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../theme/colors';

export type TabParamList = {
  Discover: undefined;
  Browse: undefined;
  Delivery: undefined;
  Favourites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon = (label: string, isFavourites?: boolean) => ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => {
  // Show filled heart for Favourites when active
  if (isFavourites && focused) {
    return <Text style={{ color, fontSize: 16 }}>♥</Text>;
  }
  return <Text style={{ color, fontSize: 16 }}>{label}</Text>;
};

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
      component={BrowseScreen}
      options={{ tabBarIcon: tabIcon('🔍'), tabBarLabel: 'Browse' }}
    />
    <Tab.Screen
      name="Delivery"
      children={() => <PlaceholderScreen label="Delivery" />}
      options={{ tabBarIcon: tabIcon('📦'), tabBarLabel: 'Delivery' }}
    />
    <Tab.Screen
      name="Favourites"
      component={FavouritesScreen}
      options={{ tabBarIcon: tabIcon('♡', true), tabBarLabel: 'Favourites' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarIcon: tabIcon('🙂'), tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

