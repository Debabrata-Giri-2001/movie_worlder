import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import useApi from '@/hooks/useApi';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteParams = {
    id: string;
};

const MovieDetails = () => {
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { data: movie, loading, error } = useApi<any>(`movie/${id}?language=en-US`);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <FontAwesome5 size={18} name="arrow-left" color="#FFF" />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.headerTitle}>{movie.title}</Text>
                        </View>
                    </View>

                    {movie && (
                        <View >
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={styles.posterImage}
                            />
                            <View style={{ padding: 6 }}>
                                <Text style={styles.title}>{movie.title}</Text>

                                <View style={styles.genresContainer}>
                                    {movie.genres.map((genre?: any) => (
                                        <Text key={genre.id} style={styles.genre}>
                                            {genre.name}
                                        </Text>
                                    ))}
                                </View>
                                <View style={{display:'flex',flexDirection:'row',marginVertical:4}}>
                                    <Text style={styles.releaseDate}>{movie.release_date}</Text>
                                    <Text style={styles.releaseDate}> | </Text>
                                    <Text style={styles.rating}> {movie.vote_average.toFixed(1)} / 10</Text>
                                </View>
                                <Text style={styles.overview}>{movie.overview}</Text>

                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10,
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
        borderWidth: 2,
        textAlign: 'center',
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
        color: 'lightgray',
    },
    title: {
        fontSize: 16,
        color: 'lightgray',
        marginTop: 5,
        fontWeight: '500'
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
    productionTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
    },
    productionContainer: {
        marginTop: 10,
    },
    production: {
        fontSize: 16,
        color: 'lightgray',
    },
});

export default MovieDetails;