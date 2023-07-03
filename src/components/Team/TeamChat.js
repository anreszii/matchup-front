import { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { typographyStyles } from "@/styles/typography.js";
import { Tabs } from "ui/Tabs.js";
import { Input } from "ui/Input.js";
import { SendMessageIcon } from "@/icons";
import { useTranslation } from "react-i18next";

export function TeamChat({ chatHistory, sendMessage, message, setMessage }) {
  const { t, i18n } = useTranslation();

  return (
    <View style={[containerStyles.container, styles.container]}>
      <Tabs items={["Командный чат"]} onPress={() => {}} current={0} />
      <ScrollView style={styles.messagesContainer}>
        {Array.from(new Set(chatHistory)).map((message, index) => (
          <View key={index} style={styles.message}>
            <Text style={styles.messageUser}>{message.author.name}</Text>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          defaultValue={message}
          onChangeText={(newText) => setMessage(newText)}
          style={styles.input}
          wrapperStyle={styles.inputWrapper}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage();
          }}
        >
          <SendMessageIcon style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23292E",
    paddingTop: 16,
  },
  messagesContainer: {
    minHeight: 180,
    maxHeight: 180,
  },
  message: {
    marginBottom: 16,
  },
  messageUser: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 13,
    color: "rgba(255, 255, 255, 0.4)",
    marginBottom: 4,
  },
  messageText: {
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 20,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputWrapper: {
    width: "auto",
    flexGrow: 1,
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
