import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2e2e2e', }}>
            <View >
                <Text>Setting</Text>
            </View>
        </SafeAreaView>
    )
}

export default Settings
