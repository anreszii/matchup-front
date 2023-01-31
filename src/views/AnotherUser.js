import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { containerStyles } from "@/styles/container.js";
import { Card } from "@/components/AnotherProfile/Card.js";
import { Statistic } from "@/components/AnotherProfile/Statistic.js";
import { Team } from "@/components/AnotherProfile/Team.js";
import { Header } from "@/components/Layout/Header.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { HeaderLogout } from "@/components/Layout/HeaderLogout.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mrp_lvl from "../../mrp_lvl.json";
import { useCallback } from "react";
import socket from "@/socket";
import { MatchHistory } from "../components/AnotherProfile/HistoryMatch";
import { HeaderBack } from "../components/Layout/HeaderBack";
import { Report } from "../components/AnotherProfile/Reports";

export function AnotherUser({ route }) {
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState(undefined);
  const [lvl, setLvl] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getUserData();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setLoader(true);
    getUserData();
  }, [route]);

  const getUserData = async () => {
    socket.listenSocket(async (label, data) => {
      if (label === "get_another_user") {
        setUserData(undefined);
        for (const [index, item] of mrp_lvl.entries()) {
          if (
            data[0]?.rating?.GRI >= item[0] &&
            data[0]?.rating?.GRI <= item[1]
          ) {
            setLvl([item, index + 1, data[0]?.rating?.GRI]);
          }
        }
        socket.disconnectSocket();
        setUserData(data[0]);
        setLoader(false);
      }
    });
    socket.sendSocket("query", {
      label: "get_another_user",
      query: {
        method: "get",
        model: "User",
        filter: { "profile.username": route.params.params.creature },
      },
    });
  };

  useEffect(() => {
    getUserData();
  }, [refreshing]);

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.Profile")} />
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
          <View style={{ marginBottom: 22 }}>
            {userData && (
              <Card userData={userData} lvl={lvl} refresh={refreshing} />
            )}
          </View>
          <View style={{ marginBottom: 22 }}>
            {userData && <Statistic userData={userData} />}
          </View>
          <View style={{ marginBottom: 22 }}>
            <Report />
          </View>
          {/* <View style={{ marginBottom: 22 }}>
            <Team userData={userData} />
          </View> */}
          <View style={{ marginBottom: 30 }}>
            <MatchHistory username={route.params.params.creature} />
          </View>
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
});
