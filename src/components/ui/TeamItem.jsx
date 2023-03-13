import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { containerStyles } from '@/styles/container'
import { TextComponent } from './Text'
import { CrossIcon } from '@/icons'

export default function TeamItem({playerName, onRemove}) {
  return (
    <View style={{...containerStyles.row, ...styles.container}} >
      <View style={containerStyles.row}>
      <Image source={require("../../../assets/user.png")} style={styles.icon}/>
      <TextComponent style={styles.text} >{playerName} </TextComponent>
      </View>
      <TouchableOpacity onPress={() => onRemove(playerName)}>
      <CrossIcon style={styles.cross} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    icon: {
        width: 36,
        height: 36,
    },
    text: {
        marginLeft: 12,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 22,
        color: "#FFFFFF"
    },
    cross: {
        padding: 9,
        borderWidth: 1.5,
        borderColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 3,
    }
})