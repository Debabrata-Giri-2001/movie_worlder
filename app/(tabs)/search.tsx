import React, { useState, useCallback } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useApi from '@/hooks/useApi';
import { FontAwesome } from '@expo/vector-icons';
import { debounce } from '@/hooks/debounce';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const { data, loading, error } = useApi<any>(`search/keyword?query=${keyword}&page=1`);

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
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
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

            {loading && <Text style={styles.loading}>Loading...</Text>}

            {data && (
                <FlatList
                    data={data.results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.resultItem}>{item?.name}</Text>}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e3e3e',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
    },
    loading: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    resultItem: {
        color: 'white',
        fontSize: 16,
        margin: 4,
        padding: 5,
    },
});

export default Search;
