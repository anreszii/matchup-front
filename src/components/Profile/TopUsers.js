import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { UsersList } from "@/components/UsersList.js";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export function TopUsers({ refresh }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState(0);

  const getData = async () => {
    const top = JSON.parse(new Array(await AsyncStorage.getItem("top")))[0]
      .records;
    const user = await AsyncStorage.getItem("user");
    setLength(top.findIndex((el) => el.name === user) + 1);
    setUsers(top.slice(0, 5));
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>
          {t("components.topPlayers.title")} · {length}{" "}
          {t("components.topPlayers.place")}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Tabs", { screen: "TopPlayers" })}
        >
          <Text style={[styles.label, styles.link]}>{t("labels.all")}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <UsersList users={users} showName={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  link: {
    color: "#FF5A45",
  },
});
