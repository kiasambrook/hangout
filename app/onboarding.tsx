import { authStyles as styles } from '@/constants/styles';
import { auth, db } from "@/services/firebase";
import { Redirect } from "expo-router";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!firstName || !lastName || !username) {
            Alert.alert('Required', 'All fields are required');
            return;
        }

        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                return <Redirect href="/(auth)/sign-in" />;
            }

            // Check username is unique
            const usernameQuery = query(
                collection(db, 'users'),
                where('username', '==', username.trim().toLowerCase())
            );
            const usernameSnap = await getDocs(usernameQuery);
            if (!usernameSnap.empty) {
                Alert.alert('Username taken', 'Please choose a different username.');
                setLoading(false);
                return;
            }


            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                username: username.trim().toLowerCase(),
                profilePicture: null,
                profileComplete: true,
                createdAt: new Date(),
            });

        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Up Profile</Text>
            <TextInput style={styles.input} placeholder="First Name"
                value={firstName} onChangeText={setFirstName} />
            <TextInput style={styles.input} placeholder="Last Name"
                value={lastName} onChangeText={setLastName} />
            <TextInput style={styles.input} placeholder="Username"
                value={username}
                onChangeText={(v) => setUsername(v.trim().toLowerCase())}
                autoCapitalize="none" />
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Continue'}</Text>
            </TouchableOpacity>
        </View>
    );
}