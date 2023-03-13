import { StyleSheet } from "react-native";
import { appBackground } from "@/constants/colors.js";

export const controlsStyles = StyleSheet.create({
  inputOutlined: {
    width: "100%",
    height: 46,
    lineHeight: 24,
    color: "#fff",
    fontSize: 14,
  },
  inputOutlinedLabel: {
    color: "#ffffff70",
    backgroundColor: appBackground,
  },
  inputError: {
    color: "#FF5A47",
    backgroundColor: appBackground,
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  inputSuccess: {
    color: "#58C225",
    backgroundColor: appBackground,
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  inputOutlinedTheme: {
    roundness: 10,
    colors: {
      placeholder: "#303030",
      text: "#fff",
      primary: "#303030",
      underlineColor: "transparent",
      error: "#FF5A47",
      background: appBackground,
    },
  },
  inputWrapper: {
    width: "100%",
  },
  inputHint: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 12,
  },
});
