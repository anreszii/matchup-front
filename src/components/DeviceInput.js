import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Input } from "ui/Input.js";
import { Select } from "ui/Select.js";
import { Button } from "ui/Button.js";
import { TextInput } from "react-native-paper";
import { BottomModal } from "@/components/Modals/BottomModal.js";
import { ArrowDown, CheckIcon } from "@/icons";
import { useTranslation } from "react-i18next";

export function DeviceInput() {
  const {t, i18n} = useTranslation();
  const devices = ["iPhone 13", "iPhone 12", "iPhone 11"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelectedDeviceIndex, setTempSelectedDeviceIndex] = useState(0);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{width: "100%"}}
      >
        <Input
          label={t("labels.yourDevice")}
          mb={10}
          right={
            <TextInput.Icon
              onPress={() => setIsModalVisible(true)}
              icon={() => (
                <View style={{
                  height: "100%",
                  justifyContent: "center",
                  paddingTop: 10,
                  opacity: 0.4,
                }}>
                  <ArrowDown />
                </View>
              )}
            />
          }
          value={devices[selectedDeviceIndex]}
          editable={false}
        />
      </TouchableOpacity>
      <BottomModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        title={t("labels.yourDevice")}
      >
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Select
            label={t("labels.yourDevice")}
            options={devices}
            colors={{background: "#1F2325"}}
          />
          <Button
            title={t("labels.choose")}
            onPress={() => {
              setSelectedDeviceIndex(tempSelectedDeviceIndex);
              setIsModalVisible(false);
            }}
            style={styles.button}
          />
        </View>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
    alignSelf: "center",
  },
});
