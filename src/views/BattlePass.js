import { View } from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { TaskItem } from "@/components/TaskItem.js";
import { TaskReward } from "@/components/TaskReward.js";
import { BattlePassProgress } from "@/components/BattlePassProgress.js";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";

export function BattlePass() {
  const {t, i18n} = useTranslation();
  const tasks = [
    {
      title: "Убить 20 противников",
      reward: "100",
      total: 20,
      progress: 20,
    },
    {
      title: "Выиграть 5 раз подряд",
      reward: "200",
      total: 5,
      progress: 5,
    },
  ];

  return (
    <>
      <Header>
        <HeaderBack/>
        <HeaderTitle title={t("headerTitles.BattlePass")} />
      </Header>
      <View style={[containerStyles.container, containerStyles.containerPage]}>
        <BattlePassProgress/>
        <TaskReward
          data={tasks.map((el) => el.total === el.progress)}
          showProgress={false}
          style={{marginTop: 36,  marginBottom: 16}}
          description={t("components.taskReward.forAllTasks")}
        />
        {
          tasks.map((item, index) => (
            <TaskItem
              item={item}
              key={index}
            />
          ))
        }
      </View>
    </>
  );
}
