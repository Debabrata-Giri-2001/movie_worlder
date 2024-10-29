import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';
import i18n from '@/app/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    const [profile, setProfile] = useState({ user: '', email: '', avatar: '', password: '' });
    const { colors } = useTheme();
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const storedProfile = await AsyncStorage.getItem('user-data');
                if (storedProfile) {
                    setProfile(JSON.parse(storedProfile));
                }
            } catch (error) {
                console.log('Error :', error);
                Alert.alert('Error', 'Unable to fetch profile data.');
            }
        };
        getProfileData();
    }, []);
    const data = [
        {
            id: "1",
            title: i18n.t("Account"),
            icon: <MaterialCommunityIcons name={"account-cog"} size={24} color={colors.text} />,
            page: '/settings/account'
        },
        {
            id: "2",
            title: i18n.t("Appearance"),
            icon: <AntDesign name={"play"} size={24} color={colors.text} />,
            page: '/settings/appearance'
        },
        {
            id: "3",
            title: i18n.t("Help"),
            icon: <Entypo name={"help-with-circle"} size={24} color={colors.text} />,
            page: '/settings/help'
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#FFF' }}>{i18n.t("Settings")}</Text>

            {/* profile */}
            <View style={[styles.profileView,{borderColor:colors.text}]}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1999/1999625.png' }} style={styles.profile} />
                <View style={{ marginHorizontal: 30 }}>
                    <Text style={{ color: colors.text, fontWeight: '500', fontSize: 18 }}>{profile.user}</Text>
                    <Text style={{ color: colors.text, fontWeight: '300', fontSize: 16, marginTop: 12 }}>{profile.email}</Text>
                </View>
            </View>
            {/* all action */}
            <View style={{ marginTop: 15,width:'100%' }}>
                {data?.map((i:any) => (
                    <Link href={i?.page} key={i?.id}>
                        <View
                            style={styles.actions}
                        >
                            <View style={{ marginRight: 10 }}>{i?.icon}</View>
                            <Text style={{ color: colors.text, fontWeight: '400', fontSize: 16 }}>{i?.title}</Text>
                        </View>
                    </Link>
                ))}
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 0.4,
    },
    profile: {
        height: 70,
        width: 70,
        borderRadius: 100
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
})
export default Settings;