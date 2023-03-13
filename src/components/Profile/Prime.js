import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "ui/Text.js";
import { typographyStyles } from "@/styles/typography.js";
import { containerStyles } from "@/styles/container.js";
import { Button } from "ui/Button.js";
import { UserVipIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { RefillModal } from "@/components/Modals/RefillModal.js";
import moment from "moment/moment";

export function Prime({ userData }) {
  const { t, i18n } = useTranslation();
  const date = moment(userData.premium.expiresIn).format('L');
  return ( 
    <>
      <View>
        <Text style={typographyStyles.h2}>
          {t("components.premium.premiumStatus")}
        </Text>
        <View style={styles.container}>
          <View style={styles.prime}>
            <UserVipIcon />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {userData.premium.isPremium === true ? (
              <Text style={styles.primeText}>
                {`${t("components.premium.premiumTime")} \n ${date}`}
              </Text>
            ) : (
              <Button
                bg="#0B1218"
                title={t("labels.buy")}
                height={40}
                width={200}
                onPress={() =>
                  Linking.openURL("https://matchup.space/magazin/")
                }
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23292E",
    borderRadius: 12,
    padding: 20,
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  prime: {
    backgroundColor: "#0B1218",
    width: 48,
    height: 48,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -4,
  },
  primeText: {
    margin: "auto",
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
});
