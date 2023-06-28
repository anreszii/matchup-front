import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";
import { SuccessIcon } from "@/icons";
import Crop from "react-native-avatar-crop";
import { useState } from "react";
import {
  manipulateAsync,
  FlipType,
  SaveFormat,
  ActionCrop,
} from "expo-image-manipulator";

export function CroppingAvatar({ visible, setVisible, setAvatar, uri, width }) {
  const { t, i18n } = useTranslation();
  let crop;

  const croppingImage = async () => {
    const cropped = await crop();
    const result = await manipulateAsync(
      uri,
      [
        {
          crop: {
            height: cropped.displaySize.height,
            width: cropped.displaySize.width,
            originX: cropped.offset.x,
            originY: cropped.offset.y,
          },
        },
      ],
      { format: SaveFormat.JPEG }
    );
    setAvatar(result.uri);
    setVisible(false);
  };

  return (
    <Modal visible={visible} setVisible={() => {}} animationType="fade" full>
      <View style={styles.container}>
        <Crop
          source={{ uri }}
          cropShape={"circle"}
          width={width - 35}
          height={width - 50}
          cropArea={{ width: width - 35, height: width - 50 }}
          onCrop={(cropCallback) => (crop = cropCallback)}
          backgroundColor={"#ffffff"}
          maxZoom={3}
          opacity={0.7}
          resizeMode={"contain"}
        />
        <Button
          title={t("components.successReportModal.button")}
          width={265}
          onPress={() => croppingImage()}
          style={{ marginTop: 10, marginBottom: 12 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1F2325",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#1F2325",
    padding: 16,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
    marginBottom: 22,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
});
