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

export function Chat({
  lobbyChatHistory,
  commandChatHistory,
  lobbyChatId,
  commandChatId,
  sendMessage,
}) {
  const { t, i18n } = useTranslation();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <View style={[containerStyles.container, styles.container]}>
      <Tabs
        items={[t("components.chat.common"), t("components.chat.team")]}
        onPress={(index) => {
          setCurrentTabIndex(index);
        }}
        current={currentTabIndex}
      />
      <ScrollView style={styles.messagesContainer}>
        {currentTabIndex === 0 &&
          Array.from(new Set(lobbyChatHistory)).map((message, index) => (
            <View key={index} style={styles.message}>
              <Text style={styles.messageUser}>{message.author}</Text>
              <Text style={styles.messageText}>{message.message}</Text>
            </View>
          ))}
        {currentTabIndex === 1 &&
          Array.from(new Set(commandChatHistory)).map((message, index) => (
            <View key={index} style={styles.message}>
              <Text style={styles.messageUser}>{message.author}</Text>
              <Text style={styles.messageText}>{message.message}</Text>
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
            if (currentTabIndex === 0 && message !== "") {
              sendMessage(message, lobbyChatId);
              setMessage("");
            } else if (currentTabIndex === 1 && message !== "") {
              sendMessage(message, commandChatId);
              setMessage("");
            }
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
    minHeight: 120,
    maxHeight: 120,
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
