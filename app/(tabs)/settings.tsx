import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';

const Settings = () => {
    const { colors } = useTheme();

    const data = [
        {
            id: "1",
            title: "Account",
            icon: <MaterialCommunityIcons name={"account-cog"} size={24} color={colors.text} />,
            page: '/settings/account'
        },
        {
            id: "2",
            title: "Appearance",
            icon: <AntDesign name={"play"} size={24} color={colors.text} />,
            page: '/settings/appearance'
        },
        {
            id: "3",
            title: "Help",
            icon: <Entypo name={"help-with-circle"} size={24} color={colors.text} />,
            page: '/settings/help'
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#FFF' }}>Settings</Text>

            {/* profile */}
            <View style={[styles.profileView,{borderColor:colors.text}]}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1999/1999625.png' }} style={styles.profile} />
                <View style={{ marginHorizontal: 30 }}>
                    <Text style={{ color: colors.text, fontWeight: '500', fontSize: 18 }}>Debabrata Giri</Text>
                    <Text style={{ color: colors.text, fontWeight: '300', fontSize: 16, marginTop: 12 }}>debabratagiri5525@gamil.com</Text>
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