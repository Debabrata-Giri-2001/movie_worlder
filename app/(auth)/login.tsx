import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          inputMode="email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/483/483408.png' }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
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

      <Text style={styles.inactiveText}>Inactive</Text>

      <Pressable style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Haven’t made an account?{' '}
        <Link href="/signup" asChild>
          <Text style={styles.signupText}>
            Sign Up
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
    color: '#000',
  },
  inactiveText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#32A873',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  signupText: {
    color: '#32A873',
    fontWeight: 'bold',
  },
});

export default Login;
