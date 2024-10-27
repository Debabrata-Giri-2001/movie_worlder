import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useApi, { useChange } from '@/hooks/useApi';
import { useTheme } from '@/components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
    id: string;
};

const MovieDetails = () => {
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { data: account, loading: accountLoad, error: accountErr } = useApi<any>(`account`, 'GET');
    const { data: movie, loading, error } = useApi<any>(`movie/${id}?language=en-US`, 'GET');
    const [isFavorite, setIsFavorite] = useState(false);
    const { change: fevPost, isChanging: fevLoad, error: fevErr } = useChange<any>();
    const { colors } = useTheme();

    const handleFavorite = async () => {
        const payload = {
            media_type: "movie",
            media_id: movie?.id,
            favorite: true,
        };

        try {
            const data = await fevPost(`account/${account?.id}/favorite`, 'POST', payload);
            if (data?.success === true) {
                setIsFavorite(true);
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const existingFavs = await AsyncStorage.getItem('favorites');
                const favArray = existingFavs ? JSON.parse(existingFavs) : [];
                const isFav = favArray.some((item: any) => item.id === movie?.id);
                setIsFavorite(isFav);
            } catch (error) {
                console.error("Error checking favorite status", error);
            }
        };
        checkFavoriteStatus();
    }, [movie]);

    const handelFavLocal = async () => {
        try {
            const existingFavs = await AsyncStorage.getItem('favorites');
            let favArray = existingFavs ? JSON.parse(existingFavs) : [];

            if (isFavorite) {
                // Remove from favorites
                favArray = favArray.filter((item: any) => item.id !== movie.id);
                await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
                Alert.alert("Removed", `${movie.title} has been removed from your favorites.`);
            } else {
                favArray.push(movie);
                await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
                Alert.alert("Added", `${movie.title} has been added to your favorites.`);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating favorites", error);
        }
    };


    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <FontAwesome5 size={18} name="arrow-left" color={colors.text} />
                        </TouchableOpacity>

                        <View style={styles.titleContainer}>
                            <Text style={[styles.headerTitle, { color: colors.text }]}>{movie.title}</Text>
                        </View>

                        <TouchableOpacity onPress={handelFavLocal} style={styles.favoriteButton}>
                            <FontAwesome
                                name={isFavorite ? 'heart' : 'heart-o'}
                                size={24}
                                color={isFavorite ? 'red' : colors.text}
                            />
                        </TouchableOpacity>
                    </View>

                    {movie && (
                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={styles.posterImage}
                            />
                            <View style={{ padding: 6 }}>
                                <Text style={[styles.title, { color: colors.movieHeading }]}>{movie.title}</Text>
                                <View style={styles.genresContainer}>
                                    {movie.genres.map((genre: any) => (
                                        <Text key={genre.id} style={styles.genre}>
                                            {genre.name}
                                        </Text>
                                    ))}
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 4 }}>
                                    <Text style={styles.releaseDate}>{movie.release_date}</Text>
                                    <Text style={styles.releaseDate}> | </Text>
                                    <Text style={styles.rating}>{movie.vote_average.toFixed(1)} / 10</Text>
                                </View>
                                <Text style={[styles.overview, { color: colors.movieHeading }]}>{movie.overview}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    backButton: {
        padding: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        flexShrink: 1,
        textAlign: 'center',
    },
    favoriteButton: {
        padding: 10,
        right: 10,
    },
    posterImage: {
        width: '100%',
        height: 250,
    },
    releaseDate: {
        fontSize: 16,
        color: '#808080',
    },
    rating: {
        fontSize: 16,
        color: '#808080',
    },
    overview: {
        fontSize: 16,
    },
    title: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: '500',
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    genre: {
        backgroundColor: '#3e3e3e',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
});

export default MovieDetails;
