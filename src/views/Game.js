import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { Timer } from "@/components/Timer.js";
import { GamePlayers } from "@/components/Game/GamePlayers.js";
import { ChooseMap } from "@/components/Game/ChooseMap.js";
import { Chat } from "@/components/Game/Chat.js";
import { typographyStyles } from "@/styles/typography.js";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Header } from "@/components/Layout/Header.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { LogoFullIcon, CrossIcon } from "@/icons";
import { headerStyles } from "@/styles/header.js";
import { useState, useEffect, useRef } from "react";
import socket from "@/socket";
import { Input } from "ui/Input.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { TimerBack } from "../components/TimerBack";
import { useDispatch, useSelector } from "react-redux";
import { setStartGame } from "@/store/gameSlice.js";

export function Game({ navigation }) {
  const { t, i18n } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [captains, setCaptains] = useState({});
  const [maps, setMaps] = useState([]);
  const [username, setUsername] = useState("");
  const [lobbyChatId, setLobbyChatId] = useState();
  const [commandChatId, setCommandChatId] = useState();
  const [lobbyChatHistory, setLobbyChatHistory] = useState([]);
  const [commandChatHistory, setCommandChatHistory] = useState([]);
  const [votingCaptain, setVotingCaptain] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [owner, setOwner] = useState("");
  const [flag, setFlag] = useState(false);
  const [gameLink, setGameLink] = useState("");
  const [isPrepare, setIsPrepare] = useState(false);
  const [isLinkSended, setIsLinkSended] = useState(false);
  const url = "https://discord.gg/rPBd2x3U5U";

  useEffect(() => {
    socket.sendSocket("dark-side", {
      label: "sync-lobby",
      controller: "sync_lobby",
      params: [],
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const startGame = useSelector((state) => state.game.startGame);

  useEffect(() => {
    (async () => {
      setLobbyChatId(await AsyncStorage.getItem("chat_lobbyId"));
      setCommandChatId(await AsyncStorage.getItem("chat_commandId"));
      let teamMap = [];
      socket.listenSocket(async (label, data) => {
        if (label === "leave") {
          setOwner("");
          navigation.navigate("Tabs", { screen: "Play" });
          socket.disconnectSocket();
        }
        if (label === "prepare") {
          setIsPrepare(true);
          setOwner(data.owner);
          if (data.hasOwnProperty("gameID")) {
            setGameLink(data.gameID);
          }
        }
        if (label === "sync-lobby") {
          if (players.length === 0) {
            const membersAvi = [];
            for (let member of data.response.players) {
              membersAvi.push(member.name);
            }
            teamMap = [...data.response.players];
            socket.sendSocket("query", {
              label: "get_ava_users",
              query: {
                method: "get",
                model: "User",
                filter: { "profile.username": membersAvi },
                fields: "profile.avatar profile.username",
              },
            });
          }
        }
        if (label === "get_ava_users") {
          for (const player of teamMap) {
            for (const item of data) {
              if (player.name === item.profile.username) {
                teamMap[teamMap.findIndex((item) => item === player)].image =
                  item.profile.avatar;
              }
            }
          }
          setPlayers([...teamMap]);
          setFlag(!flag);
        }
        if (label === "vote") {
          socket.sendSocket("dark-side", {
            label: "sync-lobby",
            controller: "sync_lobby",
            params: [],
          });
          setCaptains(data.captains);
          if (maps.length !== data.maps.length) {
            setMaps(data.maps);
          }
          setUsername(
            JSON.parse(await AsyncStorage.getItem("profile"))[0].profile
              .username
          );
          setVotingCaptain(data.votingCaptain);
        }
        if (label === "message") {
          if (data.type === "lobby") {
            setLobbyChatHistory((item) => [
              ...item,
              {
                author: data.message._author.name,
                message: data.message._content,
              },
            ]);
          } else if (data.type === "command") {
            setCommandChatHistory((item) => [
              ...item,
              {
                author: data.message._author.name,
                message: data.message._content,
              },
            ]);
          }
        }
        if (label === "start") {
          setIsGameStarted(true);
          if (!startGame) {
            dispatch(setStartGame(true));
            setLobbyChatHistory([]);
          }
        }
      });
    })();
  }, []);

  const uploadResults = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });
    if (!result.canceled) {
      const jwt = await AsyncStorage.getItem("token");
      try {
        const response = await FileSystem.uploadAsync(
          `https://barakobama.online:80/api/results/upload`,
          result.assets[0].uri,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            fieldName: "screen",
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const connectGame = () => {
    Linking.openURL(gameLink);
  };
  const connectDiscord = () => {
    Linking.openURL(url);
  };

  const sendMessage = (message, id) => {
    socket.sendSocket("dark-side", {
      label: "send-message",
      controller: "chat_message",
      params: [id, message],
    });
  };
  const voteMap = (map) => {
    socket.sendSocket("dark-side", {
      controller: "vote",
      params: [map],
    });
  };

  const sendLink = () => {
    socket.sendSocket("dark-side", {
      label: "set-game-id",
      controller: "set_game_id",
      params: [gameLink],
    });
    setIsLinkSended(true);
  };

  return (
    <>
      <Header>
        <LogoFullIcon />
      </Header>
      {players.length === 0 ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView>
            <View
              style={{
                ...containerStyles.container,
                ...containerStyles.containerPage,
                marginBottom: 50,
                alignItems: "center",
              }}
            >
              {!isGameStarted && <Timer />}
              <Text
                style={[
                  typographyStyles.h2,
                  isGameStarted && { fontSize: 16, color: "white" },
                ]}
              >
                {isGameStarted
                  ? t("screens.game.start")
                  : t("screens.game.preparing")}
              </Text>
            </View>
            <View style={{ marginBottom: 32, marginTop: -16 }}>
              {players && <GamePlayers players={players} captains={captains} />}
            </View>
            {maps.length !== 1 && (
              <View style={{ alignSelf: "center", marginBottom: 10 }}>
                <TimerBack seconds={15} mapLength={maps.length} />
              </View>
            )}
            <View style={{ marginBottom: 32 }}>
              {maps && !isGameStarted && (
                <ChooseMap
                  maps={maps}
                  username={username}
                  captains={captains}
                  votingCaptain={votingCaptain}
                  voteMap={voteMap}
                  isActive={maps.length === 1 ? true : false}
                />
              )}
              {owner === username &&
              isPrepare &&
              !isGameStarted &&
              !isLinkSended ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    label={t("labels.link")}
                    value={gameLink}
                    onChangeText={(value) => setGameLink(value)}
                    style={{
                      width: 265,
                      alignSelf: "center",
                      height: 40,
                      marginTop: 30,
                    }}
                  />
                  <Button
                    outline
                    width={265}
                    title={t("labels.send")}
                    onPress={sendLink}
                    style={{ marginTop: 8 }}
                  />
                </View>
              ) : (
                ""
              )}
              {isGameStarted && owner === username && (
                <View style={{ alignItems: "center", marginTop: 16 }}>
                  <Button
                    title={t("labels.upload")}
                    onPress={() => uploadResults()}
                  />
                </View>
              )}
              {isPrepare && owner !== username && gameLink === "" && (
                <View style={{ alignItems: "center", marginTop: 16 }}>
                  <Button title={t("labels.connectGame")} disabled={true} />
                </View>
              )}
              {isPrepare && owner !== username && gameLink !== "" && (
                <>
                  <View style={{ alignItems: "center", marginTop: 16 }}>
                    <Button
                      outline
                      title={t("labels.connectGame")}
                      onPress={() => connectGame()}
                    />
                  </View>
                </>
              )}
              {isPrepare && gameLink !== "" && (
                <>
                  <View style={{ alignItems: "center", marginTop: 16 }}>
                    <Button
                      title={t("labels.connectDiscord")}
                      onPress={() => connectDiscord()}
                    />
                  </View>
                </>
              )}
            </View>
            <View style={{ marginTop: "auto" }}>
              <Chat
                lobbyChatId={lobbyChatId}
                commandChatId={commandChatId}
                lobbyChatHistory={lobbyChatHistory}
                commandChatHistory={commandChatHistory}
                sendMessage={sendMessage}
              />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifySelf: "center",
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});