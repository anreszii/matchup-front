import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { useTranslation } from "react-i18next";

export function Statistic({ userData }) {
  const { t, i18n } = useTranslation();
  const userWR =
    (userData?.rating?.WC /
      (userData?.rating?.WC + userData?.rating?.LC + userData?.rating?.DC)) ===
    NaN
      ? userData?.rating?.WC /
      (userData?.rating?.WC + userData?.rating?.LC + userData?.rating?.DC)
      : 0
  return (
    <View style={styles.container}>
      {userData.premium.isPremium === true ? (
        <>
          <View style={{ ...styles.block, marginRight: 15, marginBottom: 14 }}>
            <Text style={styles.blockValue}>{`${userWR} ${"%"}`}</Text>
            <Text style={styles.blockLabel}>Win/Lose</Text>
          </View>
          <View style={{ ...styles.block, marginBottom: 14 }}>
            <Text style={styles.blockValue}>
              {typeof (
                userData?.rating?.GS.kills / userData?.rating?.GS.deaths
              ) === NaN
                ? userData?.rating?.GS.kills / userData?.rating?.GS.deaths
                : userData?.rating?.GS.kills}
            </Text>
            <Text style={styles.blockLabel}>K/D</Text>
          </View>
          <View style={{ ...styles.block, marginRight: 15 }}>
            <Text style={styles.blockValue}>
              {userData?.rating?.WC +
                userData?.rating?.LC +
                userData?.rating?.DC}
            </Text>
            <Text style={styles.blockLabel}>
              {t("components.playerStatistic.matches")}
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.blockValue}>{userData?.rating?.GS.kills}</Text>
            <Text style={styles.blockLabel}>
              {t("components.playerStatistic.kills")}
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.nonPremBlock}>
          <Text>
            {t("components.anotherStatistic.userdonthave")}{" "}
            <Text style={styles.text}>
              {t("components.anotherStatistic.premium")}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nonPremBlock: {
    backgroundColor: "#23292E",
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 8,
    minWidth: "40%",
    height: 70,
    flexGrow: 1,
    justifyContent: "center",
  },
  block: {
    backgroundColor: "#23292E",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    minWidth: "40%",
    flexGrow: 1,
  },
  blockValue: {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#fff",
    marginBottom: 2,
  },
  blockLabel: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 0.4)",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.4)",
  },
  text: {
    color: "#FF5A45",
  },
});
