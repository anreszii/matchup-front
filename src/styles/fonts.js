import { useState } from "react";
import { loadAsync } from "expo-font";

import { useDispatch } from "react-redux"
import { setIsFontsLoaded } from "@/store/layoutSlice.js";

export async function initFonts() {
  const dispatch = useDispatch();

  await loadAsync({
    // "base-100": require("assets/fonts/TTFirsNeue-Thin.ttf"),
    // "base-200": require("assets/fonts/TTFirsNeue-ExtraLight.ttf"),
    // "base-300": require("assets/fonts/TTFirsNeue-Light.ttf"),
    "base-400": require("assets/fonts/TTFirsNeue-Regular.ttf"),
    "base-500": require("assets/fonts/TTFirsNeue-Medium.ttf"),
    "base-600": require("assets/fonts/TTFirsNeue-DemiBold.ttf"),
    "base-700": require("assets/fonts/TTFirsNeue-Bold.ttf"),
    // "base-800": require("assets/fonts/TTFirsNeue-ExtraBold.ttf"),
    // "base-900": require("assets/fonts/TTFirsNeue-Black.ttf"),
  })
    .then(() => {
      dispatch(setIsFontsLoaded(true));
    });
}
