import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CheckboxCheckedIcon } from "@/icons";

export function Checkbox({ children, isChecked, setIsChecked, style = {}, borderStyle = {} }) {
  return (
    <View style={{ ...style, flexDirection:"row" }}>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={{
          ...styles.icon,
          borderWidth: isChecked ? 0 : 2,
          ...borderStyle
        }}
      >
        {isChecked && <CheckboxCheckedIcon />}
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    borderColor: "white",
    borderRadius: 6,
    marginRight: 12,
    overflow: "hidden",
  },
});
