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
import { useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "@/components/Layout/Header.js";
import { HeaderBack } from "@/components/Layout/HeaderBack.js";
import { HeaderTitle } from "@/components/Layout/HeaderTitle.js";
import { headerStyles } from "@/styles/header.js";
import socket from "@/socket";
import { useCallback } from "react";
import { getRelations } from "../requests";
import { BottomQuestModal } from "@/components/Modals/BottomQuestModal.js";
import { FriendsContext, RelationContext, SubscribersContext } from "@/context";

export function Friends({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [subscribers, _setSubscribers] = useState([]);
  const [friends, _setFriends] = useState([]);
  const friendsRef = useRef(friends);
  const subscribersRef = useRef(subscribers);
  const setSubscribers = (subs) => {
    subscribersRef.current = subs;
    _setSubscribers(subs);
  };
  const setFriends = (subs) => {
    friendsRef.current = subs;
    _setFriends(subs);
  };
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchFriend, setSearchFriends] = useState([]);
  const username = useRef("");
  const [flag, setFlag] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const userName = await AsyncStorage.getItem("user");
      socket.listenSocket(async (label, data) => {
        if (label === "del_request") {
          console.log(friendsRef.current);
          const index = friends.findIndex(
            (element) => element.name === username.current
          );
          const subscriber = friendsRef.current.splice(index, 1);
          setFriends([...friendsRef.current]);
          setSubscribers([...subscribersRef.current, subscriber]);
          setFlag(!flag);
        }
        if (label === "add_friends") {
          getRelations();
        }
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
          setLoader(false);
        }
      });

      setFriends(JSON.parse(new Array(await AsyncStorage.getItem("friends"))));
      setSubscribers(
        JSON.parse(new Array(await AsyncStorage.getItem("subscribers")))
      );
    })();
  }, []);

  useEffect(() => {
    setFlag(!flag);
    return () => setSearch("");
  }, [route]);

  useEffect(() => {
    setLoader(true);
    setSearchUser([]);
    getUsers(search);
  }, [search]);

  const getUsers = async (userName) => {
    username.current = userName;
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }
    const timeout = setTimeout(() => {
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
    <RelationContext.Provider
      value={{
        friends: friends,
        setFriends: setFriends,
        subscribers: subscribers,
        setSubscribers: setSubscribers,
      }}
    >
      <Header>
        <HeaderBack />
        <HeaderTitle
          title={`${t("headerTitles.Friends")} (${
            friends?.length ? friends.length : 0
          })`}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tabs", {
              screen: "FriendsRequests",
            })
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
                            source={{ uri: user?.image }}
                          />
                          <Text style={styles.userName}>{user.name}</Text>
                          <TouchableOpacity
                            style={styles.userAction}
                            onPress={() => {
                              username.current = user.name;
                              setVisible(true);
                            }}
                          >
                            <DeleteUserIcon style={styles.user} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                        <BottomQuestModal
                          visible={visible}
                          setVisible={setVisible}
                          title={t("components.labelsFriends.sure")}
                          subtitle={`${t("components.labelsFriends.one")} \n${
                            username.current
                          } ${t("components.labelsFriends.two")}`}
                          func={() => delRequest(username)}
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
                  ? friends.map((user, index) => {
                      return (
                        <View key={user.image}>
                          <View>
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
                                source={{ uri: user?.image }}
                              />
                              <Text style={styles.userName}>{user.name}</Text>
                              <TouchableOpacity
                                style={styles.userAction}
                                onPress={() => {
                                  (username.current = user.name),
                                    setVisible(true);
                                }}
                              >
                                <DeleteUserIcon style={styles.user} />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          </View>
                          <BottomQuestModal
                            visible={visible}
                            setVisible={setVisible}
                            title={t("components.labelsFriends.sure")}
                            subtitle={`${t("components.labelsFriends.one")} \n${
                              username.current
                            } ${t("components.labelsFriends.two")}`}
                            func={() => delRequest(username.current)}
                          ></BottomQuestModal>
                        </View>
                      );
                    })
                  : ""}
              </>
            )}
          </>
        )}
      </ScrollView>
    </RelationContext.Provider>
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
