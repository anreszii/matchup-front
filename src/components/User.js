import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault } from "@/icons";
import { useNavigation } from "@react-navigation/native";

export function User({ user, showName }) {
  const navigation = useNavigation();
  return (
    <View style={styles.user}>
      <TouchableOpacity       onPress={() =>
        navigation.navigate("Tabs", {
          screen: "AnotherUser",
          creature: user.name,
        })
      }>
              <View>
        <Image style={styles.image} source={{ uri: user.image }} />
      </View>
      {showName && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
          {user.name.length > 6 ? user.name.slice(0, 6) + "..." : user.name}
        </Text>
      )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    position: "relative",
    alignItems: "center",
    flexGrow: 1,
  },
  userName: {
    fontWeight: "500",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
});
