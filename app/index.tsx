import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;


  const redirectUser = () => {
    if (!user) {
      return <Redirect href="/(auth)/sign-in" />;
    }
    return <Redirect href="/(tabs)" />;
  };


  return redirectUser()
}