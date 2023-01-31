import { View, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";

export function TabBar(props) {
  const descriptors = Object.entries(props.descriptors) || [];
  const history = props.state.history;
  const currentDescriptor = () => {
    const currentRouteKey = history[history.length - 1]?.key || "";

    return props.descriptors[currentRouteKey] || {};
  }

  const isShowTabs = !currentDescriptor()?.options.notShowTabBar;

  return (
    <View style={styles.tabBarContainer}>
      {
        isShowTabs &&
          <View
            style={styles.tabBar}
            resizeMode="stretch"
          >
            {
              descriptors.map(([descriptorName, descriptor], index) => {
                const isFocused = descriptor.navigation.isFocused();
                const options = descriptor.options;

                return (
                  options.tabBarButton !== false &&
                    <TouchableOpacity
                      key={index}
                      onPress={() => descriptor.navigation.navigate(descriptor.route.name)}
                      style={styles.tab}
                    >
                      <View style={styles.tabIcon}>
                        {
                          isFocused && options.tabBarIconActive
                            ? options.tabBarIconActive
                            : options.tabBarIcon
                        }
                      </View>
                      <Text
                        style={{
                          ...styles.tabText,
                          color: isFocused ? "#FF5A45" : "rgba(255, 255, 255, 0.4)",
                        }}
                      >{options.title}</Text>
                    </TouchableOpacity>
                );
              })
            }
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
    width: "100%",
    bottom: 0,
  },
  tabBar: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: 'rgba(68, 68, 68, 0.6)' ,
    borderRadius: 16
  },
  tab: {
    alignItems: "center",
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabText: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
