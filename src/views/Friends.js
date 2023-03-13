import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Text } from "ui/Text.js";
import { containerStyles } from "@/styles/container.js";
import { Input } from "ui/Input.js";
import { SearchIcon } from "@/icons";
import { TextInput } from "react-native-paper";
import { UserDefault, AddUserIcon, DeleteUserIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { headerStyles } from "@/styles/header.js";
import socket from "@/socket";
import { useCallback } from "react";
import { getRelations } from "../requests";
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal.js";

export function Friends({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [subscribers, setSubscribers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchFriend, setSearchFriends] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      setFriends(JSON.parse(new Array(await AsyncStorage.getItem("friends"))));
      setSubscribers(
        JSON.parse(new Array(await AsyncStorage.getItem("subscribers")))
      );
    })();
  }, [route]);

  useEffect(() => {
    return () => setSearch("");
  }, [route]);

  useEffect(() => {
    setLoader(true);
    setSearchUser([]);
    getUsers(search);
  }, [search]);

  const getUsers = async (username) => {
    const userName = await AsyncStorage.getItem("user");
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }
    const timeout = setTimeout(() => {
      socket.listenSocket((label, data) => {
        if (label === "get_all_user") {
          setSearchUser([]);
          setSearchFriends([]);
          data.map((user) => {
            if (user.profile.username !== userName) {
              if (
                friends.find((i) => i.name === user.profile.username) ===
                undefined
              ) {
                setSearchUser((searchUser) => [
                  ...searchUser,
                  {
                    username: user.profile.username,
                    avatar: user.profile.avatar,
                    isRequested: false,
                  },
                ]);
              } else {
                setSearchFriends((searchFriend) => [
                  ...searchFriend,
                  {
                    name: user.profile.username,
                    image: user.profile.avatar,
                  },
                ]);
              }
            }
          });
          socket.disconnectSocket();
          setLoader(false);
        }
      });
      if (search !== "" && search !== " ") {
        socket.sendSocket("query", {
          label: "get_all_user",
          query: {
            method: "get",
            model: "User",
            filter: { "profile.username": { $regex: username } },
          },
        });
      }
      if (search === "") {
        setLoader(false);
      }
    }, 1000);
    setTimeoutID(timeout);
  };

  const delRequest = async (username) => {
    const user = await AsyncStorage.getItem("user");
    socket.listenSocket(async (label, data) => {
      if (label === "del_request") {
        getRelations();
        socket.disconnectSocket();
      }
      if (label === "get_friends") {
        await AsyncStorage.setItem("friends", JSON.stringify(data));
        setFriends(data);
        socket.disconnectSocket();
      }
      if (label === "get_subscribers") {
        await AsyncStorage.setItem("subscribers", JSON.stringify(data));
        setSubscribers(data);
        socket.disconnectSocket();
      }
    });
    socket.sendSocket("syscall", {
      label: "del_request",
      query: {
        model: "User",
        filter: { "profile.username": user },
        execute: { function: "dropRelation", params: [username] },
      },
    });
  };

  const addRequest = async (username) => {
    searchUser[
      searchUser.findIndex((el) => el.username === username)
    ].isRequested = true;
    setSearchUser([...searchUser]);
    const user = await AsyncStorage.getItem("user");
    socket.listenSocket(async (label, data) => {
      if (label === "add_friends") {
        getRelations();
        socket.disconnectSocket();
      }
      if (label === "get_friends") {
        await AsyncStorage.setItem("friends", JSON.stringify(data));
        setFriends(data);
        socket.disconnectSocket();
      }
      if (label === "get_subscribers") {
        await AsyncStorage.setItem("subscribers", JSON.stringify(data));
        setSubscribers(data);
        socket.disconnectSocket();
      }
    });
    socket.sendSocket("syscall", {
      label: "add_friends",
      query: {
        model: "User",
        filter: { "profile.username": user },
        execute: { function: "addRelation", params: [username] },
      },
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle
          title={`${t("headerTitles.Friends")} (${
            friends?.length ? friends.length : 0
          })`}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tabs", { screen: "FriendsRequests" })
          }
          style={headerStyles.headerRight}
        >
          <Text style={headerStyles.headerLabel}>
            {t("headerTitles.FriendsRequests")} (
            {subscribers.length ? subscribers.length : 0})
          </Text>
        </TouchableOpacity>
      </Header>
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
        <Input
          label=""
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          left={
            <TextInput.Icon
              icon={() => (
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    paddingTop: 8,
                  }}
                >
                  <SearchIcon />
                </View>
              )}
            />
          }
          mb={20}
        />
        {loader ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            {search !== "" ? (
              <>
                {searchFriend.length ? (
                  <>
                    {searchFriend.map((user, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          style={styles.user}
                          onPress={() =>
                            navigation.navigate("Tabs", {
                              screen: "AnotherUser",
                              creature: user.name,
                            })
                          }
                        >
                          <Image
                            style={styles.userAvatar}
                            source={{ uri: user.image }}
                          />
                          <Text style={styles.userName}>{user.name}</Text>
                          <TouchableOpacity
                            style={styles.userAction}
                            onPress={() => setVisible(true)}
                          >
                            <DeleteUserIcon style={styles.user} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                        <BottomQuestModal
                          visible={visible}
                          setVisible={setVisible}
                          title={t("components.labelsFriends.sure")}
                          subtitle={`${t("components.labelsFriends.one")} \n${
                            user.name
                          } ${t("components.labelsFriends.two")}`}
                          func={() => delRequest(user.name)}
                        ></BottomQuestModal>
                      </View>
                    ))}
                    <View
                      style={{
                        borderBottomColor: "rgba(255, 255, 255, 0.4)",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 16,
                      }}
                    />
                    {searchUser.map((user, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.user}
                          onPress={() =>
                            navigation.navigate("Tabs", {
                              screen: "AnotherUser",
                              creature: user.name,
                            })
                          }
                        >
                          <Image
                            style={styles.userAvatar}
                            source={{ uri: user.avatar }}
                          />
                          <Text style={styles.userName}>{user.username}</Text>
                          {user?.isRequested ? (
                            <Text style={styles.userRequested}>
                              {t("components.anotherStatistic.request")}
                            </Text>
                          ) : (
                            <TouchableOpacity
                              style={styles.userAction}
                              onPress={() => {
                                addRequest(user.username);
                              }}
                            >
                              <AddUserIcon style={styles.userIcon} />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {searchUser.map((user, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.user}
                          onPress={() =>
                            navigation.navigate("Tabs", {
                              screen: "AnotherUser",
                              creature: user.name,
                            })
                          }
                        >
                          <Image
                            style={styles.userAvatar}
                            source={{ uri: user.avatar }}
                          />
                          <Text style={styles.userName}>{user.username}</Text>
                          {user?.isRequested ? (
                            <Text style={styles.userRequested}>
                              Запрос отправлен
                            </Text>
                          ) : (
                            <TouchableOpacity
                              style={styles.userAction}
                              onPress={() => {
                                addRequest(user.username);
                              }}
                            >
                              <AddUserIcon style={styles.userIcon} />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {friends.length
                  ? friends.map((user, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          style={styles.user}
                          onPress={() =>
                            navigation.navigate("Tabs", {
                              screen: "AnotherUser",
                              creature: user.name,
                            })
                          }
                        >
                          <Image
                            style={styles.userAvatar}
                            source={{ uri: user.image }}
                          />
                          <Text style={styles.userName}>{user.name}</Text>
                          <TouchableOpacity
                            style={styles.userAction}
                            onPress={() => setVisible(true)}
                          >
                            <DeleteUserIcon style={styles.user} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                        <BottomQuestModal
                          visible={visible}
                          setVisible={setVisible}
                          title={t("components.labelsFriends.sure")}
                          subtitle={`${t("components.labelsFriends.one")} \n${
                            user.name
                          } ${t("components.labelsFriends.two")}`}
                          func={() => delRequest(user.name)}
                        ></BottomQuestModal>
                      </View>
                    ))
                  : ""}
              </>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    marginRight: 12,
    width: 45,
    height: 45,
    borderRadius: 60,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  userAction: {
    marginBottom: -16,
    marginLeft: "auto",
  },
  userRequested: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255, 255, 255, 0.4)",
    position: "absolute",
    right: 0,
  },
  userIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
