import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { containerStyles } from "@/styles/container";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Header } from "@/components/Layout/Header";
import { HeaderTitle } from "@/components/Layout/HeaderTitle";
import { TextComponent } from "@/components/ui/Text";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/sizes";
import { SendMessageIcon, Settings } from "@/icons";
import TeamItem from "@/components/ui/TeamItem";
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "@/socket";
import { Chat } from "@/components/Game/Chat";
import { TeamChat } from "@/components/Team/TeamChat";
import { headerStyles } from "@/styles/header";

export default function Team({ navigate }) {
  const [message, setMessage] = useState("");
  const [guild, setGuild] = useState();
  const [chatMessages, setChatMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [removable, setRemovable] = useState("");
  const [flag, setFlag] = useState(false);

  const onRemove = (playerName) => {
    setRemovable(playerName);
    setVisible(true);
  };
  useEffect(() => {
    socket.listenSocket((label, data) => {
      if (label === "chat_history") {
        data.response[0].history.map((el) => {
          if (el.author.name !== "system") {
            setChatMessages((chatMessages) => [...chatMessages, el]);
          }
        });
      }
      if (label === "message") {
        console.log(data);
      }
    });
    (async () => {
      const guildTemp = JSON.parse(await AsyncStorage.getItem("guild"));
      console.log(guildTemp);
      setGuild(guildTemp);
      setFlag(!flag);
      socket.sendSocket("query", {
        label: "chat_history",
        query: {
          model: "Chat",
          method: "get",
          filter: { "info.id": guildTemp.private.chat },
        },
      });
      socket.sendSocket("dark-side", {
        label: "guild_chat_join",
        controller: "chat_join",
        params: [guildTemp.private.chat],
      });
    })();
  }, []);

  const sendMessage = () => {
    console.log(message);
    if (message.length) {
      console.log(message, "2");
      socket.sendSocket("dark-side", {
        label: "guild_message",
        controller: "chat_message",
        params: [guild.private.chat, message],
      });
    }
    setMessage("");
  };
  return (
    <>
      <View
        style={{
          ...containerStyles.container,
          ...containerStyles.containerPage,
        }}
      >
        <Header>
          <HeaderBack />
          <View style={{ flexDirection: "row" }}>
            <HeaderTitle title={"Team"} />
            <View style={styles.lvl}>
              <TextComponent>{5} lvl</TextComponent>
            </View>
          </View>
          <Settings style={headerStyles.headerRight} />
        </Header>
        <ScrollView style={{ height: "100%", marginTop: 8 }}>
          <TextComponent style={styles.grayText}>Наша команда</TextComponent>
          <View style={styles.teamMates}>
            <TeamItem onRemove={onRemove} />
          </View>
        </ScrollView>
      </View>
      <BottomQuestModal
        visible={visible}
        title={"Уверены?"}
        subtitle={`Точно хотите выгнать ${removable} из команды ?`}
        setVisible={setVisible}
      />
      <View style={{ marginTop: "auto" }}>
        <TeamChat
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
          chatHistory={chatMessages}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
  },
  lvl: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.003,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    backgroundColor: "#6E7CF9",
    borderRadius: SCREEN_HEIGHT * 0.005,
  },
  grayText: {
    marginBottom: SCREEN_HEIGHT * 0.02,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  teamMates: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 0,
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
  },
  chats: {
    paddingTop: 16,
    paddingBottom: 42,
    paddingLeft: 19,
    backgroundColor: "#23292E",
  },
  inputContainer: {
    paddingRight: 21,
    paddingBottom: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#23292E",
  },
  inputWrapper: {
    width: "auto",
    flexGrow: 1,
    backgroundColor: "#23292E",
  },
  input: {
    height: 40,
    width: "90%",
    color: "white",
    border: "1px solid black",
    backgroundColor: "#0B1218",
    borderRadius: 10,
    padding: 20,
  },
  sendIcon: {
    justifySelf: "flex-start",
    marginLeft: 14,
  },
});
