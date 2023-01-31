import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { useEffect } from "react";
import { UsersList } from "@/components/UsersList.js";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Friends({ userData }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);

   useEffect(() => {
     (async () => {
       setFriends(JSON.parse(new Array(await AsyncStorage.getItem("friends"))));
     })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>
          {t("labels.friends")} ({userData?.profile?.relations?.friends.length})
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tabs", { screen: "Friends" });
          }}
        >
          <Text style={[styles.label, styles.link]}>{t("labels.all")}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <UsersList
          users={friends}
          showName={true}
          friends={
            userData?.profile?.relations?.friends.length > 0 ? true : false
          }
        />
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
