import { View, Image, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export function Timer({ setBeforeStart = () => {} }) {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [idInterval, setIdInterval] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIdInterval(
        setInterval(() => {
          if (second === 60) {
            setMinute(minute + 1);
            setSecond(0);
          } else {
            setSecond((second) => second + 1);
          }
        }, 1000)
      );
    } else {
      clearInterval(idInterval);
      setSecond(0);
      setMinute(0);
    }
  }, [isFocused]);

  useEffect(() => {
    if (second === 60) {
      setMinute((minute) => minute + 1);
      setSecond(0);
    }
    setBeforeStart(second);
  }, [second]);
  return (
    <View style={styles.container}>
      <Image source={require("assets/timer.png")} style={styles.icon} />
      <Text style={styles.text}>{`${minute < 10 ? `0${minute}` : minute}:${
        second < 10 ? `0${second}` : second
      }`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff",
  },
});
