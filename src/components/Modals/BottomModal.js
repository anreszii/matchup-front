import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { CrossIcon } from "@/icons";
import { Modal } from "ui/Modal.js";

export function BottomModal({ visible, setVisible, title, children }) {
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="slide" full>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <View></View>
          <Text style={styles.modalTitle}>{title}</Text>
        </View>
        {children}
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
    paddingBottom: 20,
    borderColor: "#373D42",
    borderWidth: 1,
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#fff",
  },
  modalClose: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(201, 205, 207, 0.12)",
  },
  modalCloseIcon: {
    maxWidth: 18,
    maxHeight: 18,
  },
});
