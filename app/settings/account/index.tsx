import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
    const [profile, setProfile] = useState({ user: '', email: '', avatar: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const storedProfile = await AsyncStorage.getItem('user-data');
                if (storedProfile) {
                    setProfile(JSON.parse(storedProfile));
                } else {
                    Alert.alert('No Profile Found', 'Please log in first.');
                    router.replace('/(auth)');
                }
            } catch (error) {
                console.log('Error :', error);
                Alert.alert('Error', 'Unable to fetch profile data.');
            }
        };
        getProfileData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user-data');
            Alert.alert('Logged Out', 'You have successfully logged out.', [
                { text: 'OK', onPress: () => router.replace('/(auth)') },
            ]);
        } catch (error) {
            console.log('Error logging out:', error);
            Alert.alert('Error', 'Unable to log out. Please try again.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2e2e2e', }}>
            <Text style={styles.heading}>About</Text>

            {/* Centered profile image */}
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1999/1999625.png' }}
                    style={styles.avatar}
                />
            </View>

            {/* Profile data below the image */}
            <View style={styles.profileDetails}>
                <Text style={styles.name}>User ID: {profile.user || 'Name not available'}</Text>
                <Text style={styles.email}>Email: {profile.email || 'Email not available'}</Text>
                <Text style={styles.email}>Password: {profile.password || 'Password not available'}</Text>
            </View>

            {/* Logout button at the bottom with icon */}
            <View style={styles.logoutButtonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        padding: 20,
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: '#FFF',
        marginBottom: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        height: 200,
        width: 200,
        borderRadius: 50,
    },
    profileDetails: {
        alignItems: 'flex-start',
        backgroundColor: '#444',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    name: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    email: {
        color: '#BBB',
        fontSize: 16,
        marginBottom: 5,
    },
    logoutButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d9534f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default Account;
