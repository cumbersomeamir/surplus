import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from '../theme/colors';

type CategoryChipsProps = {
  categories: string[];
  initialIndex?: number;
  style?: ViewStyle;
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({ categories, initialIndex = 0, style }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.row, style]}>
      {categories.map((category, index) => {
        const selected = selectedIndex === index;
        return (
          <TouchableOpacity
            key={category}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => setSelectedIndex(index)}
          >
            <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{category}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 12,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
  },
  chipSelected: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  chipLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chipLabelSelected: {
    color: Colors.textOnDark,
    fontWeight: '600',
  },
});

