import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TopItem } from "@/components/TopItem.js";
import { containerStyles } from "@/styles/container.js";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function TopPlayers({ navigation }) {
  const { t, i18n } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const top = new Array(await AsyncStorage.getItem("top"));
      setPlayers(JSON.parse(top)[0].records);
      setLoader(false);
    })();
  }, [refreshing]);

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t("headerTitles.TopPlayers")} />
      </Header>
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={["white"]}
              tintColor={"white"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={[containerStyles.container, containerStyles.containerPage]}
        >
          <View>
            {players.map((item, index) => (
              <TopItem navigation={navigation} item={item} number={index + 1} key={index} />
            ))}
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
