// MovieCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieCardProps {
  title: string;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath }) => {
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
    width: 120,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default MovieCard;
