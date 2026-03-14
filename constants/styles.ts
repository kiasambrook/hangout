import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
           padding: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#6C63FF', padding: 14,
            borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { color: '#6C63FF', textAlign: 'center', marginTop: 8 }
});