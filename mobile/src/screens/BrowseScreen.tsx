import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SurpriseBagCard } from '../components/SurpriseBagCard';
import { RootStackParamList, BagData } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { Colors } from '../theme/colors';

type BrowseScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Browse'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const MOCK_BAGS: BagData[] = [
  {
    id: '1',
    title: 'Caffè Nero - Trafalgar Sq',
    subtitle: 'Standard Bag',
    collectWindow: 'tomorrow 01:30 - 02:30',
    distance: '55 m',
    currentPrice: '£4.49',
    originalPrice: '£10.00',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    rating: '4.2',
    availabilityLabel: '1 left',
    reviewCount: 20,
    description: 'A selection of delicious freshly made flatbreads, paninis, salad boxes, cakes, pastries and much more.',
    category: 'Meal',
    address: '60-61 Trafalgar Square, St. James\'s, London WC2N 5DS, UK',
    collectionExperience: 4.5,
    foodQuality: 4.2,
    collectionDay: 'Tomorrow',
  },
  {
    id: '2',
    title: 'Pret - Trafalgar Square South',
    subtitle: 'Lunch Bag',
    collectWindow: 'today 20:00 - 20:30',
    distance: '58 m',
    currentPrice: '£4.00',
    originalPrice: '£12.00',
    imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    rating: '4.3',
    availabilityLabel: 'Selling fast',
    reviewCount: 35,
    description: 'A selection of lunch items including soups, sandwiches, and salads.',
    category: 'Meal',
    address: 'Trafalgar Square South, London',
    collectionExperience: 4.4,
    foodQuality: 4.3,
    isSellingFast: true,
    collectionDay: 'Today',
  },
  {
    id: '3',
    title: 'The Trafalgar St. James London, Curio Collection by Hilton - Victoria',
    subtitle: 'Small Baked goods',
    collectWindow: 'today 16:00 - 16:30',
    distance: '99 m',
    currentPrice: '£3.00',
    originalPrice: '£9.00',
    imageUri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    rating: '4.2',
    availabilityLabel: '2 left',
    reviewCount: 28,
    description: 'A selection of freshly baked pastries, croissants, and cakes.',
    category: 'Bread & pastries',
    address: 'Victoria, London',
    collectionExperience: 4.3,
    foodQuality: 4.2,
    collectionDay: 'Today',
  },
];

export const BrowseScreen = () => {
  const navigation = useNavigation<BrowseScreenNavigationProp>();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('Relevance');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardPress = (bag: BagData) => {
    navigation.navigate('BagDetail', { bag });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>📍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
              List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
              Map
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sortContainer}>
          <Text style={styles.sortText}>Sort by: {sortBy}</Text>
          <Text style={styles.chevron}>▼</Text>
        </TouchableOpacity>

        {viewMode === 'list' ? (
          <FlatList
            data={MOCK_BAGS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SurpriseBagCard
                title={item.title}
                subtitle={item.subtitle}
                collectWindow={item.collectWindow}
                distance={item.distance}
                currentPrice={item.currentPrice}
                originalPrice={item.originalPrice}
                imageUri={item.imageUri}
                rating={item.rating}
                availabilityLabel={item.availabilityLabel}
                variant="vertical"
                onPress={() => handleCardPress(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map view coming soon</Text>
          </View>
        )}
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconText: {
    fontSize: 20,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.sectionBackground,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primaryDark,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  toggleTextActive: {
    color: Colors.textOnDark,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  sortText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chevron: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  listContent: {
    paddingBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
});

