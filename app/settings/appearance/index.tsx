import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/components/ThemeContext';

const Appearance: React.FC = () => {
    const { isDarkMode, toggleTheme, colors } = useTheme();
    const [language, setLanguage] = useState('en');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: colors.text }}>Appearance</Text>

            {/* Theme Toggle */}
            <View style={styles.toggleContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.toggleTrack }}
                    thumbColor={isDarkMode ? colors.toggleThumb : '#f4f3f4'}
                    onValueChange={toggleTheme}
                    value={isDarkMode}
                />
            </View>

            {/* Language Selector */}
            <View style={styles.selectContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Select Language</Text>
                <View style={{
                    borderColor: '#FFF',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 10
                }}>
                    <Picker
                        selectedValue={language}
                        style={[styles.picker, { color: colors.text }]}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                    >
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Spanish" value="es" />
                        <Picker.Item label="French" value="fr" />
                    </Picker>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    selectContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default Appearance;
