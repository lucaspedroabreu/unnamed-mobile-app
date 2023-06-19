import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HeaderNavigation = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.name}
      </Text>
    </View>
  )
}

export default HeaderNavigation

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  text: {
    fontWeight: 'bold',
    fontSize: 28
  }
})