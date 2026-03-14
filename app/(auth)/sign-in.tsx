import { authStyles as styles } from '@/constants/styles';
import { auth } from '@/services/firebase';
import { sanitiseEmail } from '@/utils/sanitise';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // index.tsx Redirect handles navigation automatically
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email"
        value={email} onChangeText={(email) => setEmail(sanitiseEmail(email))}
        autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password"
        value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <Link href="/(auth)/forgot-password" style={styles.link}>Forgot password?</Link>
      <Link href="/(auth)/sign-up" style={styles.link}>Don't have an account? Sign Up</Link>
    </View>
  );
}