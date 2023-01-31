import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator} from '@react-navigation/stack'

// views
import { Intro } from "@/views/Intro.js";
import { Instruction } from "@/views/Instruction.js";
import { Welcome } from "@/views/Welcome.js";
import { SignIn } from "@/views/SignIn.js";
import { ResetPassword } from "@/views/ResetPassword.js";
import { SignUp } from "@/views/SignUp.js";
import { Tabs } from "@/views/Tabs.js";

import { appBackground } from "@/constants/colors.js";

import { initFonts } from "@/styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/authSlice.js";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../requests";

const Stack = createStackNavigator();

export function Navigation() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [appReady, setAppReady] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const initToken = async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(setToken(token || ""));
    setAppReady(true);
  };

  initFonts();
  initToken();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: appBackground,
        },
      }}
    >
      <StatusBar bg="transparent" style="light" translucent />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: appBackground,
            elevation: 0,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          gestureEnabled: false
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Intro"
          options={({ route }) => ({
            headerShown: false,
          })}
        >
          {(props) => (
            <Intro
              {...props}
              forwardTo={token ? "Tabs" : "Instruction"}
              appReady={appReady}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Instruction"
          component={Instruction}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={({ route }) => ({
            title: t("screens.signIn.title"),
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={({ route }) => ({
            title: t("screens.resetPassword.title"),
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ route }) => ({
            title: t("screens.signUp.title"),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
