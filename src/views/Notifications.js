import { View } from "react-native";
import { Text } from "ui/Text.js";
import { Notification } from "@/components/Notification.js";
import { containerStyles } from "@/styles/container.js";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useTranslation } from "react-i18next";

export function Notifications() {
  const {t, i18n} = useTranslation();
  const notifications = [
    {
      title: "Вы победили в игре",
      description: "№85784",
      icon: "",
      isGame: true,
    },
    {
      title: "Вы проиграли в игре",
      description: "№85783",
      icon: "",
      isRefuse: true,
      isGame: true,
    },
    {
      title: "Вас хочет добавить в друзья \n%user%",
      description: "",
      icon: "",
    },
    {
      title: "Ваш запрос в команду %team%\nотклонен",
      description: "",
      icon: "",
      isRefuse: true,
    },
  ];

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.Notifications")} />
      </Header>
      <View style={[containerStyles.container, containerStyles.containerPage]}>
        {
          notifications.map((item, index) => (
            <Notification
              item={item}
              key={index}
            />
          ))
        }
      </View>
    </>
  );
}
