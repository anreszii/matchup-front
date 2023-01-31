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
import { getAnotherMatchHistory } from "../../requests";
import socket from "@/socket";
import moment from "moment/moment";
import "moment/locale/ru";
moment.locale("ru");

export function MatchHistory({ username }) {
  const { t, i18n } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState([]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, "2000");
  }, []);
  useEffect(() => {
    setHistory([]);
    getData();
  }, [username]);

  const getData = async () => {
    socket.listenSocket((label, data) => {
      if (label === "get_another_history_match") {
        getHistoryMatches(data.match_list);
      }
    });
    getAnotherMatchHistory(username);
  };

  const getHistoryMatches = (historyMatches) => {
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
        <View style={styles.labels}>
          <Text style={styles.label}>{t('components.historyMatch.matches')}</Text>
        </View>
        {history.length !== 0 ? history.map((item, index) => {
          return <MatchHistoryItem item={item} key={index} />;
        }) : <View>
            <Text style={styles.textAlign}>{t("components.historyMatch.noMatches")}</Text>
          </View>}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  textAlign: {
    textAlign: "center",
    marginTop: "10%"
  }
});
