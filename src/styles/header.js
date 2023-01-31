import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: 42,
    backgroundColor: "#0B1218",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  headerLabel: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },
  headerLeft: {
    position: "absolute",
    left: 20,
    bottom: 10,
  },
  headerRight: {
    position: "absolute",
    right: 20,
    bottom: 10,
  },
});
