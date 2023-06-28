import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { TopItem } from "@/components/TopItem.js";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useCallback } from "react";
import socket from "@/socket";

export function TopPlayers({ navigation }) {
  const { t, i18n } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let limit = 50;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getPlayers = async () => {
    socket.listenSocket(async (label, data) => {
      if (label === "get_some_players") {
        setPlayers(data);
        socket.disconnectSocket();
        setLoader(false);
      }
    });
    limit += 25;
    socket.sendSocket("query", {
      label: "get_some_players",
      query: {
        model: "Leaderboard",
        method: "get",
        aggregation: [
          { $match: { type: "user" } },
          { $unwind: "$records" },
          { $limit: limit },
          {
            $project: {
              _id: 0,
              name: "$records.name",
              image: "$records.image",
              rating: "$records.ratingPoints",
            },
          },
        ],
      },
    });
  };

  // <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         scrollEventThrottle={15}
  //         onScroll={() => {
  //           getPlayers();
  //         }}
  //         bounces={false}
  //         scrollEnabled={true}
  //         style={[containerStyles.container, containerStyles.containerPage]}
  //       >
  //         <View>
  //           {players.map((item, index) => (
  //             <TopItem
  //               navigation={navigation}
  //               item={item}
  //               number={index + 1}
  //               key={index}
  //             />
  //           ))}
  //         </View>
  //       </ScrollView>

  useEffect(() => {
    getPlayers();
  }, []);

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
        <FlatList
          data={players}
          onEndReached={getPlayers}
          onEndReachedThreshold={0.7}
          keyExtractor={(item) => item.index}
          refreshControl={
            <RefreshControl
              colors={["white"]}
              tintColor={"white"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={(item) => (
            <View key={item.index + 1}>
              <TopItem
                navigation={navigation}
                item={item.item}
                number={item.index + 1}
              />
            </View>
          )}
        />
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
