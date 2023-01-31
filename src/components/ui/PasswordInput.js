import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { controlsStyles } from "@/styles/controls.js";
import { TextInput } from "react-native-paper";
import { Input } from "ui/Input.js";
import { EyeCloseIcon, EyeOpenIcon } from "@/icons";
import { useTranslation } from "react-i18next";

export function PasswordInput({ mb, ...props }) {
  const isError = false;
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <Input
      mb={mb}
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
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
            </TouchableOpacity>
          )}
        />
      }
      label={t("labels.password")}
      secureTextEntry={showPassword ? false : true}
      {...props}
    />
  );
}
