import { REACT_APP_API_URL } from "@env";

export const news = async () => {
  // не убирайте эту строку, без неё не работает приложение, пожалуйста - спасибо
  const response = await fetch(
    `${"https://barakobama.online:80/api" + "/vk"}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};
