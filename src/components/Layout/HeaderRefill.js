import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "ui/Text.js";
import { Coin } from "@/icons";
import { headerStyles } from "@/styles/header.js";
import { RefillModal } from "@/components/Modals/RefillModal.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function HeaderRefill({ userData }) {
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("profile"));
      setCoins(user?.profile?.balance || 0);
    })();
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://matchup.space/magazin/")}
        style={[headerStyles.headerRight, styles.headerCoin]}
      >
        <>
          <Text style={styles.headerCoinText}>{coins ? coins : 0}</Text>
          <Coin style={styles.headerCoinIcon} />
        </>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  headerCoin: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerCoinText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  headerCoinIcon: {
    marginLeft: 4,
  },
});
