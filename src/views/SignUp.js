import { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Input } from "ui/Input.js";
import { PasswordInput } from "ui/PasswordInput.js";
import { Button } from "ui/Button.js";
import { Tabs } from "ui/Tabs.js";
import { RegionInput } from "@/components/RegionInput.js";
import { Policy } from "@/components/Policy.js";

import { appBackground } from "@/constants/colors.js";
import { containerStyles } from "@/styles/container.js";
import { controlsStyles } from "@/styles/controls.js";

import {
  requiredValidator,
  minMaxValidator,
  passwordValidator,
  emailValidator,
  intValidator,
} from "@/helpers/validators.js";

import { SuccessModal } from "../components/Modals/SuccessModal";

import { signUp } from "@/store/API/auth.js";

import { useTranslation } from "react-i18next";

export function SignUp({ navigation }) {
  const { t, i18n } = useTranslation();
  const stepsCount = 2;
  const validators = {
    id: intValidator,
    nickname: minMaxValidator(6, 18),
    email: emailValidator,
    username: minMaxValidator(6, 18),
    password: passwordValidator,
    region: requiredValidator,
    discord: minMaxValidator(6, 18),
  };
  const [user, setUser] = useState({
    id: "",
    nickname: "",
    email: "",
    username: "",
    password: "",
    region: "",
    discord: "",
  });
  const [errors, setErrors] = useState({
    id: false,
    nickname: false,
    email: false,
    username: false,
    password: false,
    region: false,
    discord: false,
    all: false,
  });
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [agree, setAgree] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleModal, setVisibleModal] = useState("false");

  const validate = () => {
    setIsValid(true);
    const errors = {};
    Object.entries(user).map(([key, value]) => {
      const isPropInvalid =
        validators[key] && user[key] !== "" ? !validators[key](value) : false;
      errors[key] = isPropInvalid;
      if (steps[currentStep].includes(key) && isPropInvalid) {
        setIsValid(false);
      }
    });
    if (!agree && currentStep === steps.length - 1) {
      setIsValid(false);
    }
    setErrors(errors);
  };

  const nextStep = async () => {
    validate();
    if (!isValid) {
      return;
    }
    if (currentStep < stepsCount - 1) {
      setCurrentStep(currentStep + 1);
      setIsValid(false);
    } else {
      const { status, errors } = await signUp(user);
      if (!status) {
        setErrors({
          all: true,
        });
        setErrorMsg(JSON.parse(errors).status);
      } else {
        setCurrentStep(0);
        setIsValid(false);
        setVisibleModal(true);
        return navigation.navigate("SignIn");
      }
    }
  };

  const steps = [
    ["id", "nickname"],
    ["email", "password", "region", "username", "discord", "agree"],
  ];

  useEffect(() => {
    validate();
  }, [user, agree]);

  return (
    <ScrollView contentContainerStyle={containerStyles.authContainer}>
      <Tabs
        items={[1, 2]}
        current={currentStep}
        onPress={(index) => setCurrentStep(index)}
      />
      {currentStep === 0 && (
        <>
          <Input
            label={t("screens.signUp.yourIdStandoff")}
            mb={10}
            value={user.id}
            onChangeText={(value) => setUser({ ...user, id: value })}
            error={errors.id}
          />
          <Input
            label={t("screens.signUp.nickname")}
            mb={10}
            value={user.nickname}
            onChangeText={(value) => setUser({ ...user, nickname: value })}
            error={errors.nickname}
          />
        </>
      )}
      {currentStep === 1 && (
        <>
          <Input
            label={t("screens.signUp.email")}
            mb={10}
            value={user.email}
            onChangeText={(value) => setUser({ ...user, email: value })}
            error={errors.email}
          />
          <PasswordInput
            mb={10}
            value={user.password}
            onChangeText={(value) => setUser({ ...user, password: value })}
            error={errors.password}
            errorText={t("screens.signUp.passwordHint")}
          />
          <RegionInput
            mb={10}
            value={user.region}
            onChange={(value) => setUser({ ...user, region: value })}
            error={errors.region}
          />
          <Input
            label={t("screens.signUp.username")}
            mb={10}
            value={user.username}
            onChangeText={(value) => setUser({ ...user, username: value })}
            error={errors.username}
          />
          <Input
            label={t("screens.signUp.disnick")}
            mb={10}
            value={user.discord}
            onChangeText={(value) => setUser({ ...user, discord: value })}
            error={errors.discord}
          />
          {errors.all && (
            <Text
              style={{
                ...controlsStyles.inputError,
                width: "100%",
              }}
            >
              {errorMsg}
            </Text>
          )}
        </>
      )}
      <View style={styles.bottomContainer}>
        {stepsCount - 1 === currentStep && (
          <Policy isChecked={agree} setIsChecked={(value) => setAgree(value)} />
        )}
        <Button
          title={
            currentStep === steps.length - 1
              ? t("labels.signUp")
              : t("labels.continue")
          }
          onPress={nextStep}
          disabled={!isValid}
        />
      </View>
      <SuccessModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        title={t("components.successRegistrationModal.title")}
        text={t("components.successRegistrationModal.text")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignSelf: "flex-start",
    marginTop: "auto",
    marginBottom: 40,
    width: "100%",
    alignItems: "center",
  },
});
