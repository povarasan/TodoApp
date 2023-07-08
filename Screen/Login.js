import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const strongRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');

  const handleLogin = () => {
    // Reset previous error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Perform validation
    if (name === '') {
      setNameError('Please enter Username');
    } else if (email === '') {
      setEmailError('Please enter your email');
    } else if (!strongRegex.test(email)) {
      setEmailError('Please enter a valid email');
    } else if (password === '') {
      setPasswordError('Please enter your password');
    } else if (password.length < 8) {
      setPasswordError('Please enter a password of at least 8 characters');
    } else {
      navigation.navigate('Main', { username: name }); // Pass the username as a parameter
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.intro}>Welcome to Login</Text>
      <TextInput
        placeholder="Your Username"
        placeholderTextColor={'grey'}
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textBox}
      />
      {nameError !== '' && <Text style={styles.errorText}>{nameError}</Text>}

      <TextInput
        placeholder="Your Email"
        placeholderTextColor={'grey'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textBox}
      />
      {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        placeholder="Your Password"
        placeholderTextColor={'grey'}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.textBox}
      />
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity onPress={handleLogin} style={styles.login}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro: {
    fontSize: 22,
    color: 'white',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  textBox: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 320,
    height: 50,
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  login: {
    backgroundColor: '#4169e1',
    height: 35,
    width: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
    fontWeight: '600',
  },
});

export default Login;
