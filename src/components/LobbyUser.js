import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "ui/Text.js";
import { UserDefault } from "@/icons";
import { useNavigation } from "@react-navigation/native";

export function LobbyUser({ user, isAddIcon }) {
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.user}>
      <TouchableOpacity onPress={() =>
        navigation.navigate("Tabs", {
          screen: "AnotherUser",
          creature: user.name,
        })
      }>
              <View>
        <Image style={styles.image} source={{ uri: user.image }} />
      </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
          {user.name.length > 6 ? user.name.slice(0, 6) + "..." : user.name}
        </Text>
      </TouchableOpacity>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  user: {
    marginRight: 15,
  },
  userName: {
    fontWeight: "500",
    fontSize: 12,
    color: "#fff",
    marginTop: 8,
    textAlign: "center"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
});
