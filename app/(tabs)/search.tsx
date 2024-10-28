import React, { useState, useCallback } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useApi from '@/hooks/useApi';
import { FontAwesome } from '@expo/vector-icons';
import { debounce } from '@/hooks/debounce';
import { useTheme } from '@/components/ThemeContext';

const Search = () => {
    const { colors } = useTheme();
    const [keyword, setKeyword] = useState('');
    const { data, loading, error } = useApi<any>(`search/keyword?query=${keyword}&page=1`, 'GET');

    const debouncedSetKeyword = useCallback(
        debounce((text: string) => setKeyword(text), 300),
        []
    );

    const handleSearch = (text: string) => {
        debouncedSetKeyword(text);
    };

    const clearSearch = () => {
        setKeyword('');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.searchContainer, { backgroundColor: '#c4c4c4' }]}>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Search for a title..."
                    placeholderTextColor="#32A873"
                    value={keyword}
                    onChangeText={handleSearch}
                />
                {keyword ? (
                    <TouchableOpacity onPress={clearSearch}>
                        <FontAwesome size={18} name="times-circle" color="#32A873" style={styles.icon} />
                    </TouchableOpacity>
                ) : (
                    <FontAwesome size={18} name="search" color="#32A873" style={styles.icon} />
                )}
            </View>

            {loading && <Text style={[styles.loading, { color: colors.text }]}>Loading...</Text>}
            {data && (
                <FlatList
                    data={data.results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={[styles.resultItem, { color: colors.text }]}>{item?.name}</Text>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    loading: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    resultItem: {
        fontSize: 16,
        margin: 4,
        padding: 5,
    },
    error: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default Search;
