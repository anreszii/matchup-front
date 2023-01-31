import { View, Image, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export function TimerBack({ seconds, mapLength }) {
  const [second, setSecond] = useState(seconds ?? 20);
  const [localMapLength, setLocalMapLength] = useState(5);
  const [idInterval, setIdInterval] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !idInterval) {
      setIdInterval(
        setInterval(() => {
          setSecond((sec) => sec - 1);
        }, 1000)
      );
    } else {
      clearInterval(idInterval);
      setSecond(seconds ?? 20);
    }
  }, [isFocused]);

  const customClearInterval = async () => {
    await clearInterval(idInterval);
  };

  useEffect(() => {
    if (localMapLength !== mapLength) {
      customClearInterval();
      setLocalMapLength(mapLength);
      setSecond(seconds ?? 20);
      setIdInterval(
        setInterval(() => {
          setSecond((sec) => sec - 1);
        }, 1000)
      );
    }
  }, [mapLength]);

  useEffect(() => {
    if (second === 0) {
      clearInterval(idInterval);
    }
  }, [second]);

  return (
    <View style={styles.container}>
      <Image source={require("assets/timer.png")} style={styles.icon} />
      <Text style={styles.text}>{`0:${
        second < 10 ? [second <= 0 ? "00" : `0${second}`] : second
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
