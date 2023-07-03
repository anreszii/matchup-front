import { REACT_APP_API_URL } from "@env";

export const signUp = async (data) => {
  data.id = +data.id;
  return await fetch(
    `${"https://barakobama.online:80/api" + "/user/registration"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then(async (response) => {
      const json = await response.json();
      return {
        status: !json.errors?.length,
        errors: json.errors,
      };
    })
    .catch((e) => {
      console.log("signUp exception:", e);
      return {
        status: false,
        errors: ["Ошибка"],
      };
    });
};

export const signIn = async (data) => {
  return await fetch(`${"https://barakobama.online:80/api" + "/user/login"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const json = await response.json();
      return {
        status: !json.errors?.length,
        errors: json.errors,
        data: json,
      };
    })
    .catch((e) => {
      console.log("signIn exception:", Object.keys(e));
      Object.keys(e).forEach((key, value) => console.log(key, value));
      return {
        status: false,
        errors: ["Ошибка"],
      };
    });
};

export const resetPassword = async (data) => {
  return await fetch(
    `${"https://barakobama.online:80/api" + "/user/recover"}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then(async (response) => {
      const json = await response.json();
      return {
        status: !json.errors?.length,
        errors: json.errors,
      };
    })
    .catch((e) => {
      console.log("signIn exception:", e);
      return {
        status: false,
        errors: ["Ошибка"],
      };
    });
};
