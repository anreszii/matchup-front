import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Input } from "ui/Input.js";
import { Button } from "ui/Button.js";
import { EditIcon } from "@/icons";
import { BottomModal } from "@/components/Modals/BottomModal.js";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "./PasswordInput";

export function ChangePasswordInput({ mb, pass, setPass }) {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const colors = { background: "#1F2325" };
  const isRepeat = pass.first === pass.second;
  const isErrorRepeat = isRepeat === false;
  const isErrorCurrent = pass.current !== "";

  return (
    <>
      <View
        onTouchEnd={() => {
          setVisible(true);
        }}
        style={{ width: "100%", marginBottom: mb }}
      >
        <Input
          value={pass.second}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    paddingTop: 8,
                  }}
                  onPress={() => {
                    setVisible(true);
                  }}
                >
                  <EditIcon />
                </TouchableOpacity>
              )}
            />
          }
          editable={false}
          label={t("labels.password")}
          secureTextEntry={showPassword ? false : true}
        />
      </View>
      <BottomModal
        visible={visible}
        setVisible={setVisible}
        title={t("components.changePassword.changePassword")}
      >
        <View style={styles.container}>
          <PasswordInput
            label={t("components.changePassword.currentPassword")}
            colors={colors}
            mb={16}
            value={pass.current}
            error={isErrorCurrent ? false : true}
            onChangeText={(value) => setPass({ ...pass, current: value })}
          />
          <PasswordInput
            label={t("components.changePassword.newPassword")}
            colors={colors}
            mb={16}
            value={pass.first}
            error={isErrorRepeat}
            onChangeText={(value) => setPass({ ...pass, first: value })}
          />
          <PasswordInput
            label={t("components.changePassword.confirmPassword")}
            colors={colors}
            mb={16}
            value={pass.second}
            error={isErrorRepeat}
            onChangeText={(value) => setPass({ ...pass, second: value })}
          />
          {isRepeat & isErrorCurrent ? (
            <Button
              title={t("labels.apply")}
              onPress={() => setVisible(false)}
              style={styles.button}
            />
          ) : (
            <Text style={styles.text}>
              {isRepeat
                ? t("components.changePassword.current")
                : t("components.changePassword.notMatch")}
            </Text>
          )}
        </View>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    marginBottom: 200,
  },
  text: {
    marginBottom: 200,
    color: "#FF3300",
  },
});
