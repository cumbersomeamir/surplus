import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../store';
import { setLocation } from '../store/slices/appSlice';
import { Colors } from '../theme/colors';

type LocationPickerScreenRouteProp = RouteProp<RootStackParamList, 'LocationPicker'>;

const INDIAN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Agra',
  'Nashik',
  'Faridabad',
  'Meerut',
  'Rajkot',
  'Varanasi',
  'Srinagar',
  'Amritsar',
  'Chandigarh',
  'Jodhpur',
  'Raipur',
  'Allahabad',
  'Coimbatore',
  'Jabalpur',
  'Gwalior',
  'Vijayawada',
  'Madurai',
  'Guwahati',
  'Hubli',
  'Mysore',
  'Tiruchirappalli',
  'Bareilly',
  'Aligarh',
  'Moradabad',
  'Solapur',
  'Gurgaon',
  'Jalandhar',
  'Bhubaneswar',
  'Bhiwandi',
  'Saharanpur',
];

type LocationPickerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LocationPicker'>;

export const LocationPickerScreen = () => {
  const navigation = useNavigation<LocationPickerScreenNavigationProp>();
  const dispatch = useDispatch();
  const currentLocation = useSelector((state: RootState) => state.app.selectedLocation);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = INDIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (city: string) => {
    dispatch(setLocation(city));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Location</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cities..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="words"
          />
        </View>

        {/* Current Location */}
        <View style={styles.currentLocationContainer}>
          <Text style={styles.currentLocationLabel}>Current Location</Text>
          <Text style={styles.currentLocationValue}>{currentLocation}</Text>
        </View>

        {/* Cities List */}
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.cityItem, item === currentLocation && styles.cityItemSelected]}
              onPress={() => handleSelectLocation(item)}
            >
              <Text style={[styles.cityText, item === currentLocation && styles.cityTextSelected]}>
                {item}
              </Text>
              {item === currentLocation && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  currentLocationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.sectionBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  currentLocationLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  currentLocationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  listContent: {
    paddingBottom: 20,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  cityItemSelected: {
    backgroundColor: Colors.primaryLight,
  },
  cityText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  cityTextSelected: {
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontWeight: '700',
  },
});

