import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { AppButton } from '../components/AppButton';
import { SurpriseBagCard } from '../components/SurpriseBagCard';
import { RootStackParamList, BagData } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { RootState } from '../store';
import { Colors } from '../theme/colors';
import { getFavorites, removeFavorite } from '../utils/favorites';

type FavouritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Favourites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const FavouritesScreen = () => {
  const navigation = useNavigation<FavouritesScreenNavigationProp>();
  const username = useSelector((state: RootState) => state.app.username);
  const [favorites, setFavorites] = useState<BagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, [username]);

  // Refresh favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [username])
  );

  const loadFavorites = async () => {
    if (!username) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getFavorites(username);
    if (result.success && result.data) {
      // Convert favorite items to BagData format
      const favoriteItems: BagData[] = result.data.map((fav: any) => ({
        id: fav.itemId,
        ...fav.itemData,
      }));
      setFavorites(favoriteItems);
    }
    setLoading(false);
  };

  const handleFindBag = () => {
    navigation.navigate('Discover');
  };

  const handleCardPress = (bag: BagData) => {
    navigation.navigate('BagDetail', { bag });
  };

  const handleFavoriteToggle = async (item: BagData) => {
    if (!username) return;

    const result = await removeFavorite(username, item.id);
    if (result.success) {
      // Remove from local state
      setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.loadingText}>Loading favorites...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>No favourites added yet</Text>
            <Text style={styles.instruction}>
              Tap the heart icon on a store to add it to your favourites and it will show up here.
            </Text>

            <View style={styles.visualAid}>
              <View style={styles.arrowContainer}>
                <View style={styles.arrowCurve} />
                <View style={styles.arrowHead} />
              </View>
              <View style={styles.card}>
                <View style={styles.cardCircle} />
                <View style={styles.heartContainer}>
                  <Text style={styles.heartIcon}>♡</Text>
                </View>
              </View>
            </View>

            <AppButton label="Find a Surprise Bag" onPress={handleFindBag} style={styles.button} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={favorites}
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
              isFavorite={true}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  instruction: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  visualAid: {
    alignItems: 'center',
    marginBottom: 48,
    position: 'relative',
    width: '100%',
    height: 180,
  },
  arrowContainer: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 160,
    height: 80,
    zIndex: 1,
  },
  arrowCurve: {
    width: 120,
    height: 60,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 60,
    borderColor: Colors.primaryDark,
    position: 'relative',
  },
  arrowHead: {
    position: 'absolute',
    right: -6,
    top: 54,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderLeftColor: Colors.primaryDark,
    borderTopWidth: 4,
    borderTopColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  card: {
    width: 200,
    height: 120,
    borderRadius: 16,
    backgroundColor: Colors.sectionBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    position: 'absolute',
    right: 20,
    top: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  heartContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    borderRadius: 16,
  },
  heartIcon: {
    fontSize: 20,
    color: Colors.primaryDark,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

