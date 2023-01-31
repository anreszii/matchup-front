import { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { CameraIcon } from "@/icons";
import { useTranslation } from "react-i18next";

export function ChangeAvatar({ avatar, setAvatar }) {
  const { t, i18n } = useTranslation();

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
      borderRadius: 5,
    });

    if (!result.cancelled) {
      setAvatar(result);
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.avatar}>
          {avatar ? (
            <Image source={avatar} style={styles.avatarImage} />
          ) : (
            <CameraIcon />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: "#23292E",
    width: 120,
    height: 120,
    borderRadius: 5,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLabel: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
});
