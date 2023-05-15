import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { containerStyles } from "@/styles/container";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Header } from "@/components/Layout/Header";
import { HeaderTitle } from "@/components/Layout/HeaderTitle";
import { TextComponent } from "@/components/ui/Text";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/sizes";
import { SendMessageIcon, Settings } from "@/icons";
import TeamItem from "@/components/ui/TeamItem";
import TeamChatItem from "@/components/ui/TeamChatItem";
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal";

export default function Team() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [removable, setRemovable] = useState("");
  const onRemove = (playerName) => {
    setRemovable(playerName);
    setVisible(true);
  };
  return (
    <ScrollView>
      <View
        style={{
          ...containerStyles.container,
          ...containerStyles.containerPage,
        }}
      >
        <Header style={styles.header}>
          <View>
            <HeaderBack />
          </View>
          <View style={containerStyles.row}>
            <HeaderTitle title={"Team"} />
            <View style={styles.lvl}>
              <TextComponent>{5} lvl</TextComponent>
            </View>
          </View>
          <Settings />
        </Header>
        <TextComponent style={styles.grayText}>Наша команда</TextComponent>
        <View style={styles.teamMates}>
          <TeamItem playerName={"Simple"} onRemove={onRemove} />
          <TeamItem playerName={"Simple"} onRemove={onRemove} />
          <TeamItem playerName={"Simple"} onRemove={onRemove} />
          <TeamItem playerName={"Simple"} onRemove={onRemove} />
          <TeamItem playerName={"Simple"} onRemove={onRemove} />
        </View>
        <TextComponent style={styles.grayText}>Чат команды</TextComponent>
      </View>
      <ScrollView style={styles.chats} bounces={false}>
        <TeamChatItem author={"Username 1"} text={"Готовимся"} />
        <TeamChatItem author={"Username 1"} text={"Готовимся"} />
        <TeamChatItem author={"Username 1"} text={"Рашим!!!"} />
        <TeamChatItem author={"You"} text={"Я на Б"} />
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          defaultValue={message}
          onChangeText={(newText) => setMessage(newText)}
          style={styles.input}
          wrapperStyle={styles.inputWrapper}
        />
        <TouchableOpacity>
          <SendMessageIcon style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      <BottomQuestModal
        visible={visible}
        title={"Уверены?"}
        subtitle={`Точно хотите выгнать ${removable} из команды ?`}
        setVisible={setVisible}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
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
