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


export function MatchLobby({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [friends, setFriends] = useState([])
  const [lobby, setLobby] = useState([])
  const [lobbyId, setLobbyId] = useState()
  const [isCreatingTeam, setIsCreatingTeam] = useState(true)
  const {t, i18n} = useTranslation();
  useEffect(() => {
     (async () => {
      setFriends(JSON.parse(await AsyncStorage.getItem('friends')).map((item) => {
        return {...item, isInvited: false}
      }))
      const profile = JSON.parse(await AsyncStorage.getItem('profile'))
      setLobby([{name: profile[0].profile.username, image: profile[0].profile.avatar}])
      socket.listenSocket((label, data) => {
        if (label === 'create_team'){
        }
        if (label === 'invite_to_lobby'){
        }
        if (label === 'find-lobby'){
          navigation.navigate("Tabs", {screen: "SearchGame"});
        }
      })
    })()
  }, [navigation])

  const lobbyData = useSelector((state) => state.game.lobbyData || {});
  const inviteToLobby = (user) => {
    friends[friends.findIndex((item) => item === user)].isInvited = true
    setFriends([...friends])
    if (isCreatingTeam){
            socket.sendSocket('dark-side', {
      label: "create_team",
      controller: "create_team",
      params: []
    })
      setIsCreatingTeam(false)
    }

    setTimeout(() => {
      socket.sendSocket('dark-side', {
        label: 'invite_to_lobby',
        controller: 'invite_to_team',
        params: [user.name]
      })
    }, 1000)
  }
  const startGame = () => {
    socket.sendSocket(
      "dark-side",
      {
        label: "find-lobby",
        controller: "find_lobby",
        params: ["Europe", "rating"],
      },
    );
  }
  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={`${lobbyData.name} (${lobbyData.withTeam ? t("screens.mathLobby.group") : t("screens.mathLobby.solo")})`} />
      </Header>
      <View style={[containerStyles.container, containerStyles.containerPage]}>
        <View style={styles.inviteLabels}>
          <Text style={styles.inviteLabel}>
            {
              lobbyData.withTeam
                ? t("screens.mathLobby.inviteClanMembers")
                : t("screens.mathLobby.inviteFriends")
            }
          </Text>
        </View>
        <View style={[styles.container, styles.usersContainer]}>
          {
            friends && friends.map((user, index) => (
              <View
                key={index}
                style={{
                  ...styles.userContainer,
                  marginBottom: friends.length - 1 === index ? 0 : 16,
                }}
              >
                <Image style={styles.userAvatar} source={{uri: user.image}} />
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity style={styles.userButton} onPress={() => inviteToLobby(user)} disabled={user.isInvited}>
                  {
                    user.isInvited
                    ?
                      <InvitedIcon/>
                    :
                      <InviteIcon/>
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
        <View style={styles.inviteLabels}>
          <Text style={styles.inviteLabel}>{t("screens.mathLobby.lobby")}</Text>
        </View>
        <View style={{marginBottom: 16}}>
          {lobby && <UsersList users={lobby} showName={true}/>}
        </View>
        <View style={[styles.container, styles.startContainer]}>
          <Text style={styles.startText}>{t("screens.mathLobby.startGameDescription")}</Text>
          <Button
            title={t("screens.mathLobby.startGame")}
            width={300}
            onPress={() => {
              if (lobbyData.withTeam) {
                setVisible(true);
              } else {
                startGame()
              }
            }}
          />
        </View>
        <View></View>
      </View>
      <TeamSelectModal
        visible={visible}
        setVisible={setVisible}
      />
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
    borderRadius: 60
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
