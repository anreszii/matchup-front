import { View, StyleSheet, Image } from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault, UserVipIcon } from "@/icons";
import { containerStyles } from "@/styles/container.js";
import { useTranslation } from "react-i18next";

export function GamePlayers({ players, captains }) {
  const { t, i18n } = useTranslation();
  console.log("players", players); //TODO удалить
  const Player = (player) => {
    return (
      <View style={styles.player}>
        <View style={styles.wrapPlayerAvatar}>
          <Image
            style={styles.playerAvatar}
            source={{ uri: player.player.image }}
          />
          <View style={styles.wrapWip}>
            {(captains.command1 === player.player.name ||
              captains.command2 === player.player.name) && <UserVipIcon />}
          </View>
        </View>
        <View>
          <Text style={styles.playerName}>{player.player.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.containerInner]}>
        <Text
          style={{
            ...styles.label,
            color: "#6E7CF9",
          }}
        >
          {t("components.gamePlayers.counterTerrorists")}
        </Text>
        <View
          style={{
            ...containerStyles.container,
            ...styles.playersContainer,
            borderRightWidth: 1,
          }}
        >
          {players
            .filter((item) => item.commandID % 2 === 0)
            .map((item, index) => (
              <Player key={index} player={item} />
            ))}
        </View>
      </View>
      <View style={[styles.containerInner]}>
        <Text
          style={{
            ...styles.label,
            color: "#E14B42",
          }}
        >
          {t("components.gamePlayers.terrorists")}
        </Text>
        <View
          style={{
            ...containerStyles.container,
            ...styles.playersContainer,
          }}
        >
          {players
            .filter((item) => item.commandID % 2 !== 0)
            .map((item, index) => (
              <Player key={index} player={item} />
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerInner: {
    flexGrow: 1,
    width: "auto",
    paddingHorizontal: 0,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    flexGrow: 1,
    marginBottom: 16,
  },
  playersContainer: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#23292E",
    borderColor: "#373D42",
    paddingRight: 8,
  },
  player: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingRight: 8,
  },
  wrapPlayerAvatar: {
    position: "relative",
  },
  wrapWip: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 50,
  },
  playerName: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
    marginBottom: 2,
  },
  playerId: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(235, 235, 245, 0.6)",
  },
});
