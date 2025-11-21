// importing libraries
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '../theme/colors';

export const AppTextField: React.FC<TextInputProps> = (props) => (
  <View style={styles.wrapper}>
    <TextInput
      placeholderTextColor={Colors.textMuted}
      style={styles.input}
      autoCapitalize="none"
      keyboardType="email-address"
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  input: {
    height: 48,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

