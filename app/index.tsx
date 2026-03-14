import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user
    ? <Redirect href="/(tabs)" />
    : <Redirect href="/(auth)/sign-in" />;
}