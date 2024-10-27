import { useTheme } from '@/components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignUp = async () => {

    // Validate input fields
    if (!email || !user || !password) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const signUpData = JSON.stringify({ email, user, password });
      await AsyncStorage.setItem('user-data', signUpData);

      // Show success alert
      Alert.alert('Success', 'Account created successfully.', [
        {
          text: 'OK',
          onPress: () => router.replace("/(auth)/login"),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Sign Up</Text>

      {/* Email  */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {/* user name */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/456/456212.png' }}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Username"
          placeholderTextColor="#777"
          value={user}
          onChangeText={setUser}
        />
      </View>
      {/* password */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/483/483408.png' }}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={{
              uri: showPassword
                ? 'https://cdn-icons-png.flaticon.com/512/63/63498.png'
                : 'https://cdn-icons-png.flaticon.com/512/7508/7508559.png'
            }}
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      <Pressable style={styles.signupButton} onPress={handleSignUp}>
        <Text style={[styles.signupButtonText, { color: colors.background, }]}>Create Account</Text>
      </Pressable>

      <Text style={[styles.footerText, { color: colors.text, }]}>
        Already have an account?{' '}
        <Link href="/login" asChild>
          <Text style={styles.loginText}>
            Login
          </Text>
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  iconRight: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#32A873',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 30,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
  },
  loginText: {
    color: '#32A873',
    fontWeight: 'bold',
  },
});

export default Signup;
