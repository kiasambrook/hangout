import { authStyles as styles } from '@/constants/styles';
import { auth } from '@/services/firebase';
import { sanitiseEmail, validatePassword } from '@/utils/sanitise';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const message = validatePassword(password, confirmPassword)

    if (message) {
      return Alert.alert('Error', message);
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input} placeholder="Email"
        value={email} onChangeText={(email) => setEmail(sanitiseEmail(email))}
        autoCapitalize="none" keyboardType="email-address" returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()} />
      <TextInput ref={passwordRef} style={styles.input} placeholder="Password"
        value={password} onChangeText={setPassword} secureTextEntry
        returnKeyType="next" onSubmitEditing={() => confirmPasswordRef.current?.focus()} />
      <TextInput ref={confirmPasswordRef} style={styles.input} placeholder="Confirm Password"
        value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry
        returnKeyType="done" onSubmitEditing={handleSignUp} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <Link href="/(auth)/sign-in" style={styles.link}>Already have an account? Sign In</Link>
    </View>
  );
}