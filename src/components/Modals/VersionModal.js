import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";
import { LogoFullIcon, SuccessIcon } from "@/icons";

export function VersionModal({ visible, title, text }) {
  const { t, i18n } = useTranslation();

  return (
    <Modal visible={visible} setVisible={() => {}} animationType="fade" full>
      <View style={styles.container}>
        <LogoFullIcon
          style={{ marginRight: "auto", marginLeft: "auto", marginBottom: 27 }}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <Button
          title={t("components.versionModal.update")}
          width={265}
          onPress={() => {}}
          style={{ marginBottom: 12 }}
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
    width: "90%",
    backgroundColor: "#1F2325",
    padding: 16,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: "auto",
    marginBottom: "auto",
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
