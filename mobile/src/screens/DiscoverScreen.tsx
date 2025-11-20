import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CategoryChips } from '../components/CategoryChips';
import { SurpriseBagCard } from '../components/SurpriseBagCard';
import { RootStackParamList, BagData } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { Colors } from '../theme/colors';

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Discover'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const popularData: BagData[] = [
  {
    id: '1',
    title: 'Pret - Trafalgar Square South',
    subtitle: 'Breakfast Bag',
    collectWindow: 'today 16:00 - 16:30',
    distance: '58 m',
    currentPrice: '£3.00',
    originalPrice: '£9.00',
    imageUri: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80',
    rating: '4.9',
    availabilityLabel: 'Sold out',
    reviewCount: 45,
    description: 'A selection of delicious freshly made flatbreads, paninis, salad boxes, cakes, pastries and much more.',
    category: 'Meal',
    address: 'Trafalgar Square South, London',
    collectionExperience: 4.8,
    foodQuality: 4.9,
    collectionDay: 'Today',
  },
  {
    id: '2',
    title: 'Sidequest Gamers Hub - Charing Cross',
    subtitle: 'Bubble Tea Surprise Bag',
    collectWindow: 'tomorrow 10:30 - 11:00',
    distance: '561 m',
    currentPrice: '£4.00',
    originalPrice: '£12.00',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    availabilityLabel: 'New',
    reviewCount: 32,
    description: 'A selection of bubble teas and snacks from our gaming hub.',
    category: 'Drinks',
    address: 'Charing Cross, London',
    collectionExperience: 4.6,
    foodQuality: 4.7,
    collectionDay: 'Tomorrow',
  },
];

const categories = ['All', 'Meals', 'Bread & pastries', 'Groceries', 'Flowers', 'Drinks'];

export const DiscoverScreen = () => {
  const navigation = useNavigation<DiscoverScreenNavigationProp>();

  const handleCardPress = (bag: BagData) => {
    navigation.navigate('BagDetail', { bag });
  };

  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.locationPill}>
        <View style={styles.locationIconContainer}>
          <Text style={styles.locationIcon}>🧭</Text>
        </View>
        <Text style={styles.locationLabel}>Chosen location</Text>
        <Text style={styles.locationValue}>London ▾</Text>
      </TouchableOpacity>

      <CategoryChips categories={categories} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>These were popular today</Text>
        <TouchableOpacity>
          <Text style={styles.sectionCta}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {popularData.map((item) => (
          <SurpriseBagCard key={item.id} {...item} onPress={() => handleCardPress(item)} />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Save before it&apos;s too late</Text>
        <TouchableOpacity>
          <Text style={styles.sectionCta}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {popularData.map((item) => (
          <SurpriseBagCard
            key={`late-${item.id}`}
            {...item}
            availabilityLabel="2 left"
            onPress={() => handleCardPress({ ...item, availabilityLabel: '2 left' })}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your favourites</Text>
        <TouchableOpacity>
          <Text style={styles.sectionCta}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderText}>Tap on the heart icon to add it to your favourites</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    padding: 16,
    gap: 12,
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.highlightBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    fontSize: 16,
  },
  locationLabel: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  sectionHeader: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionCta: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  horizontalList: {
    marginTop: 12,
  },
  placeholderCard: {
    height: 140,
    borderRadius: 24,
    backgroundColor: Colors.sectionBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  placeholderText: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

