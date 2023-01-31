import { useState, useEffect } from "react";
import { DevSettings, View } from "react-native";
import { Text } from "ui/Text.js";
import { Input } from "ui/Input.js";
import { PasswordInput } from "ui/PasswordInput.js";
import { Button } from "ui/Button.js";
import { containerStyles } from "@/styles/container.js";
import { controlsStyles } from "@/styles/controls.js";

import { signIn } from "@/store/API/auth.js";

import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, getFlag } from "../requests";
import RNRestart from 'react-native-restart';

import { useTranslation } from "react-i18next";

export function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(undefined);

  const logIn = async () => {
    const { status, data, errors } = await signIn(user);
    if (!status) {
      if (JSON.parse(errors).status === "password: value is required") {
        setErrorMsg("Пароль обязателен для заполнения");
      } else if (JSON.parse(errors).status === "password: value is invalid") {
        setErrorMsg("Неверный пароль");
      } else {
        setErrorMsg("Пользователь не найден");
      }
    } else {
      await AsyncStorage.setItem("user", user.username);
      dispatch(setToken(data.token));
      DevSettings.reload()
    }
  };

  return (
    <View style={containerStyles.authContainer}>
      <Input
        label={t("labels.username_email")}
        mb={10}
        value={user.username}
        onChangeText={(value) => setUser({ ...user, username: value })}
      />
      <PasswordInput
        mb={10}
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
      />
      {errorMsg && (
        <Text
          style={{
            ...controlsStyles.inputError,
            width: "100%",
          }}
        >
          {errorMsg}
        </Text>
      )}
      <Text
        onPress={() => navigation.navigate("ResetPassword")}
        style={{ color: "#fff", alignSelf: "flex-start", marginTop: 10 }}
      >
        {t("labels.forgetPassword")}
      </Text>
      <Button
        title={t("labels.logIn")}
        style={{ marginTop: "auto", marginBottom: 40 }}
        onPress={logIn}
      />
    </View>
  );
}
