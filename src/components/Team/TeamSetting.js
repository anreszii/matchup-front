import { View } from "react-native";
import { containerStyles } from "@/styles/container.js";
import { Settings } from "@/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export function TeamSetting({ styles, navigation }) {
  return (
    <View style={styles}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "TeamSettings" })}
      >
        <Settings />
      </TouchableOpacity>
    </View>
  );
}
