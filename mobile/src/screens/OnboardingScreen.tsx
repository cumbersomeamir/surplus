import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '../components/AppButton';
import { ProgressDots } from '../components/ProgressDots';
import { SelectableOption } from '../components/SelectableOption';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../theme/colors';

type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;

const MOTIVATIONS = [
  'Supplementing my grocery shopping',
  'Saving money on groceries',
  'Getting a fun treat for myself or others',
  'Finding easy options to complement my meals',
  'Finding an immediate meal option',
  'Exploring new stores and cuisines',
];

const COLLECTION_TIMES = [
  'Early morning (06:00 - 09:00)',
  'Late morning (09:00 - 12:00)',
  'Midday (12:00 - 15:00)',
  'Afternoon (15:00 - 18:00)',
  'Evening (18:00 - 21:00)',
  'Late night (21:00 - 00:00)',
];

export const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OnboardingScreenRouteProp>();
  const [step, setStep] = useState(route.params?.step ?? 0);
  const [selectedMotivations, setSelectedMotivations] = useState<Set<number>>(new Set());
  const [selectedTimes, setSelectedTimes] = useState<Set<number>>(new Set());

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  const toggleMotivation = (index: number) => {
    const newSet = new Set(selectedMotivations);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedMotivations(newSet);
  };

  const toggleTime = (index: number) => {
    const newSet = new Set(selectedTimes);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedTimes(newSet);
  };

  const renderStep0 = () => (
    <View style={styles.content}>
      <Text style={styles.title}>GET READY FOR A SURPRISE</Text>
      <Text style={styles.description}>
        Stores can&apos;t know exactly what will be left at the end of the day, so what you get in
        your Surprise Bag is always a surprise.
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=80',
          }}
          resizeMode="contain"
          style={styles.bagImage}
        />
      </View>
    </View>
  );

  const renderStep1 = () => (
    <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>WHAT BRINGS YOU HERE?</Text>
      <Text style={styles.description}>
        Knowing what matters most to you helps us personalise recommendations and enhance your
        experience.
      </Text>
      <Text style={styles.selectAllHint}>Select all that apply</Text>
      <View style={styles.optionsContainer}>
        {MOTIVATIONS.map((motivation, index) => (
          <SelectableOption
            key={index}
            label={motivation}
            selected={selectedMotivations.has(index)}
            onToggle={() => toggleMotivation(index)}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>WHEN DO YOU PREFER TO COLLECT?</Text>
      <Text style={styles.description}>
        Let us know your preferred collection window, and we&apos;ll recommend Surprise Bags that
        fit your routine.
      </Text>
      <Text style={styles.selectAllHint}>Select all that apply</Text>
      <View style={styles.optionsContainer}>
        {COLLECTION_TIMES.map((time, index) => (
          <SelectableOption
            key={index}
            label={time}
            selected={selectedTimes.has(index)}
            onToggle={() => toggleTime(index)}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderStep3 = () => (
    <View style={styles.content}>
      <View style={styles.bellContainer}>
        <View style={styles.bellIcon}>
          <Text style={styles.bellEmoji}>🔔</Text>
        </View>
      </View>
      <Text style={styles.title}>Never miss a thing</Text>
      <Text style={styles.description}>
        Changes to your order? Exciting new stores? Delicious things to try? Get our push
        notifications to keep you up to date with all of it!
      </Text>
      <View style={styles.notificationButtons}>
        <AppButton label="Yes, please" onPress={handleNext} style={styles.primaryButton} />
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return renderStep0();
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep0();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderCurrentStep()}
        {step < 3 && (
          <View style={styles.footer}>
            <ProgressDots total={4} current={step} />
            <View style={styles.footerActions}>
              {step > 0 && (
                <TouchableOpacity onPress={handleSkip} style={styles.skipTextButton}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              )}
              <AppButton label="Next" onPress={handleNext} style={styles.nextButton} />
            </View>
          </View>
        )}
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  selectAllHint: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  bagImage: {
    width: 280,
    height: 320,
  },
  optionsContainer: {
    marginTop: 8,
  },
  bellContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bellIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.highlightBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellEmoji: {
    fontSize: 64,
  },
  notificationButtons: {
    width: '100%',
    gap: 16,
    marginTop: 32,
  },
  primaryButton: {
    width: '100%',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  footer: {
    gap: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  footerActions: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  skipTextButton: {
    paddingVertical: 8,
  },
  nextButton: {
    width: '100%',
  },
});
