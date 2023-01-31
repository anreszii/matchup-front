import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Progress } from "ui/Progress.js";
import { useTranslation } from "react-i18next";

export function BattlePassProgress() {
  const {t, i18n} = useTranslation();
  return (
    <View>
      <Text style={styles.battlePassProgressTitle}>
        9 {t("labels.level")} <Text style={styles.battlePassProgressUnactiveFont}>{t("labels.from")} 50</Text>
      </Text>
      <View style={styles.battlePassProgress}>
        <Progress
          total={50}
          progress={30}
          lineStyle="gold"
          big
        />
      </View>
      <View style={styles.battlePassProgressBottom}>
        <Text style={styles.battlePassProgressText}>1337 xp</Text>

        <Text style={styles.battlePassProgressText}>
          436 xp <Text style={styles.battlePassProgressUnactiveFont}>{t("components.battlePassProgress.untilNextLevel")}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  battlePassProgressTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },
  battlePassProgressText: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  battlePassProgressUnactiveFont: {
    color: "rgba(255, 255, 255, 0.4)",
  },
  battlePassProgress: {
    marginVertical: 12,
  },
  battlePassProgressBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
