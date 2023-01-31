import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault } from "@/icons";
import { containerStyles } from "@/styles/container.js";
import { useTranslation } from "react-i18next";
import { GradientPersonIcon } from "../../icons";
import { GrayPersonIcon } from "../../icons";

export function SearchGamePlayes(players) {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.containerInner]}>
        <View
          style={{
            ...containerStyles.container,
            ...styles.playersContainer,
          }}
        >
          {[...Array(players.players)].map((item, index) => (
            <View style={styles.player} key={index}>
              <GradientPersonIcon style={styles.playerAvatar} />
            </View>
          ))}
          {[...Array(10 - players.players)].map((item, index) => (
            <View style={styles.player} key={index}>
              <GrayPersonIcon style={styles.playerAvatar} />
            </View>
          ))}
          <Text style={styles.text}>{t("screens.searchGame.wait")}</Text>
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
    paddingHorizontal: 20,
    borderRadius: 16,
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
    borderRadius: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 25,
  },
  player: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingRight: 8,
  },
  playerAvatar: {
    marginRight: 8,
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
  text: {
    marginTop: 10,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
});
