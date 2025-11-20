import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { Colors } from '../theme/colors';

export const HomeScreen = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.locationIcon}>📍</Text>
      </View>
      <Text style={styles.title}>Where would you like to find Surprise Bags?</Text>
      <AppButton label="Use my current location" onPress={() => {}} style={styles.primaryButton} />
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryLabel}>Select location</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.highlightBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primaryDark,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primaryDark,
  },
});

