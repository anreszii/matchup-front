import { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { typographyStyles } from "@/styles/typography.js";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export function ChooseMap({
  maps,
  captains,
  username,
  votingCaptain,
  voteMap,
  isActive,
}) {
  const { t, i18n } = useTranslation();
  const [selectedMapIndex, setSelectedMapIndex] = useState(0);
  const pics = [
    {
      name: "Sandstone",
      image: require("assets/map-item.png"),
    },
    {
      name: "Rust",
      image: require("assets/rust-map.png"),
    },
    {
      name: "Breeze",
      image: require("assets/breeze-map.jpeg"),
    },
    {
      name: "Sakura",
      image: require("assets/sakura-map.png"),
    },
    {
      name: "Zone 9",
      image: require("assets/zone-map.png"),
    },
  ];
  const localMaps = useMemo(
    () =>
      maps.map((itemMap) => ({
        title: itemMap,
        urlImage: pics.filter(
          (pic) => pic.name.toUpperCase() === itemMap.toUpperCase()
        )[0].image,
      })),
    [maps]
  );
  return (
    <View style={styles.container}>
      <View style={containerStyles.container}>
        <Text style={typographyStyles.h2}>
          {t("components.chooseMap.title")}
        </Text>
      </View>
      {localMaps.map((map, index) => (
        <View key={index}>
          <ImageBackground
            style={[styles.map, isActive && styles.mapActive]}
            source={isActive && require("assets/top-bg.png")}
          >
            {username !== votingCaptain && (
              <View style={styles.disabled}></View>
            )}
            <View style={styles.mapInner}>
              <Image source={map.urlImage} style={styles.image} />
              <Text style={styles.name}>{map.title}</Text>
              {isActive ? (
                <View style={{ marginLeft: "auto" }}></View>
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={() => voteMap(map.title)}
                >
                  <Text style={styles.vote}>{t("labels.vote")}</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mapActive: {
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    position: "relative",
  },
  mapInner: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  disabled: {
    position: "absolute",
    backgroundColor: "#282828",
    opacity: 0.5,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  image: {
    width: 40,
    height: 28,
    borderRadius: 4,
    marginRight: 12,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  vote: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "#FF5A45",
  },
  voteActive: {
    color: "#fff",
  },
});
