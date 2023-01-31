import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { Button } from "ui/Button.js";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export function TeamSelectModal({ visible, setVisible }) {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="fade"
      full
    >
      <View style={styles.container}>
        <Text style={styles.title}>{t("components.teamSelectModal.title")}</Text>
        <Text style={styles.text}>{t("components.teamSelectModal.description")}</Text>
        <Button
          title={t("labels.join")}
          width={265}
          height={48}
          onPress={() => {
            navigation.navigate("Tabs", {screen: "TeamJoin"});
            setVisible(false);
          }}
        />
        <Button
          title={t("labels.createTeam")}
          outline
          width={265}
          height={48}
          onPress={() => {
            navigation.navigate("Tabs", {screen: "TeamCreate"});
            setVisible(false);
          }}
          style={{marginTop: 16}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(35, 41, 46, 0.95)",
    padding: 16,
    paddingTop: 24,
    paddingBottom: 28,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 8,
  },
  text: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 32,
  },
});
