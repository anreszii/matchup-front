import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Logo } from "@/icons";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLobbyData } from "@/store/gameSlice.js";

export function ModeItem({ item, playStyle, startGame }) {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const isLocked = item.minimumLevel || item.isPremium;
  const toLobby = (withTeam) => {
    dispatch(setLobbyData({...item, withTeam}));
    navigation.navigate("Tabs", {screen: "MatchLobby"});
  };
  const [showOptions, setShowOptions] = useState(false);
  const isClassic = item.mode === "classic";

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        if (isLocked) {
          return;
        }
        dispatch(setLobbyData(item));
        startGame(item)
        
      }}
      activeOpacity={(isClassic && (showOptions || isLocked)) && 1}
    >
      <ImageBackground
        source={item.image}
        style={{
          ...styles.modeItem,
          borderWidth: isClassic && showOptions ? 3 : 0,
          minHeight: isClassic && showOptions ? 234 : 180,
        }}
      >
        {
          isLocked &&
          <View style={styles.modeItemLock}>
            <Image source={require("assets/lock.png")} style={styles.modeItemLockIcon} />
            <Text style={styles.modeItemLockMessage}>{item.lockedMessage}</Text>
          </View>
        }
        <View style={styles.modeItemNameContainer}>
          <Logo style={styles.modeItemNameIcon} />
          <Text style={styles.modeItemName}>{item.name}</Text>
        </View>
        {
          !isLocked &&
          <>
            <Text style={styles.modeItemDescription}>{item.description}</Text>
            {
              isClassic && showOptions &&
              <View style={styles.modeItemButtons}>
                <Button
                  title={t("labels.solo")}
                  width={140}
                  height={40}
                  bg="#EE4C65"
                  onPress={() => toLobby()}
                />
                <Button
                  title={t("labels.withTeam")}
                  width={140}
                  height={40}
                  bg="#E0417F"
                  onPress={() => toLobby(true)}
                />
              </View>
            }
          </>
        }
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modeItem: {
    borderColor: "#EE4C65",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  modeItemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeItemName: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  modeItemNameIcon: {
    marginRight: 8,
  },
  modeItemDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  modeItemButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modeItemLock: {
    alignItems: "center",
    marginBottom: 14,
  },
  modeItemLockIcon: {
    width: 40,
    height: 58,
    marginBottom: 10,
  },
  modeItemLockMessage: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

