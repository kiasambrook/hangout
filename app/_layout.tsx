import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/hooks/useAuth';
import { Redirect, Slot, useSegments } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const { user, loading, profileComplete } = useAuth();
  const segments = useSegments() as string[];

  if (loading) {
    return <SplashScreen />;
  }

  const inAuthGroup = segments[0] === '(auth)';
  const inOnboarding = segments[0] === 'onboarding';

  if (!user && !inAuthGroup) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (user && !profileComplete && !inOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (user && profileComplete && (inAuthGroup || inOnboarding)) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
