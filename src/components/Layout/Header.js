import { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { containerStyles } from "@/styles/container.js";
import { headerStyles } from "@/styles/header.js";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useEffect } from "react";

export function Header({ children, style }) {
  const [statusBarHeight, setStatusBarHeight] = useState(
    Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight
  );

  return (
    <SafeAreaView
      style={{
        ...containerStyles.container,
        ...headerStyles.header,
        marginTop: statusBarHeight + 12,
        ...style,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
