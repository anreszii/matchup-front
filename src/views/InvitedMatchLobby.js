import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault, InviteIcon, InvitedIcon } from "@/icons";
import { containerStyles } from "@/styles/container.js";
import { UsersList } from "@/components/UsersList.js";
import { TeamSelectModal } from "@/components/Modals/TeamSelectModal.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function InvitedMatchLobby({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [lobby, setLobby] = useState([]);
  const [lobbyId, setLobbyId] = useState();
  const [isCreatingTeam, setIsCreatingTeam] = useState(true);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    (async () => {
      setFriends(
        JSON.parse(await AsyncStorage.getItem("friends")).map((item) => {
          return { ...item, isInvited: false };
        })
      );
      const profile = JSON.parse(await AsyncStorage.getItem("profile"));
      setLobby([
        { name: profile[0].profile.username, image: profile[0].profile.avatar },
      ]);
      socket.listenSocket((label, data) => {
        if (label === "create_team") {
        }
        if (label === "invite_to_lobby") {
        }
      });
    })();
  }, [navigation]);

  const lobbyData = useSelector((state) => state.game.lobbyData || {});
  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={`ты лох и чмо`} />
      </Header>
      <View style={[containerStyles.container, containerStyles.containerPage]}>
        <View style={styles.inviteLabels}>
          <Text style={styles.inviteLabel}>{t("screens.mathLobby.lobby")}</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          {lobby && <UsersList users={lobby} showName={true} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
  },
  usersContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    marginRight: 12,
    width: 33,
    height: 33,
    borderRadius: 60,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  userButton: {
    marginLeft: "auto",
  },
  inviteLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inviteLabel: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  inviteTop: {
    color: "#FF5A45",
  },
  lobbyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  startContainer: {
    padding: 16,
    alignItems: "center",
  },
  startText: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 14,
  },
});
