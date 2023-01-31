import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Progress } from "ui/Progress.js";

export function TaskSmallItem({ item, style }) {
  return (
    <View style={[styles.taskItem, style]}>
      <Text style={styles.taskItemTitle}>{item.title}</Text>
      <View style={styles.taskItemProgressContainer}>
        <Progress
          total={item.total}
          progress={item.progress}
        />
      </View>
      <Text style={styles.taskItemText}>{item.progress}/{item.total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderRadius: 10,
    padding: 12,
    paddingTop: 8,
  },
  taskItemTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  taskItemText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 12,
  },
  taskItemProgressContainer: {
    marginVertical: 10,
  },
});
