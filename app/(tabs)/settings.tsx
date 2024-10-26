import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2e2e2e', }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#FFF' }}>Settings</Text>

           
        </SafeAreaView>
    )
}

export default Settings
