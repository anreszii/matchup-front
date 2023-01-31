import { createSlice } from "@reduxjs/toolkit";
import { i18n } from "@/plugins/i18n";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isFontsLoaded: false,
    language: "ru",
    languages: ["ru", "en"],
    headerTitle: "",
  },
  reducers: {
    setIsFontsLoaded(state, { payload }) {
      state.isFontsLoaded = payload;
    },
    setLanguage(state, { payload }) {
      state.language = payload;
      i18n.changeLanguage(state.language);
    },
  },
});

export const { setIsFontsLoaded, setLanguage } = layoutSlice.actions;
export default layoutSlice.reducer;
