import { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "ui/Text.js";
import { Input } from "ui/Input.js";
import { Button } from "ui/Button.js";
import { containerStyles } from "@/styles/container.js";
import { controlsStyles } from "@/styles/controls.js";
import { useTranslation } from "react-i18next";
import { emailValidator } from "@/helpers/validators.js";
import { resetPassword } from "@/store/API/auth.js";
import { useNavigation } from "@react-navigation/native";
import { SuccessModal } from "../components/Modals/SuccessModal";

export function ResetPassword() {
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [errorsText, setErrorsText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [visibleModal, setVisibleModal] = useState("false")

  const validate = () => {
    const isValid = emailValidator(email);
    setEmailError(!isValid);
  };

  const submit = async () => {
    if (emailError) {
      return;
    }
    setErrorsText("");
    setSuccessText("");
    setVisibleModal(true)
    const { status, data, errors } = await resetPassword({email});
    
    if (!status) {
      setErrorsText(errors.join("; "));
    } else {
      setSuccessText(t("labels.emailSuccess"));
      setVisibleModal(true)
    }

  };

  useEffect(() => {
    validate();
  }, [email]);

  return (
    <>    
    <View style={containerStyles.authContainer}>
      <Input
        label={t("labels.enterEmail")}
        hint={t("screens.resetPassword.hint")}
        value={email}
        onChangeText={(value) => setEmail(value)}
        error={emailError}
        mb={20}
      />
      {
        errorsText &&
          <Text
            style={{
              ...controlsStyles.inputError,
              width: "100%",
            }}
          >{errorsText}</Text>
      }
      {
        successText &&
          <Text
            style={{
              ...controlsStyles.inputSuccess,
              width: "100%",
            }}
          >{successText}</Text>
      }
      <Button
        title={t("labels.resetPassword")}
        style={{marginTop: "auto", marginBottom: 20}}
        onPress={submit}
        disabled={emailError}
      />
    </View>
    <SuccessModal
      visible={visibleModal}
      setVisible={setVisibleModal}
      title={t("components.successRecoverModal.title")}
      text={t("components.successRecoverModal.text")}
    />
    </>

  );
}
