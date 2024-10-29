import MovieCard from '@/components/MovieCard';
import useApi from '@/hooks/useApi';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeContext';
import i18n from '@/app/i18n';
import { Feather } from '@expo/vector-icons';
import TVCard from '@/components/TVCard';

const { height } = Dimensions.get('window');

const Home = () => {
    const { data: randomMovies, loading, error } = useApi<any>('movie/popular?language=en-US&page=1', 'GET');
    const { data: popularMovies, loading: popularLoad, error: popularErr } = useApi<any>('movie/popular?language=en-US&page=1', 'GET');
    const { data: nowPlaying, loading: nowPlayingLoad, error: nowPlayingErr } = useApi<any>('movie/now_playing?language=en-US&page=1', 'GET');
    const { data: upcoming, loading: upcomingLoad, error: upcomingErr } = useApi<any>('movie/upcoming?language=en-US&page=1', "GET");
    const { data: topRated, loading: topRatedLoad, error: topRatedErr } = useApi<any>('movie/top_rated?language=en-US&page=1', "GET");


    const { data: popularTV, loading: popularTVLoad, error: popularTVErr } = useApi<any>('tv/popular?language=en-US&page=1', "GET");
    const { data: top_ratedTV, loading: top_ratedLoad, error: top_ratedTVErr } = useApi<any>('tv/top_rated?language=en-US&page=1', "GET");
    const { colors } = useTheme();


    if (loading || nowPlayingLoad || upcomingLoad || topRatedLoad || popularLoad || popularTVLoad) return <SafeAreaView style={{ flex: 1, backgroundColor:colors.background,justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text, textAlign: 'center' }}>
            Loading...
        </Text>
    </SafeAreaView>;
    if (error || nowPlayingErr || upcomingErr || topRatedErr || popularErr || top_ratedLoad) return <Text style={{ color: colors.background, textAlign: "center", alignSelf: "center" }}>Error: {error || nowPlayingErr || upcomingErr || topRatedErr}</Text>;

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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("Popular")}</Text>
                    <Link href={`/contentShow?params=popular`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularMovies?.results.map((movie: { id: number | string; title: string; poster_path: string }) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* popularTV */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("PopularTV")}</Text>
                    <Link href={`/contentTVShow?params=popular`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularTV?.results.map((movie: { id: number | string; title: string; poster_path: string }) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`aboutTV/${movie?.id}` as any} key={movie.id}>
                            <TVCard posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* Now Playing Section */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("NowPlaying")}</Text>
                    <Link href={`/contentShow?params=now_playing`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {nowPlaying?.results.map((movie: any) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* Upcoming Movies Section */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("Upcoming")}</Text>
                    <Link href={`/contentShow?params=upcoming`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
                <ScrollView style={{ marginLeft: 10, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    {upcoming?.results.map((movie: any) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`about/${movie?.id}` as any} key={movie.id}>
                            <MovieCard title={movie.title} posterPath={movie.poster_path} />
                        </Link>))}
                </ScrollView>

                {/* upcoming TV */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("top_rated")}</Text>
                    <Link href={`/contentTVShow?params=top_rated`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {top_ratedTV?.results.map((movie: { id: number | string; title: string; poster_path: string }) => (
                        <Link style={{ marginLeft: 5, marginRight: 5 }} href={`aboutTV/${movie?.id}` as any} key={movie.id}>
                            <TVCard posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </ScrollView>

                {/* Top Rated Section */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{i18n.t("TopRated")}</Text>
                    <Link href={`/contentShow?params=top_rated`}><Feather name="chevrons-right" size={24} color={colors.text} /></Link>
                </View>
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
