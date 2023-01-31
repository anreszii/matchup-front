import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { WinNotification, DefeatNotification, UserRefuse, UserAgree } from "@/icons";

export function Notification({ item }) {
  return (
    <View style={styles.notification}>
      {
        item.isGame && item.isRefuse
          ? <DefeatNotification style={styles.notificationIcon} />
          : item.isGame
            ? <WinNotification style={styles.notificationIcon} />
            : item.isRefuse
              ? <UserRefuse style={styles.notificationIcon} />
              : <UserAgree style={styles.notificationIcon} />
      }
      <View style={styles.notificationInfo}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        {
          item.description &&
            <Text style={styles.notificationDescription}>{item.description}</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notification: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationTitle: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  notificationDescription: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
});
