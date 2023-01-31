import { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { MatchHistoryItem } from "@/components/MatchHistoryItem.js";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useState } from "react";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment, { now } from "moment/moment";
import "moment/locale/ru";
moment.locale("ru");

export function MatchHistory() {
  const { t, i18n } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);
  const [history, setHistory] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
      setLoader(false);
    }, 500);
  }, []);

  const getData = async () => {
    const historyMatches = JSON.parse(
      new Array(await AsyncStorage.getItem("match_history"))
    );
    historyMatches.map((item, index) => {
      const dateCreated = historyMatches[index].info.createdAt.slice(0, -1);
      const date = new Date(new Date(dateCreated + "+03:00"));
      const nowDate = moment(date).startOf("minute").fromNow();
      const users = [];
      item.members.map((user, index) => {
        if (user.command === "command1") {
          users.push({ image: user.image });
        }
      });
      setHistory((history) => [
        ...history,
        {
          id: item._id.substr(0, 6),
          date: nowDate,
          mrp: "-10",
          isWin: false,
          users: users,
        },
      ]);
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.MatchHistory")} />
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
          {history.length !== 0 ? history.map((item, index) => (
            <MatchHistoryItem item={item} key={index} />
          )) :  <Text style={styles.textAlign}>{t("components.historyMatch.noMatches")}</Text>}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  textAlign: {
    textAlign: "center",
    marginTop: "50%"
  }
});
