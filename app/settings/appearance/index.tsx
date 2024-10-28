import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/components/ThemeContext';
import i18n from '@/app/i18n';

const Appearance: React.FC = () => {
    const { isDarkMode, toggleTheme, colors } = useTheme();
    const [language, setLanguage] = useState('eng');

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        i18n.locale = lang;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: colors.text }}>
                {i18n.t('appearance')}
            </Text>

            {/* Theme Toggle */}
            <View style={styles.toggleContainer}>
                <Text style={[styles.label, { color: colors.text }]}>{i18n.t('darkMode')}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.toggleTrack }}
                    thumbColor={isDarkMode ? colors.toggleThumb : '#f4f3f4'}
                    onValueChange={toggleTheme}
                    value={isDarkMode}
                />
            </View>

            {/* Language Selector */}
            <View style={styles.selectContainer}>
                <Text style={[styles.label, { color: colors.text }]}>{i18n.t('selectLanguage')}</Text>
                <View style={{
                    borderColor: '#FFF',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 10
                }}>
                    <Picker
                        selectedValue={language}
                        style={[styles.picker, { color: colors.text }]}
                        onValueChange={(itemValue) => changeLanguage(itemValue)}
                    >
                        <Picker.Item label="English" value="eng" />
                        <Picker.Item label="Spanish" value="spn" />
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
