import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const FavMovieCard = ({data}: any) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.card,{backgroundColor:colors.cardBackground}]}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}` }} style={styles.poster} />
            <View style={styles.info}>
                <Text style={[styles.title,{color:colors.text}]}>{data?.title}</Text>
                <Text style={[styles.releaseDate,{color:colors.movieHeading}]}>{data?.release_date}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.downloadTag}>Download</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        marginVertical: 8,
    },
    poster: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    releaseDate: {
        fontSize: 14,
        marginTop: 5,
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    downloadTag: {
        backgroundColor:'#EAFFE7',
        color: '#7BBB71',
        fontSize: 12,
        padding:3,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#77BB71',
        marginTop: 10,
    },
});

export default FavMovieCard
