import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { AppButton } from '../components/AppButton';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TabParamList } from '../navigation/MainTabs';
import { RootState } from '../store';
import { Colors } from '../theme/colors';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const email = useSelector((state: RootState) => state.app.email);
  const [showBusinessBanner, setShowBusinessBanner] = useState(true);
  const [hasOrders] = useState(false); // Will be connected to orders state later

  // Extract name from email or use default
  const userName = email
    ? email.split('@')[0].split('.').map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')
    : 'User';

  const handleFindBag = () => {
    navigation.navigate('Discover');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>👤</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🚿</Text>
            <Text style={styles.statTitle}>CO2e avoided</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statUnit}>minutes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statTitle}>Money saved</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statUnit}>GBP</Text>
          </View>
        </View>

        {/* No Orders Section */}
        {!hasOrders && (
          <View style={styles.noOrdersSection}>
            <View style={styles.bagIconContainer}>
              <Text style={styles.bagIcon}>🛍️</Text>
            </View>
            <Text style={styles.noOrdersTitle}>You have no orders</Text>
            <Text style={styles.noOrdersSubtitle}>There&apos;s good food just waiting to be rescued!</Text>
            <TouchableOpacity onPress={handleFindBag}>
              <Text style={styles.findBagLink}>Find a Surprise Bag</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Invite Friends Card */}
        <View style={styles.inviteCard}>
          <View style={styles.inviteImageContainer}>
            <View style={styles.inviteImagePlaceholder}>
              <Text style={styles.inviteImageIcon}>👋</Text>
            </View>
          </View>
          <View style={styles.inviteContent}>
            <Text style={styles.inviteTitle}>Invite your friends</Text>
            <Text style={styles.inviteDescription}>
              Earn a voucher for each friend who joins and saves food!
            </Text>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>☑ Earn £2.00 vouchers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Voucher Details Section */}
        <View style={styles.voucherSection}>
          <Text style={styles.voucherTitle}>Earn as many £2.00 vouchers as you can</Text>
          <Text style={styles.voucherDescription}>
            Your friends get to save their first Surprise Bag or Too Good To Go Parcel, and
            you&apos;ll get a £2.00 voucher
          </Text>
        </View>

        {/* Business Banner */}
        {showBusinessBanner && (
          <View style={styles.businessBanner}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBusinessBanner(false)}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.businessTitle}>DO YOU OWN A FOOD BUSINESS?</Text>
            <Text style={styles.businessDescription}>
              Our marketplace connects your business with 19000000 registered users in United
              Kingdom.
            </Text>
            <View style={styles.businessImageContainer}>
              <View style={styles.businessImagePlaceholder}>
                <Text style={styles.businessBagIcon}>🛍️</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.businessButton}>
              <Text style={styles.businessButtonText}>Business sign-up</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 25 11 0 (4444 0)</Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.card,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.highlightBackground,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileIconText: {
    fontSize: 28,
  },
  userName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
    color: Colors.primaryDark,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statUnit: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  noOrdersSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  bagIconContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  bagIcon: {
    fontSize: 80,
  },
  noOrdersTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  noOrdersSubtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  findBagLink: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    textDecorationLine: 'underline',
  },
  inviteCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.sectionBackground,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  inviteImageContainer: {
    marginRight: 16,
  },
  inviteImagePlaceholder: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteImageIcon: {
    fontSize: 40,
  },
  inviteContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  inviteDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  inviteButton: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textOnDark,
  },
  voucherSection: {
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
  },
  voucherTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textOnDark,
    marginBottom: 12,
  },
  voucherDescription: {
    fontSize: 14,
    color: Colors.textOnDark,
    lineHeight: 20,
    opacity: 0.9,
  },
  businessBanner: {
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 20,
    color: Colors.textOnDark,
    fontWeight: '600',
  },
  businessTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textOnDark,
    marginBottom: 12,
    marginTop: 8,
  },
  businessDescription: {
    fontSize: 14,
    color: Colors.textOnDark,
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  businessImageContainer: {
    marginBottom: 20,
  },
  businessImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessBagIcon: {
    fontSize: 60,
  },
  businessButton: {
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: Colors.textOnDark,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  businessButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textOnDark,
  },
  versionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});

