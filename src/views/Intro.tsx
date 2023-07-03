import { useRef, useEffect, useState, FC } from "react";
import { SafeAreaView, StyleSheet, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "@/socket";
import { getData } from "@/requests";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
interface IIntro {
  navigation: any;
  forwardTo?: any;
  appReady: boolean;
}
SplashScreen.preventAutoHideAsync().catch(() => {});

export const Intro: FC<IIntro> = ({ navigation, forwardTo, appReady }) => {
  const scaleImg = useRef(new Animated.Value(5.5)).current;
  const positionImg = useRef(new Animated.Value(0)).current;
  const positionText = useRef(new Animated.Value(0)).current;
  const opacityText = useRef(new Animated.Value(0)).current;
  const { i18n } = useTranslation();
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    if (appReady) hideSplash();
  }, [appReady]);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleImg, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          delay: 0,
        }),
        Animated.timing(positionImg, {
          toValue: -65,
          duration: 250,
          useNativeDriver: true,
          delay: 500,
        }),
      ]),
      Animated.parallel([
        Animated.timing(positionText, {
          toValue: 38,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityText, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(async () => {
      const token = await AsyncStorage.getItem("token");
      const lang = await AsyncStorage.getItem("lang");
      if (lang) {
        i18n.changeLanguage(lang);
      }
      if (token) socket.updateToken(token);
      if (token) getData();
      navigation.navigate(token ? "Tabs" : "Instruction");
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        style={[
          styles.appImg,
          { transform: [{ scale: scaleImg }, { translateX: positionImg }] },
        ]}
        source={require("assets/iconTransparent.png")}
        resizeMode="cover"
      />
      <Animated.Image
        style={[
          styles.appNameText,
          { transform: [{ translateX: positionText }], opacity: opacityText },
        ]}
        source={require("assets/app-name.png")}
        resizeMode="stretch"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "#0B1218",
  },
  appImg: {
    position: "absolute",
    width: 50,
    height: 50,
    zIndex: 2,
    paddingRight: 10,
  },
  appNameText: {
    position: "absolute",
    width: 135,
    height: 18,
    zIndex: 1,
  },
});
