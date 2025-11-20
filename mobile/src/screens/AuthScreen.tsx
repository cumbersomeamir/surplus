import React, { useCallback, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { AppButton } from '../components/AppButton';
import { AppTextField } from '../components/AppTextField';
import { SurplusLogo } from '../components/SurplusLogo';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../theme/colors';
import { completeAuth } from '../store/slices/appSlice';

export const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const handleContinue = useCallback(() => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert('Enter a valid email address to continue.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(completeAuth(email.trim().toLowerCase()));
      setLoading(false);
      navigation.replace('Onboarding', { step: 0 });
    }, 600);
  }, [dispatch, email, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.headline}>LET&apos;S GET STARTED{'\n'}SAVING FOOD</Text>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=80',
            }}
            resizeMode="cover"
            style={styles.heroImage}
          />
        </View>
        <View style={styles.formSection}>
          <AppTextField placeholder="your@email.com" value={email} onChangeText={setEmail} />
          <AppButton label="Continue with email" onPress={handleContinue} loading={loading} />
          <View style={styles.logoRow}>
            <SurplusLogo size={68} strokeColor={Colors.primaryDark} backgroundColor={Colors.highlightBackground} />
            <Text style={styles.logoCopy}>Surplus keeps every rescue fast and secure.</Text>
          </View>
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
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 34,
    color: Colors.primaryDark,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 260,
    borderRadius: 28,
  },
  formSection: {
    gap: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.sectionBackground,
  },
  logoCopy: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

