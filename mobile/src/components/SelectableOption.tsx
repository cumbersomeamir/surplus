import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../theme/colors';

type SelectableOptionProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

export const SelectableOption: React.FC<SelectableOptionProps> = ({ label, selected, onToggle }) => (
  <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.circle, selected && styles.circleSelected]}>
      {selected && <View style={styles.innerDot} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  label: {
    fontSize: 16,
    color: Colors.textSecondary,
    flex: 1,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    backgroundColor: Colors.primaryDark,
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.textOnDark,
  },
});

