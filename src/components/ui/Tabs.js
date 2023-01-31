import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { backgroundAccent } from "@/constants/colors.js";

export function Tabs({ items, onPress, current = 0 }) {
  const total = items.length;
  if (!onPress) onPress = () => {};
  return (
    <View style={styles.stepContainer}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            style={{
              ...styles.step,
              marginRight: total - 1 === index ? 0 : 8,
              ...(current === index ? styles.stepActive : {}),
            }}
            key={index}
            onPress={() => onPress(index, item)}
          >
            <Text style={{...styles.textAlignment}}>
              {item}
            </Text>
            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  step: {
    flex: 1,
    backgroundColor: backgroundAccent,
    borderWidth: 3,
    textAlign: "center",
    borderColor: "rgba(54, 60, 64, 1)",
    borderRadius: 10,
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    paddingTop: 5,
    height: 34,
    opacity: 0.3,
  },
  stepActive: {
    opacity: 1,
  },
  textAlignment: {
    textAlign: 'center'
  }
});
