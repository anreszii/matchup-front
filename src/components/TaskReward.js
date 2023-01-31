import { View, ImageBackground, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import {
  Gift,
  Coin,
  TaskSuccessCircleIcon,
  TaskProgressCircleIcon,
} from "@/icons";

export function TaskReward({
  data,
  description,
  showProgress = true,
  style = {},
}) {
  const isSuccess = (data) => {
    data.map((item) => {
      return new Boolean(item.flags.complete);
    });
  };
  return (
    <ImageBackground
      source={
        !showProgress
          ? ""
          : !isSuccess(data)
          ? require("assets/task-reward.png")
          : require("assets/task-reward-success.png")
      }
      style={[styles.taskReward, style]}
    >
      <View>
        <View style={styles.taskRewardGiftContainer}>
          <Gift style={{ marginRight: 2 }} />
          <Text style={styles.taskRewardGiftValue}>200</Text>
          <Coin style={{ marginLeft: 4 }} />
        </View>
        <Text style={styles.taskRewardGiftText}>{description}</Text>
      </View>
      {showProgress && (
        <View style={styles.taskRewardProgressContainer}>
          {data.map((el, index) =>
            el && isSuccess(data) ? (
              <TaskSuccessCircleIcon
                key={index}
                style={styles.taskRewardProgress}
              />
            ) : isSuccess(data) ? (
              <TaskProgressCircleIcon
                key={index}
                style={styles.taskRewardProgress}
              />
            ) : (
              <View key={index} style={styles.taskRewardProgress}></View>
            )
          )}
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  taskReward: {
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 8,
    backgroundColor: "rgba(238, 238, 238, 0.1)",
  },
  taskRewardGiftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskRewardGiftValue: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
    marginLeft: 8,
  },
  taskRewardGiftText: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  taskRewardProgressContainer: {
    flexDirection: "row",
  },
  taskRewardProgress: {
    backgroundColor: "#23292E",
    width: 16,
    height: 16,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 12,
  },
});
