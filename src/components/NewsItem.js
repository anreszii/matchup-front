import { View, Image, StyleSheet, Touchable } from "react-native";
import { Text } from "ui/Text.js";
import { containerWidth } from "@/constants/sizes.js";
import { containerStyles } from "@/styles/container.js";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";

export function NewsItem({ item }) {
  const url = "https://vk.com/itsmatchup";
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(url).catch((err) =>
          console.error("An error occurred", err)
        );
      }}
    >
      <View style={styles.newsItem}>
        <View style={containerStyles.container}>
          <Image source={{ uri: item.image }} style={styles.newsItemImage} />
          <Text style={styles.newsItemTitle}>{item.title}</Text>
          <Text style={styles.newsItemDescription}>{item.description}</Text>
          <View style={styles.newsItemBottom}>
            <Text style={styles.newsItemLabel}>{item.date}</Text>
            <Text style={styles.newsItemLabel}> · </Text>
            <Text style={styles.newsItemLabel}>{item.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newsItem: {
    borderColor: "#383838",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 20,
  },
  newsItemImage: {
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    minWidth: "100%",
    height: 180,
  },
  newsItemTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  newsItemDescription: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 6,
  },
  newsItemBottom: {
    flexDirection: "row",
  },
  newsItemLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "500",
  },
});
