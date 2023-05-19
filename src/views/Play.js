import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { containerStyles } from "@/styles/container.js";
import { Tabs } from "ui/Tabs.js";
import { ModeItem } from "@/components/ModeItem.js";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderMatchHistory } from "@/components/Layout/HeaderMatchHistory.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useEffect } from "react";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LobbyList } from "../components/LobbyList";
import { UsersModal } from "../components/Modals/UsersModal";
import socket from "@/socket";

export function Play({ navigation }) {
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [premium, setPremium] = useState(true);
  const [lobby, setLobby] = useState([]);
  const [friends, setFriends] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    socket.sendSocket("dark-side", {
      label: "check-team",
      controller: "check_team",
      params: [],
    });
  }, [navigation]);

  useEffect(() => {
    getData();
    let teamMap = new Map();
    socket.listenSocket(async (label, data) => {
      if (label === "check-team") {
        const membersAvi = [];
        setLobby(data.members);
        for (let member of data.members) {
          teamMap.set(member.name, member);
          membersAvi.push(member.name);
        }
        socket.sendSocket("query", {
          label: "get_avi_users",
          query: {
            method: "get",
            model: "User",
            filter: { "profile.username": membersAvi },
            fields: "profile.avatar profile.username",
          },
        });
      }
      if (label === "get_avi_users") {
        setLobby(
          data.map((item, index) => {
            return {
              ...teamMap.get(item.profile.username),
              image: item.profile.avatar,
            };
          })
        );
      }
      if (label === "find-lobby") {
        navigation.navigate("Tabs", { screen: "SearchGame" });
      }
      if (label === "message") {
        if (data.type === "lobby") {
          await AsyncStorage.setItem("chat_lobbyId", data.id);
        }
        if (data.type === "command") {
          await AsyncStorage.setItem("chat_commandId", data.id);
        }
      }
      if (label === "vote") {
        navigation.navigate("Tabs", { screen: "Game" });
      }
      if (label === "sync") {
        navigation.navigate("Tabs", { screen: "SearchGame" });
      }
      if (label === "join_team") {
        socket.sendSocket("dark-side", {
          label: "check-team",
          controller: "check_team",
          params: [],
        });
      }
      if (label === "leave_team") {
        socket.sendSocket("dark-side", {
          label: "check-team",
          controller: "check_team",
          params: [],
        });
      }
    });
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const getData = async () => {
    socket.sendSocket("dark-side", {
      label: "check-team",
      controller: "check_team",
      params: [],
    });
    const userData = await AsyncStorage.getItem("profile");
    setPremium(
      JSON.parse(userData)[0].premium.isPremium === true ? false : true
    );
    setLobby([
      {
        name: JSON.parse(userData)[0].profile.username,
        image: JSON.parse(userData)[0].profile.avatar,
      },
    ]);
    setFriends(
      JSON.parse(await AsyncStorage.getItem("friends")).map((item) => {
        return { ...item, isInvited: false };
      })
    );
  };
  const leaveTeam = () => {
    socket.sendSocket("dark-side", {
      controller: "leave_team",
      params: [],
    });
    setIsCreatingTeam(true);
    setTimeout(() => {
      getData();
    }, 1000);
  };

  const modes = [
    {
      name: t("screens.play.solo"),
      playStyle: "solo",
      items: [
        {
          name: t("screens.play.modes.training"),
          description: t("screens.play.modes.trainingDescription"),
          needSubscription: false,
          image: require("assets/play-item-Training.png"),
          minimumLevel: 0,
          mode: "classic",
          startg: "training",
        },
        {
          name: t("screens.play.modes.premierLeague"),
          description: t("screens.play.modes.premierLeagueDescription"),
          needSubscription: false,
          image: require("assets/play-item-Pro_League.png"),
          minimumLevel: 0,
          lockedMessage: t("screens.play.modes.premierLeagueLockedMessage"),
          mode: "classic",
          startg: "rating",
        },
        {
          name: t("screens.play.modes.masterLeague"),
          description: t("screens.play.modes.masterLeagueDescription"),
          needSubscription: false,
          image: require("assets/play-item-Premier_League.png"),
          minimumLevel: 0,
          isPremium: premium,
          lockedMessage: t("screens.play.modes.premierLeagueLockedMessage"),
          mode: "classic",
          startg: "rating",
        },
      ],
    },
  ];
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const inviteToLobby = (user) => {
    friends[friends.findIndex((item) => item === user)].isInvited = true;
    setFriends([...friends]);
    if (isCreatingTeam) {
      socket.sendSocket("dark-side", {
        label: "create_team",
        controller: "create_team",
        params: [],
      });
      setIsCreatingTeam(false);
    }

    setTimeout(() => {
      socket.sendSocket("dark-side", {
        label: "invite_to_lobby",
        controller: "invite_to_team",
        params: [user.name],
      });
    }, 1000);
  };

  const startGame = (item) => {
    socket.sendSocket("dark-side", {
      label: "find-lobby",
      controller: "find_lobby",
      params: ["Europe", item.startg],
    });
  };

  return (
    <>
      <Header>
        <HeaderTitle title={t("headerTitles.Play")} />
        <HeaderMatchHistory />
      </Header>
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={[containerStyles.container, containerStyles.containerPage]}
          refreshControl={
            <RefreshControl
              colors={["white"]}
              tintColor={"white"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={{ marginBottom: 16 }}>
            {lobby && (
              <LobbyList
                leaveTeam={leaveTeam}
                users={lobby}
                setVisible={setVisible}
              />
            )}
          </View>
          <Tabs
            items={modes.map((mode) => mode.name)}
            onPress={(index) => {
              setCurrentModeIndex(index);
            }}
            current={currentModeIndex}
          />
          {modes[currentModeIndex].items.map((item, index) => (
            <ModeItem
              item={item}
              playStyle={modes[currentModeIndex].playStyle}
              startGame={startGame}
              key={index}
            />
          ))}
        </ScrollView>
      )}
      {friends && (
        <UsersModal
          visible={visible}
          setVisible={setVisible}
          friends={friends}
          inviteToLobby={(user) => inviteToLobby(user)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
