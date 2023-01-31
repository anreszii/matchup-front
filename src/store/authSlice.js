import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: "",
  },
  reducers: {
    setToken(state, { payload }) {
      AsyncStorage.setItem("token", payload);
      state.token = payload;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
