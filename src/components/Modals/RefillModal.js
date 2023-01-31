import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";

export function RefillModal({ visible, setVisible }) {
  const {t, i18n} = useTranslation();

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="fade"
      full
    >
      <View style={styles.container}>
        <Text style={styles.text}>{t("components.refillModal.text")}</Text>
        <Button
          title={t("labels.close")}
          width={303}
          height={40}
          onPress={() => setVisible(false)}
          style={{marginTop: 10}}
        />
        <View></View>
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
  },
  container: {
    maxWidth: 335,
    backgroundColor: "rgba(35, 41, 46, 0.95)",
    padding: 16,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
