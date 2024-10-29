import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const FavMovieCard = ({ data }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {/* Movie Poster and Type */}
            <View style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}` }} style={styles.poster} />
                <Text style={[styles.type, { color: colors.text }]}>
                    {data?.title ? "Movie" : "TV Show"}
                </Text>
            </View>

            {/* Movie Info */}
            <View style={styles.infoContainer}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {data?.title || data?.name}
                </Text>
                <Text style={[styles.releaseDate, { color: colors.movieHeading }]}>
                    {data?.release_date || data?.first_air_date}
                </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.downloadTag}>Download</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 6,
        borderRadius: 10,
        marginVertical: 5,
    },
    poster: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 12,
    },
    type: {
        fontSize: 14,
        fontWeight:'600',
        marginTop:5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    releaseDate: {
        fontSize: 14,
        color: '#777',
    },
    actionsContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    downloadTag: {
        backgroundColor: '#EAFFE7',
        color: '#7BBB71',
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        borderColor: '#77BB71',
        borderWidth: 1,
        marginTop: 8,
    },
});

export default FavMovieCard;
