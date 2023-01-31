import { View, SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Language } from "@/components/Layout/Language.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";

export function Welcome({ navigation }) {
  const {t, i18n} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundContainerWrapper} source={require("assets/welcome.png")} resizeMode="cover">
        <View style={styles.backgroundContainer}>
          <Language />
          <View style={styles.bottomWrapper}>
            <Text style={styles.bottomWrapperTitle}>
              {t("screens.welcome.title")}
            </Text>
            <Text style={styles.bottomWrapperDesc}>
              {t("screens.welcome.label")}
            </Text>

            <Button
              title={t("labels.createAccount")}
              onPress={() => navigation.navigate("SignUp")}
              width={265}
              style={{marginBottom: 16}}
            />

            <Button
              title={t("labels.logIn")}
              onPress={() => navigation.navigate("SignIn")}
              width={265}
              style={{marginBottom: 16}}
              outline
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text:{
    fontSize: 40,
    marginTop: 84,
    marginBottom: 14,
  },
  backgroundContainerWrapper:{
    flex: 1,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    top: 0
  },
  backgroundContainer:{
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 51,
  },
  bottomWrapper: {
    width: "100%",
    minHeight: 200,
    backgroundColor:"#22282e",
    borderRadius: 24,
    borderWidth: 2,
    borderColor:"#2c3237",
    paddingTop: 20,
    marginBottom: 40,
    paddingHorizontal: 35,
    paddingBottom: 28,
    alignItems:"center",
  },
  bottomWrapperTitle: {
    textAlign:"center",
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    maxWidth: 232,
    alignSelf:"center",
    marginBottom: 8,
  },

  bottomWrapperDesc: {
    opacity: 0.6,
    color: "white",
    fontSize: 16,
    maxWidth: 292,
    alignSelf:"center",
    textAlign:"center",
    marginBottom: 32,
  },
});
