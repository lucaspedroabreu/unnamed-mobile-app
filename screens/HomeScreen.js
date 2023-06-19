import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { authSignOut } from '../utils/auth_signout'
import { updatePassword } from 'firebase/auth'
import { z } from 'zod'

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('')
  const [user] = useAuthState(auth)

  
  const handleChangePassword = () => {
      const passwordInput = z.string().min(8, "Your new password should be at least 8 characters long")
      console.log(newPassword)

      try {
        const parsedPassword =   passwordInput.parse(newPassword)
        console.log(parsedPassword)
        updatePassword(user, parsedPassword)
        alert("Password updated!")
        setModalVisible(!modalVisible)
      } catch (error) {
        alert(error)
      }
  }

  const handleLogOut = () => {
    authSignOut()
  }

  useEffect(() => {}, [user, useAuthState])

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <Text style={{textAlign: "center"}}>Do you wish to update you profiles password?</Text>
              <TextInput 
                placeholder='New password'
                placeholderTextColor="white" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                secureTextEntry
                style={styles.input}
              />
            </View>
              <Pressable
                style={[styles.button]}
                onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOutline]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonOutlineText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Pressable
        style={[styles.modalButton, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.modalButtonText}>Update Profile</Text>
      </Pressable>
      <Text>Email: {user?.email}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogOut}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    width: "90%"
  },
  input: {
    color: "white",
    backgroundColor: '#434343',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    backgroundColor: '#00bf63',
    width: "60%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: "#00bf63",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 18,
  },
  buttonOutlineText: {
    color: "#00bf63"
  },
  modalButton: {
    borderRadius: 24,
    padding: 12,
    elevation: 2,
    marginBottom: 120,
  },
  modalButtonText: {
    color: 'white'
  },
  buttonOpen: {
    backgroundColor: '#232323',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});