import { View, StyleSheet, Text } from "react-native";
import { containerStyles } from "@/styles/container.js";

import { Header } from "@/components/Layout/Header.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderRefill } from "@/components/Layout/HeaderRefill.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useTranslation } from "react-i18next";

export function Tournaments({ navigation }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header>
        <HeaderTitle title={t("headerTitles.Shop")} />
        <HeaderRefill />
      </Header>

      <View
        style={[
          containerStyles.container,
          containerStyles.containerPage,
          styles.shopContent,
        ]}
      >
        <Text style={styles.text}>
          Coming <Text style={styles.texts}>soon...</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  shopContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  texts: {
    color: "#FF5A45",
  },
});
