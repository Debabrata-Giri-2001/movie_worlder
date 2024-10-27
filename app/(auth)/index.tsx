import React from 'react';
import { Text, Pressable, View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';

const OnBoarding = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/k42Owka8v91trK1qMYwCQCNwJKr.jpg' }}
        style={styles.backgroundImage}
      />
      <View style={[styles.buttonContainer, { backgroundColor: colors.background }]}>
        <Link href="/login" asChild>
          <Pressable style={styles.button1}>
            <Text style={styles.buttonText1}>Login</Text>
          </Pressable>
        </Link>

        <Link href="/signup" asChild>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText2}>Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  button1: {
    paddingVertical: 15,
    backgroundColor: '#32A873',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button2: {
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#32A873',
    alignItems: 'center',
  },
  buttonText2: {
    color: '#32A873',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoarding;
