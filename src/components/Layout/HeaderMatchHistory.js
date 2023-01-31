import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { HistoryIcon } from "@/icons";
import { headerStyles } from "@/styles/header.js";

export function HeaderMatchHistory() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Tabs", {screen: "MatchHistory"})}
      style={headerStyles.headerRight}
    >
      <HistoryIcon />
    </TouchableOpacity>
  );
}
