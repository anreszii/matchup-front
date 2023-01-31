import { TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { headerStyles } from "@/styles/header.js";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice.js";
import { useNavigation } from "@react-navigation/native";

export function HeaderLogout() {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {dispatch(setToken("")); navigation.navigate("Welcome")}}
      style={headerStyles.headerRight}
    >
      <Text style={headerStyles.headerLabel}>{t("labels.logOut")}</Text>
    </TouchableOpacity>
  );
}
