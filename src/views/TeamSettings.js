import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Header } from "@/components/Layout/Header";
import { HeaderTitle } from "@/components/Layout/HeaderTitle";
import { TextComponent } from "@/components/ui/Text";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/sizes";
import { SendMessageIcon, Settings } from "@/icons";
import TeamItem from "@/components/ui/TeamItem";
import TeamChatItem from "@/components/ui/TeamChatItem";
import { containerStyles } from "@/styles/container";
import { useTranslation } from "react-i18next";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal";

export default function TeamSettings() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [modal, setModal] = useState(false);
  const [members, setMembers] = useState();
  const [access, setAccess] = useState();
  const [rating, setrating] = useState();
  const { t, i18n } = useTranslation();
  const colors = { background: "#1F2325" };
  return (
    <ScrollView bounces={false}>
      <View
        style={{
          ...containerStyles.container,
          ...containerStyles.containerPage,
        }}
      >
        <Header style={styles.header}>
          <HeaderBack />
          <View style={containerStyles.row}>
            <HeaderTitle title={"Настройки команды"} />
          </View>
        </Header>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/teamAvatar.png")}
          />
          <TextComponent style={styles.changeImage}>
            Изменить фотографию
          </TextComponent>
        </View>
        <Input
          label={"Название команды"}
          value={title}
          onChangeText={setTitle}
        />
        <Input label={"Название команды"} value={tag} onChangeText={setTag} />
        <Select
          style={styles.select}
          isSearchable={false}
          label={"Допустимое кол-во участников"}
          options={[8]}
        />
        <Select
          style={styles.select}
          isSearchable={false}
          label={"Доступ"}
          options={["Открытая команда"]}
        />
        <Select
          style={styles.select}
          isSearchable={false}
          label={"Необходимое кол-во рейтинга"}
          options={[999]}
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
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 22,
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  changeImage: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  select: {
    marginBottom: 16,
  },
  button: {
    marginTop: 68,
  },
});
