import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "ui/Text.js";
import { Button } from "ui/Button.js";
import { MRPIcon } from "@/icons";
import { Progress } from "ui/Progress.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Card({ userData, lvl, refresh }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    (async () => {
      setAvatar(userData.profile.avatar);
    })();
  }, [refresh]);
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardTop}>
        <View>
          <View style={styles.profileCardName}>
            <Text style={styles.profileCardNameTitle}>
              {userData?.profile?.username}
            </Text>
          </View>
          <View style={styles.profileCardMRPBox}>
            <Text style={styles.profileCardMRPTitle}>
              {userData?.rating?.GRI}
            </Text>
            <MRPIcon style={{ marginLeft: 4 }} />
          </View>
        </View>
        <Image style={styles.profileCardAvatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.profileCardProgress}>
        <Progress lineStyle="green" progress={lvl[2]} total={lvl[0][1]} big />
        <Text style={styles.profileCardProgressLabel}>{lvl[1]} lvl</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#23292E",
    borderRadius: 12,
    padding: 20,
    paddingBottom: 17,
    paddingTop: 16,
    alignItems: "center",
  },
  profileCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    width: "100%",
  },
  profileCardName: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 6,
  },
  profileCardNameTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },
  profileCardOfficial: {
    marginLeft: 4,
  },
  profileCardMRPBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileCardMRPTitle: {
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
  },
  profileCardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  profileCardProgress: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  profileCardProgressLabel: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: "#fff",
    marginLeft: 10,
  },
});
