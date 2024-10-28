import MovieCard from '@/components/MovieCard';
import useApi from '@/hooks/useApi';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeContext';
import i18n from '@/app/i18n';

const { height } = Dimensions.get('window');

const Home = () => {
    const { data: randomMovies, loading, error } = useApi<any>('movie/popular?language=en-US&page=1', 'GET');
    const { data: popularMovies, loading: popularLoad, error: popularErr } = useApi<any>('movie/popular?language=en-US&page=1', 'GET');
    const { data: nowPlaying, loading: nowPlayingLoad, error: nowPlayingErr } = useApi<any>('movie/now_playing?language=en-US&page=1', 'GET');
    const { data: upcoming, loading: upcomingLoad, error: upcomingErr } = useApi<any>('movie/upcoming?language=en-US&page=1', "GET");
    const { data: topRated, loading: topRatedLoad, error: topRatedErr } = useApi<any>('movie/top_rated?language=en-US&page=1', "GET");

    const { colors } = useTheme();


    if (loading || nowPlayingLoad || upcomingLoad || topRatedLoad || popularLoad) return <Text style={{ color: colors.text }}>Loading...</Text>;
    if (error || nowPlayingErr || upcomingErr || topRatedErr || popularErr) return <Text style={{ color: colors.error }}>Error: {error || nowPlayingErr || upcomingErr || topRatedErr}</Text>;

    const randomMovie = randomMovies?.results[Math.floor(Math.random() * randomMovies.results.length)];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Random Movie Poster */}
                {randomMovie && (
                    <View style={styles.randomMovieContainer}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}` }}
                            style={styles.randomMovieImage}
                        />
                    </View>
                )}

                {/* Popular Movies Section */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("Popular")}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularMovies?.results.map((movie: { id: number | string; title: string; poster_path: string }) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* Now Playing Section */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("NowPlaying")}</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {nowPlaying?.results.map((movie: any) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* Upcoming Movies Section */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("Upcoming")}</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {upcoming?.results.map((movie: any) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>))}
                </ScrollView>

                {/* Top Rated Section */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("TopRated")}</Text>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {topRated?.results.map((movie: any) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>))}
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
    sectionTitle: {
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default Home;
