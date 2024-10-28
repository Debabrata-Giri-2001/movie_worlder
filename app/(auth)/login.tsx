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
import i18n from '@/app/i18n';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const handelLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem('user-data');
      if (storedData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedData);
        if (email === storedEmail && password === storedPassword) {
          await AsyncStorage.setItem("isLoggedIn", "true");

          Alert.alert("Login Successful", "Welcome back!", [
            { text: "OK", onPress: () => router.replace("/(tabs)") },
          ]);
        } else {
          Alert.alert("Login Failed", "Invalid email or password.");
        }
      } else {
        Alert.alert("Error", "No account found. Please sign up first.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Login</Text>

      <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }}
          style={[styles.icon,{tintColor:colors.text}]}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Email"
          placeholderTextColor="#777"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/483/483408.png' }}
          style={[styles.icon,{tintColor:colors.text}]}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={password}
          onChangeText={setPassword}
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
            style={[styles.iconRight,{tintColor:colors.text}]}
          />
        </TouchableOpacity>
      </View>

      <Pressable style={styles.loginButton} onPress={handelLogin}>
        <Text style={[styles.loginButtonText, {color: colors.background,}]}>{i18n.t("Login")}</Text>
      </Pressable>

      <Text style={[styles.footerText, { color: colors.text, }]}>
        Haven’t made an account?{' '}
        <Link href="/signup" asChild>
          <Text style={styles.signupText}>{i18n.t("SignUp")}</Text>
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
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  loginButton: {
    width: '100%',
    backgroundColor: '#32A873',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
  },
  signupText: {
    color: '#32A873',
    fontWeight: 'bold',
  },
});

export default Login;
