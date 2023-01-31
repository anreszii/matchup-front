import { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { TextInput } from "react-native-paper";
import { Input } from "ui/Input.js";
import { CrossIcon, ArrowDown } from "@/icons";

export function Select({ label, isSearchable, options = [], ...props }) {
  const [search, setSearch] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);

  const clear = () => {
    setSearch("");
    setSelectedOptionIndex(-1);
  };
  return (
    <View
    onTouchEnd={() => {
      if (search) {
        clear();
      } else {
        setShowOptions(!showOptions);
      }
    }}
    style={styles.container}>
      <Input
        label={label}
        value={search}
        
        onChangeText={(value) => setSearch(value)}
        right={
          <TextInput.Icon
            icon={() =>
                <TouchableOpacity
                  style={styles.inputIcon}
                  onPress={() => {
                    if (search) {
                      clear();
                    } else {
                      setShowOptions(!showOptions);
                    }
                  }}
                >
                  {
                    !!search
                      ? <CrossIcon />
                      : <ArrowDown />

                  }
                </TouchableOpacity>
            }
          />
        }
        editable={!!isSearchable}
        onFocus={() => setShowOptions(true)}
        {...props}
      />

      {
        showOptions &&
          <ScrollView style={styles.options} keyboardShouldPersistTaps="always">
            {
              options.map((option, index) => {
                const isActive = selectedOptionIndex === index;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      isActive && styles.optionActive,
                    ]}
                    onPress={() => {
                      setSelectedOptionIndex(index);
                      setSearch(options[index]);
                      setShowOptions(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    width: "100%",
  },
  inputIcon: {
    height: "100%",
    justifyContent: "center",
    paddingTop: 10,
    opacity: 0.4,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
  },
  options: {
    backgroundColor: "#32393E",
    borderRadius: 10,
    position: "absolute",
    width: "100%",
    top: "100%",
    zIndex: 1,
    maxHeight: 138,
    marginTop: 5,
  },
  option: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionActive: {
    backgroundColor: "#4D555A",
  },
  optionText: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
});
