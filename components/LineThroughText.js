import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LineThroughText = (props) => {
  return (
    <View style={[styles.outerContainer, props.style]}>
      <View style={styles.inner} />
        <View>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      <View style={styles.inner} />
    </View>
  )
}

export default LineThroughText

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  inner: {
    flex: 1, 
    height: 1, 
    backgroundColor: 'black'
  },
  text: {
    width: "auto", 
    textAlign: 'center',
    paddingHorizontal: 10,
    // fontWeight: 'bold'
  },
})