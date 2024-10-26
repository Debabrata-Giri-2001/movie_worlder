import FavMovieCard from '@/components/FavMovieCard';
import useApi, { useChange } from '@/hooks/useApi';
import React from 'react';
import { FlatList, Text, View, StyleSheet,RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Favorites = () => {
    const { data: account, loading: accountLoad, error: accountErr } = useApi<any>('account', 'GET');
    const { data: movie, loading, error, refetch } = useApi<any>(`account/${account?.id}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, 'GET');

    if (loading || accountLoad) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error || accountErr) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Error loading data</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:22,color:'#FFF'}}>Favorites</Text>
            <FlatList
                style={{marginBottom:50}}
                data={movie?.results}
                renderItem={({ item }) => <FavMovieCard data={item} />}
                keyExtractor={(item: any) => item.id.toString()}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Favorites;
