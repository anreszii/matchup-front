import { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { containerStyles } from "@/styles/container.js";
import { headerStyles } from "@/styles/header.js";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header({ children, style }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return (
    <SafeAreaView
      style={{
        ...containerStyles.container,
        ...headerStyles.header,
        marginTop: statusBarHeight - 12,
        ...style,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
