import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import { authEmailSignUp } from '../utils/auth_email_signup';
import { authEmailLogIn } from '../utils/auth_email_login';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import { z } from 'zod';

import LineThroughText from '../components/LineThroughText';
import { StandardLogo } from '../components/StandardLogo';

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ email: '', password: ''})
  const [user] = useAuthState(auth)

  const handleUserDataForm = (event, inputName) => {
    setUserData({
      ...userData,
      [inputName]: event.nativeEvent.text
    })
  }

  const handleForgotPassword = () => {

    Alert.alert(
      'Forgot your password?',
      'Click yes to navigate to reset email page',
      [
        {text: 'Yes', onPress: () => navigation.navigate('ForgotPassword'), style: 'default'},
        {text: 'Cancel', onPress: () => console.log('Canceled Operation'), style: 'cancel'},
      ],
      "plain-text",
      "Type your email",
      "string",
      {
        cancelable: true
      }
    )
  }

  const handleLogIn = () => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8, "Your password should be at least 8 characters long")
    })

    try {
      const parsedData =  schema.parse(userData)
      authEmailLogIn(parsedData)
      
    } catch (error) {
      error.issues.forEach(issue => {
        alert(issue.message)
      })
    }

    if (user) {
      navigation.replace('Home')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
      <View style={styles.innerContainer}>
        <StandardLogo /> 
        <View style={styles.formContainer}>
          <TextInput 
            placeholder='Email' 
            value={userData.email}
            onChange={(e) => handleUserDataForm(e, "email")} 
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput 
            placeholder='Password' 
            value={userData.password} 
            onChange={(e) => handleUserDataForm(e, "password")}
            secureTextEntry
            style={styles.input}
          />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}><Text style={{marginTop: 10, fontWeight: 'bold'}}>Forgot your password?</Text></TouchableOpacity>
        <LineThroughText style={{marginTop: 20, marginBottom: 5}}>No account? Sign Up!</LineThroughText>
        <TouchableOpacity
          onPress={() => navigation.replace("Signup")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: '#00bf63',
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 18,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: "#00bf63",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#00bf63"
  },
})