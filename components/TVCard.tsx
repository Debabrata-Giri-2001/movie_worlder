import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TVCard = ({ posterPath }: any) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 300,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 8,
    },
});

export default TVCard;
