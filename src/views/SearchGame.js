import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { Timer } from "@/components/Timer.js";
import { GamePlayers } from "@/components/Game/GamePlayers.js";
import { ChooseMap } from "@/components/Game/ChooseMap.js";
import { Chat } from "@/components/Game/Chat.js";
import { typographyStyles } from "@/styles/typography.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Header } from "@/components/Layout/Header.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { LogoFullIcon, CrossIcon } from "@/icons";
import { headerStyles } from "@/styles/header.js";
import { SearchGamePlayes } from "../components/Game/SearchGameBox";
import { ReadyModal } from "../components/Modals/ReadyModal";
import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerBack } from "../components/TimerBack";

export function SearchGame({ navigation }) {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [countPlayers, setCountPlayers] = useState(1);

  useEffect(() => {
    (async () => {
      socket.listenSocket(async (label, data) => {
        if (label === "leave") {
          setVisible(false);
          socket.disconnectSocket();
          navigation.navigate("Tabs", { screen: "Play" });
        }
        if (label === "sync") {
          setVisible(false);
          setCountPlayers(data.players.length);
        }
        if (label === "ready") {
          setCountPlayers(data.players.length);
          const username = JSON.parse(await AsyncStorage.getItem("profile"))[0]
            .profile.username;
          await AsyncStorage.setItem("lobby", JSON.stringify(data.players));
          for (const item of data.players) {
            if (username === item.name && item.isReady === false) {
              setVisible(true);
            }
          }
        }
        if (label === "vote") {
          navigation.navigate("Tabs", { screen: "Game" });
          socket.disconnectSocket();
        }
      });
    })();
  }, []);

  const setReady = () => {
    socket.sendSocket("dark-side", {
      label: "set-ready",
      controller: "get_ready",
      params: [],
    });
  };

  return (
    <>
      <Header>
        <LogoFullIcon />
        <TouchableOpacity
          onPress={() => {
            console.log("close"); //TODO удалить
            socket.sendSocket("dark-side", {
              label: "leave-lobby",
              controller: "leave_lobby",
              params: [],
            });
            navigation.goBack();
          }}
          style={headerStyles.headerRight}
        >
          <CrossIcon />
        </TouchableOpacity>
      </Header>
      <View>
        <View
          style={{
            ...containerStyles.container,
            ...containerStyles.containerPage,
            marginBottom: 28,
            alignItems: "center",
          }}
        >
          <Timer />
          <Text style={typographyStyles.h2}>{t("screens.game.search")}</Text>
        </View>
        <View style={{ marginBottom: 32 }}>
          <SearchGamePlayes players={countPlayers} />
        </View>
      </View>
      <ReadyModal
        visible={visible}
        toggleVisible={() => setVisible(!visible)}
        onAccept={setReady}
      />
    </>
  );
}
