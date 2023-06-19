import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import { authEmailSignUp } from '../utils/auth_email_signup';
import { z } from 'zod';

import LineThroughText from '../components/LineThroughText';
import { StandardLogo } from '../components/StandardLogo';

const SignUpScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ email: '', password: '', passwordConfirmation: ''})

  const handleUserDataForm = (event, inputName) => {
    setUserData({
      ...userData,
      [inputName]: event.nativeEvent.text
    })
  }

  const handleSignUp = () => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 characters long"),
      passwordConfirmation: z.string(),
    }).refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    })

    try {
      const parsedData =  schema.parse(userData)
      authEmailSignUp(parsedData)
      
    } catch (error) {
      error.issues.forEach(issue => {
        alert(issue.message)
      })
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
          <TextInput 
            placeholder='Password Confirmation' 
            value={userData.passwordConfirmation} 
            onChange={(e) => handleUserDataForm(e, "passwordConfirmation")}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <LineThroughText style={{marginTop: 20, marginBottom: 5}}>Have an account? Log in!</LineThroughText>
          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Back to login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

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
  ctaText: {
    marginTop: 20,
    marginBottom: 5,
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