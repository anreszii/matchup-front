import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { containerStyles } from "@/styles/container";
import { TextComponent } from "./Text";
import { CrossIcon, DeleteUserIcon } from "@/icons";
import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default TeamItem = ({ onRemove }) => {
  const [usersTeam, setUsersTeam] = useState([]);

  useEffect(() => {
    (async () => {
      const guildData = JSON.parse(await AsyncStorage.getItem("guild"));
      socket.listenSocket((label, data) => {
        if (label === "get_avi_team") {
          data.map((el) => {
            if (
              usersTeam.find((user) => user.username === el.name) === undefined
            ) {
              setUsersTeam((usersTeam) => [...usersTeam, el.profile]);
            }
          });
        }
      });
      socket.sendSocket("query", {
        label: "get_avi_team",
        query: {
          method: "get",
          model: "User",
          filter: {
            "profile.username": guildData.members.map((el) => el.name),
          },
          fields: "profile.avatar profile.username",
        },
      });
    })();
  }, []);

  return (
    <>
      {usersTeam.map((user) => (
        <View
          key={user.username}
          style={{ ...containerStyles.row, ...styles.container }}
        >
          <View style={containerStyles.row}>
            <Image source={{ uri: user.avatar }} style={styles.icon} />
            <TextComponent style={styles.text}>{user.username}</TextComponent>
          </View>
          <TouchableOpacity onPress={() => onRemove(user.username)}>
            <DeleteUserIcon />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  text: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
  },
  cross: {
    padding: 9,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 3,
  },
});
