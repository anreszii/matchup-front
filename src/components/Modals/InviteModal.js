import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { Button } from "ui/Button.js";
import { Modal } from "ui/Modal.js";
import { useTranslation } from "react-i18next";

export function InviteModal({
  visible,
  setVisible,
  decline,
  accept,
  username,
}) {
  const { t, i18n } = useTranslation();
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="slide" full>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <View></View>
          <Text style={styles.modalTitle}>
            {t("components.inviteModal.invite")}
          </Text>
        </View>
        <View style={styles.modalTextSubtitle}>
          <Text style={styles.modalSubtitle}>{`${t(
            "components.inviteModal.user"
          )} ${username} ${t("components.inviteModal.inviteTwo")}`}</Text>
        </View>
        <Button
          title={t("labels.join")}
          width={265}
          height={48}
          onPress={() => {
            accept();
            setVisible(false);
          }}
        />
        <Button
          title={t("labels.decline")}
          outline
          width={265}
          height={48}
          onPress={() => {
            decline();
            setVisible(false);
          }}
          style={{ marginTop: 16, marginBottom: 10 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(35, 41, 46, 0.95)",
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: "auto",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTextSubtitle: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#fff",
    textAlign: "center",
  },
  modalSubtitle: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
    textAlign: "center",
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
