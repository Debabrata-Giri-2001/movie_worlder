import MovieCard from '@/components/MovieCard';
import useApi from '@/hooks/useApi';
import { Link, router } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height } = Dimensions.get('window');

const Home = () => {
    const { data: randomMovies, loading, error } = useApi<any>('movie/popular?language=en-US&page=1');
    const { data: popularMovies, loading: popularLoad, error: popularErr } = useApi<any>('movie/popular?language=en-US&page=1');
    const { data: nowPlaying, loading: nowPlayingLoad, error: nowPlayingErr } = useApi<any>('movie/now_playing?language=en-US&page=1');
    const { data: upcoming, loading: upcomingLoad, error: upcomingErr } = useApi<any>('movie/upcoming?language=en-US&page=1');
    const { data: topRated, loading: topRatedLoad, error: topRatedErr } = useApi<any>('movie/top_rated?language=en-US&page=1');

    // Check if loading or error exists
    if (loading || nowPlayingLoad || upcomingLoad || topRatedLoad || popularLoad) return <Text>Loading...</Text>;
    if (error || nowPlayingErr || upcomingErr || topRatedErr || popularErr) return <Text>Error: {error || nowPlayingErr || upcomingErr || topRatedErr}</Text>;
    
    const randomMovie = randomMovies?.results[Math.floor(Math.random() * randomMovies.results.length)];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* random */}
                {randomMovie && (
                    <View style={styles.randomMovieContainer}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}` }}
                            style={styles.randomMovieImage}
                        />
                    </View>
                )}

                {/* Popular Movies Section */}
                <Text style={styles.sectionTitle}>Popular</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularMovies?.results.map((movie: { id: number | string; title: string; poster_path: string }) => (
                        <Link style={{marginLeft:5,marginRight:5}} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>


                {/* Now Playing Section */}
                <Text style={styles.sectionTitle}>Now Playing</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {nowPlaying?.results.map((movie: any) => (
                        <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
                    ))}
                </ScrollView>

                {/* Upcoming Movies Section */}
                <Text style={styles.sectionTitle}>Upcoming</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {upcoming?.results.map((movie: any) => (
                        <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
                    ))}
                </ScrollView>

                {/* Top Rated Section */}
                <Text style={styles.sectionTitle}>Top Rated</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {topRated?.results.map((movie: any) => (
                        <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 80,
    },
    randomMovieContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    randomMovieImage: {
        width: '100%',
        height: height * 0.60,
    },
    randomMovieTitle: {
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 18,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
});

export default Home;
