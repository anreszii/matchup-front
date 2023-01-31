import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { User } from "@/components/User.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStartGame } from "@/store/gameSlice.js";
import { useEffect } from "react";

export function MatchHistoryItem({ item }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStartGame(false));
  }, []);

  return (
    <View style={styles.matchHistoryItem}>
      <Text style={styles.matchHistoryItemId}>№{item.id}</Text>
      <Text style={styles.matchHistoryItemDate}>{item.date}</Text>
      <Text style={styles.matchHistoryItemTitle}>{item.mrp} MRP</Text>
      <Text style={styles.matchHistoryLabel}>{t("labels.earned")}</Text>
      {item.isWin ? (
        <View style={[styles.matchHistoryStatus, styles.matchHistoryStatusWin]}>
          <Text style={styles.matchHistoryStatusText}>{t("labels.win")}</Text>
        </View>
      ) : (
        <View
          style={[styles.matchHistoryStatus, styles.matchHistoryStatusDefeat]}
        >
          <Text style={styles.matchHistoryStatusText}>
            {t("labels.defeat")}
          </Text>
        </View>
      )}
      <View style={styles.matchHistoryUsers}>
        {item.users.map((user, index) => (
          <User key={index} user={user} showName={false} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchHistoryItem: {
    backgroundColor: "#23292E",
    borderRadius: 16,
    padding: 16,
    paddingTop: 24,
    alignItems: "center",
    marginBottom: 14,
    position: "relative",
  },
  matchHistoryItemId: {
    position: "absolute",
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
    top: 20,
    left: 16,
  },
  matchHistoryItemDate: {
    position: "absolute",
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
    top: 20,
    right: 16,
  },
  matchHistoryItemTitle: {
    fontWeight: "500",
    fontSize: 24,
    color: "#fff",
    marginTop: 25,
    marginBottom: 4,
  },
  matchHistoryLabel: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
    marginBottom: 6,
  },
  matchHistoryStatus: {
    borderRadius: 6,
    width: 100,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  matchHistoryStatusWin: {
    backgroundColor: "#58C225",
  },
  matchHistoryStatusDefeat: {
    backgroundColor: "#E14B42",
  },
  matchHistoryStatusText: {
    fontWeight: "500",
    fontSize: 13,
    color: "#fff",
  },
  matchHistoryUsers: {
    width: "100%",
    backgroundColor: "#0B1218",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
