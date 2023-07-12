import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

let user;
let dataUser;
let flag = false;

socket.listenSocket(async (label, data) => {
  switch (label) {
    case "get_user_data":
      dataUser = data;
      await AsyncStorage.setItem("profile", JSON.stringify(data));
      socket.disconnectSocket();
      getTasksData();
      getRelations();
      getMatchHistory();
      break;
    case "completed_tasks":
      await AsyncStorage.setItem("completed_tasks", JSON.stringify(data));
      socket.disconnectSocket();
      break;
    case "get_friends":
      await AsyncStorage.setItem("friends", JSON.stringify(data));
      socket.disconnectSocket();
      break;
    case "get_team_data":
      await AsyncStorage.setItem("team", JSON.stringify(data));
      break;
    case "get_subscribers":
      await AsyncStorage.setItem("subscribers", JSON.stringify(data));
      socket.disconnectSocket();
      break;
    case "get_for_user":
      await AsyncStorage.setItem("tasks", JSON.stringify(data));
      socket.disconnectSocket();
      break;
    case "get_history_match":
      await AsyncStorage.setItem(
        "match_history",
        JSON.stringify(data.match_list)
      );
      socket.disconnectSocket();
      break;
  }
});

export const getFlag = () => {
  return flag;
};

export const getUserData = async () => {
  user = await AsyncStorage.getItem("user");
  socket.sendSocket("query", {
    label: "get_user_data",
    query: {
      method: "get",
      model: "User",
      filter: { "profile.username": user },
    },
  });
};

export const getTasksData = () => {
  socket.sendSocket("syscall", {
    label: "get_for_user",
    query: {
      model: "TaskList",
      execute: {
        function: "getForUser",
        params: [dataUser[0].profile.username],
      },
    },
  });
  socket.sendSocket("syscall", {
    label: "completed_tasks",
    query: {
      model: "TaskList",
      filter: {},
      execute: {
        function: "getCompletedDailyTasksCount",
        params: [],
      },
    },
  });
};

export const getRelations = () => {
  socket.sendSocket("syscall", {
    label: "get_subscribers",
    query: {
      model: "User",
      filter: { "profile.username": user },
      execute: {
        function: "getSubscribers",
        params: [],
      },
    },
  });
  socket.sendSocket("syscall", {
    label: "get_friends",
    query: {
      model: "User",
      filter: { "profile.username": user },
      execute: {
        function: "getFriends",
        params: [],
      },
    },
  });
};

export const getMatchHistory = () => {
  socket.sendSocket("query", {
    label: "get_history_match",
    query: {
      method: "get",
      model: "User",
      aggregation: [
        { $match: { "profile.username": user } },
        {
          $lookup: {
            from: "matches",
            localField: "match_list",
            foreignField: "_id",
            as: "match_list",
          },
        },
      ],
    },
  });
};

export const getAnotherMatchHistory = (username) => {
  socket.sendSocket("query", {
    label: "get_another_history_match",
    query: {
      method: "get",
      model: "User",
      aggregation: [
        { $match: { "profile.username": username } },
        {
          $lookup: {
            from: "matches",
            localField: "match_list",
            foreignField: "_id",
            as: "match_list",
          },
        },
      ],
    },
  });
};

export const getData = async () => {
  getUserData();
};
