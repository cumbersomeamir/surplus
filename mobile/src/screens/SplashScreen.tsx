import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { SurplusLogo } from '../components/SurplusLogo';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

const DISPLAY_DURATION_MS = 1200;

export const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scale = useRef(new Animated.Value(0.9)).current;
  const wobble = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.02, duration: 280, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.98, duration: 260, useNativeDriver: true }),
      ]),
    );
    pulse.start();

    Animated.parallel([
      Animated.timing(wobble, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('GoogleLogin');
    }, DISPLAY_DURATION_MS);

    return () => {
      pulse.stop();
      clearTimeout(timer);
    };
  }, [navigation, opacity, scale, wobble]);

  const rotate = wobble.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-3deg', '3deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, { transform: [{ scale }, { rotate }], opacity }]}>
        <SurplusLogo size={180} />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity }]}>Surplus</Animated.Text>
      <Text style={styles.subtitle}>Rescue meals. Reward everyone.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  logoWrapper: {
    padding: 16,
    borderRadius: 160,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    marginTop: 24,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

