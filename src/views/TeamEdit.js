import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { Input } from "ui/Input.js";
import { Select } from "ui/Select.js";
import { Button } from "ui/Button.js";
import { ChangeAvatar } from "@/components/Profile/ChangeAvatar.js";
import { Coin } from "@/icons";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";

export function TeamEdit({ navigation }) {
  const { t, i18n } = useTranslation();
  const options = ["1", "2", "3"];

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.TeamEdit")} />
      </Header>
      <ScrollView
        contentContainerStyle={[
          containerStyles.container,
          containerStyles.containerPage,
          styles.container,
        ]}
      >
        <ChangeAvatar />
        <Input label={t("screens.teamEdit.teamName")} mb={16} />
        <Input label={t("screens.teamEdit.teamTag")} mb={16} />
        <Select
          label={t("screens.teamEdit.playersCount")}
          options={options}
          mb={16}
        />
        <Select
          label={t("screens.teamEdit.access")}
          options={options}
          mb={16}
        />
        <Select
          label={t("screens.teamEdit.minRating")}
          options={options}
          mb={16}
        />
        <Button
          style={{ marginTop: "auto" }}
          title={t("labels.logOut")}
          onPress={() => navigation.navigate("Tabs", { screen: "Game" })}
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
});
