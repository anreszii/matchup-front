import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "ui/Checkbox.js";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { Button } from "ui/Button.js";

import { useTranslation } from "react-i18next";
import { Attach } from "@/icons";
import { useState } from "react";
import { containerWidth } from "@/constants/sizes.js";
import Svg, {
  Path,
  Defs,
  G,
  ClipPath,
  Circle,
  Mask,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";
import { useEffect } from "react";
import socket from '../../socket/index'

export function ReportModal({ visible, setVisible, setSuccess }) {
  const { t, i18n } = useTranslation();
  const viewBox = `0 0 ${265} ${40}`;
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);
  const [fourthCheck, setFourthCheck] = useState(false);
  const [file, setFile] = useState();

  const sendReport = () => {
    socket.sendSocket("syscall", {
      query: {
        "model": "Report",
        "execute": {
           "function": "log",
            "params": [
               "Standoff 2",
               firstCheck,
               secondCheck,
               thirdCheck,
               fourthCheck
            ]
         }
       }
    })
    setFirstCheck(false)
    setSecondCheck(false)
    setThirdCheck(false)
    setFourthCheck(false)
  }

  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("components.reportModal.title")}</Text>
          <Text style={styles.text}>{t("components.reportModal.text")}</Text>
          <View style={{ maxWidth: 265 }}>
            <View style={styles.checkbox}>
              <Checkbox
                borderStyle={{ borderColor: "gray" }}
                isChecked={firstCheck}
                setIsChecked={setFirstCheck}
              >
                <Text style={styles.checkboxText}>
                  {t("components.reportModal.firstCheck")}
                </Text>
              </Checkbox>
            </View>
            <View style={styles.checkbox}>
              <Checkbox
                borderStyle={{ borderColor: "gray" }}
                isChecked={secondCheck}
                setIsChecked={setSecondCheck}
              >
                <Text style={styles.checkboxText}>
                  {t("components.reportModal.secondCheck")}
                </Text>
              </Checkbox>
            </View>
            <View style={styles.checkbox}>
              <Checkbox
                borderStyle={{ borderColor: "gray" }}
                isChecked={thirdCheck}
                setIsChecked={setThirdCheck}
              >
                <Text style={styles.checkboxText}>
                  {t("components.reportModal.thirdCheck")}
                </Text>
              </Checkbox>
            </View>
            <View style={styles.checkbox}>
              <Checkbox
                borderStyle={{ borderColor: "gray" }}
                isChecked={fourthCheck}
                setIsChecked={setFourthCheck}
              >
                <Text style={styles.checkboxText}>
                  {t("components.reportModal.fourthCheck")}
                </Text>
              </Checkbox>
            </View>
          </View>
          <Button
            title={t("components.reportModal.sendButton")}
            width={265}
            onPress={() => {
              setVisible(false);
              sendReport()
              setSuccess(true);
            }}
            style={{ marginTop: 15 }}
          />
          <Button
            title={t("components.reportModal.cancelButton")}
            width={265}
            onPress={() => setVisible(false)}
            outline={true}
            style={{ marginTop: 10 }}
          />
        </View>
        {/*             <TouchableOpacity style={[styles.button]}><Attach/><Text>{t("components.reportModal.attachButton")}</Text></TouchableOpacity> */}
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
    padding: 35,
    alignItems: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 2,
    borderRadius: 24,
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    backgroundColor: "#23292E",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    opacity: 0.6,
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    maxWidth: containerWidth,
    height: 40,
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: "#23292E",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#9E9E9E",
    color: "white",
    fontWeight: "500",
    lineHeight: 22,
    paddingLeft: 12,
  },
  textDisabled: {
    color: "#9E9E9E",
  },
  contentContainer: {
    maxWidth: 265,
  },
  checkbox: {
    marginBottom: 8,
    backgroundColor: "#23292E",
    borderRadius: 5,
    padding: 4,
  },
  checkboxText: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 22,
    color: "#FFFFFF",
    opacity: 0.6,
    textAlign: "center",
  },
});
