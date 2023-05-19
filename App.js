import "expo-dev-client";

import { Provider } from "react-redux";
import store from "@/store";
import { Navigation } from "@/views/Navigation.js";

import { I18nextProvider } from "react-i18next";
import { i18n } from "@/plugins/i18n";
import { useRef, useState, useEffect } from "react";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "@/helpers/PushPermissionRequester";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const pushListener = () => {
    socket.sendSocket("dark-side", {
      label: "find-lobby",
      controller: "notify",
      params: 500,
    });
  };
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    expoPushToken && schedulePushNotification();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Navigation />
      </I18nextProvider>
    </Provider>
  );
}
