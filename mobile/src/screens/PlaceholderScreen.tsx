import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Colors } from '../theme/colors';

type PlaceholderScreenProps = {
  label: string;
};

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ label }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>{label} coming soon.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});

