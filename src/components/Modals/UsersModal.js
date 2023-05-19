import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Text } from "ui/Text.js";
import { Modal } from "ui/Modal.js";
import { InviteIcon, InvitedIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { containerWidth } from "@/constants/sizes.js";

export function UsersModal({ visible, setVisible, friends, inviteToLobby }) {
  const { t, i18n } = useTranslation();
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("labels.friends")}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {friends &&
              friends.map((user, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.userContainer,
                    marginBottom: friends.length - 1 === index ? 0 : 16,
                  }}
                >
                  <Image
                    style={styles.userAvatar}
                    source={{ uri: user.image }}
                  />
                  <Text style={styles.userName}>{user.name}</Text>
                  <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => inviteToLobby(user)}
                    disabled={user.isInvited}
                  >
                    {user.isInvited ? <InvitedIcon /> : <InviteIcon />}
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1F2325",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  container: {
    minWidth: 335,
    minHeight: 335,
    maxHeight: 500,
    padding: 35,
    alignItems: "center",
    borderColor: "#373D42",
    borderWidth: 2,
    borderRadius: 24,
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    backgroundColor: "#23292E",
  },
  userButton: {
    marginLeft: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    opacity: 0.6,
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    maxWidth: containerWidth,
    height: 40,
    marginTop: 8,
    borderRadius: 60,
    backgroundColor: "#23292E",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#9E9E9E",
    color: "white",
    fontWeight: "500",
    lineHeight: 22,
    paddingLeft: 12,
  },
  textDisabled: {
    color: "#9E9E9E",
  },
  contentContainer: {
    maxWidth: 265,
  },
  checkbox: {
    marginBottom: 8,
    backgroundColor: "#23292E",
    borderRadius: 5,
    padding: 4,
  },
  checkboxText: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 22,
    color: "#FFFFFF",
    opacity: 0.6,
    textAlign: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    flexGrow: 1,
  },
  userAvatar: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 60,
  },
  userName: {
    fontSize: 16,
  },
});
