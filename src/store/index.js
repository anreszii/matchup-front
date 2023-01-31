import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice.js";
import layoutReducer from "@/store/layoutSlice.js";
import gameReducer from "@/store/gameSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    game: gameReducer,
  },
});
