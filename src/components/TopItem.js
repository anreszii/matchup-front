import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault, MRPIcon } from "@/icons";

export function TopItem({ item, number, navigation }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Tabs", {
          screen: "AnotherUser",
          creature: item.name,
        })
      }
    >
      <ImageBackground
        style={styles.topItem}
        source={number === 1 ? require("assets/top-bg.png") : ""}
      >
        <View
          style={{
            ...styles.topItemNumber,
            backgroundColor:
              number === 1
                ? "#fff"
                : number === 2
                ? "#FF5A46"
                : number === 3
                ? "#FF4393"
                : "#98ACBB",
            color:
              number === 1
                ? "#414141"
                : number === 2
                ? "#812E24"
                : number === 3
                ? "#722445"
                : "#353E46",
          }}
        >
          <Text style={styles.topItemNumberText}>{number}</Text>
        </View>
        <Image style={styles.topItemAvatar} source={{ uri: item.image }} />
        <View style={styles.topItemInfo}>
          <Text style={styles.topItemUserName}>{item.name}</Text>
          <Text
            style={{
              ...styles.topItemUserType,
              color: number === 1 ? "#fff" : "rgba(235, 235, 245, 0.6)",
            }}
          ></Text>
        </View>
        <View style={styles.topItemRating}>
          <Text style={styles.topItemRatingText}>{item.ratingPoints}</Text>
          <MRPIcon style={{ marginLeft: 4 }} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23292E",
    borderRadius: 8,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 16,
    marginBottom: 10,
    overflow: "hidden",
  },
  topItemNumber: {
    width: 33,
    height: 33,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  topItemNumberText: {
    color: "#353E46",
  },
  topItemAvatar: {
    width: 33,
    height: 33,
    marginRight: 8,
    borderRadius: 60,
  },
  topItemInfo: {},
  topItemUserName: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 2,
    color: "#fff",
  },
  topItemUserType: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
  },
  topItemRating: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  topItemRatingIcon: {
    marginRight: 7,
  },
  topItemRatingText: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 26,
    color: "#fff",
  },
  topItemMy: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23292E",
    borderRadius: 8,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 16,
    marginBottom: 10,
    overflow: "hidden",
  },
});
