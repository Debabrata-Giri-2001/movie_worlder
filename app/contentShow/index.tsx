import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeContext';
import useApi from '@/hooks/useApi';
import MovieCard from '@/components/MovieCard';
import { useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';

const contentShow = () => {
    const route = useRoute<any>();
    const paramValue = route?.params?.params;
    const [page, setPage] = useState(1);
    const { colors } = useTheme();
    const { data: movies, loading, error } = useApi<any>(`movie/${paramValue}?language=en-US&page=${page}`, 'GET');

    const loadMore = () => {
        if (page < movies?.total_pages) {
            setPage((prev) => prev + 1);
        }
    };

    const loadPrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
                {paramValue.charAt(0).toUpperCase() + paramValue.slice(1)}
            </Text>
            <FlatList
                data={movies?.results}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${item?.id}` as any}>
                            <MovieCard title={item.title} posterPath={item.poster_path} />
                        </Link>
                    </View>
                )}
            />
            {loading && <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.text, textAlign: 'center' }}>
                    Loading...
                </Text>
            </SafeAreaView>}
            {error && <Text style={{ color: colors.background, textAlign: "center", alignSelf: "center" }}>Error loading movies.</Text>}

            <View style={styles.paginationContainer}>
                <Button title="Previous" onPress={loadPrevious} disabled={page === 1} />
                <Text style={{ color: colors.text, fontSize: 16 }}>
                    Page {page} of {movies?.total_pages || '...'}
                </Text>
                <Button title="Next" onPress={loadMore} disabled={page >= movies?.total_pages} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    cardContainer: { flex: 1, margin: 5 },
    paginationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
});

export default contentShow;
