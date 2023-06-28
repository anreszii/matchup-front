import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { Input } from "ui/Input.js";
import { Select } from "ui/Select.js";
import { Button } from "ui/Button.js";
import { ChangeAvatar } from "@/components/Profile/ChangeAvatar.js";
import { Coin } from "@/icons";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import socket from "@/socket";

export function TeamCreate({ navigation }) {
  const { t, i18n } = useTranslation();
  const options = ["1", "2", "3"];
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [playersCount, setPlayersCount] = useState("");
  const [access, setAccess] = useState("");
  const [minRating, setMinRating] = useState("");
  const [teamAvi, setTeamAvi] = useState(null);

  useEffect(() => {
    socket.listenSocket(async (label, data) => {
      if (label === "create_guild") {
        AsyncStorage.setItem("guild", JSON.stringify(data.response[0]));
        navigation.navigate("Tabs", { screen: "Team" });
      }
    });
  }, []);

  const createGuild = async () => {
    const profile = JSON.parse(await AsyncStorage.getItem("profile"))[0];
    console.log(profile.profile.username, {
      name: teamName,
      tag: teamTag,
    });
    socket.sendSocket("syscall", {
      label: "create_guild",
      query: {
        model: "Guild",
        execute: {
          function: "createGuild",
          params: [
            profile.profile.username,
            {
              name: teamName,
              tag: teamTag,
            },
          ],
        },
      },
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.TeamCreate")} />
      </Header>

      <ScrollView
        contentContainerStyle={[
          containerStyles.container,
          containerStyles.containerPage,
          styles.container,
        ]}
      >
        <ChangeAvatar avatar={teamAvi} setAvatar={setTeamAvi} />
        <Input
          value={teamName}
          onChangeText={setTeamName}
          label={t("screens.teamEdit.teamName")}
          mb={16}
        />
        <Input
          value={teamTag}
          onChangeText={setTeamTag}
          label={t("screens.teamEdit.teamTag")}
          mb={16}
        />
        <Select
          label={t("screens.teamEdit.playersCount")}
          options={options}
          mb={16}
          value={playersCount}
          setValue={setPlayersCount}
        />
        <Select
          label={t("screens.teamEdit.access")}
          options={options}
          mb={16}
          value={access}
          setValue={setAccess}
        />
        <Select
          label={t("screens.teamEdit.minRating")}
          options={options}
          mb={16}
          value={minRating}
          setValue={setMinRating}
        />
        <Button
          style={{ marginTop: "auto" }}
          title={t("labels.create")}
          onPress={createGuild}
        />
        <View style={styles.label}>
          <Text style={styles.labelPrice}>2000</Text>
          <Coin style={styles.labelIcon} />
          <Text style={[styles.labelPrice, styles.labelPriceAlt]}>
            {t("screens.teamEdit.orPremium")}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 16,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  labelPrice: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  labelPriceAlt: {
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
  },
  labelIcon: {
    marginHorizontal: 4,
  },
});
