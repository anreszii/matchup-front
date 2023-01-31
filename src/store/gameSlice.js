import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    mode: null,
    lobby: null,
    lobbyData: null,
    startGame: false,
  },
  reducers: {
    setMode(state, { payload }) {
      state.mode = payload;
    },
    setLobby(state, { payload }) {
      state.lobby = payload;
    },
    setLobbyData(state, { payload }) {
      state.lobbyData = payload;
    },
    setStartGame(state, { payload }) {
      state.startGame = payload;
    },
  },
});

export const { setMode, setLobby, setLobbyData, setStartGame } =
  gameSlice.actions;
export default gameSlice.reducer;
