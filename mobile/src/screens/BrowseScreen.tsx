import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import { geocodeAddress, Coordinates } from '../utils/geocoding';

type BrowseScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Browse'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type ItemWithCoordinates = BagData & {
  coordinates?: Coordinates;
};

export const BrowseScreen = () => {
  const navigation = useNavigation<BrowseScreenNavigationProp>();
  const username = useSelector((state: RootState) => state.app.username);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('Relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<ItemWithCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [geocodingLoading, setGeocodingLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  // Refresh items when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  // Don't automatically load favorites - only check when user clicks favorite button

  const loadItems = async () => {
    setLoading(true);
    const fetchedItems = await getItems();
    setItems(fetchedItems);
    setLoading(false);
  };

  // Geocode addresses when switching to map view
  useEffect(() => {
    if (viewMode === 'map' && filteredItems.length > 0) {
      // Check if items already have coordinates
      const hasCoordinates = filteredItems.some((item) => item.coordinates);
      if (!hasCoordinates) {
        console.log('🔵 BrowseScreen: No coordinates found, starting geocoding...');
        geocodeItems();
      } else {
        console.log('✅ BrowseScreen: Items already have coordinates, skipping geocoding');
        setGeocodingLoading(false);
      }
    } else if (viewMode === 'list') {
      // Reset geocoding loading when switching back to list
      setGeocodingLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  const geocodeItems = async () => {
    console.log('🔵 BrowseScreen: Starting geocoding for', filteredItems.length, 'items');
    setGeocodingLoading(true);
    
    // Set a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      console.warn('⚠️ BrowseScreen: Geocoding timeout, showing map anyway');
      setGeocodingLoading(false);
    }, 10000); // 10 second timeout
    
    try {
      const itemsWithCoords: ItemWithCoordinates[] = [];
      let geocodedCount = 0;

      for (const item of filteredItems) {
        // Preserve existing coordinates if they exist
        if (item.coordinates) {
          console.log('✅ BrowseScreen: Item already has coordinates:', item.id);
          itemsWithCoords.push(item);
          geocodedCount++;
          continue;
        }

        if (item.address && item.address.trim() && item.address.trim().length > 3) {
          console.log('🔵 BrowseScreen: Geocoding address:', item.address, 'for item:', item.id);
          const coords = await geocodeAddress(item.address);
          if (coords) {
            console.log('✅ BrowseScreen: Geocoded successfully:', coords);
            itemsWithCoords.push({ ...item, coordinates: coords });
            geocodedCount++;
          } else {
            console.log('⚠️ BrowseScreen: Geocoding failed for:', item.address);
            itemsWithCoords.push(item);
          }
        } else {
          console.log('⚠️ BrowseScreen: Skipping invalid address:', item.address || 'undefined');
          itemsWithCoords.push(item);
        }
      }

      clearTimeout(timeoutId);
      console.log('✅ BrowseScreen: Geocoding complete. Successfully geocoded:', geocodedCount, 'out of', filteredItems.length);
      setItems(itemsWithCoords);
      setGeocodingLoading(false);
      console.log('✅ BrowseScreen: Geocoding loading set to false');
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ BrowseScreen: Geocoding error:', error);
      setGeocodingLoading(false);
      console.log('✅ BrowseScreen: Geocoding loading set to false (error)');
    }
  };

  // Calculate map region to fit all markers
  const getMapRegion = () => {
    const itemsWithCoords = filteredItems.filter((item) => item.coordinates);
    if (itemsWithCoords.length === 0) {
      // Default to Mumbai, India
      return {
        latitude: 19.0760,
        longitude: 72.8777,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    }

    const latitudes = itemsWithCoords.map((item) => item.coordinates!.latitude);
    const longitudes = itemsWithCoords.map((item) => item.coordinates!.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latDelta = (maxLat - minLat) * 1.5 || 0.1;
    const lngDelta = (maxLng - minLng) * 1.5 || 0.1;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(latDelta, 0.05),
      longitudeDelta: Math.max(lngDelta, 0.05),
    };
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
                id={item.id}
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
          <View style={styles.mapContainer}>
            {geocodingLoading ? (
              <View style={styles.mapLoadingContainer}>
                <ActivityIndicator size="large" color={Colors.primaryDark} />
                <Text style={styles.mapLoadingText}>Loading map locations...</Text>
              </View>
            ) : (
              <>
                <MapView
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                  style={styles.map}
                  initialRegion={getMapRegion()}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  loadingEnabled={true}
                >
                  {filteredItems
                    .filter((item) => item.coordinates)
                    .map((item) => (
                      <Marker
                        key={item.id}
                        coordinate={item.coordinates!}
                        title={item.title}
                        description={item.subtitle}
                        onPress={() => handleCardPress(item)}
                      >
                        <View style={styles.markerContainer}>
                          <View style={styles.marker}>
                            <Text style={styles.markerText}>📍</Text>
                          </View>
                        </View>
                      </Marker>
                    ))}
                </MapView>
                {filteredItems.filter((item) => item.coordinates).length === 0 && (
                  <View style={styles.mapEmptyContainer}>
                    <Text style={styles.mapEmptyText}>No locations available</Text>
                    <Text style={styles.mapEmptySubtext}>
                      Items need valid addresses to show on map
                    </Text>
                  </View>
                )}
              </>
            )}
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
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  mapLoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.sectionBackground,
  },
  mapLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textMuted,
  },
  mapEmptyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  mapEmptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  mapEmptySubtext: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.textOnDark,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  markerText: {
    fontSize: 20,
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

