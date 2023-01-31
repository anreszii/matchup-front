import { TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "ui/Text.js";
import { Checkbox } from "ui/Checkbox.js";
import { useTranslation } from "react-i18next";

export function Policy({ change, isChecked, setIsChecked }) {
  const { t, i18n } = useTranslation();
  const url = "https://matchup.space/policy/";

  return (
    <>
      <Checkbox
        style={styles.checkbox}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      >
        <Text style={styles.label}>
          {t("components.policy.accept")} {"\n"}
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={styles.link}>{t("components.policy.politics")}</Text>
          </TouchableOpacity>
        </Text>
      </Checkbox>
    </>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  label: {
    color: "white",
    fontSize: 13,
    position: "relative",
    top: -6,
  },
  link: {
    fontSize: 13,
    color: "#FF5A47",
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
    height: 400,
  },
  textContainer: {
    marginBottom: 16,
  },
  text: {
    color: "#fff",
  },
});
