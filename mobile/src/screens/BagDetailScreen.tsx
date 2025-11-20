import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '../components/AppButton';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type BagDetailScreenRouteProp = RouteProp<RootStackParamList, 'BagDetail'>;

export const BagDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BagDetailScreenRouteProp>();
  const bag = route.params?.bag;

  // Dummy data if no bag passed
  const bagData = bag || {
    id: '1',
    title: 'Caffè Nero - Trafalgar Sq',
    subtitle: 'Standard Bag',
    collectWindow: 'tomorrow 01:30 - 02:30',
    distance: '55 m',
    currentPrice: '£4.49',
    originalPrice: '£10.00',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    rating: '4.2',
    reviewCount: 20,
    availabilityLabel: '1 left',
    description:
      'A selection of delicious freshly made flatbreads, paninis, salad boxes, cakes, pastries and much more.',
    category: 'Meal',
    address: '60-61 Trafalgar Square, St. James\'s, London WC2N 5DS, UK',
    collectionExperience: 4.5,
    foodQuality: 4.2,
    variety: 4.3,
    quantity: 4.6,
    isSellingFast: false,
    collectionDay: 'Tomorrow',
  };

  const overallRating = parseFloat(bagData.rating);
  const fullStars = Math.floor(overallRating);
  const hasHalfStar = overallRating % 1 >= 0.5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header Image Section */}
          <View style={styles.imageSection}>
            <Image source={{ uri: bagData.imageUri }} style={styles.headerImage} resizeMode="cover" />
            <View style={styles.imageOverlay}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>↗</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.heartIcon}>♡</Text>
                </TouchableOpacity>
              </View>
            </View>
            {bagData.availabilityLabel && (
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>{bagData.availabilityLabel}</Text>
              </View>
            )}
            {bagData.isSellingFast && (
              <View style={styles.sellingFastBadge}>
                <Text style={styles.sellingFastText}>Selling fast</Text>
              </View>
            )}
            <View style={styles.storeNameOverlay}>
              <Text style={styles.storeName}>{bagData.title}</Text>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Item Name & Price */}
            <View style={styles.titleRow}>
              <View style={styles.titleLeft}>
                <Text style={styles.bagIcon}>🛍️</Text>
                <Text style={styles.itemTitle}>{bagData.subtitle}</Text>
              </View>
              <View style={styles.priceColumn}>
                {bagData.originalPrice && (
                  <Text style={styles.originalPrice}>{bagData.originalPrice}</Text>
                )}
                <Text style={styles.currentPrice}>{bagData.currentPrice}</Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingRow}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>
                {bagData.rating} ({bagData.reviewCount || 20})
              </Text>
            </View>

            {/* Collection Time */}
            <View style={styles.collectionRow}>
              <Text style={styles.clockIcon}>🕐</Text>
              <Text style={styles.collectionText}>Collect: {bagData.collectWindow}</Text>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>{bagData.collectionDay || 'Tomorrow'}</Text>
              </View>
            </View>

            {/* Location */}
            <TouchableOpacity style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <View style={styles.locationTextContainer}>
                <Text style={styles.addressText}>{bagData.address}</Text>
                <Text style={styles.moreInfoText}>More information about the store</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Selling Fast Alert */}
            {bagData.isSellingFast && (
              <View style={styles.alertBox}>
                <Text style={styles.rocketIcon}>🚀</Text>
                <View style={styles.alertTextContainer}>
                  <Text style={styles.alertTitle}>This item is selling fast</Text>
                  <Text style={styles.alertDescription}>
                    This Surprise Bag is in high demand and sells out quickly. Grab yours before
                    it&apos;s gone!
                  </Text>
                </View>
              </View>
            )}

            {/* What you could get */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What you could get</Text>
              <Text style={styles.description}>{bagData.description}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{bagData.category}</Text>
              </View>
            </View>

            {/* Overall experience */}
            <View style={styles.section}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Overall experience</Text>
                  <Text style={styles.experienceSubtitle}>
                    Based on {bagData.reviewCount || 20} recent reviews
                  </Text>
                </View>
                <View style={styles.overallRatingBox}>
                  <Text style={styles.overallRatingNumber}>{bagData.rating}</Text>
                  <View style={styles.starsRow}>
                    {Array.from({ length: fullStars }).map((_, i) => (
                      <Text key={i} style={styles.starFilled}>
                        ⭐
                      </Text>
                    ))}
                    {hasHalfStar && <Text style={styles.starFilled}>⭐</Text>}
                    {Array.from({ length: 5 - Math.ceil(overallRating) }).map((_, i) => (
                      <Text key={i} style={styles.starEmpty}>
                        ⭐
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              {/* Detailed Ratings */}
              <View style={styles.ratingsList}>
                <RatingBar label="Collection experience" rating={bagData.collectionExperience} />
                <RatingBar label="Food quality" rating={bagData.foodQuality} />
                {bagData.variety && <RatingBar label="Variety of contents" rating={bagData.variety} />}
                {bagData.quantity && <RatingBar label="Food quantity" rating={bagData.quantity} />}
              </View>
            </View>

            {/* Ingredients & Allergens */}
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Ingredients & allergens</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* What you need to know */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What you need to know</Text>
              <Text style={styles.bulletPoint}>
                • The store will provide packaging for your food,
              </Text>
              <Text style={styles.bulletPoint}>
                but we encourage you to bring your own bag to carry it home in.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Reserve Button */}
        <View style={styles.reserveButtonContainer}>
          <AppButton label="Reserve" onPress={() => {}} style={styles.reserveButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

type RatingBarProps = {
  label: string;
  rating: number;
};

const RatingBar: React.FC<RatingBarProps> = ({ label, rating }) => {
  const percentage = (rating / 5) * 100;

  return (
    <View style={ratingBarStyles.container}>
      <Text style={ratingBarStyles.label}>{label}</Text>
      <View style={ratingBarStyles.barContainer}>
        <View style={[ratingBarStyles.bar, { width: `${percentage}%` }]} />
      </View>
      <Text style={ratingBarStyles.rating}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const ratingBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  barContainer: {
    flex: 2,
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.primaryDark,
    borderRadius: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    minWidth: 35,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  heartIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  availabilityBadge: {
    position: 'absolute',
    top: 100,
    left: 16,
    backgroundColor: '#FFC727',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  sellingFastBadge: {
    position: 'absolute',
    top: 100,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sellingFastText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  storeNameOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  contentSection: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bagIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  collectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  collectionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  dayBadge: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textOnDark,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  locationTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  moreInfoText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  chevron: {
    fontSize: 20,
    color: Colors.textMuted,
    marginLeft: 8,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: Colors.highlightBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  rocketIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.sectionBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  experienceSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  overallRatingBox: {
    alignItems: 'center',
  },
  overallRatingNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  starFilled: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
  starEmpty: {
    fontSize: 16,
    color: Colors.borderMedium,
  },
  ratingsList: {
    marginTop: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginBottom: 24,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  bulletPoint: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  reserveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  reserveButton: {
    width: '100%',
  },
});

