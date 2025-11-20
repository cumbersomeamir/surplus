import React, { useCallback, useEffect, useState } from 'react';
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
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { SurpriseBagCard } from '../components/SurpriseBagCard';
import { RootStackParamList, BagData } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { RootState } from '../store';
import { Colors } from '../theme/colors';
import { addFavorite, removeFavorite, checkFavorite } from '../utils/favorites';
import { getItems } from '../utils/items';

type BrowseScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Browse'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const BrowseScreen = () => {
  const navigation = useNavigation<BrowseScreenNavigationProp>();
  const username = useSelector((state: RootState) => state.app.username);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('Relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<BagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  // Refresh items when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  useEffect(() => {
    // Load favorite status for all items
    const loadFavorites = async () => {
      if (!username || items.length === 0) return;
      const favoriteSet = new Set<string>();
      // Load favorites for all items (not just filtered ones)
      for (const item of items) {
        const isFav = await checkFavorite(username, item.id);
        if (isFav) {
          favoriteSet.add(item.id);
        }
      }
      setFavorites(favoriteSet);
    };
    loadFavorites();
  }, [username, items]);

  const loadItems = async () => {
    setLoading(true);
    const fetchedItems = await getItems();
    setItems(fetchedItems);
    setLoading(false);
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.address?.toLowerCase().includes(query)
    );
  });

  const handleCardPress = (bag: BagData) => {
    navigation.navigate('BagDetail', { bag });
  };

  const handleFavoriteToggle = async (item: BagData) => {
    if (!username) return;

    const isCurrentlyFavorite = favorites.has(item.id);

    if (isCurrentlyFavorite) {
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
            data={filteredItems}
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
                onHeartPress={() => handleFavoriteToggle(item)}
                isFavorite={favorites.has(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              loading ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Loading...</Text>
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No items available</Text>
                </View>
              )
            }
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
});

