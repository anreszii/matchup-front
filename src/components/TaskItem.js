import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Progress } from "ui/Progress.js";
import { Coin } from "@/icons";
import { useTranslation } from "react-i18next";

export function TaskItem({ items, style, language }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {items.map((item, index) => {
        if (item.name === "completedDaily") {
        } else {
          return (
            <View key={index} style={[styles.taskItem, style]}>
              <View style={styles.taskItemContentBox}>
                <Text style={styles.taskItemTitle}>{language === "en" ? item.name.split('|')[1] : item.name.split("|")[0]}</Text>
                <Text style={styles.taskItemText}>
                  {item.progress.currentPoints}/{item.progress.requiredPoints}
                </Text>
              </View>
              <View style={styles.taskItemProgressContainer}>
                <Progress
                  total={item.progress.requiredPoints}
                  progress={item.progress.currentPoints}
                />
              </View>
              <View style={styles.taskItemContentBox}>
                <Text style={styles.taskItemText}>
                  {t("components.taskItem.reward")}
                </Text>
                <View style={styles.taskItemRewardContainer}>
                  <Text style={[styles.taskItemText, styles.taskItemReward]}>
                    +{item.rewards[0].amount}
                  </Text>
                  <Coin style={styles.taskItemRewardIcon} />
                </View>
              </View>
            </View>
          );
        }
      })}
    </>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  taskItemContentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskItemTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
  },
  taskItemText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  taskItemRewardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskItemRewardIcon: {
    marginLeft: 6,
  },
  taskItemReward: {
    color: "#fff",
  },
  taskItemProgressContainer: {
    marginVertical: 14,
  },
});
