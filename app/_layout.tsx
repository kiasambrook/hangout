import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/hooks/useAuth';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!user && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    }
  }, [user, loading]);

  if (loading) return <SplashScreen />;

  return <Slot />;
}