import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { AppButton } from '../components/AppButton';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../store';
import { Colors } from '../theme/colors';
import { ENV } from '../config/env';

const categories = ['Meals', 'Bread & pastries', 'Groceries', 'Flowers', 'Drinks'];
const collectionDays = ['Today', 'Tomorrow'];

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, required, children }) => (
  <View style={formFieldStyles.container}>
    <Text style={formFieldStyles.label}>
      {label}
      {required && <Text style={formFieldStyles.required}> *</Text>}
    </Text>
    {children}
  </View>
);

const formFieldStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: Colors.statusError,
  },
});

export const AddItemScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const username = useSelector((state: RootState) => state.app.username);
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [collectWindow, setCollectWindow] = useState('');
  const [distance, setDistance] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [availabilityLabel, setAvailabilityLabel] = useState('');
  const [collectionDay, setCollectionDay] = useState('');
  const [isSellingFast, setIsSellingFast] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!title || !subtitle || !collectWindow || !distance || !currentPrice || !imageUri) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const itemData = {
        title,
        subtitle,
        collectWindow,
        distance,
        currentPrice,
        originalPrice: originalPrice || undefined,
        imageUri,
        rating: rating || undefined,
        description: description || undefined,
        category: category || undefined,
        address: address || undefined,
        availabilityLabel: availabilityLabel || undefined,
        collectionDay: collectionDay || undefined,
        isSellingFast,
        reviewCount: 0,
        username: username || undefined,
      };

      const response = await axios.post(`${ENV.API_BASE_URL}/api/items`, itemData);

      if (response.data.success) {
        Alert.alert('Success', 'Item created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error: any) {
      console.error('Error creating item:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to create item. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Item</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Store Name */}
          <FormField label="Store Name" required>
            <TextInput
              style={styles.input}
              placeholder="e.g., Caffè Nero - Trafalgar Sq"
              placeholderTextColor={Colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />
          </FormField>

          {/* Item Name */}
          <FormField label="Item Name" required>
            <TextInput
              style={styles.input}
              placeholder="e.g., Standard Bag"
              placeholderTextColor={Colors.textMuted}
              value={subtitle}
              onChangeText={setSubtitle}
            />
          </FormField>

          {/* Collection Window */}
          <FormField label="Collection Window" required>
            <TextInput
              style={styles.input}
              placeholder="e.g., today 16:00 - 16:30"
              placeholderTextColor={Colors.textMuted}
              value={collectWindow}
              onChangeText={setCollectWindow}
            />
          </FormField>

          {/* Collection Day */}
          <FormField label="Collection Day">
            <View style={styles.row}>
              {collectionDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.chip, collectionDay === day && styles.chipActive]}
                  onPress={() => setCollectionDay(day)}
                >
                  <Text style={[styles.chipText, collectionDay === day && styles.chipTextActive]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </FormField>

          {/* Distance */}
          <FormField label="Distance" required>
            <TextInput
              style={styles.input}
              placeholder="e.g., 58 m"
              placeholderTextColor={Colors.textMuted}
              value={distance}
              onChangeText={setDistance}
            />
          </FormField>

          {/* Current Price */}
          <FormField label="Current Price" required>
            <TextInput
              style={styles.input}
              placeholder="e.g., £4.00"
              placeholderTextColor={Colors.textMuted}
              value={currentPrice}
              onChangeText={setCurrentPrice}
              keyboardType="default"
            />
          </FormField>

          {/* Original Price */}
          <FormField label="Original Price">
            <TextInput
              style={styles.input}
              placeholder="e.g., £12.00"
              placeholderTextColor={Colors.textMuted}
              value={originalPrice}
              onChangeText={setOriginalPrice}
            />
          </FormField>

          {/* Image URI */}
          <FormField label="Image URL" required>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor={Colors.textMuted}
              value={imageUri}
              onChangeText={setImageUri}
              autoCapitalize="none"
            />
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
            ) : null}
          </FormField>

          {/* Category */}
          <FormField label="Category">
            <View style={styles.row}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, category === cat && styles.chipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </FormField>

          {/* Address */}
          <FormField label="Address">
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., 60-61 Trafalgar Square, London"
              placeholderTextColor={Colors.textMuted}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={2}
            />
          </FormField>

          {/* Description */}
          <FormField label="Description">
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what's included in this item..."
              placeholderTextColor={Colors.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </FormField>

          {/* Rating */}
          <FormField label="Rating">
            <TextInput
              style={styles.input}
              placeholder="e.g., 4.2"
              placeholderTextColor={Colors.textMuted}
              value={rating}
              onChangeText={setRating}
              keyboardType="decimal-pad"
            />
          </FormField>

          {/* Availability Label */}
          <FormField label="Availability Label">
            <TextInput
              style={styles.input}
              placeholder="e.g., 1 left, Selling fast, New"
              placeholderTextColor={Colors.textMuted}
              value={availabilityLabel}
              onChangeText={setAvailabilityLabel}
            />
          </FormField>

          {/* Selling Fast Toggle */}
          <FormField label="Selling Fast">
            <TouchableOpacity
              style={[styles.toggle, isSellingFast && styles.toggleActive]}
              onPress={() => setIsSellingFast(!isSellingFast)}
            >
              <Text style={[styles.toggleText, isSellingFast && styles.toggleTextActive]}>
                {isSellingFast ? 'Yes' : 'No'}
              </Text>
            </TouchableOpacity>
          </FormField>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <AppButton label="Publish Item" onPress={handleSubmit} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.sectionBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chipActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: Colors.textOnDark,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  toggle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.sectionBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignSelf: 'flex-start',
  },
  toggleActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  toggleText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: Colors.textOnDark,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});

