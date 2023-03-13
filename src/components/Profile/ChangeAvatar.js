import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "ui/Text.js";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { CameraIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { CroppingAvatar } from "../Modals/CroppingAvatar";

export function ChangeAvatar({ avatar, setAvatar }) {
  const { t, i18n } = useTranslation();
  const [uri, setUri] = useState("");
  const [visible, setVisible] = useState(true);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setUri(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.avatar}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <CameraIcon />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {uri !== "" && (
        <CroppingAvatar
          visible={visible}
          setVisible={setVisible}
          setAvatar={setAvatar}
          uri={uri}
          width={SCREEN_WIDTH}
        />
      )}
    </>
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
    borderRadius: 60,
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
