import { authStyles as styles } from '@/constants/styles';
import { auth } from '@/services/firebase';
import { sanitiseEmail } from '@/utils/sanitise';
import { Link } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check your email', 'A password reset link has been sent.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput style={styles.input} placeholder="Email"
        value={email} onChangeText={(email) => setEmail(sanitiseEmail(email))}
        autoCapitalize="none" keyboardType="email-address" />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
      <Link href="/(auth)/sign-in" style={styles.link}>Back to Sign In</Link>
    </View>
  );
}