import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "ui/Text.js";
import { controlsStyles } from "@/styles/controls.js";
import { TextInput } from "react-native-paper";

export function Input({
  label,
  wrapperStyle,
  error,
  errorText,
  colors = {},
  mb = 0,
  hint = "",
  onViewPress,
  ...props
}) {
  const background = colors?.background || "";
  return (
    <Pressable
      style={[
        { ...controlsStyles.inputWrapper, marginBottom: mb },
        wrapperStyle,
      ]}
      onPress={onViewPress}
    >
      <TextInput
        mode="outlined"
        style={controlsStyles.inputOutlined}
        label={
          label && (
            <Text
              style={{
                ...controlsStyles.inputOutlinedLabel,
                backgroundColor:
                  background ||
                  controlsStyles.inputOutlinedLabel.backgroundColor,
              }}
            >
              {label}
            </Text>
          )
        }
        error={error}
        theme={{
          ...controlsStyles.inputOutlinedTheme,
          colors: {
            ...controlsStyles.inputOutlinedTheme.colors,
            ...colors,
          },
        }}
        {...props}
      />
      {error && errorText && (
        <Text style={controlsStyles.inputError}>{errorText}</Text>
      )}

      {!!hint && <Text style={controlsStyles.inputHint}>{hint}</Text>}
    </Pressable>
  );
}
