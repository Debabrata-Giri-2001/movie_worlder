import FavMovieCard from '@/components/FavMovieCard';
import React, { useState, useCallback } from 'react';
import { FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/components/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';

const Favorites = () => {
    const { colors } = useTheme();

    const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            const storedFavs = await AsyncStorage.getItem('favorites');
            if (storedFavs) {
                setFavoriteMovies(JSON.parse(storedFavs));
            } else {
                setFavoriteMovies([]);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#FFF' }}>Favorites</Text>

            <FlatList
                style={{ marginBottom: 50 }}
                data={favoriteMovies}
                renderItem={({ item }) => <FavMovieCard data={item} />}
                keyExtractor={(item: any) => item.id.toString()}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={loadFavorites} />}
                ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.text }]}>No favorite movies found</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Favorites;
