import { ScrollView } from "react-native";
import { containerStyles } from "@/styles/container.js";
import { Input } from "ui/Input.js";
import { Button } from "ui/Button.js";
import { ChangeAvatar } from "@/components/Profile/ChangeAvatar.js";
import { RegionInput } from "@/components/RegionInput.js";
import { ChangePasswordInput } from "ui/ChangePasswordInput.js";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "@/socket";
import { EditModal } from "../components/Modals/EditModal";
import * as FileSystem from "expo-file-system";

export function EditProfile({ navigation, route }) {
  const { t, i18n } = useTranslation();
  const [nickname, setNickname] = useState(
    route.params.params.creature.profile.nickname
  );
  const [region, setRegion] = useState(
    route.params.params.creature.credentials.region
  );
  const [pass, setPass] = useState({
    current: "",
    first: "",
    second: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [discord, setDiscord] = useState(
    route.params.params.creature.profile.discord_nickname
      ? route.params.params.creature.profile.discord_nickname
      : ""
  );

  const changeProfile = async () => {
    const user = await AsyncStorage.getItem("user");
    socket.listenSocket((label, data) => {
      if (label === "validate_pass") {
        if (data === "success") {
          socket.sendSocket("syscall", {
            label: "change_pass",
            query: {
              model: "User",
              filter: { "profile.username": user },
              execute: { function: "setPassword", params: [pass.second] },
            },
          });
          socket.disconnectSocket();
        }
      }
    });
    if (
      region !== route.params.params.creature.profile.region &&
      nickname !== route.params.params.creature.credentials.nickname &&
      discord !==
        (route.params.params.creature.profile.discord_nickname
          ? route.params.params.creature.profile.discord_nickname
          : "")
    ) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.nickname": nickname, "credentials.region": region, "profile.discord_nickname": discord },
          },
        },
      });
    } else if (
      nickname !== route.params.params.creature.credentials.nickname &&
      region !== route.params.params.creature.profile.region
    ) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.nickname": nickname, "credentials.region": region },
          },
        },
      });
    } else if (
      nickname !== route.params.params.creature.credentials.nickname &&
      discord !==
        (route.params.params.creature.profile.discord_nickname
          ? route.params.params.creature.profile.discord_nickname
          : "")
    ) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.nickname": nickname, "profile.discord_nickname": discord },
          },
        },
      });
    } else if (
      region !== route.params.params.creature.profile.region &&
      discord !==
        (route.params.params.creature.profile.discord_nickname
          ? route.params.params.creature.profile.discord_nickname
          : "")
    ) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.discord_nickname": discord, "credentials.region": region },
          },
        },
      });
    } else if (
      discord !==
      (route.params.params.creature.profile.discord_nickname
        ? route.params.params.creature.profile.discord_nickname
        : "")
    ) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.discord_nickname": discord },
          },
        },
      });
    } else if (region !== route.params.params.creature.profile.region) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "credentials.region": region },
          },
        },
      });
    } else if (nickname !== route.params.params.creature.credentials.nickname) {
      socket.sendSocket("query", {
        query: {
          method: "set",
          model: "User",
          filter: { "profile.username": user },
          update: {
            count: "one",
            set: { "profile.nickname": nickname },
          },
        },
      });
    }
    if (
      (pass.first === pass.second) &
      (pass.first !== "") &
      (pass.second !== "")
    ) {
      socket.sendSocket("syscall", {
        label: "validate_pass",
        query: {
          model: "User",
          filter: { "profile.username": user },
          execute: { function: "validatePassword", params: [pass.current] },
        },
      });
    }
    if (avatar !== null) {
      const jwt = await AsyncStorage.getItem("token");
      try {
        const response = await FileSystem.uploadAsync(
          `https://barakobama.online:80/api/image/upload`,
          avatar.uri,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            fieldName: "image",
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          }
        );
        socket.sendSocket("syscall", {
          query: {
            model: "User",
            filter: { "profile.username": user },
            execute: {
              function: "setAvatar",
              params: [JSON.parse(response.body).display],
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    socket.disconnectSocket();
    setVisible(true);
    setAvatar(null);
    setPass({
      current: "",
      first: "",
      second: "",
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.EditProfile")} />
      </Header>
      <ScrollView
        contentContainerStyle={{
          ...containerStyles.container,
          ...containerStyles.containerPage,
          alignItems: "center",
        }}
      >
        <ChangeAvatar avatar={avatar} setAvatar={setAvatar} />
        <Input
          label={t("screens.editProfile.nickname")}
          mb={16}
          value={nickname}
          onChangeText={(value) => setNickname(value)}
        />
        <Input
          label={t("screens.editProfile.discord")}
          mb={16}
          value={discord}
          onChangeText={(value) => setDiscord(value)}
        />
        <ChangePasswordInput mb={16} pass={pass} setPass={setPass} />
        <RegionInput
          mb={18}
          value={region}
          onChange={(value) => setRegion(value)}
        />
        <Button title={t("labels.save")} onPress={changeProfile} />
      </ScrollView>
      <EditModal visible={visible} setVisible={setVisible} />
    </>
  );
}
