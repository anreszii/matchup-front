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
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal";

export default function TeamSettings() {
  const { t, i18n } = useTranslation();
  const options = ["1", "2", "3"];
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [playersCount, setPlayersCount] = useState("");
  const [access, setAccess] = useState("");
  const [minRating, setMinRating] = useState("");
  const [teamAvi, setTeamAvi] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    socket.listenSocket(async (label, data) => {});
  }, []);

  const editGuild = async () => {
    const profile = JSON.parse(await AsyncStorage.getItem("profile"))[0];
    console.log(profile.profile.username, {
      name: teamName,
      tag: teamTag,
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={"Настройки команды"} />
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
          style={styles.button}
          title={"Выйти"}
          onPress={() => setModal(true)}
        />
        <BottomQuestModal
          title={"Уверены?"}
          subtitle={"Точно хотите выйти из команды?"}
          visible={modal}
          setVisible={setModal}
        />
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
