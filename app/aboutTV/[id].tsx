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
const TvDetails = () => {

    const router = useRouter();
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { data: tv, loading, error } = useApi<any>(`tv/${id}?language=en-US`, 'GET');
    const [isFavorite, setIsFavorite] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const existingFavs = await AsyncStorage.getItem('favorites');
                const favArray = existingFavs ? JSON.parse(existingFavs) : [];
                const isFav = favArray.some((item: any) => item.id === tv?.id);
                setIsFavorite(isFav);
            } catch (error) {
                console.error("Error checking favorite status", error);
            }
        };
        checkFavoriteStatus();
    }, [tv]);

    const handelFavLocal = async () => {
        try {
            const existingFavs = await AsyncStorage.getItem('favorites');
            let favArray = existingFavs ? JSON.parse(existingFavs) : [];

            if (isFavorite) {
                // Remove from favorites
                favArray = favArray.filter((item: any) => item.id !== tv.id);
                await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
                Alert.alert("Removed", `${tv.name} has been removed from your favorites.`);
            } else {
                favArray.push(tv);
                await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
                Alert.alert("Added", `${tv.name} has been added to your favorites.`);
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
                            <Text style={[styles.headerTitle,{color:colors.text}]}>{tv.name}</Text>
                        </View>
                        <TouchableOpacity onPress={handelFavLocal} style={styles.favoriteButton}>
                            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}` }}
                        style={styles.posterImage}
                    />
                    <View style={{ padding: 6 }}>
                        <Text style={[styles.title,{color:colors.text}]}>{tv.name}</Text>
                        <View style={styles.genresContainer}>
                            {tv.genres.map((genre: any) => (
                                <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                            ))}
                        </View>
                        <Text style={[styles.releaseDate,{color:colors.text}]}>{tv.first_air_date} | {tv.vote_average.toFixed(1)} / 10</Text>
                        <Text style={[styles.overview,{color:colors.text}]}>{tv.overview}</Text>
                    </View>

                    {tv.seasons.map((season: any) => (
                        <View key={season.id} style={styles.seasonContainer}>
                            <Text style={[styles.seasonTitle,{color:colors.text}]}>{season.name} - {season.episode_count} Episodes</Text>
                            {season.episodes?.map((episode: any) => (
                                <View key={episode.id} style={styles.episodeContainer}>
                                    <Image
                                        source={{ uri: episode.still_path ? `https://image.tmdb.org/t/p/w500${episode.still_path}` : undefined }}
                                        style={episode.still_path ? styles.episodeImage : styles.placeholderImage}
                                    />
                                    <View style={styles.episodeInfo}>
                                        <Text style={[styles.episodeTitle,{color:colors.text}]}>{episode.name}</Text>
                                        <Text style={[styles.episodeOverview,{color:colors.text}]}>{episode.overview || 'No overview available.'}</Text>
                                        <Text style={[styles.episodeDate,{color:colors.text}]}>{episode.air_date}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
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
        textAlign: 'center',
    },
    favoriteButton: {
        padding: 10,
    },
    posterImage: {
        width: '100%',
        height: 450,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white',
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
    releaseDate: {
        fontSize: 16,
        color: '#808080',
        marginVertical: 4,
    },
    overview: {
        fontSize: 16,
        color: 'white',
        marginVertical: 10,
    },
    seasonContainer: {
        marginTop: 15,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    seasonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    episodeContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    episodeImage: {
        width: 100,
        height: 60,
        borderRadius: 4,
    },
    placeholderImage: {
        width: 100,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 4,
    },
    episodeInfo: {
        marginLeft: 10,
        flex: 1,
    },
    episodeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    episodeOverview: {
        fontSize: 14,
        color: '#ccc',
    },
    episodeDate: {
        fontSize: 12,
        color: '#808080',
        marginTop: 4,
    },
});

export default TvDetails;
