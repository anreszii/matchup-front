import { View, StyleSheet } from 'react-native'
import React from 'react'
import { TextComponent } from './Text'

export default function TeamChatItem({author, text}) {
  return (
    <View style={styles.container} >
      <TextComponent style={styles.author} >{author} </TextComponent>
      <TextComponent style={styles.text} >{text} </TextComponent>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    author: {
        marginBottom: 4,
        fontWeight: "600",
        fontSize: 13,
        lineHeight: 13,
        color: "rgba(255, 255, 255, 0.4)",
    },
    text: {
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
})