import { View, StyleSheet, Text } from "react-native";
import { User } from "@/components/User.js";
import { useTranslation } from "react-i18next";

export function UsersList({ users, showName, friends = true }) {
  const { t, i18n } = useTranslation();

  return (
    <View style={[styles.container, styles.lobbyContainer]}>
      {friends ? (
        users.map((user, index) => (
          <User key={index} user={user} showName={showName} />
        ))
      ) : (
        <Text style={styles.text}>{t("labels.friendsNone")}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
  },
  lobbyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    paddingVertical: 16,
    paddingLeft: 10,
  },
});
