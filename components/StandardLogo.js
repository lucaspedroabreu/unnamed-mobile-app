import { StyleSheet } from 'react-native'
import { Image } from 'expo-image';

import logo from '../assets/icon.png'

import React from 'react'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const StandardLogo = (props) => {
  return (
      <Image
      style={styles.logo}
      placeholder={blurhash}
      source={logo}
      transition={1000}
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 80
  },
})