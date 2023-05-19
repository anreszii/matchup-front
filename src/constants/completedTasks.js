import AsyncStorage from "@react-native-async-storage/async-storage";

export let completed = 0;
export let total = 1;

(async () => {
  completed = await AsyncStorage.getItem("completed_tasks");
  total =
    (await AsyncStorage.getItem("profile")) != null &&
    JSON.parse(await AsyncStorage.getItem("profile"))[0].premium.isPremium ===
      true
      ? 3
      : 1;
})();
