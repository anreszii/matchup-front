import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { typographyStyles } from "@/styles/typography.js";
import { containerStyles } from "@/styles/container.js";
import { Button } from "ui/Button.js";
import { UserVipIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { ReportModal } from "../Modals/ReportModal";
import { SuccessModal } from "../Modals/SuccessModal";
import { containerWidth } from "@/constants/sizes.js";

export function Report() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [refillModalVisible, setRefillModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  return (
    <>
      <View>
        <View style={styles.container}>
          <Text style={[styles.blockValue]}>
            {t("components.report.reportTitle")}
          </Text>
          <Text style={[styles.blockLabel]}>
            {t("components.report.reportText")}
          </Text>
          <Button
            width={containerWidth - 20}
            onPress={() => setRefillModalVisible(true)}
            title={t("components.report.reportButton")}
          />
        </View>
      </View>
      <ReportModal
        visible={refillModalVisible}
        setVisible={setRefillModalVisible}
        setSuccess={setSuccessModalVisible}
      />
      <SuccessModal
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}
        title={t("components.successReportModal.title")}
        text={t("components.successReportModal.text")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#23292E",
    borderRadius: 12,
    padding: 20,
    paddingBottom: 17,
    paddingTop: 16,
  },
  blockValue: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
    color: "#fff",
    marginBottom: 2,
  },
  blockLabel: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 15,
    color: "rgba(255, 255, 255, 0.4)",
  },
});
