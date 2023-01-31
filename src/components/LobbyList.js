import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LobbyUser } from "./LobbyUser";
import { useTranslation } from "react-i18next";

export function LobbyList({ users, setVisible, leaveTeam }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      {users.length > 1 && (
        <Text onPress={() => leaveTeam()} style={styles.leaveText}>
          Выйти
        </Text>
      )}
      <View style={[styles.container, styles.lobbyContainer]}>
        {users.map((user, index) => (
          <LobbyUser key={index} user={user} />
        ))}
        {users.length !== 5 && (
          <View style={styles.user}>
            <TouchableOpacity
              style={styles.image}
              onPress={() => setVisible(true)}
            >
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.userName}
            ></Text>
          </View>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
    width: "100%",
  },
  lobbyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  text: {
    color: "white",
    paddingVertical: 16,
    paddingLeft: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  addIcon: {
    color: "white",
    textAlignVertical: "auto",
    textAlign: "center",
    paddingTop: 7.5,
    fontSize: 25,
  },
  user: {
    marginRight: 15,
  },
  userName: {
    fontWeight: "500",
    fontSize: 12,
    color: "#fff",
    marginTop: 8,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    color: "white",
    borderRadius: 5,
  },
  leaveText: {
    color: "white",
    textAlign: "right",
    paddingBottom: 5,
  },
});
