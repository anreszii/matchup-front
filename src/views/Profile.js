import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { containerStyles } from "@/styles/container.js";
import { Card } from "@/components/Profile/Card.js";
import { Friends } from "@/components/Profile/Friends.js";
import { Statistic } from "@/components/Profile/Statistic.js";
import { TopUsers } from "@/components/Profile/TopUsers.js";
import { Team } from "@/components/Profile/Team.js";
import { Prime } from "@/components/Profile/Prime.js";
import { Header } from "@/components/Layout/Header.js";
import { HeaderNotification } from "@/components/Layout/HeaderNotification.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { HeaderLogout } from "@/components/Layout/HeaderLogout.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mrp_lvl from "../../mrp_lvl.json";
import socket from "@/socket";
import { useCallback } from "react";

export function Profile({ route }) {
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

  const getUserData = async () => {
    const profile = JSON.parse(await AsyncStorage.getItem("profile"));
    for (const [index, item] of mrp_lvl.entries()) {
      if (
        profile[0]?.rating?.GRI >= item[0] &&
        profile[0]?.rating?.GRI <= item[1]
      ) {
        setLvl([mrp_lvl[index], index + 1]);
      }
    }
    setUserData(profile[0]);
    setLoader(false);
  };

  useEffect(() => {
    getUserData();
  }, [refreshing]);

  return (
    <>
      <Header>
        <HeaderTitle title={t("headerTitles.Profile")} />
        <HeaderLogout />
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
            {userData && <Friends userData={userData} />}
          </View>
          <View style={{ marginBottom: 22 }}>
            {userData && <Statistic userData={userData} />}
          </View>
          <View style={{ marginBottom: 22 }}>
            <TopUsers refresh={refreshing} />
          </View>
          <View style={{ marginBottom: 22 }}>
            <Team userData={userData} />
          </View>
          <View style={{ marginBottom: 30 }}>
            {userData && <Prime userData={userData} />}
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
