import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from '../theme/colors';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
};

export const AppButton: React.FC<AppButtonProps> = ({ label, onPress, loading, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.85} disabled={loading}>
    {loading ? <ActivityIndicator color={Colors.buttonTextDark} /> : <Text style={styles.label}>{label}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.buttonTextDark,
  },
});

