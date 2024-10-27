import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Settings = () => {

    const data = [
        {
            id: "1",
            title: "Account",
            icon: <MaterialCommunityIcons name={"account-cog"} size={24} color={'white'} />,
            page: '/settings/account'
        },
        {
            id: "2",
            title: "Appearance",
            icon: <AntDesign name={"play"} size={24} color={'white'} />,
            page: '/settings/appearance'
        },
        {
            id: "3",
            title: "Help",
            icon: <Entypo name={"help-with-circle"} size={24} color={'white'} />,
            page: '/settings/help'
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2e2e2e', }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#FFF' }}>Settings</Text>

            {/* profile */}
            <View style={styles.profileView}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1999/1999625.png' }} style={styles.profile} />
                <View style={{ marginHorizontal: 30 }}>
                    <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 18 }}>Debabrata Giri</Text>
                    <Text style={{ color: '#FFF', fontWeight: '300', fontSize: 16, marginTop: 12 }}>debabratagiri5525@gamil.com</Text>
                </View>
            </View>
            {/* all action */}
            <View style={{ marginTop: 15 }}>
                {data?.map((i) => (
                    <Link href={i?.page} key={i?.id}>
                        <View
                            style={styles.actions}
                        >
                            <View style={{ marginRight: 10 }}>{i?.icon}</View>
                            <Text style={{ color: '#FFF', fontWeight: '400', fontSize: 16 }}>{i?.title}</Text>
                        </View>
                    </Link>
                ))}
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    profileView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 15,
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
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    }
})
export default Settings;