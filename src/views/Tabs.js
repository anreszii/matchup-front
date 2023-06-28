import { appBackground } from "@/constants/colors.js";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { Home } from "@/views/Home.js";
import Team from "./Team";
import { Tasks } from "@/views/Tasks.js";
import { Play } from "@/views/Play.js";
import { Tournaments } from "@/views/Tournaments.js";
import { Profile } from "@/views/Profile.js";
import { EditProfile } from "@/views/EditProfile.js";
import { Notifications } from "@/views/Notifications.js";
import { MatchHistory } from "@/views/MatchHistory.js";
import { BattlePass } from "@/views/BattlePass.js";
import { MatchLobby } from "@/views/MatchLobby.js";
import { TopPlayers } from "@/views/TopPlayers.js";
import { TopTeams } from "@/views/TopTeams.js";
import { TeamCreate } from "@/views/TeamCreate.js";
import { TeamEdit } from "@/views/TeamEdit.js";
import { TeamJoin } from "@/views/TeamJoin.js";
import { Friends } from "@/views/Friends.js";
import { FriendsRequests } from "@/views/FriendsRequests.js";
import { Game } from "@/views/Game.js";
import { SearchGame } from "@/views/SearchGame";
import { InvitedMatchLobby } from "./InvitedMatchLobby";

import { TabBar } from "@/components/Layout/TabBar.js";

import {
  PlayIcon,
  HomeIcon,
  TaskIcon,
  ShopIcon,
  ProfileIcon,
  HomeIconActive,
  TaskIconActive,
  ShopIconActive,
  ProfileIconActive,
} from "@/icons";

import { useTranslation } from "react-i18next";
import { AnotherUser } from "./AnotherUser";
import TeamSettings from "./TeamSettings";

export function Tabs({ route }) {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: appBackground,
          elevation: 0,
        },
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#EE4C65",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.4)",
        tabBarStyle: {
          backgroundColor: "rgba(68, 68, 68, 0.6)",
          borderWidth: 0,
        },
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: t("tabBar.home"),
          tabBarIcon: <HomeIcon />,
          tabBarIconActive: <HomeIconActive />,
        })}
      />
      <Tab.Screen
        name="TeamSettings"
        component={TeamSettings}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
        })}
      />
      {/*       <Tab.Screen
        name="Team"
        component={Team}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
        })}
      /> */}
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={({ route }) => ({
          title: t("tabBar.tasks"),
          tabBarIcon: <TaskIcon />,
          tabBarIconActive: <TaskIconActive />,
        })}
      />
      <Tab.Screen
        name="Play"
        component={Play}
        options={({ route }) => ({
          title: t("tabBar.play"),
          tabBarIcon: <PlayIcon style={{ marginTop: -20 }} />,
        })}
      />
      <Tab.Screen
        name="Tournaments"
        component={Tournaments}
        options={({ route }) => ({
          title: t("tabBar.shop"),
          tabBarIcon: <ShopIcon />,
          tabBarIconActive: <ShopIconActive />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route}
        options={() => {
          return {
            title: t("tabBar.profile"),
            tabBarIcon: <ProfileIcon />,
            tabBarIconActive: <ProfileIconActive />,
          };
        }}
      />
      <Tab.Screen
        name="AnotherUser"
        component={AnotherUser}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
        })}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="MatchHistory"
        component={MatchHistory}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="BattlePass"
        component={BattlePass}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="MatchLobby"
        component={MatchLobby}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="InvitedMatchLobby"
        component={InvitedMatchLobby}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="TopPlayers"
        component={TopPlayers}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="TopTeams"
        component={TopTeams}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="TeamCreate"
        component={TeamCreate}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="TeamEdit"
        component={TeamEdit}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="TeamJoin"
        component={TeamJoin}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="Team"
        component={Team}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="FriendsRequests"
        component={FriendsRequests}
        initialParams={route}
        options={() => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
      <Tab.Screen
        name="SearchGame"
        component={SearchGame}
        options={({ route }) => ({
          tabBarButton: false,
          notShowTabBar: true,
          title: "",
        })}
      />
    </Tab.Navigator>
  );
}
