export default () => ({
  expo: {
    name: "MatchUp",
    slug: "matchup",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.globalfuture.matchup",
    },
    android: {
      package: "com.globalfuture.matchup",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0B1218",
      },
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos.",
        },
      ],
    ],
    extra: {
      API_URL: process.env.REACT_APP_API_URL || null,
      WS_URL: process.env.REACT_APP_WS_URL || null,
      eas: {
        projectId: "717ac0e9-81e7-464e-8d31-56927903cc29",
      },
    },
  },
});
