import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../theme/colors';

export const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.hero}>
      <Text style={styles.tagline}>Surplus</Text>
      <Text style={styles.title}>Rescue fresh meals before they go to waste.</Text>
      <Text style={styles.subtitle}>
        Inspired by Too Good To Go with a high-contrast yellow design system.
      </Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Why it matters</Text>
      <Text style={styles.cardBody}>
        Save money, support local merchants, and cut food waste in every pickup window.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    backgroundColor: Colors.background,
  },
  hero: {
    backgroundColor: Colors.highlightBackground,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cardBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.textMuted,
  },
});

