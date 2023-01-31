import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { TaskItem } from "@/components/TaskItem.js";
import { TaskReward } from "@/components/TaskReward.js";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderRefill } from "@/components/Layout/HeaderRefill.js";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { getUserData } from "../requests";

export function Tasks({ navigation }) {
  const { t, i18n } = useTranslation();
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const reward = [];
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);
  const [language, setLanguage] = useState('ru')

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  const isReward = () => {
    dailyTasks.map((el) => {
      el.map((item) => {
        if (item.name !== "completedDaily") {
          return reward.push(item);
        }
      });
    });
    return reward;
  };

  const getData = async () => {
    const lang = await AsyncStorage.getItem('lang')
    setLanguage(lang)
    const data = JSON.parse(new Array(await AsyncStorage.getItem("tasks")));
    const week = [];
    const day = [];
    data.map((item) => {
      if (item[0].expires.expirationType === "day") {
        day.push(item[0]);
      } else {
        week.push(item[0]);
      }
    });
    setDailyTasks(new Array(JSON.parse(JSON.stringify(day))));
    setWeeklyTasks(new Array(JSON.parse(JSON.stringify(week))));
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header>
        <HeaderRefill />
      </Header>
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={[containerStyles.container, containerStyles.containerPage]}
          refreshControl={
            <RefreshControl
              colors={["white"]}
              tintColor={"white"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Text style={[styles.text, styles.title]}>
            {t("screens.tasks.everyweekTasks")}
          </Text>
          {weeklyTasks.map((item, index) => (
            <TaskItem items={item} language={language} key={index} />
          ))}
          <Text style={[styles.text, styles.title]}>
            {t("screens.tasks.everydayTasks")}
          </Text>
          {dailyTasks.map((item, index) => (
            <TaskItem items={item} language={language} key={index} />
          ))}
          <TaskReward
            data={isReward()}
            style={{ marginTop: 12, marginBottom: 50 }}
            description={t("components.taskReward.forAllTasks")}
          />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  title: {
    color: "rgba(255, 255, 255, 0.4)",
    marginBottom: 12,
  },
  battlePass: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  battlePassTitle: {
    fontWeight: "600",
    color: "#fff",
  },
  battlePassLogo: {
    marginRight: 12,
  },
  battlePassArrowProgress: {
    color: "rgba(255, 255, 255, 0.4)",
    marginLeft: "auto",
  },
  battlePassArrow: {
    marginLeft: 12,
    opacity: 0.4,
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
