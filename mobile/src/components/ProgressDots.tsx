import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../theme/colors';

type ProgressDotsProps = {
  total: number;
  current: number;
};

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => (
  <View style={styles.container}>
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          index === current ? styles.dotActive : styles.dotInactive,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: Colors.primaryDark,
    width: 24,
  },
  dotInactive: {
    backgroundColor: Colors.borderMedium,
  },
});

