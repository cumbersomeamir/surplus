import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../theme/colors';

type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type SettingsItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.settingsIcon}>{icon}</Text>
    <Text style={styles.settingsLabel}>{label}</Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

type SettingsSectionProps = {
  title: string;
  items: SettingsItemProps[];
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <SettingsItem key={index} {...item} />
    ))}
  </View>
);

export const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SettingsScreenRouteProp>();

  const settingsItems: SettingsItemProps[] = [
    { icon: '👤', label: 'Account details' },
    { icon: '💳', label: 'Payment cards' },
    { icon: '🎫', label: 'Vouchers' },
    { icon: '🎁', label: 'Special Rewards' },
    { icon: '🔔', label: 'Notifications' },
  ];

  const communityItems: SettingsItemProps[] = [
    { icon: '👥', label: 'Invite your friends' },
    { icon: '💬', label: 'Recommend a store' },
  ];

  const supportItems: SettingsItemProps[] = [
    { icon: '🛍️', label: 'Help with an order' },
    { icon: '❓', label: 'How Too Good To Go works' },
    { icon: '🏪', label: 'Sign up your food business' },
    { icon: '👔', label: 'Careers' },
  ];

  const otherItems: SettingsItemProps[] = [
    { icon: '👁️', label: 'Hidden Stores' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Manage account</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
          <SettingsSection title="SETTINGS" items={settingsItems} />
          <SettingsSection title="COMMUNITY" items={communityItems} />
          <SettingsSection title="SUPPORT" items={supportItems} />
          <SettingsSection title="OTHER" items={otherItems} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingsIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  chevron: {
    fontSize: 20,
    color: Colors.textMuted,
    marginLeft: 8,
  },
});

