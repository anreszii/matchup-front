import { View } from "react-native";
import { TopItem } from "@/components/TopItem.js";
import { containerStyles } from "@/styles/container.js";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useTranslation } from "react-i18next";

export function TopTeams() {
  const {t, i18n} = useTranslation();
  const players = [
    {
      name: "Clantag",
      type: "Pro League",
      rating: 1,
    },
    {
      name: "Clantag",
      type: "Pro League",
      rating: -1,
    },
    {
      name: "Clantag",
      type: "Pro League",
      rating: 0,
    },
    {
      name: "Clantag",
      type: "Pro League",
      rating: 2,
    },
    {
      name: "Clantag",
      type: "Pro League",
      rating: 0,
    },
    {
      name: "Clantag",
      type: "Pro League",
      rating: -1,
    },
  ];

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.TopTeams")} />
      </Header>
      <View style={[containerStyles.container, containerStyles.containerPage]}>
        {
          players.map((item, index) => (
            <TopItem
              item={item}
              number={index + 1}
              key={index}
            />
          ))
        }
      </View>
    </>
  );
}
