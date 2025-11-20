import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { AppButton } from '../components/AppButton';
import { SurplusLogo } from '../components/SurplusLogo';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../theme/colors';
import { completeGoogleAuth } from '../store/slices/appSlice';
import { ENV } from '../config/env';

type GoogleLoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GoogleLogin'>;

export const GoogleLoginScreen = () => {
  const navigation = useNavigation<GoogleLoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🔵 GoogleLoginScreen: useEffect - Configuring Google Sign-In');
    console.log('📊 GoogleLoginScreen: ENV.GOOGLE_WEB_CLIENT_ID:', ENV.GOOGLE_WEB_CLIENT_ID ? 'SET (' + ENV.GOOGLE_WEB_CLIENT_ID.substring(0, 20) + '...)' : 'EMPTY');
    
    if (!ENV.GOOGLE_WEB_CLIENT_ID) {
      console.error('❌ GoogleLoginScreen: GOOGLE_WEB_CLIENT_ID is empty! Run: npm run generate-env-config');
      return;
    }
    
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
    console.log('✅ GoogleLoginScreen: Google Sign-In configured');
    
    // Check if user is already signed in
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      console.log('🔵 GoogleLoginScreen: Checking sign-in status...');
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log('📊 GoogleLoginScreen: isSignedIn =', isSignedIn);
      
      if (isSignedIn) {
        console.log('🔵 GoogleLoginScreen: User is signed in, fetching current user...');
        const userInfo = await GoogleSignin.getCurrentUser();
        console.log('📊 GoogleLoginScreen: getCurrentUser response:', JSON.stringify(userInfo, null, 2));
        
        if (userInfo && userInfo.data) {
          console.log('✅ GoogleLoginScreen: Found user data, handling sign-in success');
          handleSignInSuccess(userInfo.data);
        } else {
          console.log('⚠️ GoogleLoginScreen: User info exists but no data field');
        }
      } else {
        console.log('ℹ️ GoogleLoginScreen: User not signed in');
      }
    } catch (error) {
      // User not signed in, continue to login screen
      console.log('⚠️ GoogleLoginScreen: Error checking sign-in status:', error);
    }
  };

  const handleSignInSuccess = (userInfo: any) => {
    console.log('🔵 GoogleLoginScreen: handleSignInSuccess called');
    console.log('📊 GoogleLoginScreen: userInfo received:', JSON.stringify(userInfo, null, 2));
    
    // Handle both response formats: userInfo.user or userInfo directly
    const user = userInfo.user || userInfo;
    console.log('📊 GoogleLoginScreen: Extracted user object:', JSON.stringify(user, null, 2));
    
    if (!user) {
      console.error('❌ GoogleLoginScreen: No user object found');
      Alert.alert('Error', 'Failed to get user information from Google');
      setLoading(false);
      return;
    }
    
    if (!user.email) {
      console.error('❌ GoogleLoginScreen: No email found in user object');
      Alert.alert('Error', 'Failed to get user email from Google');
      setLoading(false);
      return;
    }

    console.log('✅ GoogleLoginScreen: User data valid, dispatching auth action');
    console.log('📊 GoogleLoginScreen: Email:', user.email);
    console.log('📊 GoogleLoginScreen: Name:', user.name);
    console.log('📊 GoogleLoginScreen: ID:', user.id || user.sub);

    dispatch(
      completeGoogleAuth({
        email: user.email,
        name: user.name || '',
        photo: user.photo || undefined,
        id: user.id || user.sub || '',
      }),
    );
    
    console.log('✅ GoogleLoginScreen: Auth action dispatched, navigating to Onboarding');
    setLoading(false);
    navigation.replace('Onboarding', { step: 0 });
  };

  const handleGoogleSignIn = async () => {
    console.log('🔵 GoogleLoginScreen: handleGoogleSignIn called');
    try {
      setLoading(true);
      console.log('🔵 GoogleLoginScreen: Checking Play Services...');
      await GoogleSignin.hasPlayServices();
      console.log('✅ GoogleLoginScreen: Play Services available');
      
      console.log('🔵 GoogleLoginScreen: Calling GoogleSignin.signIn()...');
      const response = await GoogleSignin.signIn();
      console.log('📊 GoogleLoginScreen: signIn response received');
      console.log('📊 GoogleLoginScreen: Response type:', typeof response);
      console.log('📊 GoogleLoginScreen: Response keys:', response ? Object.keys(response) : 'null');
      console.log('📊 GoogleLoginScreen: Full response:', JSON.stringify(response, null, 2));
      
      if (response && response.data) {
        console.log('✅ GoogleLoginScreen: Response has data field, using response.data');
        handleSignInSuccess(response.data);
      } else if (response && response.user) {
        console.log('✅ GoogleLoginScreen: Response has user field, using response directly');
        handleSignInSuccess(response);
      } else if (response) {
        console.log('✅ GoogleLoginScreen: Response exists, using response directly');
        handleSignInSuccess(response);
      } else {
        console.error('❌ GoogleLoginScreen: Invalid response - response is null/undefined');
        throw new Error('Invalid response from Google Sign-In');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('❌ GoogleLoginScreen: Error in handleGoogleSignIn');
      console.error('📊 GoogleLoginScreen: Error type:', typeof error);
      console.error('📊 GoogleLoginScreen: Error code:', error.code);
      console.error('📊 GoogleLoginScreen: Error message:', error.message);
      console.error('📊 GoogleLoginScreen: Full error:', JSON.stringify(error, null, 2));
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('⚠️ GoogleLoginScreen: User cancelled sign-in');
        Alert.alert('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('⚠️ GoogleLoginScreen: Sign-in already in progress');
        Alert.alert('Sign in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('⚠️ GoogleLoginScreen: Play Services not available');
        Alert.alert('Play Services not available or outdated');
      } else {
        // Some other error happened
        const errorMessage = error.message || error.toString() || 'Something went wrong with Google Sign-In';
        console.error('❌ GoogleLoginScreen: Unknown error:', errorMessage);
        Alert.alert('Error', errorMessage);
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.headline}>WELCOME TO{'\n'}SURPLUS</Text>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=80',
            }}
            resizeMode="cover"
            style={styles.heroImage}
          />
        </View>

        <View style={styles.formSection}>
          <AppButton
            label={loading ? 'Signing in...' : 'Continue with Google'}
            onPress={handleGoogleSignIn}
            loading={loading}
            style={styles.googleButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.usernameButton}
            onPress={() => navigation.navigate('Auth')}
            disabled={loading}
          >
            <Text style={styles.usernameButtonText}>Continue with Username</Text>
          </TouchableOpacity>

          <View style={styles.logoRow}>
            <SurplusLogo size={68} strokeColor={Colors.primaryDark} backgroundColor={Colors.highlightBackground} />
            <Text style={styles.logoCopy}>Surplus keeps every rescue fast and secure.</Text>
          </View>
        </View>
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
  googleButton: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  usernameButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  usernameButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
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

