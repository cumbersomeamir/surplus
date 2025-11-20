import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../theme/colors';

type SurpriseBagCardProps = {
  title: string;
  subtitle: string;
  collectWindow: string;
  distance: string;
  currentPrice: string;
  originalPrice?: string;
  imageUri: string;
  rating?: string;
  badge?: string;
  availabilityLabel?: string;
};

export const SurpriseBagCard: React.FC<SurpriseBagCardProps> = ({
  title,
  subtitle,
  collectWindow,
  distance,
  currentPrice,
  originalPrice,
  imageUri,
  rating,
  badge,
  availabilityLabel,
}) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      {availabilityLabel && (
        <View style={styles.availability}>
          <Text style={styles.availabilityText}>{availabilityLabel}</Text>
        </View>
      )}
      {rating && (
        <View style={styles.rating}>
          <Text style={styles.ratingText}>⭐ {rating}</Text>
        </View>
      )}
    </View>
    <View style={styles.content}>
      {badge && <Text style={styles.badge}>{badge}</Text>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.meta}>
        Collect {collectWindow} · {distance}
      </Text>
      <View style={styles.priceRow}>
        {originalPrice && <Text style={styles.originalPrice}>{originalPrice}</Text>}
        <Text style={styles.currentPrice}>{currentPrice}</Text>
      </View>
    </View>
    <View style={styles.heart}>
      <Text style={styles.heartIcon}>♡</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: 24,
    backgroundColor: Colors.card,
    marginRight: 16,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  imageWrapper: {
    height: 150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  availability: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFFDD',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  rating: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFFDD',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  heartIcon: {
    fontSize: 22,
    color: Colors.primaryDark,
  },
});

