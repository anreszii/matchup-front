import { useState } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text } from "ui/Text.js";
import { NewsItem } from "@/components/NewsItem.js";
import { typographyStyles } from "@/styles/typography.js";
import { containerStyles } from "@/styles/container.js";
import { TaskSmallItem } from "@/components/TaskSmallItem.js";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderRefill } from "@/components/Layout/HeaderRefill.js";
import { news } from "../store/API/news";
import { InviteModal } from "../components/Modals/InviteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "@/socket";
import { VersionModal } from "@/components/Modals/VersionModal";
import { completed, total } from "@/constants/completedTasks";

export function Home({ navigation }) {
  const { t, i18n } = useTranslation();
  const [newsVK, setNewsVK] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [totalTasks, setTotalTasks] = useState(total);
  const [completedTasks, setCompletedTasks] = useState(completed);
  const [statusBarHeight, setStatusBarHeight] = useState(
    Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight
  );
  const [invitedBy, setInvitedBy] = useState("");

  const [tasksProgress, setTasksProgress] = useState({
    title: t("screens.home.tasksCompleted"),
    reward: "100",
    total: 0,
    progress: 0,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getData = async () => {
    socket.listenSocket(async (label, data) => {
      if (label === "auth") {
        if (data.complete === false) {
          setVisible(true);
        }
      }
      if (label === "vote") {
        navigation.navigate("Tabs", { screen: "Game" });
      }
      if (label === "prepare") {
        navigation.navigate("Tabs", { screen: "Game" });
      }
      if (label === "invite") {
        navigation.navigate("Tabs", { screen: "Home" });
        setTeamId(data.teamId);
        setIsVisible(true);
      } else if (label === "team") {
        setInvitedBy(data.invitedBy);
        navigation.navigate("Tabs", { screen: "Home" });
        setTeamId(data.teamID);
        setIsVisible(true);
      }
    });
    const response = await news();
    setNewsVK([]);
    response.response.items.map(async (item) => {
      setNewsVK((news) => [
        ...news,
        {
          title: "Новый пост в группе ВК!",
          description:
            item.text.replace(/\r?\n/g, " ").substr(0, 100) + ".....",
          image: item?.attachments[0]?.photo?.sizes[5]?.url,
          date: new Date(item.date * 1000).toDateString(),
          label: "ВКонтакте",
        },
      ]);
    });
    setTasksProgress({
      title: t("screens.home.tasksCompleted"),
      reward: "100",
      total: totalTasks,
      progress: completedTasks,
    });
    setLoader(false);
  };

  useEffect(() => {
    (async () => {
      getData();
    })();
  }, [refreshing]);

  return (
    <>
      <Header
        style={{
          ...styles.header,
          backgroundColor: "transparent",
          minHeight: 54 + statusBarHeight,
        }}
      >
        <HeaderRefill />
      </Header>
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ImageBackground
            source={require("assets/home-bg.png")}
            style={[styles.bg]}
          >
            <View
              style={{
                ...containerStyles.container,
                marginTop: "auto",
              }}
            >
              <View style={styles.taskContaier}>
                <TaskSmallItem item={tasksProgress} style={styles.task} />
              </View>
            </View>
          </ImageBackground>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={["white"]}
                tintColor={"white"}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            <View style={containerStyles.container}>
              <Text style={typographyStyles.h1}>{t("screens.home.news")}</Text>
            </View>
            {newsVK.map((newsItem, index) => (
              <NewsItem item={newsItem} key={index} />
            ))}
          </ScrollView>
        </>
      )}
      <VersionModal
        visible={visible}
        title={t("components.versionModal.title")}
        text={t("components.versionModal.subtitle")}
      />
      <InviteModal
        visible={isVisible}
        decline={() => setIsVisible(!isVisible)}
        accept={() => {
          setIsVisible(!isVisible);
          socket.sendSocket("dark-side", {
            controller: "join_team",
            params: [String(teamId)],
          });
        }}
        setVisible={setIsVisible}
        username={invitedBy}
      />
    </>
  );
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 200,
    marginBottom: 28,
  },
  taskContaier: {
    backgroundColor: "rgba(46, 44, 44, 1)",
    borderRadius: 10,
  },
  task: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    marginTop: 0,
    zIndex: 1,
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
