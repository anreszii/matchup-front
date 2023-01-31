import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Button } from "ui/Button.js";
import { BottomModal } from "@/components/Modals/BottomModal.js";
import { useTranslation } from "react-i18next";
import { TimerBack } from "../TimerBack";

export function ReadyModal({ visible, toggleVisible, onAccept }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <BottomModal
        visible={visible}
        setVisible={toggleVisible}
        title={t("labels.ready")}
      >
        <View style={styles.modal}>
          <View style={styles.modalTextSubtitle}>
            <Text style={styles.modalSubtitle}>{t("labels.playersFound")}</Text>
          </View>
          <View style={{ marginBottom: 28 }}>
            <TimerBack seconds={20} mapLength={5} />
          </View>
          <Button
            outline
            title={t("labels.confirm")}
            width={265}
            height={48}
            onPress={() => {
              onAccept();
              toggleVisible();
            }}
          />
        </View>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  region: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
    minHeight: 40,
  },
  regionActive: {
    backgroundColor: "#33393D",
    borderRadius: 10,
  },
  regionName: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  button: {
    marginTop: 100,
    alignSelf: "center",
  },
  modal: {
    backgroundColor: "#1F2325",
    paddingTop: 6,
    paddingBottom: 28,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 12,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#fff",
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
