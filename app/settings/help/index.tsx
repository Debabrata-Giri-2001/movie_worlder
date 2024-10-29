import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/components/ThemeContext';

const Help = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
            <ScrollView>
                <Text style={[styles.title, { color: colors.text }]}>Help & Support</Text>

                <Text style={[[styles.heading,{color:colors.text}],{color:colors.text}]}>About the App</Text>
                <Text style={styles.description}>
                    This app is designed to help you manage favorite movie and serise can add oun your devices.
                </Text>

                <Text style={[styles.heading,{color:colors.text}]}>Logging In</Text>
                <Text style={styles.description}>
                    1. First you have to create your own account using Email,UserName,Password create your won account then naviaget the login page.
                </Text>
                <Text style={styles.description}>
                    2.To log in, enter your registered email and password on the login screen.
                </Text>

                <Text style={[styles.heading,{color:colors.text}]}>Managing Favorites</Text>
                <Text style={styles.description}>
                    You can save your favorite items by clicking the heart icon next to them.
                    also you can access all fav item in fav tab option.
                </Text>

                <Text style={[styles.heading,{color:colors.text}]}>Logging Out</Text>
                <Text style={styles.description}>
                    To log out, navigate to your profile settings and select the "Logout" option.
                    This will securely end your session and return you to the login screen.
                </Text>

                <Text style={[styles.heading,{color:colors.text}]}>Changing Settings</Text>
                <Text style={styles.description}>
                    In this app user cange chage the the laguage according to own native wise,also chage the theme of the application.
                </Text>

                <Text style={[styles.heading,{color:colors.text}]}>Contact Support</Text>
                <Text style={styles.description}>
                    If you have any further questions or need assistance, please contact our email ddddd@gmail.com.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    heading: {
        fontSize: 20,
        color: '#ffffff',
        marginTop: 15,
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 10,
        lineHeight: 24,
    },
});

export default Help;
