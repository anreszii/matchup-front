import { useState } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { RadioIcon, RadioCheckedIcon } from "@/icons";

export function Radio({ options }) {
  const [checkedIndex, setCheckedIndex] = useState(0);
  return (
    <View style={styles.container}>
      {
        options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCheckedIndex(index)}
            style={styles.option}
          >
            {
              checkedIndex === index
              ? <RadioCheckedIcon style={styles.optionIcon} />
              : <RadioIcon style={styles.optionIcon} />
            }
            <View>
              <Text style={styles.optionName}>{option.name}</Text>
              {option.label && <Text style={styles.optionLabel}>{option.label}</Text>}
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  option: {
    backgroundColor: "#23292E",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 14,
  },
  optionName: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  optionLabel: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255, 255, 255, 0.4)",
  },
});
