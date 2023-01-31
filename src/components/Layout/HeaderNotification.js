import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Notification } from "@/icons";
import { headerStyles } from "@/styles/header.js";

export function HeaderNotification() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Tabs", {screen: "Notifications"})}
      style={headerStyles.headerLeft}
    >
      <Notification/>
    </TouchableOpacity>
  );
}
