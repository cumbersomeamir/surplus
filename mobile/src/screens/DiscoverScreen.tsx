import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryChips } from '../components/CategoryChips';
import { SurpriseBagCard } from '../components/SurpriseBagCard';
import { RootStackParamList, BagData } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { RootState } from '../store';
import { setLocation } from '../store/slices/appSlice';
import { Colors } from '../theme/colors';
import { addFavorite, removeFavorite, checkFavorite } from '../utils/favorites';
import { getItems } from '../utils/items';

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Discover'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const categories = ['All', 'Meals', 'Bread & pastries', 'Groceries', 'Flowers', 'Drinks'];

export const DiscoverScreen = () => {
  const navigation = useNavigation<DiscoverScreenNavigationProp>();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.app.username);
  const selectedLocation = useSelector((state: RootState) => state.app.selectedLocation);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<BagData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadItems();
  }, [selectedCategory]);

  // Refresh items when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [selectedCategory])
  );

  // Don't automatically load favorites - only check when user clicks favorite button

  const loadItems = async () => {
    setLoading(true);
    const fetchedItems = await getItems(selectedCategory);
    setItems(fetchedItems);
    setLoading(false);
  };

  // Get popular items (first 2 for "These were popular today")
  const popularItems = items.slice(0, 2);
  
  // Get items with low availability for "Save before it's too late"
  const urgentItems = items.filter((item) => 
    item.availabilityLabel && (item.availabilityLabel.includes('left') || item.availabilityLabel === 'Selling fast')
  ).slice(0, 2);

  const handleCardPress = (bag: BagData) => {
    navigation.navigate('BagDetail', { bag });
  };

  const handleAddItem = () => {
    navigation.navigate('AddItem');
  };

  const handleLocationPress = () => {
    navigation.navigate('LocationPicker');
  };

  const handleFavoriteToggle = async (item: BagData) => {
    if (!username) return;

    // Check current favorite status first (only when user clicks)
    const isCurrentlyFavorite = favorites.has(item.id);
    
    // If not in local state, check with API
    let actualFavoriteStatus = isCurrentlyFavorite;
    if (!isCurrentlyFavorite) {
      try {
        actualFavoriteStatus = await checkFavorite(username, item.id);
        if (actualFavoriteStatus) {
          setFavorites((prev) => new Set(prev).add(item.id));
        }
      } catch (error) {
        // If check fails, assume not favorite and proceed
        actualFavoriteStatus = false;
      }
    }

    if (actualFavoriteStatus) {
      // Remove from favorites
      const result = await removeFavorite(username, item.id);
      if (result.success) {
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    } else {
      // Add to favorites
      const result = await addFavorite(username, item.id, item);
      if (result.success) {
        setFavorites((prev) => new Set(prev).add(item.id));
      }
    }
  };

  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.locationRow}>
        <TouchableOpacity style={styles.locationPill} onPress={handleLocationPress}>
          <View style={styles.locationIconContainer}>
            <Text style={styles.locationIcon}>🧭</Text>
          </View>
          <Text style={styles.locationLabel}>Chosen location</Text>
          <Text style={styles.locationValue}>{selectedLocation} ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>These were popular today</Text>
        <TouchableOpacity>
          <Text style={styles.sectionCta}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : popularItems.length > 0 ? (
          popularItems.map((item) => (
            <SurpriseBagCard
              key={item.id}
              {...item}
              onPress={() => handleCardPress(item)}
              onHeartPress={() => handleFavoriteToggle(item)}
              isFavorite={favorites.has(item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No items available</Text>
        )}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Save before it&apos;s too late</Text>
        <TouchableOpacity>
          <Text style={styles.sectionCta}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : urgentItems.length > 0 ? (
          urgentItems.map((item) => (
            <SurpriseBagCard
              key={item.id}
              {...item}
              onPress={() => handleCardPress(item)}
              onHeartPress={() => handleFavoriteToggle(item)}
              isFavorite={favorites.has(item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No urgent items available</Text>
        )}
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    padding: 16,
    gap: 12,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addButtonIcon: {
    fontSize: 32,
    color: Colors.textOnDark,
    fontWeight: '300',
    lineHeight: 32,
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
  loadingText: {
    fontSize: 14,
    color: Colors.textMuted,
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    padding: 20,
  },
});

