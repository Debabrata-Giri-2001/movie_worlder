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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>


      {/* Email Input with PNG Icon */}
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

      {/* Username Input with PNG Icon */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/456/456212.png' }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
        />
      </View>


      {/* Password Input with PNG Icons */}
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

      <Pressable style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Create Account</Text>
      </Pressable>

      <Text style={styles.footerText}>
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
    backgroundColor: '#121212', // Background color
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
  signupButton: {
    width: '100%',
    backgroundColor: '#32A873',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 30
  },
  signupButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  loginText: {
    color: '#32A873',
    fontWeight: 'bold',
  },
});

export default Signup;
