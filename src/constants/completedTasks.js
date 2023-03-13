import AsyncStorage from "@react-native-async-storage/async-storage";

export let completed;
export let total;

(async () => {
  completed = await AsyncStorage.getItem("completed_tasks");
  total =
    JSON.parse(await AsyncStorage.getItem("profile"))[0].premium.isPremium ===
    true
      ? 3
      : 1;
})();
