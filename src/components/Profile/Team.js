import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "ui/Text.js";
import { typographyStyles } from "@/styles/typography.js";
import { containerStyles } from "@/styles/container.js";
import { Input } from "ui/Input.js";
import { Button } from "ui/Button.js";
import { UserDefault, Arrow } from "@/icons";
import { useTranslation } from "react-i18next";
import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Team({ team, userData }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [guild, setGuild] = useState({});
  useEffect(() => {
    socket.listenSocket(async (label, data) => {
      if (label === "get_guild_data") {
        if (data.response.length !== 0) {
          setGuild({ ...data.response[0].guild });
          AsyncStorage.setItem("guild", JSON.stringify(data.response[0].guild));
        }
      }
    });
    socket.sendSocket("query", {
      label: "get_guild_data",
      query: {
        method: "get",
        model: "User",
        aggregation: [
          {
            $match: {
              "profile.username": userData.profile.username,
            },
          },
          {
            $project: {
              _id: false,
              guild: true,
              "profile.username": true,
            },
          },
          {
            $lookup: {
              from: "guilds",
              localField: "guild",
              foreignField: "_id",
              as: "guild",
            },
          },
          {
            $unwind: {
              path: "$guild",
              preserveNullAndEmptyArrays: false,
            },
          },
        ],
      },
    });
  }, []);

  return (
    <View>
      <Text style={typographyStyles.h2}>{t("components.team.title")}</Text>
      {guild?.public ? (
        <TouchableOpacity
          style={[styles.container, styles.containerTeam]}
          onPress={() => navigation.navigate("Tabs", { screen: "Team" })}
        >
          <UserDefault style={styles.teamAvatar} />
          <View>
            <Text style={styles.teamName}>{guild.public.name}</Text>
            <Text style={styles.teamTag}>{guild.public.tag}</Text>
          </View>
          <Arrow style={styles.teamArrow} />
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <Button
            bg="#0B1218"
            title={t("labels.join")}
            height={40}
            width={150}
            onPress={() => navigation.navigate("Tabs", { screen: "TeamJoin" })}
          />
          <Button
            bg="#0B1218"
            title={t("labels.createTeam")}
            height={40}
            width={150}
            onPress={() =>
              navigation.navigate("Tabs", { screen: "TeamCreate" })
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23292E",
    borderRadius: 12,
    padding: 20,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTeam: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  teamAvatar: {
    marginRight: 16,
  },
  teamArrow: {
    marginLeft: "auto",
    opacity: 0.4,
  },
  teamName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  teamTag: {
    fontWeight: "500",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.4)",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  link: {
    color: "#FF5A45",
  },
});
