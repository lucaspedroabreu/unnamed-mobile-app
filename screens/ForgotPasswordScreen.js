import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Image } from 'expo-image';
import React, { useState } from 'react'

import { auth } from '../firebase';
import { z } from 'zod';

import logo from '../assets/icon.png'

import { sendPasswordResetEmail } from 'firebase/auth';
import LineThroughText from '../components/LineThroughText';
import { StandardLogo } from '../components/StandardLogo';

const ForgotPasswordScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState('')

  async function passwordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      alert("Password reset email sent")
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const handleForgotPassword = () => {
    const emailInputSchema = z.string().email()

    try {
      console.log(emailInput)
      const recoveryEmail = emailInputSchema.parse(emailInput)
      passwordReset(recoveryEmail)

      navigation.replace('Login')
    } catch (error) {
      console.log(error)
      alert(error)
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
        <LineThroughText style={{marginBottom: 10}}>Reset your password</LineThroughText>
          <TextInput 
            placeholder='Email' 
            value={emailInput}
            onChange={(e) => setEmailInput(e.nativeEvent.text)} 
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reset my password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen

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